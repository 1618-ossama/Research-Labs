import express, { RequestHandler, Router } from 'express';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware';
import * as conversationController from '../controllers/conversationController';
import * as messageController from '../controllers/messageController';
import * as groupController from '../controllers/groupController';
import * as notificationController from '../controllers/notificationController';

export function createChatRouter(): Router {
  const router = Router();
  router.use(isAuthenticated);

  router.post('/conversations', conversationController.createConversation);
  router.get('/conversations', conversationController.listConversations);
  router.get('/conversations/:conversationId', conversationController.getConversationDetails);
  router.post('/conversations/:conversationId/read', conversationController.markConversationAsRead);

  router.get('/conversations/:conversationId/messages', messageController.getMessages);
  router.post('/conversations/:conversationId/messages', messageController.sendMessage);
  router.put('/conversations/:conversationId/messages/:messageId', messageController.editMessage);
  router.delete('/conversations/:conversationId/messages/:messageId', messageController.deleteMessage);

  router.put('/conversations/:conversationId/group-details', isAdmin, groupController.updateGroupDetails);
  router.get('/conversations/:conversationId/members', groupController.listGroupMembers);
  router.post('/conversations/:conversationId/members', isAdmin, groupController.addGroupMembers);
  router.delete('/conversations/:conversationId/members/:memberUserId', groupController.removeGroupMember);
  router.put('/conversations/:conversationId/members/:memberUserId/role', isAdmin, groupController.updateGroupMemberRole);
  router.post('/conversations/:conversationId/leave', groupController.leaveGroup);

  router.get('/notifications', notificationController.getNotifications);
  router.post('/notifications/mark-all-read', notificationController.markAllNotificationsAsRead);
  router.post('/notifications/:notificationId/mark-read', notificationController.markNotificationAsRead);

  return router;
}
