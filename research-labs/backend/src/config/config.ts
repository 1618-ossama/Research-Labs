import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}

interface AppConfig {
  env: NodeJS.ProcessEnv;
  port: number;
  jwtSecretAccess: string;
  jwtExpiresInAccess: string;
  jwtSecretRefresh: string;
  jwtExpiresInRefresh: string;
  saltRounds: number;
  email: EmailConfig;
  rateLimit: number;
}

const config: AppConfig = {
  env: process.env,
  port: parseInt(process.env.PORT || '3005', 10),
  jwtSecretAccess: process.env.JWT_SECRET as string || "access",
  jwtExpiresInAccess: process.env.JWT_EXPIRES_IN_ACCESS || '1h',
  jwtSecretRefresh: process.env.JWT_SECRET_REFRESH as string || 'refresh',
  jwtExpiresInRefresh: process.env.JWT_EXPIRES_IN_REFRESH || '7d',
  saltRounds: parseInt(process.env.SALTROUNDS || '10', 10),
  email: {
    host: process.env.EMAIL_HOST as string,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string,
    from: process.env.EMAIL_FROM as string
  },
  rateLimit: parseInt(process.env.RATE_LIMIT || '100', 10),
};

export default config;
