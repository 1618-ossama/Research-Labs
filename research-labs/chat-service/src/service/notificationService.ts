import { ConnectionManager } from './connectionManager';
import { WSEventEmitter } from './eventEmitter';
import { v4 as uuidv4 } from 'uuid';
import { chatModel } from '../models/chatModel';

export enum NotificationType {
  MESSAGE = 'message',
  FRIEND_REQUEST = 'friend_request',
  GROUP_INVITATION = 'group_invitation',
  SYSTEM = 'system',
  MENTION = 'mention'
}

export interface Notification {
  id: string;
  type: NotificationType;
  recipientId: string;
  content: any;
  created_at: Date;
  read_status: boolean;
  senderId?: string;
}

export class NotificationService {
  constructor(
    private connectionManager: ConnectionManager,
    private eventEmitter: WSEventEmitter
  ) {
    this.registerEventListeners();
  }

  private registerEventListeners(): void {
    //@ts-ignore
    this.eventEmitter.on('conversation:message', (data) => {
      const { conversationId, message, excludeUserId } = data;

      this.getConversationParticipants(conversationId)
        .then(participants => {
          for (const userId of participants) {
            if (userId !== excludeUserId) {
              this.createMessageNotification(userId, message.senderId, message);
            }
          }
        })
        .catch(error => {
          console.error('Error processing message for notifications:', error);
        });
    });
  }

  async sendNotification(
    recipientId: string,
    type: NotificationType,
    content: any,
    senderId?: string
  ): Promise<void> {
    const notification: Notification = {
      id: uuidv4(),
      type,
      recipientId,
      senderId,
      content,
      read_status: false,
      created_at: new Date()
    };

    try {
      await chatModel.createNotification({
        message: JSON.stringify({
          type,
          content,
          senderId
        }),
        user_id: recipientId,
      });

      this.connectionManager.sendToUser(recipientId, {
        type: 'notification',
        notification
      });
    } catch (error) {
      console.error('Error saving notification:', error);
    }
  }

  createMessageNotification(recipientId: string, senderId: string, message: any): void {
    this.sendNotification(
      recipientId,
      NotificationType.MESSAGE,
      {
        messageId: message.id,
        conversationId: message.conversationId,
        preview: this.truncateMessage(message.content),
        senderName: message.senderName || senderId
      },
      senderId
    );
  }

  createFriendRequestNotification(recipientId: string, senderId: string): void {
    this.sendNotification(
      recipientId,
      NotificationType.FRIEND_REQUEST,
      {
        senderId,
        senderName: `User ${senderId}`
      },
      senderId
    );
  }

  createGroupInvitationNotification(
    recipientId: string,
    senderId: string,
    groupId: string,
    groupName: string
  ): void {
    this.sendNotification(
      recipientId,
      NotificationType.GROUP_INVITATION,
      {
        groupId,
        groupName,
        senderId,
        senderName: `User ${senderId}`
      },
      senderId
    );
  }

  createSystemNotification(recipientId: string, message: string): void {
    this.sendNotification(
      recipientId,
      NotificationType.SYSTEM,
      {
        message
      }
    );
  }

  async markNotificationAsRead(notificationId: string, userId: string): Promise<boolean> {
    try {
      const result = await chatModel.updateNotification(notificationId, {
        read_status: true
      });

      if (!result) return false;

      this.connectionManager.sendToUser(userId, {
        type: 'notification_read',
        notificationId
      });

      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }

  async markAllNotificationsAsRead(userId: string): Promise<boolean> {
    try {
      const result = await chatModel.markAllNotificationsAsRead(userId);

      if (!result) return false;

      this.connectionManager.sendToUser(userId, {
        type: 'all_notifications_read'
      });

      return true;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }
  }

  private truncateMessage(content: string): string {
    const maxLength = 50;
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  }

  private async getConversationParticipants(conversationId: string): Promise<string[]> {
    try {
      const participants = await chatModel.getConversationParticipants(conversationId);
      return participants.map(p => p.user_id);
    } catch (error) {
      console.error('Error getting conversation participants:', error);
      return [];
    }
  }

  async getUserNotifications(userId: string, limit: number = 50, offset: number = 0): Promise<Notification[]> {
    try {
      const dbNotifications = await chatModel.getUserNotifications(userId, limit, offset);
      return dbNotifications.map(dbNotif => {
        const content = JSON.parse(dbNotif.message);
        return {
          id: dbNotif.id,
          type: content.type,
          recipientId: dbNotif.user_id,
          content: content.content,
          created_at: dbNotif.created_at,
          read_status: dbNotif.read_status,
          senderId: content.senderId
        };
      });
    } catch (error) {
      console.error('Error getting user notifications:', error);
      return [];
    }
  }
}
