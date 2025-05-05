import { NextFunction, Request, Response } from "express";
import * as prisma from "../db/db.ts";
import { Role, TokenPayload, User } from "../utils/types";
import * as errorHandler from "../utils/errorHandler";
import { clearAuthCookie } from "../middleware/authMiddleware";

export default {
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) {
        return next(new errorHandler.ValidationError("User ID is required"));
      }

      const isOwnProfile = req.user?.userId === id;
      const isAdmin = req.user?.role === 'ADMIN';

      if (!isOwnProfile && !isAdmin) {
        return next(new errorHandler.UnauthorizedError("You can only view your own profile"));
      }

      const user = await prisma.getUserById(id);
      if (!user) {
        return next(new errorHandler.NotFoundError(`User with ID ${id} not found`));
      }
      const { password_hash, ...userdata } = user as User;

      res.status(200).json({
        success: true,
        data: userdata
      });
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await prisma.getAllUsers();

      const sanitizedUsers = users.map(user => {
        const { password_hash, ...userdata } = user as User;
        return userdata;
      });

      res.status(200).json({
        success: true,
        count: sanitizedUsers.length,
        data: sanitizedUsers
      });
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;

      const userExists = await prisma.userExists(userData.email || userData.username || '');
      if (userExists) {
        return next(new errorHandler.ValidationError("User already exists"));
      }

      const userId = await prisma.createUser(userData);

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: { userId }
      });
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userData: Partial<User> = req.body;

      if (!id) {
        return next(new errorHandler.ValidationError("User ID is required"));
      }

      const isOwnProfile = req.user?.userId === id;
      const isAdmin = req.user?.role === 'ADMIN';
      if (!isOwnProfile && !isAdmin) {
        return next(new errorHandler.UnauthorizedError("You can only update your own profile"));
      }

      const user = await prisma.getUserById(id);
      if (!user) {
        return next(new errorHandler.NotFoundError(`User with ID ${id} not found`));
      }
      const updatedUserId = await prisma.updateUser(id, userData);

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: { userId: updatedUserId }
      });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return next(new errorHandler.ValidationError("User ID is required"));
      }

      const user = await prisma.getUserById(id);
      if (!user) {
        return next(new errorHandler.NotFoundError(`User with ID ${id} not found`));
      }
      await prisma.deleteUser(id);

      res.status(200).json({
        success: true,
        message: "User deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  },

  activeUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return next(new errorHandler.ValidationError("User ID is required"));
      }

      const user = await prisma.getUserById(id);
      if (!user) {
        return next(new errorHandler.NotFoundError(`User with ID ${id} not found`));
      }
      await prisma.updateUser(id, { status: "ACTIVE" });

      res.status(200).json({
        success: true,
        message: "User activated successfully"
      });
    } catch (error) {
      next(error);
    }
  },

  suspendUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return next(new errorHandler.ValidationError("User ID is required"));
      }

      const user = await prisma.getUserById(id);
      if (!user) {
        return next(new errorHandler.NotFoundError(`User with ID ${id} not found`));
      }
      await prisma.updateUser(id, { status: 'SUSPENDED' });

      res.status(200).json({
        success: true,
        message: "User suspended successfully"
      });
    } catch (error) {
      next(error);
    }
  },

  notifyDeleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        return next(new errorHandler.ValidationError("User ID is required"));
      }

      const isOwnProfile = req.user?.userId === id;
      if (!isOwnProfile) {
        return next(new errorHandler.UnauthorizedError("You can only request deletion for your own account"));
      }

      const user = await prisma.getUserById(id);
      if (!user) {
        return next(new errorHandler.NotFoundError(`User with ID ${id} not found`));
      }

      await prisma.updateUser(id, {
        status: 'SUSPENDED'
      });

      clearAuthCookie(res);
      res.status(200).json({
        success: true,
        message: "Account marked for deletion and logged out successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}
