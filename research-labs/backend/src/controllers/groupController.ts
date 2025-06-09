import { NextFunction, Request, Response } from "express";
import * as prisma from "../db/groupDB.ts";
import * as prisma1 from "../db/db.ts";
import { Group, CreateGroupInput, UpdateGroupInput, AddMemberInput } from "../utils/types";
import * as errorHandler from "../utils/errorHandler";

// add pagination to the get all groups

export default {

  createGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupData: CreateGroupInput = req.body;
      const leaderId = req.user?.userId;

      if (!leaderId) {
        return next(new errorHandler.UnauthorizedError("User not authenticated"));
      }

      const groupId = await prisma.createGroup(groupData as Group, leaderId);

      res.status(201).json({
        success: true,
        message: "Group created successfully",
        data: { groupId }
      });
    } catch (error) {
      next(error);
    }
  },


  getAllGroups: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isAdmin = req.user?.role === 'ADMIN';
      const userId = isAdmin ? undefined : req.user?.userId;

      const groups = await prisma.getAllGroups(userId);

      res.status(200).json({
        success: true,
        count: groups.length,
        data: groups
      });
    } catch (error) {
      next(error);
    }
  },


  getUserGroups: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return next(new errorHandler.UnauthorizedError("User not authenticated"));
      }

      const groups = await prisma.getUserGroups(userId);

      res.status(200).json({
        success: true,
        count: groups.length,
        data: groups
      });
    } catch (error) {
      next(error);
    }
  },


  getGroupById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;
      const isAdmin = req.user?.role === 'ADMIN';

      if (!id) {
        return next(new errorHandler.ValidationError("Group ID is required"));
      }

      const group = await prisma.getGroupById(id);
      if (!group) {
        return next(new errorHandler.NotFoundError(`Group with ID ${id} not found`));
      }


      if (!isAdmin && userId) {
        const isMember = await prisma.isUserInGroup(id, userId);
        if (!isMember) {
          return next(new errorHandler.UnauthorizedError("You don't have access to this group"));
        }
      }

      res.status(200).json({
        success: true,
        data: group
      });
    } catch (error) {
      next(error);
    }
  },


  updateGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const groupData: UpdateGroupInput = req.body;
      const userId = req.user?.userId;
      const isAdmin = req.user?.role === 'ADMIN';

      if (!id) {
        return next(new errorHandler.ValidationError("Group ID is required"));
      }

      if (!userId) {
        return next(new errorHandler.UnauthorizedError("User not authenticated"));
      }


      const group = await prisma.getGroupById(id);
      if (!group) {
        return next(new errorHandler.NotFoundError(`Group with ID ${id} not found`));
      }


      const isLeader = await prisma.isGroupLeader(id, userId);
      if (!isLeader && !isAdmin) {
        return next(new errorHandler.UnauthorizedError("Only group leaders and admins can update groups"));
      }

      const updatedGroupId = await prisma.updateGroup(id, groupData as Partial<Group>);

      res.status(200).json({
        success: true,
        message: "Group updated successfully",
        data: { groupId: updatedGroupId }
      });
    } catch (error) {
      next(error);
    }
  },


  deleteGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;
      const isAdmin = req.user?.role === 'ADMIN';

      if (!id) {
        return next(new errorHandler.ValidationError("Group ID is required"));
      }

      if (!userId) {
        return next(new errorHandler.UnauthorizedError("User not authenticated"));
      }


      const group = await prisma.getGroupById(id);
      if (!group) {
        return next(new errorHandler.NotFoundError(`Group with ID ${id} not found`));
      }


      const isLeader = await prisma.isGroupLeader(id, userId);
      if (!isLeader && !isAdmin) {
        return next(new errorHandler.UnauthorizedError("Only group leaders and admins can delete groups"));
      }

      await prisma.deleteGroup(id);

      res.status(200).json({
        success: true,
        message: "Group deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  },


  addMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { userId: memberUserId }: AddMemberInput = req.body;
      const currentUserId = req.user?.userId;
      const isAdmin = req.user?.role === 'ADMIN';

      if (!id) {
        return next(new errorHandler.ValidationError("Group ID is required"));
      }

      if (!currentUserId) {
        return next(new errorHandler.UnauthorizedError("User not authenticated"));
      }


      const group = await prisma.getGroupById(id);
      if (!group) {
        return next(new errorHandler.NotFoundError(`Group with ID ${id} not found`));
      }


      const isLeader = await prisma.isGroupLeader(id, currentUserId);
      if (!isLeader && !isAdmin) {
        return next(new errorHandler.UnauthorizedError("Only group leaders and admins can add members"));
      }


      const userToAdd = await prisma1.getUserById(memberUserId);
      if (!userToAdd) {
        return next(new errorHandler.NotFoundError(`User with ID ${memberUserId} not found`));
      }

      await prisma.addUserToGroup(id, memberUserId);

      res.status(200).json({
        success: true,
        message: "Member added to group successfully"
      });
    } catch (error) {
      next(error);
    }
  },


  removeMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, userId: memberUserId } = req.params;
      const currentUserId = req.user?.userId;
      const isAdmin = req.user?.role === 'ADMIN';

      if (!id || !memberUserId) {
        return next(new errorHandler.ValidationError("Group ID and User ID are required"));
      }

      if (!currentUserId) {
        return next(new errorHandler.UnauthorizedError("User not authenticated"));
      }


      const group = await prisma.getGroupById(id);
      if (!group) {
        return next(new errorHandler.NotFoundError(`Group with ID ${id} not found`));
      }


      const isLeader = await prisma.isGroupLeader(id, currentUserId);
      const isSelfRemoval = currentUserId === memberUserId;

      if (!isLeader && !isAdmin && !isSelfRemoval) {
        return next(new errorHandler.UnauthorizedError("Insufficient permissions to remove member"));
      }

      await prisma.removeUserFromGroup(id, memberUserId);

      res.status(200).json({
        success: true,
        message: "Member removed from group successfully"
      });
    } catch (error) {
      next(error);
    }
  },


  getGroupMembers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;
      const isAdmin = req.user?.role === 'ADMIN';

      if (!id) {
        return next(new errorHandler.ValidationError("Group ID is required"));
      }


      const group = await prisma.getGroupById(id);
      if (!group) {
        return next(new errorHandler.NotFoundError(`Group with ID ${id} not found`));
      }


      if (!isAdmin && userId) {
        const isMember = await prisma.isUserInGroup(id, userId);
        if (!isMember) {
          return next(new errorHandler.UnauthorizedError("You don't have access to this group"));
        }
      }

      const members = await prisma.getGroupMembers(id);

      res.status(200).json({
        success: true,
        count: members.length,
        data: members
      });
    } catch (error) {
      next(error);
    }
  },


  joinGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      if (!id) {
        return next(new errorHandler.ValidationError("Group ID is required"));
      }

      if (!userId) {
        return next(new errorHandler.UnauthorizedError("User not authenticated"));
      }


      const group = await prisma.getGroupById(id);
      if (!group) {
        return next(new errorHandler.NotFoundError(`Group with ID ${id} not found`));
      }


      if (group.status !== 'ONGOINING') {
        return next(new errorHandler.ValidationError("Cannot join inactive group"));
      }

      await prisma.addUserToGroup(id, userId);

      res.status(200).json({
        success: true,
        message: "Successfully joined the group"
      });
    } catch (error) {
      next(error);
    }
  },


  leaveGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      if (!id) {
        return next(new errorHandler.ValidationError("Group ID is required"));
      }

      if (!userId) {
        return next(new errorHandler.UnauthorizedError("User not authenticated"));
      }


      const group = await prisma.getGroupById(id);
      if (!group) {
        return next(new errorHandler.NotFoundError(`Group with ID ${id} not found`));
      }

      await prisma.removeUserFromGroup(id, userId);

      res.status(200).json({
        success: true,
        message: "Successfully left the group"
      });
    } catch (error) {
      next(error);
    }
  }
};
