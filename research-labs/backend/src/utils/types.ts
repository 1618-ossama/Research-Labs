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
