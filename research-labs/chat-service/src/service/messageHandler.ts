import { ConnectionManager, Connection } from './connectionManager';
import { WSEventEmitter } from './eventEmitter';
import { WSMessage } from '../utils/types';
import { chatModel } from '../models/chatModel';
import { ConversationParticipant } from '../utils/types';

export class MessageHandler {
  private connectionManager: ConnectionManager;
  private eventEmitter: WSEventEmitter;
  private messageHandlers: Map<string, (message: WSMessage, userId: string, connectionId: string) => Promise<void> | void>;
  private chatModel: typeof chatModel;

  constructor(
    connectionManager: ConnectionManager,
    eventEmitter: WSEventEmitter,
    chatModelInstance: typeof chatModel
  ) {
    this.connectionManager = connectionManager;
    this.eventEmitter = eventEmitter;
    this.chatModel = chatModelInstance;
    this.messageHandlers = new Map();
    this.registerDefaultHandlers();
    this.registerChatActionHandlers();
  }

  public async handleMessage(data: any, connection: Connection): Promise<void> {
    try {
      await this.processMessage(data, connection);
      this.eventEmitter.emit('message:received', {
        userId: connection.userId,
        connectionId: connection.id,
        messageType: data.type,
        data,
      });
    } catch (error) {
      console.error(`Error processing message:`, error);
      this.connectionManager.sendToConnection(connection.id, {
        type: 'error',
        payload: { error: 'Message processing failed', details: (error as Error).message },
      });
      this.eventEmitter.emit('error', {
        type: 'message_handler_error',
        connectionId: connection.id,
        error: (error as Error).message,
      });
    }
  }

  public async processMessage(message: WSMessage, connection: Connection): Promise<void> {
    const handler = this.messageHandlers.get(message.type);

    if (!handler) {
      this.handleUnknownMessageType(message, connection);
      return;
    }

    try {
      await handler(message, connection.userId, connection.id);
      this.emitMessageProcessedEvent(message, connection);
    } catch (error) {
      this.handleProcessingError(error, message, connection);
    }
  }

  private handleUnknownMessageType(message: WSMessage, connection: Connection) {
    this.connectionManager.sendToConnection(connection.id, {
      type: 'error',
      payload: { message: 'Unknown message type' },
      originalType: message.type,
    });

    this.eventEmitter.emit('message:unknown', {
      userId: connection.userId,
      connectionId: connection.id,
      messageType: message.type,
      message,
    });
  }

  private emitMessageProcessedEvent(message: WSMessage, connection: Connection) {
    this.eventEmitter.emit('message:processed', {
      userId: connection.userId,
      connectionId: connection.id,
      messageType: message.type,
      message,
    });
  }

  private handleProcessingError(error: unknown, message: WSMessage, connection: Connection) {
    console.error(`Error processing ${message.type}:`, error);

    this.connectionManager.sendToConnection(connection.id, {
      type: 'error',
      payload: {
        error: 'Message processing failed',
        details: (error as Error).message,
        originalType: message.type
      },
    });

    this.eventEmitter.emit('message:error', {
      type: message.type,
      userId: connection.userId,
      connectionId: connection.id,
      error: error as Error,
    });
  }

  private registerDefaultHandlers(): void {
    this.registerHandler('ping', (message, userId, connectionId) => {
      this.connectionManager.sendToConnection(connectionId, {
        type: 'pong',
        payload: {
          timestamp: new Date().toISOString(),
          originalClientTimestamp: (message.payload as any)?.clientTimestamp
        }
      });
    });

    this.registerHandler('typing', (message, userId, connectionId) => {
      const payload = message.payload as { conversationId?: string, isTyping?: boolean };
      if (payload && payload.conversationId) {
        this.eventEmitter.emit('conversation:typing', {
          userId,
          connectionId,
          conversationId: payload.conversationId,
          isTyping: typeof payload.isTyping === 'boolean' ? payload.isTyping : true,
        });
      } else {
        this.connectionManager.sendToConnection(connectionId, {
          type: 'error',
          payload: { message: "'typing' message requires 'conversationId' in payload." },
          originalType: message.type
        });
      }
    });

    this.registerHandler('presence', (message, userId, connectionId) => {
      const payload = message.payload as { status?: string };
      if (payload && payload.status) {
        this.eventEmitter.emit('presence:update', {
          userId,
          status: payload.status,
          connectionId,
        });
      } else {
        this.connectionManager.sendToConnection(connectionId, {
          type: 'error',
          payload: { message: "'presence' message requires 'status' in payload." },
          originalType: message.type
        });
      }
    });
  }

