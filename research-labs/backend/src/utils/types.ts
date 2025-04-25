export type Role = "admin" | "none";

export type User = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  role: Role;
};

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
