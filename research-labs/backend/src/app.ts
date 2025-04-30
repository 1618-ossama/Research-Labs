import process from "process";
import express, { Express } from "express";
import config from "./config/config";
import cors, { CorsOptions } from "cors";
import authRouter from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import errorMiddleware from "./middleware/errorMiddleware";
import { rateLimiter } from "./middleware/rateLimiter";
import errorHandler from "@utils/errorHandler";

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
const OptionsCors: CorsOptions = {
  origin: (origin, callback) => {

    const origin_tf = origin || '';
    const allowed = ['http://localhost:3000', 'http://127.0.0.1:3000'];

    if (allowed.includes(origin_tf)) {
      callback(null, true);
    } else {
      callback(new errorHandler.ExternalServiceError('Not allowed by CORS'));
    }
  },
  credentials: true,
}

app.use(cors(OptionsCors));
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