  private registerChatActionHandlers(): void {
    this.registerHandler('chat:send_message', async (message, userId, connectionId) => {
      const payload = message.payload as { conversationId?: string, text?: string, clientTempId?: string };
      if (!payload || !payload.conversationId || typeof payload.text !== 'string') {
        this.connectionManager.sendToConnection(connectionId, {
          type: 'chat:message_error',
          payload: { error: 'Invalid payload for chat:send_message. Requires conversationId and text.', clientTempId: payload?.clientTempId },
        });
        return;
      }

      try {
        const participant = await this.chatModel.getConversationParticipant(payload.conversationId, userId);
        if (!participant) {
          this.connectionManager.sendToConnection(connectionId, {
            type: 'chat:message_error',
            payload: { error: 'Not a participant in this conversation.', clientTempId: payload?.clientTempId },
          });
          return;
        }
        if (participant.role === 'READ_ONLY') {
          this.connectionManager.sendToConnection(connectionId, {
            type: 'chat:message_error',
            payload: { error: 'You are in read-only mode in this conversation.', clientTempId: payload?.clientTempId },
          });
          return;
        }

        const newMessage = await this.chatModel.createMessage({
          message: payload.text,
          sender_id: userId,
          conversation_id: payload.conversationId,
        });

        if (!newMessage) {
          this.connectionManager.sendToConnection(connectionId, {
            type: 'chat:message_error',
            payload: { error: 'Failed to send message due to server error.', clientTempId: payload?.clientTempId },
          });
          return;
        }

        await this.chatModel.updateConversation(payload.conversationId, { updated_at: new Date() });

        this.connectionManager.sendToConnection(connectionId, {
          type: 'chat:message_ack',
          payload: { ...newMessage, clientTempId: payload.clientTempId, conversation_id: payload.conversationId },
        });

        const participants = await this.chatModel.getConversationParticipants(payload.conversationId);
        participants.forEach((p: ConversationParticipant) => {
          this.connectionManager.sendToUser(p.user_id, {
            type: 'chat:new_message',
            payload: { ...newMessage, conversation_id: payload.conversationId },
          });
        });
      } catch (error: any) {
        console.error(`Error in chat:send_message for user ${userId}:`, error);
        this.connectionManager.sendToConnection(connectionId, {
          type: 'chat:message_error',
          payload: { error: 'Failed to send message due to server error.', clientTempId: payload?.clientTempId, details: error.message },
        });
      }
    });

    this.registerHandler('chat:edit_message', async (message, userId, connectionId) => {
      const payload = message.payload as { conversationId?: string, messageId?: string, newText?: string };
      if (!payload || !payload.conversationId || !payload.messageId || typeof payload.newText !== 'string') {
        this.connectionManager.sendToConnection(connectionId, { type: 'chat:message_error', payload: { error: 'Invalid payload for chat:edit_message.' } });
        return;
      }

      try {
        const existingMessage = await this.chatModel.getMessage(payload.messageId);
        if (!existingMessage || existingMessage.conversation_id !== payload.conversationId) {
          this.connectionManager.sendToConnection(connectionId, { type: 'chat:message_error', payload: { error: 'Message not found or does not belong to conversation.' } });
          return;
        }
        if (existingMessage.sender_id !== userId) {
          this.connectionManager.sendToConnection(connectionId, { type: 'chat:message_error', payload: { error: 'Not authorized to edit this message.' } });
          return;
        }

        const updatedMessage = await this.chatModel.updateMessage(payload.messageId, { message: payload.newText });
        if (!updatedMessage) {
          this.connectionManager.sendToConnection(connectionId, { type: 'chat:message_error', payload: { error: 'Failed to update message on server.' } });
          return;
        }

        const participants = await this.chatModel.getConversationParticipants(payload.conversationId);
        participants.forEach((p: ConversationParticipant) => {
          this.connectionManager.sendToUser(p.user_id, {
            type: 'chat:message_updated',
            payload: { ...updatedMessage, conversation_id: payload.conversationId },
          });
        });
      } catch (error: any) {
        console.error(`Error in chat:edit_message for user ${userId}:`, error);
        this.connectionManager.sendToConnection(connectionId, { type: 'chat:message_error', payload: { error: 'Failed to edit message due to server error.', details: error.message } });
      }
    });

    this.registerHandler('chat:delete_message', async (message, userId, connectionId) => {
      const payload = message.payload as { conversationId?: string, messageId?: string };
      if (!payload || !payload.conversationId || !payload.messageId) {
        this.connectionManager.sendToConnection(connectionId, { type: 'chat:message_error', payload: { error: 'Invalid payload for chat:delete_message.' } });
        return;
      }

      try {
        const existingMessage = await this.chatModel.getMessage(payload.messageId);
        if (!existingMessage || existingMessage.conversation_id !== payload.conversationId) {
          this.connectionManager.sendToConnection(connectionId, { type: 'chat:message_error', payload: { error: 'Message not found or does not belong to conversation.' } });
          return;
        }

        const participant = await this.chatModel.getConversationParticipant(payload.conversationId, userId);
        const isAdmin = participant?.role === 'ADMIN';

        if (existingMessage.sender_id !== userId && !isAdmin) {
          this.connectionManager.sendToConnection(connectionId, { type: 'chat:message_error', payload: { error: 'Not authorized to delete this message.' } });
          return;
        }

        const success = await this.chatModel.deleteMessage(payload.messageId);
        if (!success) {
          this.connectionManager.sendToConnection(connectionId, { type: 'chat:message_error', payload: { error: 'Failed to delete message on server.' } });
          return;
        }

        const participants = await this.chatModel.getConversationParticipants(payload.conversationId);
        participants.forEach((p: ConversationParticipant) => {
          this.connectionManager.sendToUser(p.user_id, {
            type: 'chat:message_deleted',
            payload: { id: payload.messageId, conversation_id: payload.conversationId, deleted_by: userId },
          });
        });
      } catch (error: any) {
        console.error(`Error in chat:delete_message for user ${userId}:`, error);
        this.connectionManager.sendToConnection(connectionId, { type: 'chat:message_error', payload: { error: 'Failed to delete message due to server error.', details: error.message } });
      }
    });
  }

  registerHandler(
    type: string,
    handler: (message: WSMessage, userId: string, connectionId: string) => Promise<void> | void
  ): void {
    this.messageHandlers.set(type, handler);
  }
}
