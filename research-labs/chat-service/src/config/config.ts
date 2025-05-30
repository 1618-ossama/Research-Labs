import dotenv from 'dotenv';
import path from 'path';

const envPathFile = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPathFile });


interface Config {
  server: {
    port: number;
    host: string;
    corsOrigins: string[];
  };
  websocket: {
    jwtSecret: string;
    heartbeatInterval: number;
    inactivityTimeout: number;
    maxConnectionsPerUser: number;
  };
  database: {
    user: string | undefined,
    host: string | undefined,
    database: string | undefined,
    password: string | undefined,
    port: number | undefined,
  };
  database_url: string,
  auth: {
    jwtSecret: string;
    accessTokenExpiry: string;
  };
  logging: {
    level: string;
    format: 'json' | 'text';
  };
  security: {
    rateLimits: {
      api: {
        windowMs: number;
        maxRequests: number;
      };
      websocket: {
        windowMs: number;
        maxMessages: number;
      };
    };
  };
  storage: {
    uploadDir: string;
    maxFileSize: number;
    allowedMimeTypes: string[];
  };
}

const requiredEnvVars = [
  'JWT_SECRET',
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export const config: Config = {
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    host: process.env.HOST || '0.0.0.0',
    corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',')
  },
  websocket: {
    jwtSecret: process.env.JWT_SECRET!,
    heartbeatInterval: parseInt(process.env.WS_HEARTBEAT_INTERVAL || '60000', 10),
    inactivityTimeout: parseInt(process.env.WS_INACTIVITY_TIMEOUT || '300000', 10),
    maxConnectionsPerUser: parseInt(process.env.WS_MAX_CONNECTIONS_PER_USER || '5', 10)
  },
  database: {
    user: process.env.USER1,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT || '5432', 10)
  },
  database_url: process.env.DATABASE_URL || 'postgresql://root:root@localhost:5432/dev-db',
  auth: {
    jwtSecret: process.env.JWT_SECRET!,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '1h',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: (process.env.LOG_FORMAT || 'json') as 'json' | 'text'
  },
  security: {
    rateLimits: {
      api: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
      },
      websocket: {
        windowMs: parseInt(process.env.WS_RATE_LIMIT_WINDOW_MS || '10000', 10),
        maxMessages: parseInt(process.env.WS_RATE_LIMIT_MAX_MESSAGES || '50', 10)
      }
    }
  },
  storage: {
    uploadDir: process.env.UPLOAD_DIR || path.resolve(process.cwd(), 'uploads'),
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB default
    allowedMimeTypes: (process.env.ALLOWED_MIME_TYPES || 'image/*,application/pdf').split(',')
  }
};

const validateConfig = (config: Config): void => {
  if (config.websocket.heartbeatInterval <= 0) {
    throw new Error('Websocket heartbeat interval must be positive');
  }

  if (config.websocket.inactivityTimeout <= 0) {
    throw new Error('Websocket inactivity timeout must be positive');
  }

  if (config.websocket.maxConnectionsPerUser <= 0) {
    throw new Error('Maximum connections per user must be positive');
  }
};

validateConfig(config);

export default config;
