import { v4 as uuidv4 } from 'uuid';
import { WSEventEmitter } from './eventEmitter';

export interface Connection {
  id: string;
  userId: string;
  socket: WebSocket;
  lastActivity: Date;
}

export class ConnectionManager {
  private connections: Map<string, Connection> = new Map();
  private userConnections: Map<string, Set<string>> = new Map();
  private eventEmitter: WSEventEmitter;
  private maxConnectionsPerUser: number;

  constructor(eventEmitter: WSEventEmitter, maxConnectionsPerUser: number = 10) {
    this.eventEmitter = eventEmitter;
    this.maxConnectionsPerUser = maxConnectionsPerUser;
  }

  addConnection(userId: string, socket: WebSocket): Connection {
    if (this.getUserConnectionCount(userId) >= this.maxConnectionsPerUser) {
      throw new Error(`User ${userId} has reached the maximum number of connections`);
    }

    const connectionId = uuidv4();
    const connection: Connection = {
      id: connectionId,
      userId,
      socket,
      lastActivity: new Date()
    };

    this.connections.set(connectionId, connection);

    if (!this.userConnections.has(userId)) {
      this.userConnections.set(userId, new Set());
    }
    this.userConnections.get(userId)?.add(connectionId);

    this.eventEmitter.emit('connection:added', { userId, connectionId });

    return connection;
  }

  removeConnection(connectionId: string): boolean {
    const connection = this.connections.get(connectionId);
    if (!connection) return false;

    this.connections.delete(connectionId);
    this.userConnections.get(connection.userId)?.delete(connectionId);

    if (this.userConnections.get(connection.userId)?.size === 0) {
      this.userConnections.delete(connection.userId);
    }

    this.eventEmitter.emit('connection:removed', {
      userId: connection.userId,
      connectionId
    });

    return true;
  }

  getConnection(connectionId: string): Connection | undefined {
    return this.connections.get(connectionId);
  }

  getAllConnections(): Connection[] {
    return Array.from(this.connections.values());
  }

  getUserConnections(userId: string): Connection[] {
    const connectionIds = Array.from(this.userConnections.get(userId) || []);
    return connectionIds.map(id => this.connections.get(id)).filter(Boolean) as Connection[];
  }

  getUserConnectionCount(userId: string): number {
    return this.userConnections.get(userId)?.size || 0;
  }

  hasConnections(userId: string): boolean {
    return this.getUserConnectionCount(userId) > 0;
  }

  updateLastActivity(connectionId: string): void {
    const connection = this.connections.get(connectionId);
    if (connection) {
      connection.lastActivity = new Date();
    }
  }

  isUserConnected(userId: string): boolean {
    return this.hasConnections(userId);
  }

  sendToConnection(connectionId: string, message: any): boolean {
    const connection = this.getConnection(connectionId);
    if (!connection) return false;

    try {
      connection.socket.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error(`Error sending to connection ${connectionId}:`, error);
      return false;
    }
  }

  sendToUser(userId: string, message: any): boolean {
    const connections = this.getUserConnections(userId);
    if (connections.length === 0) return false;

    let success = true;
    connections.forEach(conn => {
      try {
        conn.socket.send(JSON.stringify(message));
      } catch (error) {
        console.error(`Error sending to connection ${conn.id}:`, error);
        success = false;
      }
    });

    return success;
  }

  updateActivity(connectionId: string): void {
    this.updateLastActivity(connectionId);
  }
}
