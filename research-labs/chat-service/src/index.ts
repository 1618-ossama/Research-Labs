import express from 'express';
import { setupWebSocketServer, WebSocketServer } from './websocket';

const app = express();

const server = setupWebSocketServer(app, {
  jwtSecret: process.env.JWT_SECRET || 'default-secret-for-development',
  inactivityTimeout: 180_000, // 3 mins
});

const wsServer = app.get('wsServer') as WebSocketServer;

wsServer.use((msg, conn, next) => {
  try {
    if (msg.type === 'high_priority') {
      console.log('Received high priority message');
      // priorityQueue.push(msg); // Uncomment when you have a priority queue implementation
    }
    next();
  } catch (error) {
    next(error as Error);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
