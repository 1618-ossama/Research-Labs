import dotenv from 'dotenv';
import path from 'path';

const envPathFile = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPathFile });

interface pool_db {
  user: string | undefined,
  host: string | undefined,
  database: string | undefined,
  password: string | undefined,
  port: number | undefined,
}

interface chatConfig {
  env: NodeJS.ProcessEnv;
  port: number;
  jwt_key: string;
  db: pool_db;
}

const config: chatConfig = {
  env: process.env,
  port: parseInt(process.env.PORT || '3007', 10),
  jwt_key: process.env.JWT_SECRET || 'key_key',
  db: {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT || '5432', 10)
  }
}

export default config;
