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
