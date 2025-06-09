import { Group, GroupMember } from '../utils/types';
import { prisma, safeDbOperation } from './db';
import { v4 as uuidv4 } from 'uuid';
import errorHandler from '../utils/errorHandler';

async function createGroup(groupData: Group, leaderId: string): Promise<string> {
  return safeDbOperation(async () => {
    const requiredFields = ['title', 'description'] as const;
    requiredFields.forEach((field) => {
      if (!groupData[field]) {
        throw new errorHandler.ValidationError('Missing required fields', [field]);
      }
    });

    const newGroup = await prisma.groups.create({
      data: {
        id: uuidv4(),
        title: groupData.title,
        description: groupData.description,
        leader_id: leaderId,
        status: 'ONGOINING'
      },
    });

    // Add leader to group_user table
    await prisma.group_user.create({
      data: {
        user_id: leaderId,
        group_id: newGroup.id,
      },
    });

    // Create group conversation
    const conversation = await prisma.conversations.create({
      data: {
        id: uuidv4(),
        group_id: newGroup.id,
        conversation_type: 'GROUP',
      },
    });

    // Add leader as admin to conversation
    await prisma.conversation_participants.create({
      data: {
        conversation_id: conversation.id,
        user_id: leaderId,
        role: 'ADMIN',
      },
    });

    return newGroup.id;
  });
}

async function getGroupById(groupId: string): Promise<Group | null> {
  return safeDbOperation(async () => {
    const group = await prisma.groups.findUnique({
      where: { id: groupId },
      include: {
        group_user: {
          include: {
            users: {
              select: {
                id: true,
                username: true,
                first_name: true,
                last_name: true,
                email: true,
                role: true,
                photo_url: true,
              },
            },
          },
        },
        users: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
      },
    });

    if (!group) return null;

    return {
      id: group.id,
      title: group.title,
      description: group.description,
      status: group.status,
      created_at: group.created_at,
      updated_at: group.updated_at,
      leader_id: group.leader_id,
      leader: group.users,
      members: group.group_user.map(gu => ({
        ...gu.users,
        joined_at: gu.created_at,
      })),
    } as Group;
  });
}

async function getAllGroups(userId?: string): Promise<Group[]> {
  return safeDbOperation(async () => {
    const whereClause = userId
      ? {
        group_user: {
          some: {
            user_id: userId,
          },
        },
      }
      : {};

    const groups = await prisma.groups.findMany({
      where: {
        status: {
          not: 'DELETED',
        },
        ...whereClause,
      },
      include: {
        group_user: {
          include: {
            users: {
              select: {
                id: true,
                username: true,
                first_name: true,
                last_name: true,
                photo_url: true,
              },
            },
          },
        },
        users: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return groups.map(group => ({
      id: group.id,
      title: group.title,
      description: group.description,
      status: group.status,
      created_at: group.created_at,
      updated_at: group.updated_at,
      leader_id: group.leader_id,
      leader: group.users,
      members: group.group_user.map(gu => ({
        ...gu.users,
        joined_at: gu.created_at,
      })),
    })) as Group[];
  });
}

async function updateGroup(groupId: string, groupData: Partial<Group>): Promise<string> {
  return safeDbOperation(async () => {
    if (!groupData || Object.keys(groupData).length === 0) {
      throw new errorHandler.ValidationError('No data to update');
    }

    const updatedGroup = await prisma.groups.update({
      where: { id: groupId },
      data: {
        ...(groupData.title && { title: groupData.title }),
        ...(groupData.description && { description: groupData.description }),
        ...(groupData.status && { status: groupData.status }),
      },
    });

    return updatedGroup.id;
  });
}

async function deleteGroup(groupId: string): Promise<boolean> {
  return safeDbOperation(async () => {
    // Soft delete by setting status to DELETED
    await prisma.groups.update({
      where: { id: groupId },
      data: { status: 'DELETED' },
    });

    return true;
  });
}

async function addUserToGroup(groupId: string, userId: string): Promise<boolean> {
  return safeDbOperation(async () => {
    // Check if user is already a member
    const existingMember = await prisma.group_user.findUnique({
      where: {
        user_id_group_id: {
          user_id: userId,
          group_id: groupId,
        },
      },
    });

    if (existingMember) {
      throw new errorHandler.ValidationError('User is already a member of this group');
    }

    // Add user to group
    await prisma.group_user.create({
      data: {
        user_id: userId,
        group_id: groupId,
      },
    });

    return true;
  });
}

async function removeUserFromGroup(groupId: string, userId: string): Promise<boolean> {
  return safeDbOperation(async () => {
    // Check if user is the group leader
    const group = await prisma.groups.findUnique({
      where: { id: groupId },
      select: { leader_id: true },
    });

    if (group?.leader_id === userId) {
      throw new errorHandler.ValidationError('Group leader cannot be removed from the group');
    }

    await prisma.group_user.delete({
      where: {
        user_id_group_id: {
          user_id: userId,
          group_id: groupId,
        },
      },
    });

    return true;
  });
}

async function getUserGroups(userId: string): Promise<Group[]> {
  return safeDbOperation(async () => {
    const userGroups = await prisma.group_user.findMany({
      where: { user_id: userId },
      include: {
        groups: {
          include: {
            users: {
              select: {
                id: true,
                username: true,
                first_name: true,
                last_name: true,
              },
            },
            group_user: {
              include: {
                users: {
                  select: {
                    id: true,
                    username: true,
                    first_name: true,
                    last_name: true,
                    photo_url: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return userGroups
      .filter(ug => ug.groups.status !== 'DELETED')
      .map(ug => ({
        id: ug.groups.id,
        title: ug.groups.title,
        description: ug.groups.description,
        status: ug.groups.status,
        created_at: ug.groups.created_at,
        updated_at: ug.groups.updated_at,
        leader_id: ug.groups.leader_id,
        leader: ug.groups.users,
        members: ug.groups.group_user.map(gu => ({
          ...gu.users,
          joined_at: gu.created_at,
        })),
      })) as Group[];
  });
}

async function isUserInGroup(groupId: string, userId: string): Promise<boolean> {
  return safeDbOperation(async () => {
    const membership = await prisma.group_user.findUnique({
      where: {
        user_id_group_id: {
          user_id: userId,
          group_id: groupId,
        },
      },
    });

    return !!membership;
  });
}

async function isGroupLeader(groupId: string, userId: string): Promise<boolean> {
  return safeDbOperation(async () => {
    const group = await prisma.groups.findUnique({
      where: { id: groupId },
      select: { leader_id: true },
    });

    return group?.leader_id === userId;
  });
}

async function getGroupMembers(groupId: string): Promise<GroupMember[]> {
  return safeDbOperation(async () => {
    const members = await prisma.group_user.findMany({
      where: { group_id: groupId },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            first_name: true,
            last_name: true,
            email: true,
            role: true,
            photo_url: true,
            affiliation: true,
          },
        },
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    return members.map(member => ({
      ...member.users,
      joined_at: member.created_at,
    })) as GroupMember[];
  });
}

async function countGroups(): Promise<number> {
  return safeDbOperation(async () => {
    return await prisma.groups.count({
      where: {
        status: {
          not: 'DELETED',
        },
      },
    });
  });
}

export {
  createGroup,
  getGroupById,
  getAllGroups,
  updateGroup,
  deleteGroup,
  addUserToGroup,
  removeUserFromGroup,
  getUserGroups,
  isUserInGroup,
  isGroupLeader,
  getGroupMembers,
  countGroups,
};
