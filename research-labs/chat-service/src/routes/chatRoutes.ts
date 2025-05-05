import express from 'express';

const chatRoutes = express.Router();

chatRoutes.get('/messages') // Filter by params/query
chatRoutes.get('/messages/:messageId') // Get specific message
chatRoutes.post('/messages') // Send new message
chatRoutes.put('/messages/:messageId/read') // Mark as read
chatRoutes.put('/messages/:messageId/delete') // Soft delete
chatRoutes.put('/messages/:messageId/recover') // Recover deleted message
chatRoutes.put('/messages/:messageId') // Edit message content

chatRoutes.get('/conversations/:userId') // Get user conversations
chatRoutes.get('/conversations/:userId/:otherUserId') // Get specific conversation
chatRoutes.delete('/conversations/:conversationId') // Archive conversation

chatRoutes.post('/groups') // Create new group
chatRoutes.get('/groups/:id') // Get group info 
chatRoutes.put('/groups/:id') // Update group info
chatRoutes.delete('/groups/:id') // Delete group
chatRoutes.get('/groups') // Get all groups (admin)
chatRoutes.post('/groups/:groupId/members') // Add member
chatRoutes.delete('/groups/:groupId/members/:userId') // Remove member
chatRoutes.get('/groups/:groupId/members') // List members
chatRoutes.put('/groups/:groupId/members/:userId/role') // Change member role
chatRoutes.post('/groups/:groupId/avatar') // Upload group avatar
chatRoutes.delete('/groups/:groupId/avatar') // Remove group avatar

chatRoutes.post('/typing/:conversationId') // Send typing indicator
chatRoutes.get('/presence/:userId') // Get user presence status
chatRoutes.put('/presence') // Update own presence

chatRoutes.post('/attachments/upload') // Initiate file upload
chatRoutes.get('/attachments/:fileId') // Get file metadata
chatRoutes.delete('/attachments/:fileId') // Delete attachment

chatRoutes.post('/reports') // Report message/user
chatRoutes.put('/conversations/:conversationId/mute') // Mute conversation
chatRoutes.put('/conversations/:conversationId/block') // Block user in conversation
chatRoutes.get('/moderation/reports') // Get reports (admin)

chatRoutes.post('/ws/token') // Generate connection token
chatRoutes.get('/ws/connections') // List active connections (admin)

chatRoutes.get('/search/messages') // Search across messages
chatRoutes.get('/search/conversations') // Search conversations
chatRoutes.get('/search/groups') // Discover public groups

export default chatRoutes;
