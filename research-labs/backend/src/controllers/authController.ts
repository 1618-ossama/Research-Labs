import { NextFunction, Request, Response } from "express";
import {
  clearAuthCookie,
  generateToken,
  setAuthCookies,
} from "../middleware/authMiddleware";
import { createUser, verifyUserCredentials } from "../db/db.ts";
import errorHandler from "../utils/errorHandler";
import { v1 as uuidv1 } from "uuid";

const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      throw new errorHandler.ValidationError("Missing required fields");
    }

    const id: string = uuidv1();
    const userId = await createUser({
      id,
      username,
      email,
      password_hash: password,
      role,
    });
    console.log(req.body);
    const token = generateToken({ userId: userId as string, username, role });
    setAuthCookies(res, token);

    res.status(201).json({ success: true, userId });
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      throw new errorHandler.ValidationError("Missing required fields");
    }

    const user = await verifyUserCredentials(identifier, password);
    const token = generateToken({
      userId: user.id as string,
      username: user.username,
      role: user.role,
    });
    setAuthCookies(res, token);

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req: Request, res: Response, next: NextFunction): void => {
  try {
    clearAuthCookie(res);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  logout,
};
