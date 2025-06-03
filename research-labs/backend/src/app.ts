import process from "process";
import express, { Express } from "express";
import config from "./config/config";
import cors, { CorsOptions } from "cors";
import authRouter from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import errorMiddleware from "./middleware/errorMiddleware";
import { rateLimiter } from "./middleware/rateLimiter";
import errorHandler from "./utils/errorHandler";
import profileRouter from "./routes/profileRoutes";

process.on("unhandledRejection", (reason: unknown, promise: Promise<unknown>) => {
  console.error("UNHANDLED REJECTION! Logging error to console...");
  console.error("Reason:", reason);
  console.error("Promise:", promise);
},
);

process.on("uncaughtException", (err: Error) => {
  console.error("UNCAUGHT EXCEPTION! Logging error to console...");
  console.error(err.name, err.message);
  if (err instanceof errorHandler.ApplicationError && !err.isOperational) {
    console.error("Non-operational error. Shutting down...");
    process.exit(1);
  }
});

const app: Express = express();
const OptionsCors: CorsOptions = {
  origin: (origin, callback) => {
    const allowed = ['http://localhost:3000', 'http://127.0.0.1:3000'
      , 'http://127.0.0.1:3007', 'http://localhost:3007'];

    // Allow requests without origin (e.g., from server or curl)
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new errorHandler.ExternalServiceError('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(OptionsCors)); // postman not allowed
app.use(helmet());
// app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/profiles', profileRouter);

app.use(errorMiddleware);

const server = app.listen(config.port, () => {
  console.log(`Server running on port: ${config.port}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated.');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated.');
  });
});
export default app;
