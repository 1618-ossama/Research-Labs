import { ConnectionManager } from './connectionManager';
import { WSEventEmitter } from './eventEmitter';

export class MessageHandler {
  private connectionManager: ConnectionManager;
  private eventEmitter: WSEventEmitter;
  private messageHandlers: Map<string, (data: any, userId: string, connectionId: string) => void>;

  constructor(connectionManager: ConnectionManager, eventEmitter: WSEventEmitter) {
    this.connectionManager = connectionManager;
    this.eventEmitter = eventEmitter;
    this.messageHandlers = new Map();

    this.registerDefaultHandlers();
  }
  private registerDefaultHandlers(): void {
    this.registerHandler('ping', (data, userId, connectionId) => {
      this.connectionManager.sendToConnection(connectionId, {
        type: 'pong',
        timestamp: new Date().toISOString()
      });
    });

    this.registerHandler('typing', (data, userId, connectionId) => {
      if (data.conversationId) {
        this.eventEmitter.emit('conversation:typing', {
          userId,
          conversationId: data.conversationId,
          isTyping: data.isTyping || true
        });
      }
    });

    this.registerHandler('presence', (data, userId, connectionId) => {
      this.eventEmitter.emit('presence:update', {
        userId,
        status: data.status || 'online',
        connectionId
      });
    });

    this.registerHandler('customMessage', (data, userId, connectionId) => {
      console.log(`Received customMessage from ${userId}:`, data);

      this.connectionManager.sendToConnection(connectionId, {
        type: 'customResponse',
        message: `Hello ${userId}, your message was received!`,
        original: data
      });
    });

  }

  registerHandler(
    type: string,
    handler: (data: any, userId: string, connectionId: string) => void
  ): void {
    this.messageHandlers.set(type, handler);
  }

  handleMessage(data: any, connectionId: string): void {
    try {
      const connection = this.connectionManager.getConnection(connectionId);
      if (!connection) return;

      this.connectionManager.updateActivity(connectionId);

      let message;
      if (typeof data === 'string') {
        message = JSON.parse(data);
      } else {
        message = JSON.parse(data.toString());
      }

      const messageType = message.type;

      if (messageType && this.messageHandlers.has(messageType)) {
        const handler = this.messageHandlers.get(messageType);
        if (handler) {
          handler(message, connection.userId, connectionId);
        }
      } else {
        this.connectionManager.sendToConnection(connectionId, {
          type: 'error',
          message: 'Unknown message type',
          originalType: messageType
        });

        this.eventEmitter.emit('message:unknown', {
          userId: connection.userId,
          connectionId,
          messageType,
          message
        });
      }

      this.eventEmitter.emit('message:received', {
        userId: connection.userId,
        connectionId,
        messageType,
        message
      });

    } catch (error: any) {
      console.error('Error handling WebSocket message:', error);
      this.eventEmitter.emit('error', {
        type: 'message_handling_error',
        connectionId,
        error: error?.message || 'Unknown error'
      });
    }
  }
}
