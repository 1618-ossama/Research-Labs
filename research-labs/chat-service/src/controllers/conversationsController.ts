import { Request, Response } from 'express';

// Mock database (in a real app, use a proper database)
const conversationsDB: any[] = [];

export const getUserConversations = (req: Request, res: Response) => {
  const { userId } = req.params;
  const userConversations = conversationsDB.filter(c =>
    c.participants.includes(userId)
  );
  res.json(userConversations);
};

export const getSpecificConversation = (req: Request, res: Response) => {
  const { userId, otherUserId } = req.params;
  const conversation = conversationsDB.find(c =>
    c.participants.includes(userId) && c.participants.includes(otherUserId)
  );
  res.json(conversation || {});
};

export const archiveConversation = (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const index = conversationsDB.findIndex(c => c.id === conversationId);
  if (index >= 0) {
    conversationsDB[index].archived = true;
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Conversation not found' });
  }
};

export const muteConversation = (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const index = conversationsDB.findIndex(c => c.id === conversationId);
  if (index >= 0) {
    conversationsDB[index].muted = true;
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Conversation not found' });
  }
};

export const blockUserInConversation = (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const { blockedUserId } = req.body;
  const index = conversationsDB.findIndex(c => c.id === conversationId);
  if (index >= 0) {
    conversationsDB[index].blockedUsers = [
      ...(conversationsDB[index].blockedUsers || []),
      blockedUserId
    ];
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Conversation not found' });
  }
};

export const searchConversations = (req: Request, res: Response) => {
  const { query } = req.query;
  const results = conversationsDB.filter(c =>
    c.name?.includes(query) ||
    c.messages?.some((m: any) => m.content.includes(query))
  );
  res.json(results);
};
