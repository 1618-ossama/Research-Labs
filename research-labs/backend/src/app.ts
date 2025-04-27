import process from "process";
import express, { Express } from "express";
import config from "./config/config";
import cors, { CorsOptions } from "cors";
import authRouter from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import errorMiddleware from "./middleware/errorMiddleware";
import { type User } from "./utils/types";
import { getUserById } from "./db/db";
import { rateLimiter } from "./middleware/rateLimiter";

process.on(
  "unhandledRejection",
  (reason: unknown, promise: Promise<unknown>) => {
    console.error("UNHANDLED REJECTION! Shutting down...");
    console.error("Reason:", reason);
    console.error("Promise:", promise);
  },
);

process.on("uncaughtException", (err: Error) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

const app: Express = express();

app.use(helmet());
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", authRouter);

app.use(errorMiddleware);

app.listen(config.port, async () => {
  try {
    console.log(`Server running on port: ${config.port}`);
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
});

export default app;
