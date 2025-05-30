import pool from '../db';
import { Message, Notification, Group, GroupUser, Conversation, ConversationParticipant } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';

// async function safeOpDB<T>(operation: () => Promise<T>): Promise<T | undefined> {
//   try {
//     return await operation();
//   } catch (error) {
//     console.error("safeOpDB Error : ", error);
//   }
// }

export class ChatModel {

  async createConversation(
    conversation: Omit<Conversation, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Conversation | undefined> {
    try {
      const result = await pool.query<Conversation>(
        `INSERT INTO conversations (id, group_id, conversation_type, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
          uuidv4(),
          conversation.group_id,
          conversation.conversation_type,
          new Date(),
          new Date()
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating conversation:', error);
      return undefined;
    }
  }

  async getConversation(conversationId: string): Promise<Conversation | undefined> {
    try {
      const result = await pool.query<Conversation>(
        'SELECT * FROM conversations WHERE id = $1',
        [conversationId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching conversation:', error);
      return undefined;
    }
  }

  async updateConversation(
    conversationId: string,
    updates: Partial<Omit<Conversation, 'id' | 'created_at'>>
  ): Promise<Conversation | undefined> {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined) {
          fields.push(`${key} = $${paramCount}`);
          values.push(value);
          paramCount++;
        }
      }

      if (fields.length === 0) {
        throw new Error('No valid fields to update');
      }

      const query = `
        UPDATE conversations 
        SET ${fields.join(', ')}, updated_at = $${paramCount + 1}
        WHERE id = $${paramCount}
        RETURNING *
      `;
      values.push(conversationId, new Date());

      const result = await pool.query<Conversation>(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating conversation:', error);
      return undefined;
    }
  }

  async deleteConversation(conversationId: string): Promise<boolean> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Delete dependent records first
      // Can be programmed in db using CASCADE
      await client.query('DELETE FROM conversation_participants WHERE conversation_id = $1', [conversationId]);
      await client.query('DELETE FROM messages WHERE conversation_id = $1', [conversationId]);

      const result = await client.query('DELETE FROM conversations WHERE id = $1', [conversationId]);

      await client.query('COMMIT');
      return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error deleting conversation:', error);
      return false;
    } finally {
      client.release();
    }
  }

  async createMessage(
    message: Omit<Message, 'id' | 'created_at' | 'status'>
  ): Promise<Message | undefined> {
    try {
      const result = await pool.query<Message>(
        `INSERT INTO messages (id, message, sender_id, conversation_id, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          uuidv4(),
          message.message,
          message.sender_id,
          message.conversation_id,
          'SENT',
          new Date()
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating message:', error);
      return undefined;
    }
  }

  async getMessage(messageId: string): Promise<Message | undefined> {
    try {
      const result = await pool.query<Message>(
        'SELECT * FROM messages WHERE id = $1',
        [messageId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching message:', error);
      return undefined;
    }
  }

  async updateMessage(
    messageId: string,
    updates: Partial<Omit<Message, 'id' | 'created_at' | 'sender_id' | 'conversation_id'>>
  ): Promise<Message | undefined> {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined) {
          fields.push(`${key} = $${paramCount}`);
          values.push(value);
          paramCount++;
        }
      }

      if (fields.length === 0) {
        throw new Error('No valid fields to update');
      }

      const query = `
        UPDATE messages 
        SET ${fields.join(', ')}
        WHERE id = $${paramCount}
        RETURNING *
      `;
      values.push(messageId);

      const result = await pool.query<Message>(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating message:', error);
      return undefined;
    }
  }

  async deleteMessage(messageId: string): Promise<boolean> {
    try {
      const result = await pool.query(
        'DELETE FROM messages WHERE id = $1',
        [messageId]
      );
      return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      console.error('Error deleting message:', error);
      return false;
    }
  }

  async createNotification(
    notification: Omit<Notification, 'id' | 'created_at' | 'read_status'>
  ): Promise<Notification | undefined> {
    try {
      const result = await pool.query<Notification>(
        `INSERT INTO notifications (id, message, user_id, read_status, created_at)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
          uuidv4(),
          notification.message,
          notification.user_id,
          false,
          new Date()
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating notification:', error);
      return undefined;
    }
  }

  async getNotification(notificationId: string): Promise<Notification | undefined> {
    try {
      const result = await pool.query<Notification>(
        'SELECT * FROM notifications WHERE id = $1',
        [notificationId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching notification:', error);
      return undefined;
    }
  }

  async updateNotification(
    notificationId: string,
    updates: Partial<Omit<Notification, 'id' | 'created_at'>>
  ): Promise<Notification | undefined> {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined) {
          fields.push(`${key} = $${paramCount}`);
          values.push(value);
          paramCount++;
        }
      }

      if (fields.length === 0) {
        throw new Error('No valid fields to update');
      }

      const query = `
        UPDATE notifications 
        SET ${fields.join(', ')}
        WHERE id = $${paramCount}
        RETURNING *
      `;
      values.push(notificationId);

      const result = await pool.query<Notification>(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating notification:', error);
      return undefined;
    }
  }

  async deleteNotification(notificationId: string): Promise<boolean> {
    try {
      const result = await pool.query(
        'DELETE FROM notifications WHERE id = $1',
        [notificationId]
      );
      return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      console.error('Error deleting notification:', error);
      return false;
    }
  }

  async createGroup(
    group: Omit<Group, 'id' | 'created_at'>
  ): Promise<Group | undefined> {
    try {
      const result = await pool.query<Group>(
        `INSERT INTO groups (id, title, description, status, leader_id, publication_id, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          uuidv4(),
          group.title,
          group.description,
          group.status || 'ONGOINING',
          group.leader_id,
          group.publication_id,
          new Date()
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating group:', error);
      return undefined;
    }
  }

  async getGroup(groupId: string): Promise<Group | undefined> {
    try {
      const result = await pool.query<Group>(
        'SELECT * FROM groups WHERE id = $1',
        [groupId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching group:', error);
      return undefined;
    }
  }

  async updateGroup(
    groupId: string,
    updates: Partial<Omit<Group, 'id' | 'created_at'>>
  ): Promise<Group | undefined> {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined) {
          fields.push(`${key} = $${paramCount}`);
          values.push(value);
          paramCount++;
        }
      }

      if (fields.length === 0) {
        throw new Error('No valid fields to update');
      }

      const query = `
        UPDATE groups 
        SET ${fields.join(', ')}
        WHERE id = $${paramCount}
        RETURNING *
      `;
      values.push(groupId);

      const result = await pool.query<Group>(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating group:', error);
      return undefined;
    }
  }

  async deleteGroup(groupId: string): Promise<boolean> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');


      const convResult = await client.query<{ id: string }>(
        'SELECT id FROM conversations WHERE group_id = $1',
        [groupId]
      );

      if (convResult.rows.length > 0) {
        const conversationId = convResult.rows[0].id;
        await client.query('DELETE FROM conversation_participants WHERE conversation_id = $1', [conversationId]);
        await client.query('DELETE FROM messages WHERE conversation_id = $1', [conversationId]);
        await client.query('DELETE FROM conversations WHERE id = $1', [conversationId]);
      }

      await client.query('DELETE FROM group_user WHERE group_id = $1', [groupId]);
      const result = await client.query('DELETE FROM groups WHERE id = $1', [groupId]);

      await client.query('COMMIT');
      return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error deleting group:', error);
      return false;
    } finally {
      client.release();
    }
  }

  async addConversationParticipant(
    participant: Omit<ConversationParticipant, 'created_at'>
  ): Promise<ConversationParticipant | undefined> {
    try {
      const result = await pool.query<ConversationParticipant>(
        `INSERT INTO conversation_participants (conversation_id, user_id, role, created_at)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (conversation_id, user_id) DO UPDATE SET role = EXCLUDED.role
         RETURNING *`,
        [
          participant.conversation_id,
          participant.user_id,
          participant.role || 'MEMBER',
          new Date()
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error adding conversation participant:', error);
      return undefined;
    }
  }

  async getConversationParticipant(
    conversationId: string,
    userId: string
  ): Promise<ConversationParticipant | undefined> {
    try {
      const result = await pool.query<ConversationParticipant>(
        `SELECT * FROM conversation_participants 
         WHERE conversation_id = $1 AND user_id = $2`,
        [conversationId, userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching conversation participant:', error);
      return undefined;
    }
  }

  async updateConversationParticipant(
    conversationId: string,
    userId: string,
    updates: Partial<Omit<ConversationParticipant, 'conversation_id' | 'user_id' | 'created_at'>>
  ): Promise<ConversationParticipant | undefined> {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined) {
          fields.push(`${key} = $${paramCount}`);
          values.push(value);
          paramCount++;
        }
      }

      if (fields.length === 0) {
        throw new Error('No valid fields to update');
      }

      const query = `
        UPDATE conversation_participants 
        SET ${fields.join(', ')}
        WHERE conversation_id = $${paramCount} AND user_id = $${paramCount + 1}
        RETURNING *
      `;
      values.push(conversationId, userId);

      const result = await pool.query<ConversationParticipant>(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating conversation participant:', error);
      return undefined;
    }
  }

  async removeConversationParticipant(
    conversationId: string,
    userId: string
  ): Promise<boolean> {
    try {
      const result = await pool.query(
        `DELETE FROM conversation_participants 
         WHERE conversation_id = $1 AND user_id = $2`,
        [conversationId, userId]
      );
      return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      console.error('Error removing conversation participant:', error);
      return false;
    }
  }

  async addGroupUser(
    groupUser: Omit<GroupUser, 'created_at'>
  ): Promise<GroupUser | undefined> {
    try {
      const result = await pool.query<GroupUser>(
        `INSERT INTO group_user (user_id, group_id, created_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, group_id) DO NOTHING
         RETURNING *`,
        [
          groupUser.user_id,
          groupUser.group_id,
          new Date()
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error adding group user:', error);
      return undefined;
    }
  }

  async getGroupUser(
    groupId: string,
    userId: string
  ): Promise<GroupUser | undefined> {
    try {
      const result = await pool.query<GroupUser>(
        `SELECT * FROM group_user 
         WHERE group_id = $1 AND user_id = $2`,
        [groupId, userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching group user:', error);
      return undefined;
    }
  }

  async removeGroupUser(
    groupId: string,
    userId: string
  ): Promise<boolean> {
    try {
      const result = await pool.query(
        `DELETE FROM group_user 
         WHERE group_id = $1 AND user_id = $2`,
        [groupId, userId]
      );
      return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      console.error('Error removing group user:', error);
      return false;
    }
  }

  /**
   * Get all conversations for a specific user
   */
  async getUserConversations(userId: string): Promise<Conversation[]> {
    try {
      const result = await pool.query<Conversation>(
        `SELECT c.* FROM conversations c
         JOIN conversation_participants cp ON c.id = cp.conversation_id
         WHERE cp.user_id = $1
         ORDER BY c.updated_at DESC`,
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching user conversations:', error);
      return [];
    }
  }

  /**
   * Get messages for a conversation with pagination
   */
  async getConversationMessages(
    conversationId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Message[]> {
    try {
      const result = await pool.query<Message>(
        `SELECT * FROM messages
         WHERE conversation_id = $1
         ORDER BY created_at DESC
         LIMIT $2 OFFSET $3`,
        [conversationId, limit, offset]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching conversation messages:', error);
      return [];
    }
  }

  /**
   * Mark all messages in a conversation as read for a specific user
   */
  async markMessagesAsRead(conversationId: string, userId: string): Promise<boolean> {
    try {
      const result = await pool.query(
        `UPDATE messages
         SET status = 'READ'
         WHERE conversation_id = $1
         AND sender_id != $2
         AND status != 'READ'`,
        [conversationId, userId]
      );
      return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      console.error('Error marking messages as read:', error);
      return false;
    }
  }

  /**
   * Get notifications for a specific user
   */
  async getUserNotifications(userId: string, limit: number = 50, offset: number = 0): Promise<Notification[]> {
    try {
      const result = await pool.query<Notification>(
        `SELECT * FROM notifications
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT $2 OFFSET $3`,
        [userId, limit, offset]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching user notifications:', error);
      return [];
    }
  }

  /**
   * Mark all notifications as read for a specific user
   */
  async markAllNotificationsAsRead(userId: string): Promise<boolean> {
    try {
      const result = await pool.query(
        `UPDATE notifications
         SET read_status = true
         WHERE user_id = $1
         AND read_status = false`,
        [userId]
      );
      return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }
  }

  /**
   * Get group members for a specific group
   */
  async getGroupMembers(groupId: string): Promise<{ user_id: string, role: string }[]> {
    try {
      const result = await pool.query<{ user_id: string, role: string }>(
        `SELECT cp.user_id, cp.role 
         FROM conversation_participants cp
         JOIN conversations c ON cp.conversation_id = c.id
         WHERE c.group_id = $1`,
        [groupId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching group members:', error);
      return [];
    }
  }

  /**
   * Get conversation participants
   */
  async getConversationParticipants(conversationId: string): Promise<ConversationParticipant[]> {
    try {
      const result = await pool.query<ConversationParticipant>(
        `SELECT * FROM conversation_participants
         WHERE conversation_id = $1`,
        [conversationId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching conversation participants:', error);
      return [];
    }
  }

  /**
   * Check if a user is a participant in a conversation
   */
  async isConversationParticipant(conversationId: string, userId: string): Promise<boolean> {
    try {
      const result = await pool.query(
        `SELECT 1 FROM conversation_participants
         WHERE conversation_id = $1 AND user_id = $2`,
        [conversationId, userId]
      );
      return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      console.error('Error checking conversation participant:', error);
      return false;
    }
  }

  /**
   * Get the most recent message in a conversation
   */
  async getLastConversationMessage(conversationId: string): Promise<Message | undefined> {
    try {
      const result = await pool.query<Message>(
        `SELECT * FROM messages
         WHERE conversation_id = $1
         ORDER BY created_at DESC
         LIMIT 1`,
        [conversationId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching last conversation message:', error);
      return undefined;
    }
  }
}

export const chatModel = new ChatModel();
