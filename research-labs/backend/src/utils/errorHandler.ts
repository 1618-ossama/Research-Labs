export interface ErrorDetail {
  context?: Record<string, unknown>;
  issues?: unknown[];
  retryAfter?: number;
  service?: string;
  path?: string;
}

export class ApplicationError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly detail: ErrorDetail | null;
  public readonly timestamp: string;
  public headers?: Record<string, string>;

  constructor(
    message: string,
    status: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true,
    detail: ErrorDetail | null = null
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.isOperational = isOperational;
    this.detail = detail;
    this.timestamp = new Date().toISOString();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      detail: this.detail,
      timestamp: this.timestamp || new Date().toISOString(),
    };
  }
}

export class AuthenticationError extends ApplicationError {
  constructor(
    message: string = 'Authentication failed',
    detail: ErrorDetail | null = null) {
    super(message, 401, 'AUTHENTICATION_FAILED', true, detail);
  }
}

export class ValidationError extends ApplicationError {
  constructor(
    message: string = 'Validation failed',
    issues: unknown[] = []) {
    super(message, 422, 'VALIDATION_FAILED', true, { issues });
  }
}

export class NotFoundError extends ApplicationError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND', true);
  }
}

export class RateLimitError extends ApplicationError {
  constructor(retryAfter: number = 60) {
    super('Too many requests', 429, 'RATE_LIMIT_EXCEEDED', true, { retryAfter });
    this.headers = { 'Retry-After': retryAfter.toString() };
  }
}

export class InternalServerError extends ApplicationError {
  constructor(message: string = 'Internal server error') {
    super(message, 500, 'INTERNAL_ERROR', false);
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(
    message: string = 'Authentication required',
    detail: ErrorDetail | null = { context: { requiredScopes: [] } }
  ) {
    super(message, 401, 'UNAUTHORIZED', true, detail);
  }
}

export class DatabaseError extends ApplicationError {
  constructor(
    message: string = 'Database service unavailable',
    detail: ErrorDetail | null = { context: { type: 'connection' } }
  ) {
    super(message, 503, 'DATABASE_ERROR', false, detail);
  }
}

export class ExternalServiceError extends ApplicationError {
  constructor(
    serviceName: string,
    detail: ErrorDetail | null = { service: serviceName }
  ) {
    super(`Service unavailable: ${serviceName}`, 503, 'EXTERNAL_SERVICE_FAILURE', false, detail);
  }
}

export class InvalidTokenError extends ApplicationError {
  constructor(
    tokenType: string = 'access',
    detail: ErrorDetail | null = { context: { tokenType } }
  ) {
    super(`Invalid ${tokenType} token`, 401, 'INVALID_TOKEN_ERROR', true, detail);
  }
}

export default {
  ApplicationError,
  AuthenticationError,
  ValidationError,
  NotFoundError,
  RateLimitError,
  InternalServerError,
  DatabaseError,
  ExternalServiceError,
  InvalidTokenError
};
