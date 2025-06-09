export type TokenPayload = {
  userId: string;
  username: string;
  role: Role;
};

export type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite?: "lax" | "strict" | "none";
  maxAge?: number;
  domain?: string;
};

export type RegisterInput = {
  username: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type UpdateInput = {
  username?: string;
  password?: string;
};

export type Link = {
  id: string;
  type?: string | null;
  link?: string | null;
  user_id: string;
};

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

export type GroupStatus = 'ONGOINING' | 'SUSPENDED' | 'FINISHED' | 'DELETED';

export type Group = {
  id?: string;
  title: string;
  description: string;
  status?: GroupStatus;
  created_at?: Date;
  updated_at?: Date;
  leader_id?: string | null;
  leader?: {
    id: string;
    username: string;
    first_name?: string | null;
    last_name?: string | null;
    email?: string;
  } | null;
  members?: GroupMember[];
};

export type GroupMember = {
  id: string;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string;
  role?: Role;
  photo_url?: string | null;
  affiliation?: string | null;
  joined_at?: Date;
};

export type CreateGroupInput = {
  title: string;
  description: string;
};

export type UpdateGroupInput = {
  title?: string;
  description?: string;
  status?: GroupStatus;
};

export type AddMemberInput = {
  userId: string;
};
