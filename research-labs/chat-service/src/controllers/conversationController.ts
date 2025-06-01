import { Request, Response } from 'express';
import { chatModel } from '../models/chatModel';
import { Conversation, ConversationParticipant } from '../utils/types';

export const createConversation = async (req: Request, res: Response) => {
  try {
    console.log(111111);

    const { group_id = null, conversation_type = 'DIRECT', participantIds } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!conversation_type || (conversation_type === 'GROUP' && !group_id)) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const conversation = await chatModel.createConversation({
      group_id,
      conversation_type
    });

    if (!conversation) {
      res.status(500).json({ error: 'Failed to create conversation' });
      return;
    }

    await chatModel.addConversationParticipant({
      conversation_id: conversation.id,
      user_id: userId,
      role: conversation_type === 'GROUP' ? 'ADMIN' : 'MEMBER'
    });

    if (participantIds) {
      if (!Array.isArray(participantIds)) {
        if (participantIds !== userId) {
          await chatModel.addConversationParticipant({
            conversation_id: conversation.id,
            user_id: participantIds,
            role: 'MEMBER'
          });
        } else {
          for (const participantId of participantIds) {
            if (participantId !== userId) {
              await chatModel.addConversationParticipant({
                conversation_id: conversation.id,
                user_id: participantId,
                role: 'MEMBER'
              });
            }
          }
        }
      }
    }

    res.status(201).json(conversation);
    return;
  } catch (error) {
    console.error('Error in createConversation:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export const listConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { limit = 50, offset = 0 } = req.query;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const conversations = await chatModel.getUserConversations(userId);


    const enhancedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        const lastMessage = await chatModel.getLastConversationMessage(conversation.id);
        const unreadCount = 0;

        return {
          ...conversation,
          last_message: lastMessage,
          unread_count: unreadCount
        };
      })
    );

    res.status(200).json({
      data: enhancedConversations,
      pagination: {
        total: conversations.length,
        limit: Number(limit),
        offset: Number(offset)
      }
    });
    return;
  } catch (error) {
    console.error('Error in listConversations:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export const getConversationDetails = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const [conversation, participants] = await Promise.all([
      chatModel.getConversation(conversationId),
      chatModel.getConversationParticipants(conversationId)
    ]);

    if (!conversation) {
      res.status(404).json({ error: 'Conversation not found' });
      return;
    }

    const isParticipant = participants.some(p => p.user_id === userId);
    if (!isParticipant) {
      res.status(403).json({ error: 'Not a participant in this conversation' });
      return;
    }

    res.status(200).json({
      ...conversation,
      participants
    });
    return;
  } catch (error) {
    console.error('Error in getConversationDetails:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export const markConversationAsRead = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const isParticipant = await chatModel.isConversationParticipant(conversationId, userId);
    if (!isParticipant) {
      res.status(403).json({ error: 'Not a participant in this conversation' });
      return;
    }

    const success = await chatModel.markMessagesAsRead(conversationId, userId);
    res.status(200).json({ success });
    return;
  } catch (error) {
    console.error('Error in markConversationAsRead:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};
