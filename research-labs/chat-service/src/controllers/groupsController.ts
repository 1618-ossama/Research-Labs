import { Request, Response } from 'express';

// Mock database
const groupsDB: any[] = [];

export const createGroup = (req: Request, res: Response) => {
  const group = { ...req.body, id: Date.now().toString() };
  groupsDB.push(group);
  res.status(201).json(group);
};

export const getGroupInfo = (req: Request, res: Response) => {
  const { id } = req.params;
  const group = groupsDB.find(g => g.id === id);
  res.json(group || {});
};

export const updateGroupInfo = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = groupsDB.findIndex(g => g.id === id);
  if (index >= 0) {
    groupsDB[index] = { ...groupsDB[index], ...req.body };
    res.json(groupsDB[index]);
  } else {
    res.status(404).json({ error: 'Group not found' });
  }
};

export const deleteGroup = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = groupsDB.findIndex(g => g.id === id);
  if (index >= 0) {
    groupsDB.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Group not found' });
  }
};

export const getAllGroups = (req: Request, res: Response) => {
  res.json(groupsDB);
};

export const addGroupMember = (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { userId } = req.body;
  const group = groupsDB.find(g => g.id === groupId);
  if (group) {
    group.members = [...(group.members || []), userId];
    res.json(group);
  } else {
    res.status(404).json({ error: 'Group not found' });
  }
};

export const removeGroupMember = (req: Request, res: Response) => {
  const { groupId, userId } = req.params;
  const group = groupsDB.find(g => g.id === groupId);
  if (group) {
    group.members = (group.members || []).filter((m: string) => m !== userId);
    res.json(group);
  } else {
    res.status(404).json({ error: 'Group not found' });
  }
};

export const listGroupMembers = (req: Request, res: Response) => {
  const { groupId } = req.params;
  const group = groupsDB.find(g => g.id === groupId);
  res.json(group?.members || []);
};

export const changeGroupMemberRole = (req: Request, res: Response) => {
  const { groupId, userId } = req.params;
  const { role } = req.body;
  const group = groupsDB.find(g => g.id === groupId);
  if (group) {
    group.memberRoles = { ...group.memberRoles, [userId]: role };
    res.json(group);
  } else {
    res.status(404).json({ error: 'Group not found' });
  }
};

export const uploadGroupAvatar = (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { avatarUrl } = req.body;
  const group = groupsDB.find(g => g.id === groupId);
  if (group) {
    group.avatar = avatarUrl;
    res.json(group);
  } else {
    res.status(404).json({ error: 'Group not found' });
  }
};

export const removeGroupAvatar = (req: Request, res: Response) => {
  const { groupId } = req.params;
  const group = groupsDB.find(g => g.id === groupId);
  if (group) {
    delete group.avatar;
    res.json(group);
  } else {
    res.status(404).json({ error: 'Group not found' });
  }
};

export const searchGroups = (req: Request, res: Response) => {
  const { query } = req.query;
  const results = groupsDB.filter(g =>
    g.name.includes(query) ||
    g.description?.includes(query)
  );
  res.json(results);
};
