import config from '../config/config';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

const TOKEN_NAME = "AccessTokenCookie";

export const isAuthenticated: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies?.[TOKEN_NAME];
    if (!token) {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: 'Authorization token required' });
        return;
      }
      token = authHeader.substring(7);
    }
    if (!config.auth.jwtSecret) {
      console.error('JWT_SECRET not configured');
      res.status(500).json({ error: 'Server configuration error' });
      return;
    }

    // const payload = jwt.verify(token, config.auth.jwtSecret) as any;
    const payload = jwt.verify(token, "access") as any;

    req.user = {
      userId: payload.userId,
      role: payload.role || 'GUEST'
    };
    console.log('middleware env secret key');

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
    return;
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  if (req.user.role !== 'ADMIN') {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }

  next();
};

export const isLeader = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  if (!['ADMIN', 'LEADER'].includes(req.user.role)) {
    res.status(403).json({ error: 'Leader access required' });
    return;
  }

  next();
};

