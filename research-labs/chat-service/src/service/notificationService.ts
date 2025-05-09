import { ConnectionManager } from './connectionManager';
import { WSEventEmitter } from './eventEmitter';
import { v4 as uuidv4 } from 'uuid';

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
  senderId?: string;
  content: any;
  isRead: boolean;
  createdAt: Date;
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

      // get conversation participants from your database
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

  sendNotification(
    recipientId: string,
    type: NotificationType,
    content: any,
    senderId?: string
  ): void {
    const notification: Notification = {
      id: uuidv4(),
      type,
      recipientId,
      senderId,
      content,
      isRead: false,
      createdAt: new Date()
    };

    // save to database

    this.connectionManager.sendToUser(recipientId, {
      type: 'notification',
      notification
    });
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
        // get sender name from database
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
        // get sender name from database
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

  markNotificationAsRead(notificationId: string, userId: string): Promise<boolean> {
    // update in database

    // Notify user's connections about read status update
    this.connectionManager.sendToUser(userId, {
      type: 'notification_read',
      notificationId
    });

    return Promise.resolve(true);
  }

  markAllNotificationsAsRead(userId: string): Promise<boolean> {
    // update in database

    // Notify user's connections about read status update
    this.connectionManager.sendToUser(userId, {
      type: 'all_notifications_read'
    });

    return Promise.resolve(true);
  }

  private truncateMessage(content: string): string {
    const maxLength = 50;
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  }

  private async getConversationParticipants(conversationId: string): Promise<string[]> {
    // query your database.
    return Promise.resolve(['user1', 'user2', 'user3']);
  }
}
