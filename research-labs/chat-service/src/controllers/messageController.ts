import { Request, Response } from 'express';
import { chatModel } from '../models/chatModel';
import { Message } from '../utils/types';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user?.userId;
    const { limit = 50, offset = 0 } = req.query;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const isParticipant = await chatModel.isConversationParticipant(conversationId, userId);
    if (!isParticipant) {
      res.status(403).json({ error: 'Not a participant in this conversation' });
      return;
    }

    const messages = await chatModel.getConversationMessages(
      conversationId,
      Number(limit),
      Number(offset)
    );

    res.status(200).json({
      data: messages,
      pagination: {
        limit: Number(limit),
        offset: Number(offset)
      }
    });
    return;
  } catch (error) {
    console.error('Error in getMessages:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { message } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Invalid message content' });
      return;
    }

    const isParticipant = await chatModel.isConversationParticipant(conversationId, userId);
    if (!isParticipant) {
      res.status(403).json({ error: 'Not a participant in this conversation' });
      return;
    }

    const newMessage = await chatModel.createMessage({
      message,
      sender_id: userId,
      conversation_id: conversationId
    });

    if (!newMessage) {
      res.status(500).json({ error: 'Failed to send message' });
      return;
    }

    res.status(201).json(newMessage);
    return;
  } catch (error) {
    console.error('Error in sendMessage:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export const editMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId, messageId } = req.params;
    const { message: newContent } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!newContent || typeof newContent !== 'string') {
      res.status(400).json({ error: 'Invalid message content' });
      return;
    }

    const [existingMessage, isParticipant] = await Promise.all([
      chatModel.getMessage(messageId),
      chatModel.isConversationParticipant(conversationId, userId)
    ]);

    if (!existingMessage) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }

    if (!isParticipant) {
      res.status(403).json({ error: 'Not a participant in this conversation' });
      return;
    }

    if (existingMessage.sender_id !== userId) {
      res.status(403).json({ error: 'Not authorized to edit this message' });
      return;
    }

    const updatedMessage = await chatModel.updateMessage(messageId, {
      message: newContent
    });

    if (!updatedMessage) {
      res.status(500).json({ error: 'Failed to update message' });
      return;
    }

    res.status(200).json(updatedMessage);
    return;
  } catch (error) {
    console.error('Error in editMessage:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId, messageId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const [existingMessage, participant] = await Promise.all([
      chatModel.getMessage(messageId),
      chatModel.getConversationParticipant(conversationId, userId)
    ]);

    if (!existingMessage) {
      res.status(404).json({ error: 'Message not found' });
      return;
    }

    if (!participant) {
      res.status(403).json({ error: 'Not a participant in this conversation' });
      return;
    }

    if (existingMessage.sender_id !== userId && participant.role !== 'ADMIN') {
      res.status(403).json({ error: 'Not authorized to delete this message' });
      return;
    }

    const success = await chatModel.deleteMessage(messageId);
    if (!success) {
      res.status(500).json({ error: 'Failed to delete message' });
      return;
    }

    res.status(200).json({ success: true });
    return;
  } catch (error) {
    console.error('Error in deleteMessage:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};
