import { NextFunction, Request, Response } from "express";
import {
  clearAuthCookie,
  generateAuthTokens,
  setAuthCookies,
  verifyToken,
} from "../middleware/authMiddleware";
import * as prisma from '../db/db.ts';
import errorHandler from "../utils/errorHandler";

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password, role, first_name, last_name } = req.body;

    const userExists = await prisma.userExists(username) || await prisma.userExists(email);
    if (userExists) {
      throw new errorHandler.ValidationError("Username or email already exists");
      // redirect to login page
    }

    const userData = {
      username,
      email,
      password_hash: password,
      role: role || "GUEST" as const,
      first_name: first_name || null,
      last_name: last_name || null,
    };

    const userId = await prisma.createUser(userData);

    const user = await prisma.getUserById(userId);
    if (!user) {
      throw new errorHandler.InternalServerError('Retriving User data failed');
    }

    const { accessToken, refreshToken } = generateAuthTokens(userData);

    setAuthCookies(res, accessToken, refreshToken);

    res.status(201).json({
      status: "success",
      data: {
        userId,
        username,
        role: user.role,
        message: "Registration successful",
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      throw new errorHandler.ValidationError("Missing required fields");
    }

    const user = await prisma.verifyUserCredentials(identifier, password);
    if (user.status !== 'ACTIVE') {
      res.status(400).json({
        status: "failed",
        data: {
          userId: user.id,
          username: user.username,
          role: user.role,
          status: user.status,
          message: "Login unsuccessful",
        },
      });
      return;
    }


    const { accessToken, refreshToken } = generateAuthTokens(user);
    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      status: "success",
      data: {
        userId: user.id,
        username: user.username,
        role: user.role,
        message: "Login successful",
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req: Request, res: Response, next: NextFunction): void => {
  try {
    clearAuthCookie(res);
    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const refreshToken = req.cookies?.RefreshTokenCookie;

    if (!refreshToken) {
      throw new errorHandler.InvalidTokenError("Refresh token not found");
    }

    const decoded = verifyToken(refreshToken, "refresh");

    const user = await prisma.getUserById(decoded.userId);
    if (!user) {
      throw new errorHandler.NotFoundError("User not found");
    }

    if (user.status === "INACTIVE") {
      throw new errorHandler.AuthenticationError("User account is inactive");
    }

    const tokens = generateAuthTokens(user);
    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

    res.status(200).json({
      status: "success",
      data: {
        message: "Token refreshed successfully",
      },
    });
  } catch (error) {
    if (error instanceof errorHandler.InvalidTokenError ||
      error instanceof errorHandler.AuthenticationError) {
      clearAuthCookie(res);
    }
    next(error);
  }
};

export default {
  register,
  login,
  logout,
  refreshToken
};
