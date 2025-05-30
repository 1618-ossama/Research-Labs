import { WebSocketServer as WSServer } from 'ws';
import express from 'express';
import http from 'http';
import { WebSocketConfig, WSMessage, Connection, MessageMiddleware } from '../utils/types';
import { ConnectionManager } from '../service/connectionManager';
import { AuthService } from '../service/authService';
import { WSEventEmitter } from '../service/eventEmitter';
import { WSErrorHandler } from '../utils/errorHandler';
import { WebSocket as WSType } from 'ws';
import { MessageHandler } from '../service/messageHandler';
import { chatModel } from '../models/chatModel';

export class WebSocketServer {
  private wss: WSServer;
  private messageHandler: MessageHandler;
  private connectionManager: ConnectionManager;
  private authService: AuthService;
  private eventEmitter: WSEventEmitter;
  private heartbeatInterval?: NodeJS.Timeout;
  private middlewares: MessageMiddleware[] = [];
  private config: Required<WebSocketConfig>;
  private rateLimitStore: Map<string, number[]> = new Map();
  private errorhandler: WSErrorHandler;

  constructor(server: http.Server, config: WebSocketConfig, chatModelInstance: typeof chatModel) {
    this.config = {
      heartbeatInterval: 60_000,
      inactivityTimeout: 300_000,
      maxConnectionsPerUser: 1,
      ...config,
    };

    this.wss = new WSServer({ server });
    this.eventEmitter = new WSEventEmitter();
    this.connectionManager = new ConnectionManager(
      this.eventEmitter,
      this.config.maxConnectionsPerUser
    );
    this.authService = new AuthService(this.config.jwtSecret);
    this.messageHandler = new MessageHandler(this.connectionManager, this.eventEmitter, chatModel);
    this.errorhandler = new WSErrorHandler(this.connectionManager, this.eventEmitter);

    this.middlewares = [
      this.validateMessage.bind(this),
      this.rateLimit.bind(this),
    ];

    this.setupConnectionHandling();
    this.setupHeartbeat();
    this.setupGracefulShutdown();
  }

  public use(middleware: MessageMiddleware): void {
    this.middlewares.push(middleware);
  }

  public on(event: string, handler: Function): void {
    this.eventEmitter.on(event, handler);
  }

  public broadcast(message: WSMessage, excludeConnectionId?: string): void {
    const messageStr = JSON.stringify(message);
    this.connectionManager.getAllConnections().forEach(conn => {
      if (!excludeConnectionId || conn.id !== excludeConnectionId) {
        try {
          conn.socket.send(messageStr);
        } catch (error) {
          console.error(`Error broadcasting to connection ${conn.id}:`, error);
          try {
            conn.socket.close(1011, 'Internal server error');
          } catch (closeError) {
            console.error(`Error closing connection ${conn.id}:`, closeError);
          }
          this.connectionManager.removeConnection(conn.id);
        }
      }
    });
  }

  public sendToUser(userId: string, message: WSMessage): void {
    const messageStr = JSON.stringify(message);
    this.connectionManager.getUserConnections(userId).forEach(conn => {
      try {
        conn.socket.send(messageStr);
      } catch (error) {
        console.error(`Error sending to connection ${conn.id}:`, error);
        try {
          conn.socket.close(1011, 'Internal server error');
        } catch (closeError) {
          console.error(`Error closing connection ${conn.id}:`, closeError);
        }
        this.connectionManager.removeConnection(conn.id);
      }
    });
  }

  private setupConnectionHandling(): void {
    this.wss.on('connection', (socket: WSType, request: http.IncomingMessage) => {
      try {
        const url = new URL(request.url || '', `http://${request.headers.host}`);
        const token = url.searchParams.get('token');

        if (!token) {
          socket.close(1008, 'Missing authentication token');
          return;
        }

        try {
          const payload = this.authService.verifyToken(token);
          const userId = payload.userId;

          let connection;
          try {
            connection = this.connectionManager.addConnection(userId, socket as any);
          } catch (connError) {
            socket.close(1013, 'Too many connections');
            return;
          }

          socket.send(JSON.stringify({
            type: 'connection_established',
            connectionId: connection.id,
            userId,
          }));

          this.eventEmitter.emit('presence:update', {
            userId,
            status: 'online',
          });

          socket.on('message', async (data) => {
            this.connectionManager.updateLastActivity(connection.id);
            try {
              const message = this.parseMessage(data);
              await this.runMiddlewarePipeline(message, connection as any);
              await this.messageHandler.processMessage(message, connection);
            } catch (error) {
              this.errorhandler.handleMessageProcessingError(error as Error, data, connection.id);
            }
          });

          socket.on('close', () => this.handleDisconnection(connection as any));
          socket.on('error', (err) => this.handleError(err as Error, connection as any));
        } catch (error) {
          console.error('Authentication error:', error);
          socket.close(1008, 'Invalid authentication token');
        }
      } catch (error) {
        console.error('Connection setup error:', error);
        socket.close(1011, 'Internal server error');
      }
    });
  }

