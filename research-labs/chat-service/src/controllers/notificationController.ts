import { Request, Response } from 'express';
import { chatModel } from '../models/chatModel';
import pool from '../db';

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { limit = 50, offset = 0, unreadOnly } = req.query;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    let query = 'SELECT * FROM notifications WHERE user_id = $1';
    const params: any[] = [userId];

    if (unreadOnly === 'true') {
      query += ' AND read_status = false';
    }

    query += ' ORDER BY created_at DESC LIMIT $2 OFFSET $3';
    params.push(Number(limit), Number(offset));

    try {
      const result = await pool.query(query, params);
      const totalResult = await pool.query(
        'SELECT COUNT(*) FROM notifications WHERE user_id = $1',
        [userId]
      );

      res.status(200).json({
        data: result.rows,
        pagination: {
          total: parseInt(totalResult.rows[0].count),
          limit: Number(limit),
          offset: Number(offset)
        }
      });
      return;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Failed to fetch notifications' });
      return;
    }
  } catch (error) {
    console.error('Error in getNotifications:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export const markAllNotificationsAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const success = await chatModel.markAllNotificationsAsRead(userId);
    res.status(200).json({ success });
    return;
  } catch (error) {
    console.error('Error in markAllNotificationsAsRead:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const notification = await chatModel.getNotification(notificationId);
    if (!notification) {
      res.status(404).json({ error: 'Notification not found' });
      return;
    }

    if (notification.user_id !== userId) {
      res.status(403).json({ error: 'Not authorized to mark this notification as read' });
      return;
    }

    const updatedNotification = await chatModel.updateNotification(notificationId, {
      read_status: true
    });

    if (!updatedNotification) {
      res.status(500).json({ error: 'Failed to update notification' });
      return;
    }

    res.status(200).json(updatedNotification);
    return;
  } catch (error) {
    console.error('Error in markNotificationAsRead:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};
