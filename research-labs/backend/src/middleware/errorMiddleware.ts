import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../utils/errorHandler';

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR:`, err);

  let statusCode = 500;
  let message = 'Internal server error';
  let details = null;

  if (err instanceof ApplicationError) {
    statusCode = err.status;
    message = err.message;
    details = err.detail;

    if (!err.isOperational) {
      console.error('SYSTEM ERROR:', err);
    }
  } else {
    console.error('UNEXPECTED ERROR:', err);
    message = 'Something went wrong';
  }

  res.status(statusCode).json({
    status: statusCode >= 500 ? 'error' : 'fail',
    code: err instanceof ApplicationError ? err.code : 'INTERNAL_ERROR',
    message,
    details,
    timestamp
  });
};

export default errorMiddleware;
