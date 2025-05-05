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

export type Conference = {
  id: string;
  name: string;
  description: string;
  location: string;
  start_date: Date;
  end_date: Date;
};

export type GroupUser = {
  user_id: string;
  group_id: string;
  created_at: Date;
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

export type Link = {
  id: string;
  type?: string | null;
  link?: string | null;
  user_id: string;
};

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

export type PublicationFile = {
  id: string;
  file_type: string;
  file_path: string;
  publication_id: string;
};

export type Publication = {
  id: string;
  title: string;
  journal: string;
  status: string;
  visibility: string;
  submitter_id: string;
  conference_id?: string | null;
  submitted_at: Date;
};

export type Speaker = {
  id: number;
  user_id: string;
  conference_id: string;
  affiliation?: string | null;
  title?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  conferences: Conference;
  users: User;
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
