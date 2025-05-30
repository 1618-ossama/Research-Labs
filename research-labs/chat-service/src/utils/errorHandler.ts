import { WSEventEmitter } from '@/service/eventEmitter';
import { ConnectionManager } from '@/service/connectionManager';

export class WSErrorHandler {
  constructor(
    private connectionManager: ConnectionManager,
    private eventEmitter: WSEventEmitter
  ) {
    this.registerErrorHandlers();
  }

  private registerErrorHandlers(): void {
    this.eventEmitter.on('error', (errorData: unknown) => {
      this.handleSystemError(errorData);
    });

    process.on('uncaughtException', (error) => {
      this.handleProcessError('uncaughtException', error);
    });

    process.on('unhandledRejection', (reason, promise) => {
      this.handleProcessError('unhandledRejection', reason);
    });
  }

  private handleSystemError(errorData: any): void {
    console.error('WebSocket system error:', errorData);

    if (errorData.connectionId) {
      try {
        const connection = this.connectionManager.getConnection(errorData.connectionId);
        if (connection) {
          connection.socket.close(1011, 'Internal server error');
          this.connectionManager.removeConnection(errorData.connectionId);
        }
      } catch (cleanupError) {
        console.error('Error during connection cleanup:', cleanupError);
      }
    }

    this.eventEmitter.emit('metrics:error', {
      type: errorData.type || 'unknown',
      connectionId: errorData.connectionId,
      timestamp: new Date()
    });
  }

  private handleProcessError(type: string, error: any): void {
    console.error(`Process ${type}:`, error);

    if (this.isCriticalError(error)) {
      this.eventEmitter.emit('shutdown:initiated', {
        reason: type,
        error: error.message
      });
    }
  }

  private isCriticalError(error: any): boolean {
    return error instanceof Error &&
      (error.message.includes('memory') ||
        error.message.includes('ECONNREFUSED'));
  }

  public handleConnectionError(error: Error, connectionId: string): void {
    this.eventEmitter.emit('error', {
      type: 'connection_error',
      connectionId,
      error: error.message,
      stack: error.stack
    });

    const connection = this.connectionManager.getConnection(connectionId);
    if (connection) {
      try {
        connection.socket.send(JSON.stringify({
          type: 'error',
          code: 'CONNECTION_ERROR',
          message: 'A connection error occurred'
        }));
      } catch (sendError) {
        console.error('Failed to send error notification:', sendError);
      }
    }
  }

  public handleMessageProcessingError(error: Error, message: any, connectionId: string): void {
    this.eventEmitter.emit('error', {
      type: 'message_processing_error',
      connectionId,
      message,
      error: error.message,
      stack: error.stack
    });

    const sanitizedMessage = this.sanitizeMessage(message);
    console.error('Failed message:', sanitizedMessage);
  }

  private sanitizeMessage(message: any): any {
    if (typeof message === 'object') {
      const copy = { ...message };
      if (copy.password) delete copy.password;
      if (copy.token) delete copy.token;
      return copy;
    }
    return message;
  }
}
/*
import { ConnectionManager } from '../service/connectionManager';
import { WSEventEmitter } from '../service/eventEmitter';

export class WSErrorHandler {
  constructor(
    private connectionManager: ConnectionManager,
    private eventEmitter: WSEventEmitter
  ) {}

  handleConnectionError(error: Error, connectionId: string): void {
    console.error(`Connection error for ${connectionId}:`, error);
    
    try {
      this.connectionManager.removeConnection(connectionId);
      this.eventEmitter.emit('connection:error', {
        connectionId,
        error: error.message
      });
    } catch (cleanupError) {
      console.error(`Error during connection cleanup for ${connectionId}:`, cleanupError);
    }
  }

  handleMessageProcessingError(error: Error, rawMessage: any, connectionId: string): void {
    console.error(`Message processing error for connection ${connectionId}:`, error);
    
    this.eventEmitter.emit('message:error', {
      connectionId,
      error: error.message,
      rawMessage
    });

    // Optionally close connection for severe errors
    if (this.isSevereError(error)) {
      try {
        const connection = this.connectionManager.getConnection(connectionId);
        if (connection) {
          connection.socket.close(1011, 'Message processing error');
        }
        this.connectionManager.removeConnection(connectionId);
      } catch (closeError) {
        console.error(`Error closing connection ${connectionId}:`, closeError);
      }
    }
  }

  handleBroadcastError(error: Error, message: any, excludedConnectionId?: string): void {
    console.error('Broadcast error:', error);
    
    this.eventEmitter.emit('broadcast:error', {
      error: error.message,
      message,
      excludedConnectionId
    });
  }

  handleAuthenticationError(error: Error, socketInfo?: any): void {
    console.error('WebSocket authentication error:', error);
    
    this.eventEmitter.emit('auth:error', {
      error: error.message,
      socketInfo
    });
  }

  private isSevereError(error: Error): boolean {
    const severeErrorTypes = [
      'SyntaxError',
      'ReferenceError',
      'TypeError'
    ];
    
    return severeErrorTypes.some(type => error.constructor.name === type) ||
           error.message.includes('malformed') ||
           error.message.includes('protocol');
  }
}
*/
