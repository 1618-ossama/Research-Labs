import { Prisma, PrismaClient } from './prisma/client';
import * as bcrypt from 'bcrypt';
import config from '../config/config';
import { type User } from '../utils/types';
import errorHandler from '../utils/errorHandler';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
const RETRY = 5;
const DELAY = 5000;

async function connectDB(left_try: number = RETRY, attemps: number = 1): Promise<boolean> {
  try {
    await prisma.$connect();
    console.log('Connected to database');
    return true;
  } catch (error) {
    console.log(`Attemp ${attemps} failed : `, error);
    if (left_try > 0) {
      console.log(`Retry attemps after ${DELAY / 1000} seconds... , [${left_try - 1} attemp left...]`);
      await new Promise(resolve => { setTimeout(resolve, DELAY) });
      return connectDB(left_try - 1, attemps + 1);
    } else {
      console.log(`Max attemps number reached , Unable to connect to DB`);
      process.exitCode = 1;
      return false;
    }
  }
}

connectDB()
  .then(success => {
    if (!success) {
      console.log("Retry Connection in 5 min");
      setTimeout(() => {
        connectDB();
      }, 5 * 60 * 1000);
    }
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
        throw new errorHandler.DatabaseError('Database operation failed', {
          context: { Context_message: error.message },
        });
    }
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new errorHandler.ValidationError('Invalid data format');
  }
  if (error instanceof errorHandler.ApplicationError) {
    throw error;
  }
  throw new errorHandler.ApplicationError('Unexpected error');
}

async function safeDbOperation<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error('Database operation failed [Safe DB error] :', error);
    handlePrismaError(error);
  }
}

async function createUser(user_data: User): Promise<string> {

  console.log("Register payload:", user_data);
  return safeDbOperation(async () => {
    const required_field = ['username', 'email', 'password_hash', 'role'] as const;
    required_field.forEach((element) => {
      if (!user_data[element]) {
        throw new errorHandler.ValidationError('Missing required fields', [element]);
      }
    });


    const hashedPassword = await bcrypt.hash(user_data.password_hash, config.saltRounds);
    const newUser = await prisma.users.create({
      data: {
        ...user_data,
        id: uuidv4(),
        password_hash: hashedPassword,
      },
    });

    return newUser.id as string;
  });
}

async function getUsernameById(id: string): Promise<string | null> {
  return safeDbOperation(async () => {
    const user = await prisma.users.findUnique({
      where: {
        id
      },
      select: { username: true }
    });
    return user?.username as string;
  });
}

async function getIdByUsername(username: string): Promise<string | null> {
  return safeDbOperation(async () => {
    const user = await prisma.users.findUnique({
      where: {
        username
      },
      select: { id: true }
    });
    return user?.id as string;
  });
}

async function getUserById(id: string): Promise<User | null> {
  return safeDbOperation(async () => {
    const user = await prisma.users.findUnique({
      where: {
        id
      },
    });
    return user as User;
  });
}

async function getUserByEmail(email: string): Promise<User | null> {
  return safeDbOperation(async () => {
    return await prisma.users.findUnique({
      where: {
        email
      },
    }) as User;
  });
}

async function updateUser(userId: string, user_data: Partial<User>): Promise<string | undefined> {
  return safeDbOperation(async () => {
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
  });
}

async function deleteUser(userId: string): Promise<boolean> {
  return safeDbOperation(async () => {
    const deletedUser = await prisma.users.delete({
      where: {
        id: userId,
      },
    });

    return true;
  });
}

async function getAllUsers(): Promise<User[]> {
  return safeDbOperation(async () => {
    const users = await prisma.users.findMany();
    return users as User[];
  });
}

async function verifyUserCredentials(identifier: string, password: string): Promise<User> {
  return safeDbOperation(async () => {
    const user = await prisma.users.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });

    if (!user) {
      throw new errorHandler.NotFoundError('User ');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new errorHandler.AuthenticationError('Invalid credentials');
    }
    // or use the select prisma option 
    const { password_hash, created_at, updated_at, ...userReturn } = user;
    return userReturn as User;
  });
}

async function userExists(identifier: string): Promise<boolean> {
  return safeDbOperation(async () => {
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
  });
}

async function countUsers(): Promise<number> {
  return safeDbOperation(async () => {
    return await prisma.users.count();
  });
}

export {
  createUser,
  getUserById,
  getUserByEmail,
  getUsernameById,
  getIdByUsername,
  updateUser,
  deleteUser,
  getAllUsers,
  verifyUserCredentials,
  userExists,
  countUsers
};
