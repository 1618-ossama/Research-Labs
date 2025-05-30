import { Request, Response } from 'express';
import { chatModel } from '../models/chatModel';
import { ConversationParticipant } from '../utils/types';

export const updateGroupDetails = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const updates = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const [conversation, participant] = await Promise.all([
      chatModel.getConversation(conversationId),
      chatModel.getConversationParticipant(conversationId, userId)
    ]);

    if (!conversation || !conversation.group_id) {
      res.status(404).json({ error: 'Group conversation not found' });
      return;
    }

    if (!participant || participant.role !== 'ADMIN') {
      res.status(403).json({ error: 'Not authorized to update group details' });
      return;
    }

    const updatedGroup = await chatModel.updateGroup(conversation.group_id, updates);
    if (!updatedGroup) {
      res.status(500).json({ error: 'Failed to update group details' });
      return;
    }

    res.status(200).json(updatedGroup);
    return;
  } catch (error) {
    console.error('Error in updateGroupDetails:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export const listGroupMembers = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const [conversation, isParticipant] = await Promise.all([
      chatModel.getConversation(conversationId),
      chatModel.isConversationParticipant(conversationId, userId)
    ]);

    if (!conversation || !conversation.group_id) {
      res.status(404).json({ error: 'Group conversation not found' });
      return;
    }

    if (!isParticipant) {
      res.status(403).json({ error: 'Not a participant in this conversation' });
      return;
    }

    const members = await chatModel.getGroupMembers(conversation.group_id);
    res.status(200).json(members);
    return;
  } catch (error) {
    console.error('Error in listGroupMembers:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export const addGroupMembers = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { userIds } = req.body;
    const currentUserId = req.user?.userId;

    if (!currentUserId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!userIds || !Array.isArray(userIds)) {
      res.status(400).json({ error: 'Invalid user IDs' });
      return;
    }

    const [conversation, currentParticipant] = await Promise.all([
      chatModel.getConversation(conversationId),
      chatModel.getConversationParticipant(conversationId, currentUserId)
    ]);

    if (!conversation || !conversation.group_id) {
      res.status(404).json({ error: 'Group conversation not found' });
      return;
    }

    if (!currentParticipant || currentParticipant.role !== 'ADMIN') {
      res.status(403).json({ error: 'Not authorized to add members' });
      return;
    }

    const results = await Promise.all(
      userIds.map(async (userId) => {
        try {
          const [groupUser, participant] = await Promise.all([
            chatModel.addGroupUser({
              user_id: userId,
              group_id: conversation.group_id as string
            }),
            chatModel.addConversationParticipant({
              conversation_id: conversationId,
              user_id: userId,
              role: 'MEMBER'
            })
          ]);
          return { userId, success: !!groupUser && !!participant };
        } catch (error) {
          console.error(`Error adding user ${userId}:`, error);
          return { userId, success: false, error: 'Failed to add user' };
        }
      })
    );

    res.status(200).json(results);
    return;
  } catch (error) {
    console.error('Error in addGroupMembers:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export const removeGroupMember = async (req: Request, res: Response) => {
  try {
    const { conversationId, memberUserId } = req.params;
    const currentUserId = req.user?.userId;

    if (!currentUserId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const [conversation, currentParticipant] = await Promise.all([
      chatModel.getConversation(conversationId),
      chatModel.getConversationParticipant(conversationId, currentUserId)
    ]);

    if (!conversation || !conversation.group_id) {
      res.status(404).json({ error: 'Group conversation not found' });
      return;
    }

    const isAdmin = currentParticipant?.role === 'ADMIN';
    const isSelf = currentUserId === memberUserId;

    if (!isAdmin && !isSelf) {
      res.status(403).json({ error: 'Not authorized to remove this member' });
      return;
    }

    // Prevent admin from removing themselves if they're the last admin
    if (isAdmin && isSelf) {
      const admins = (await chatModel.getConversationParticipants(conversationId))
        .filter(p => p.role === 'ADMIN');

      if (admins.length <= 1) {
        res.status(400).json({ error: 'Cannot remove the last admin' });
        return;
      }
    }

    const [removedParticipant, removedGroupUser] = await Promise.all([
      chatModel.removeConversationParticipant(conversationId, memberUserId),
      chatModel.removeGroupUser(conversation.group_id as string, memberUserId)
    ]);

    res.status(200).json({
      success: removedParticipant && removedGroupUser
    });
    return;
  } catch (error) {
    console.error('Error in removeGroupMember:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export const updateGroupMemberRole = async (req: Request, res: Response) => {
  try {
    const { conversationId, memberUserId } = req.params;
    const { role } = req.body;
    const currentUserId = req.user?.userId;

    if (!currentUserId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!role || !['MEMBER', 'ADMIN', 'READ_ONLY'].includes(role)) {
      res.status(400).json({ error: 'Invalid role' });
      return;
    }

    const [conversation, currentParticipant] = await Promise.all([
      chatModel.getConversation(conversationId),
      chatModel.getConversationParticipant(conversationId, currentUserId)
    ]);

    if (!conversation) {
      res.status(404).json({ error: 'Conversation not found' });
      return;
    }

    if (!currentParticipant || currentParticipant.role !== 'ADMIN') {
      res.status(403).json({ error: 'Not authorized to update roles' });
      return;
    }

    // Prevent changing own role if last admin
    if (currentUserId === memberUserId && role !== 'ADMIN') {
      const admins = (await chatModel.getConversationParticipants(conversationId))
        .filter(p => p.role === 'ADMIN');

      if (admins.length <= 1) {
        res.status(400).json({ error: 'Cannot change role of the last admin' });
        return;
      }
    }

    const updatedParticipant = await chatModel.updateConversationParticipant(
      conversationId,
      memberUserId,
      { role }
    );

    if (!updatedParticipant) {
      res.status(500).json({ error: 'Failed to update role' });
      return;
    }

    res.status(200).json(updatedParticipant);
    return;
  } catch (error) {
    console.error('Error in updateGroupMemberRole:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};

export const leaveGroup = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const [conversation, participant] = await Promise.all([
      chatModel.getConversation(conversationId),
      chatModel.getConversationParticipant(conversationId, userId)
    ]);

    if (!conversation || !conversation.group_id) {
      res.status(404).json({ error: 'Group conversation not found' });
      return;
    }

    if (!participant) {
      res.status(400).json({ error: 'Not a member of this group' });
      return;
    }

    // Check if user is the last admin
    if (participant.role === 'ADMIN') {
      const admins = (await chatModel.getConversationParticipants(conversationId))
        .filter(p => p.role === 'ADMIN');

      if (admins.length <= 1) {
        res.status(400).json({ error: 'Cannot leave as the last admin' });
        return;
      }
    }

    const [removedParticipant, removedGroupUser] = await Promise.all([
      chatModel.removeConversationParticipant(conversationId, userId),
      chatModel.removeGroupUser(conversation.group_id, userId)
    ]);

    res.status(200).json({
      success: removedParticipant && removedGroupUser
    });
    return;
  } catch (error) {
    console.error('Error in leaveGroup:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};
