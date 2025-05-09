import pool from '../db';
import { Message, Group, GroupUser } from '@/utils/types';

async function safeOpDB<T>(operation: () => Promise<T>): Promise<T | undefined> {
  try {
    return await operation();
  } catch (error) {
    console.error("safeOpDB Error : ", error);
  }
}

export const createMessage = safeOpDB(() => {
  pool.query('');
})
