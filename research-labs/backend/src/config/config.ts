import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

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
  jwtSecret: string;
  jwtExpiresIn: string;
  saltRounds: number;
  email: EmailConfig;
  rateLimit: number;
}

/*
const requiredEnvVars = ['JWT_SECRET', 'EMAIL_HOST', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});
*/

const config: AppConfig = {
  env: process.env,
  port: parseInt(process.env.PORT || '3000'),
  jwtSecret: process.env.JWT_SECRET as string || "hello",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  saltRounds: parseInt(process.env.SALTROUNDS || '10'),
  email: {
    host: process.env.EMAIL_HOST as string,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string,
    from: process.env.EMAIL_FROM as string
  },
  rateLimit: parseInt(process.env.RATE_LIMIT || '100'),
};

export default config;
