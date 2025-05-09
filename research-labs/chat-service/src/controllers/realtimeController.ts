import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Mock active connections
const activeConnections: any[] = [];

export const sendTypingIndicator = (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const { userId, isTyping } = req.body;

  // In a real app, you would emit this to WebSocket connections
  console.log(`User ${userId} is ${isTyping ? 'typing' : 'not typing'} in conversation ${conversationId}`);

  res.json({ success: true });
};

export const getUserPresenceStatus = (req: Request, res: Response) => {
  const { userId } = req.params;
  // In a real app, you would check presence service
  const isOnline = activeConnections.some(c => c.userId === userId);
  res.json({ status: isOnline ? 'online' : 'offline' });
};

export const updateOwnPresence = (req: Request, res: Response) => {
  const { userId, status } = req.body;
  // In a real app, you would update presence service
  console.log(`User ${userId} presence updated to ${status}`);
  res.json({ success: true });
};

export const generateConnectionToken = (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

export const listActiveConnections = (req: Request, res: Response) => {
  // In a real app, you would get from connection manager
  res.json({ connections: activeConnections });
};
