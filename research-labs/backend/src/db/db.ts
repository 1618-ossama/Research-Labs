import { Prisma, PrismaClient } from './prisma/client';
import * as bcrypt from 'bcrypt';
import config from '../config/config';
import { type User } from '../utils/types';
import errorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log('Connected to database'))
  .catch(err => {
    console.error('Database connection failed:', err);
    throw new errorHandler.DatabaseError('Database connection failed');
  });

function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2000':
        throw new errorHandler.ValidationError('Data too long');
      case 'P2001':
      case 'P2025':
        throw new errorHandler.NotFoundError('Record not found');
      case 'P2002':
        throw new errorHandler.ValidationError(`Username or email already exists`);
      default:
        throw new errorHandler.DatabaseError('Database operation failed');
    }
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new errorHandler.ValidationError('Invalid data format');
  }
  throw new errorHandler.ApplicationError('Unexpected error');
}

async function createUser(user_data: User): Promise<string> {
    console.log(user_data);
  try {
    if (!user_data.username || !user_data.email || !user_data.password_hash) {
      throw new errorHandler.ValidationError('Missing required fields');
    }

    console.log(user_data);
    const hashedPassword = await bcrypt.hash(user_data.password_hash, config.saltRounds);

    const newUser = await prisma.users.create({
      data: {
        ...user_data,
        password_hash: hashedPassword,
      },
    });

    return newUser.id as string;
  } catch (error) {
    handlePrismaError(error);
  }
}

async function getUserById(id: string): Promise<User | null> {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id
      },
    });
    return user as User;
  } catch (error) {
    handlePrismaError(error);
  }
}

async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.users.findUnique({
      where: {
        email
      },
    }) as User;
  } catch (error) {
    handlePrismaError(error);
  }
}

async function updateUser(userId: string, user_data: Partial<User>): Promise<string | undefined> {
  try {
    if (!user_data) {
      throw new errorHandler.ValidationError('No data to update');
    }

    if (user_data.password_hash) {
      const hashedPassword = await bcrypt.hash(user_data.password_hash, config.saltRounds);
      user_data.password_hash = hashedPassword;
    }

    const updatedUser = await prisma.users.update({
      where: {
        id: userId,
      },
      data: user_data,
    });

    return updatedUser.id;
  } catch (error) {
    handlePrismaError(error);
  }
}

async function deleteUser(userId: string): Promise<boolean> {
  try {
    const deletedUser = await prisma.users.delete({
      where: {
        id: userId,
      },
    });

    return true;
  } catch (error) {
    handlePrismaError(error);
  }
}

async function getAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.users.findMany();
    return users as User[];
  } catch (error) {
    handlePrismaError(error);
  }
}

async function verifyUserCredentials(identifier: string, password: string): Promise<User> {
  try {
    const user = await prisma.users.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });

    if (!user) {
      throw new errorHandler.NotFoundError('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new errorHandler.AuthenticationError('Invalid credentials');
    }
    // or use the select prisma option 
    const { password_hash, created_at, updated_at, ...userReturn } = user;
    return userReturn as User;
  } catch (error) {
    handlePrismaError(error);
  }
}

async function userExists(identifier: string): Promise<boolean> {
  try {
    const user = await prisma.users.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      },
      select: { id: true }
    });

    return !!user;
  } catch (error) {
    handlePrismaError(error);
  }
}

async function countUsers(): Promise<number> {
  try {
    return await prisma.users.count();
  } catch (error) {
    handlePrismaError(error);
  }
}

export {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  getAllUsers,
  verifyUserCredentials,
  userExists,
  countUsers
};
