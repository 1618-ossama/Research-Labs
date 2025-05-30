import { NextFunction, Request, Response } from "express";
import jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  Secret,
  SignOptions,
} from "jsonwebtoken";
import config from "../config/config";
import {
  type CookieOptions,
  type TokenPayload,
  Role,
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

const generateToken = (payload: TokenPayload, type: 'access' | 'refresh' = 'access'): string => {
  const secret = type === 'access' ? config.jwtSecretAccess : config.jwtSecretRefresh;
  const expire = type === 'access' ?
    parseInt(config.jwtExpiresInAccess) * 60 * 60 :
    parseInt(config.jwtExpiresInRefresh) * 24 * 60 * 60;

  const options: SignOptions = {
    expiresIn: expire,
  };
  return jwt.sign(payload, secret as Secret, options);
};

const verifyToken = (token: string, type: 'access' | 'refresh' = 'access'): TokenPayload => {
  const secret = type === 'access' ? config.jwtSecretAccess : config.jwtSecretRefresh;
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new errorHandler.InvalidTokenError(`${type} token has expired`, {
        context: { tokenType: type }
      });
    } else if (error instanceof JsonWebTokenError) {
      throw new errorHandler.InvalidTokenError(`Invalid ${type} token`, {
        context: { tokenType: type }
      });
    }
    throw new errorHandler.InvalidTokenError('Verification of token error.');
  }
};

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string): void => {
  res.cookie("AccessTokenCookie", accessToken, {
    httpOnly: true,
    // secure: true, 
    maxAge: parseInt(config.jwtExpiresInAccess) * 60 * 60 * 1000,
  } as CookieOptions);

  res.cookie("RefreshTokenCookie", refreshToken, {
    httpOnly: true,
    // secure: true, 
    maxAge: parseInt(config.jwtExpiresInRefresh) * 24 * 60 * 60 * 1000,
  } as CookieOptions);
};

const clearAuthCookie = (res: Response): void => {
  res.clearCookie("AccessTokenCookie", {
    httpOnly: true,
    // secure: true,
  });
  res.clearCookie("RefreshTokenCookie", {
    httpOnly: true,
    // secure: true,
    //path: '/api/auth/refresh',
  });

};

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies?.["AccessTokenCookie"];

  if (!token && req.headers.authorization) {
    const [scheme, creds] = req.headers.authorization.split(" ");
    if (scheme === "Bearer") token = creds;
  }

  if (!token) {
    return next(new errorHandler.UnauthorizedError("No token provided"));
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    next(err);
  }
};

const authorize = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new errorHandler.UnauthorizedError("Unauthorized"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new errorHandler.UnauthorizedError("Insufficient permissions", {
          context: {
            requiredRoles: allowedRoles,
            userRole: req.user.role
          }
        }),
      );
    }
    next();
  };
};

const generateAuthTokens = (user: User) => {
  const payload: TokenPayload = {
    userId: user.id as string,
    username: user.username,
    role: user.role,
  };

  return {
    accessToken: generateToken(payload, "access"),
    refreshToken: generateToken(payload, "refresh"),
  };
};

export {
  authenticate,
  authorize,
  clearAuthCookie,
  generateToken,
  setAuthCookies,
  verifyToken,
  generateAuthTokens
};
