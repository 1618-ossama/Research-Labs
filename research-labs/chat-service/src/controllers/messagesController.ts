import { Request, Response } from 'express';

// Mock database
const messagesDB: any[] = [];

export const getMessages = (req: Request, res: Response) => {
  const { conversationId } = req.query;
  const messages = conversationId
    ? messagesDB.filter(m => m.conversationId === conversationId)
    : messagesDB;
  res.json(messages);
};

export const getMessageById = (req: Request, res: Response) => {
  const { messageId } = req.params;
  const message = messagesDB.find(m => m.id === messageId);
  res.json(message || {});
};

export const createMessage = (req: Request, res: Response) => {
  const message = { ...req.body, id: Date.now().toString(), createdAt: new Date() };
  messagesDB.push(message);
  res.status(201).json(message);
};

export const markMessageAsRead = (req: Request, res: Response) => {
  const { messageId } = req.params;
  const message = messagesDB.find(m => m.id === messageId);
  if (message) {
    message.read = true;
    res.json(message);
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
};

export const softDeleteMessage = (req: Request, res: Response) => {
  const { messageId } = req.params;
  const message = messagesDB.find(m => m.id === messageId);
  if (message) {
    message.deleted = true;
    res.json(message);
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
};

export const recoverDeletedMessage = (req: Request, res: Response) => {
  const { messageId } = req.params;
  const message = messagesDB.find(m => m.id === messageId);
  if (message) {
    delete message.deleted;
    res.json(message);
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
};

export const editMessage = (req: Request, res: Response) => {
  const { messageId } = req.params;
  const { content } = req.body;
  const message = messagesDB.find(m => m.id === messageId);
  if (message) {
    message.content = content;
    message.edited = true;
    res.json(message);
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
};

export const searchMessages = (req: Request, res: Response) => {
  const { query } = req.query;
  const results = messagesDB.filter(m =>
    m.content.includes(query)
  );
  res.json(results);
};
