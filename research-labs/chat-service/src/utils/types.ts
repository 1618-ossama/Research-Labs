import { WebSocket } from "ws";

export type User = {
  id?: string;
  username: string;
  email: string;
  password_hash: string;
  first_name?: string | null;
  last_name?: string | null;
  bio?: string | null;
  photo_url?: string | null;
  role: Role;
  status?: string | null;
  affiliation?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
};

export type Role = 'ADMIN' | 'RESEARCHER' | 'LEADER' | 'GUEST';

export type Message = {
  id: string;
  message: string;
  created_at?: Date | null;
  status?: string | null;
  sender_id: string;
  receiver_id: string;
};

export type Notification = {
  id: string;
  message: string;
  created_at?: Date | null;
  read_status?: boolean | null;
  user_id: string;
};

export type Group = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: Date;
  leader_id: string;
  publication_id: string;
};

export type GroupUser = {
  user_id: string;
  group_id: string;
  created_at: Date;
};

export interface WebSocketConfig {
  jwtSecret: string;
  heartbeatInterval?: number;
  inactivityTimeout?: number;
  maxConnectionsPerUser?: number;
}

export interface WSMessage {
  type: string;
  payload?: unknown;
}

export interface Connection {
  id: string;
  userId: string;
  socket: WebSocket;
  lastActivity: Date;
}

export type MessageMiddleware = (
  message: WSMessage,
  connection: Connection,
  next: (err?: Error) => void
) => void;


