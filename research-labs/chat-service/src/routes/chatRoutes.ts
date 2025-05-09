import express from 'express';
import * as messagesController from '../controllers/messagesController';
import * as conversationsController from '../controllers/conversationsController';
import * as groupsController from '../controllers/groupsController';
import * as mediaController from '../controllers/mediaController';
import * as realtimeController from '../controllers/realtimeController';
import * as moderationController from '../controllers/moderationController';

const chatRoutes = express.Router();

chatRoutes.get('/messages', messagesController.getMessages);
chatRoutes.get('/messages/:messageId', messagesController.getMessageById);
chatRoutes.post('/messages', messagesController.createMessage);
chatRoutes.put('/messages/:messageId/read', messagesController.markMessageAsRead);
chatRoutes.put('/messages/:messageId/delete', messagesController.softDeleteMessage);
chatRoutes.put('/messages/:messageId/recover', messagesController.recoverDeletedMessage);
chatRoutes.put('/messages/:messageId', messagesController.editMessage);

chatRoutes.get('/conversations/:userId', conversationsController.getUserConversations);
chatRoutes.get('/conversations/:userId/:otherUserId', conversationsController.getSpecificConversation);
chatRoutes.delete('/conversations/:conversationId', conversationsController.archiveConversation);
chatRoutes.put('/conversations/:conversationId/mute', conversationsController.muteConversation);
chatRoutes.put('/conversations/:conversationId/block', conversationsController.blockUserInConversation);

chatRoutes.post('/groups', groupsController.createGroup);
chatRoutes.get('/groups/:id', groupsController.getGroupInfo);
chatRoutes.put('/groups/:id', groupsController.updateGroupInfo);
chatRoutes.delete('/groups/:id', groupsController.deleteGroup);
chatRoutes.get('/groups', groupsController.getAllGroups);
chatRoutes.post('/groups/:groupId/members', groupsController.addGroupMember);
chatRoutes.delete('/groups/:groupId/members/:userId', groupsController.removeGroupMember);
chatRoutes.get('/groups/:groupId/members', groupsController.listGroupMembers);
chatRoutes.put('/groups/:groupId/members/:userId/role', groupsController.changeGroupMemberRole);
chatRoutes.post('/groups/:groupId/avatar', groupsController.uploadGroupAvatar);
chatRoutes.delete('/groups/:groupId/avatar', groupsController.removeGroupAvatar);

chatRoutes.post('/typing/:conversationId', realtimeController.sendTypingIndicator);
chatRoutes.get('/presence/:userId', realtimeController.getUserPresenceStatus);
chatRoutes.put('/presence', realtimeController.updateOwnPresence);

chatRoutes.post('/attachments/upload', mediaController.initiateFileUpload);
chatRoutes.get('/attachments/:fileId', mediaController.getFileMetadata);
chatRoutes.delete('/attachments/:fileId', mediaController.deleteAttachment);

chatRoutes.post('/reports', moderationController.reportContent);
chatRoutes.get('/moderation/reports', moderationController.getReports);

chatRoutes.post('/ws/token', realtimeController.generateConnectionToken);
chatRoutes.get('/ws/connections', realtimeController.listActiveConnections);

chatRoutes.get('/search/messages', messagesController.searchMessages);
chatRoutes.get('/search/conversations', conversationsController.searchConversations);
chatRoutes.get('/search/groups', groupsController.searchGroups);

export default chatRoutes;
