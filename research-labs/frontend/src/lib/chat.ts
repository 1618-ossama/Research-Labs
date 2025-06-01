export type Role = 'ADMIN' | 'RESEARCHER' | 'LEADER' | 'GUEST';
export type ConversationType = 'DIRECT' | 'GROUP';
export type MessageStatus = 'SENT' | 'DELIVERED' | 'READ' | 'ARCHIVED';
export type GroupStatus = 'ONGOING' | 'SUSPENDED' | 'FINISHED' | 'DELETED';
export type ParticipantRole = 'MEMBER' | 'ADMIN' | 'READ_ONLY';
export type UserStatus = 'online' | 'offline';


export type User = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  first_name?: string | null;
  last_name?: string | null;
  bio?: string | null;
  photo_url?: string | null;
  role: Role;
  status?: UserStatus | null;
  affiliation?: string | null;
  created_at: Date;
  updated_at?: Date | null;
};

export type Conversation = {
  id: string;
  group_id?: string | null;
  conversation_type: ConversationType;
  created_at: Date;
  updated_at: Date;
  last_message?: string;
  unread_count?: number;
  participants?: ConversationParticipant[];
};

export type ConversationParticipant = {
  conversation_id: string;
  user_id: string;
  role: ParticipantRole;
  created_at: Date;
};

export type Message = {
  id: string;
  message: string;
  created_at: Date;
  updated_at?: Date;
  status: MessageStatus;
  sender_id: string;
  conversation_id: string;
  pending?: boolean;
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
  status: GroupStatus;
  created_at: Date;
  leader_id: string;
};


export interface ApiResponse<T> {
  data?: T;
  success?: boolean;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    has_more?: boolean;
  };
}


export type ClientToServerMessageType =
  | 'ping'
  | 'presence'
  | 'typing'
  | 'chat:send_message'
  | 'chat:edit_message'
  | 'chat:delete_message';

export type ServerToClientMessageType =
  | 'chat:new_message'
  | 'chat:message_sent'
  | 'chat:edit_message'
  | 'chat:delete_message'
  | 'typing'
  | 'presence'
  | 'pong';

export interface PingPayload {
  timestamp: string;
}

export interface PongPayload {
  timestamp?: string;
  serverTime?: string;
}

export interface PresencePayload {
  userId: string;
  status: UserStatus;
}

export interface TypingPayload {
  conversationId: string;
  userId: string;
  userName: string;
  isTyping: boolean;
}

export interface SendMessagePayload {
  conversationId: string;
  text: string;
  tempId: string;
}

export interface MessageSentPayload {
  message: Message;
  tempId: string;
}

export interface EditMessagePayload {
  conversationId: string;
  messageId: string;
  newText: string;
}

export interface DeleteMessagePayload {
  conversationId: string;
  messageId: string;
}

export type S2CWebSocketMessage =
  | { type: 'chat:new_message'; payload: Message }
  | { type: 'chat:message_sent'; payload: MessageSentPayload }
  | { type: 'chat:edit_message'; payload: EditMessagePayload }
  | { type: 'chat:delete_message'; payload: DeleteMessagePayload }
  | { type: 'typing'; payload: TypingPayload }
  | { type: 'presence'; payload: PresencePayload }
  | { type: 'pong'; payload: PongPayload };

interface C2SMessageBase {
  timestamp: string;
}

export type C2SWebSocketMessage =
  | (C2SMessageBase & { type: 'ping'; payload: PingPayload })
  | (C2SMessageBase & { type: 'presence'; payload: PresencePayload })
  | (C2SMessageBase & { type: 'typing'; payload: TypingPayload })
  | (C2SMessageBase & { type: 'chat:send_message'; payload: SendMessagePayload })
  | (C2SMessageBase & { type: 'chat:edit_message'; payload: EditMessagePayload })
  | (C2SMessageBase & { type: 'chat:delete_message'; payload: DeleteMessagePayload });


export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface CreateConversationRequest {
  group_id?: string;
  conversation_type: ConversationType;
  participantIds: string[];
}

export interface ConversationResponse {
  id: string;
  group_id?: string | null;
  conversation_type: ConversationType;
  created_at: string;
  updated_at: string;
}

export interface ListConversationsResponse {
  data: Array<{
    id: string;
    last_message: string;
    unread_count: number;
  }>;
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface ConversationDetailsResponse {
  id: string;
  group_id?: string | null;
  conversation_type: ConversationType;
  participants: Array<{
    user_id: string;
    role: ParticipantRole;
  }>;
}

export interface SendMessageRequest {
  message: string;
}

export interface UpdateGroupDetailsRequest {
  title: string;
  description: string;
}

export interface GroupDetailsResponse {
  id: string;
  title: string;
  description: string;
  status: GroupStatus;
  created_at: string;
  leader_id: string;
}

export interface AddGroupMembersRequest {
  userIds: string[];
}

export interface UpdateMemberRoleRequest {
  role: ParticipantRole;
}
