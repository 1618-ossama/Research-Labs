import { NextFunction, Request, Response } from "express";
import jwt, {
  JsonWebTokenError,
  Secret,
  SignOptions,
  TokenExpiredError,
} from "jsonwebtoken";
import config from "../config/config";
import {
  type CookieOptions,
  Role,
  type TokenPayload,
  User,
} from "../utils/types";
import * as errorHandler from "../utils/errorHandler";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

/**
 * Generates a JWT token
 * @param payload - Data to include in the token
 * @returns Signed JWT token
 */
const generateToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: parseInt(config.jwtExpiresIn),
  };
  return jwt.sign(payload, config.jwtSecret as Secret, options);
};

const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, config.jwtSecret) as TokenPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new errorHandler.InvalidTokenError("Token has expired");
    } else if (error instanceof JsonWebTokenError) {
      throw new errorHandler.InvalidTokenError("Invalid token");
    }
    throw error;
  }
};

/**
 * Sets authentication cookies in the response
 * @param res - Express response object
 * @param accessToken - JWT token to set in cookies
 */
const cookie_name = "AuthToken";
const setAuthCookies = (res: Response, accessToken: string): void => {
  res.cookie(cookie_name, accessToken, {
    httpOnly: true,
    secure: false, // temporary option
    maxAge: parseInt(config.jwtExpiresIn) * 1000,
  } as CookieOptions);
};

const clearAuthCookie = (res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
  });
};

/**
 * Middleware to authenticate the request
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.[cookie_name];

  if (!token) {
    return next(new errorHandler.UnauthorizedError("No token provided"));
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return next(err);
  }
};

/**
 * Middleware to authorize the request based on roles
 * @param allowedRoles - Array of roles allowed to access the route
 * @returns Middleware function
 */
const authorize = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new errorHandler.UnauthorizedError("Unauthorized"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new errorHandler.UnauthorizedError("Insufficient permissions"),
      );
    }
    next();
  };
};

export {
  authenticate,
  authorize,
  clearAuthCookie,
  generateToken,
  setAuthCookies,
  verifyToken,
};
