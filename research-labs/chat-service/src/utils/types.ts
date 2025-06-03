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

export type Conversation = {
  id: string;
  group_id?: string | null;
  conversation_type: 'DIRECT' | 'GROUP';
  created_at: Date;
  updated_at: Date;
};

export type ConversationParticipant = {
  conversation_id: string;
  user_id: string;
  role?: 'MEMBER' | 'ADMIN' | 'READ_ONLY';
  created_at: Date;
};

export type Message = {
  id: string;
  message: string;
  created_at: Date;
  status: 'SENT' | 'DELIVERED' | 'READ' | 'ARCHIVED';
  sender_id: string;
  conversation_id: string;
  updated_at?: Date;
};

export type Notification = {
  id: string;
  message: string;
  created_at: Date;
  read_status: boolean;
  user_id: string;
};

export type Group = {
  id: string;
  title: string;
  description: string;
  status: 'ONGOINING' | 'SUSPENDED' | 'FINISHED' | 'DELETED';
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


export type TokenPayload = {
  userId: string;
  username: string;
  role: Role;
};

