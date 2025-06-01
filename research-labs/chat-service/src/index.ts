import express from 'express';
import { setupWebSocketServer, WebSocketServer } from './websocket';
import { createChatRouter } from './routes/chatRoutes';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

const app = express();

const server = setupWebSocketServer(app, {
  jwtSecret: 'access',
  inactivityTimeout: 180_000,
});

const wsServer = app.get('wsServer') as WebSocketServer;
const OptionsCors: CorsOptions = {
  origin: (origin, callback) => {
    const allowed = ['http://localhost:3000', 'http://127.0.0.1:3000'];

    // Allow requests without origin (e.g., from server or curl)
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(OptionsCors));
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use('/api/chat', createChatRouter());

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