  private parseMessage(data: any): WSMessage {
    let messageString: string;

    if (typeof data === 'string') {
      messageString = data;
    } else if (data instanceof Buffer || data instanceof ArrayBuffer) {
      messageString = data.toString();
    } else {
      throw new Error('Unsupported message format');
    }
    try {
      const parsed = JSON.parse(messageString);
      if (!parsed.type || typeof parsed.type !== 'string') {
        throw new Error('Invalid message format');
      }
      return parsed;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Invalid JSON format');
      }
      throw error;
    }
  }
  private async runMiddlewarePipeline(message: WSMessage, connection: Connection): Promise<void> {
    const runner = async (index: number): Promise<void> => {
      if (index >= this.middlewares.length) return;
      const middleware = this.middlewares[index];

      await new Promise<void>((resolve, reject) => {
        try {
          middleware(message, connection, (err?: Error) => {
            if (err) reject(err);
            else resolve();
          });
        } catch (error) {
          reject(error);
        }
      });

      await runner(index + 1);
    };

    await runner(0);
  }

  private validateMessage(message: WSMessage, _: Connection, next: (err?: Error) => void): void {
    try {
      if (!message.type) {
        return next(new Error('Message type is required'));
      }
      if (message.payload && typeof message.payload !== 'object') {
        return next(new Error('Message payload must be an object'));
      }
      next();
    } catch (error) {
      next(error as Error);
    }
  }

  private rateLimit(message: WSMessage, connection: Connection, next: (err?: Error) => void): void {
    try {
      const now = Date.now();
      const windowSize = 10_000;
      const limit = 5;

      const userId = connection.userId;
      const timestamps = this.rateLimitStore.get(userId) || [];

      const updated = timestamps.filter(ts => now - ts < windowSize);
      updated.push(now);

      if (updated.length > limit) {
        return next(new Error('Rate limit exceeded'));
      }

      this.rateLimitStore.set(userId, updated);
      next();
    } catch (error) {
      next(error as Error);
    }
  }

  private setupHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      try {
        const now = new Date();
        this.connectionManager.getAllConnections().forEach((conn) => {
          try {
            if (now.getTime() - conn.lastActivity.getTime() > this.config.inactivityTimeout) {
              try {
                (conn.socket as any).terminate?.() || conn.socket.close(1000, 'Connection timeout');
              } catch (terminateError) {
                console.error(`Error terminating inactive connection ${conn.id}:`, terminateError);
              }
              this.connectionManager.removeConnection(conn.id);
            }
          } catch (connError) {
            console.error(`Error processing connection ${conn.id} in heartbeat:`, connError);
          }
        });
      } catch (error) {
        console.error('Error in heartbeat interval:', error);
      }
    }, this.config.heartbeatInterval);
  }

  private setupGracefulShutdown(): void {
    const shutdown = () => {
      console.log('Shutting down WebSocket server...');

      clearInterval(this.heartbeatInterval);

      this.connectionManager.getAllConnections().forEach(conn => {
        try {
          conn.socket.close(1001, 'Server shutting down');
        } catch (error) {
          console.error(`Error closing connection ${conn.id} during shutdown:`, error);
        }
      });

      this.wss.close((err) => {
        if (err) {
          console.error('Error shutting down WebSocket server:', err);
        } else {
          console.log('WebSocket server gracefully shut down');
        }
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  }

  private handleDisconnection(connection: Connection): void {
    try {
      this.connectionManager.removeConnection(connection.id);
      if (!this.connectionManager.hasConnections(connection.userId)) {
        this.eventEmitter.emit('presence:update', {
          userId: connection.userId,
          status: 'offline',
        });
      }
    } catch (error) {
      console.error(`Error handling disconnection for ${connection.id}:`, error);
    }
  }

  private handleError(error: Error, connection: Connection): void {
    console.error(`WebSocket error (${connection.id}):`, error);
    try {
      this.connectionManager.removeConnection(connection.id);
    } catch (removeError) {
      console.error(`Error removing connection ${connection.id} after error:`, removeError);
    }
  }
}

export function setupWebSocketServer(
  app: express.Application,
  config: WebSocketConfig
): http.Server {
  app.use(express.urlencoded());
  app.use(express.json());
  const server = http.createServer(app);
  const wsServer = new WebSocketServer(server, config, chatModel);

  wsServer.use((message, conn, next) => {
    try {
      console.log(`Message from ${conn.userId}: ${message.type}`);
      next();
    } catch (error) {
      next(error as Error);
    }
  });

  app.set('wsServer', wsServer);
  return server;
}
