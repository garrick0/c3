/**
 * Error type definitions
 */

export enum ErrorCode {
  // General errors
  UNKNOWN = 'UNKNOWN',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',

  // Parsing errors
  PARSE_ERROR = 'PARSE_ERROR',
  INVALID_FILE = 'INVALID_FILE',
  UNSUPPORTED_LANGUAGE = 'UNSUPPORTED_LANGUAGE',

  // Compliance errors
  RULE_NOT_FOUND = 'RULE_NOT_FOUND',
  INVALID_RULE = 'INVALID_RULE',
  EVALUATION_ERROR = 'EVALUATION_ERROR',

  // Configuration errors
  CONFIG_NOT_FOUND = 'CONFIG_NOT_FOUND',
  INVALID_CONFIG = 'INVALID_CONFIG',

  // Infrastructure errors
  CACHE_ERROR = 'CACHE_ERROR',
  STORAGE_ERROR = 'STORAGE_ERROR',
  LLM_ERROR = 'LLM_ERROR'
}

export class ApplicationError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly details?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, details?: Record<string, any>) {
    super(ErrorCode.VALIDATION_ERROR, message, details);
  }
}

export class NotFoundError extends ApplicationError {
  constructor(resource: string, id: string) {
    super(ErrorCode.NOT_FOUND, `${resource} with id ${id} not found`, { resource, id });
  }
}

export class ParseError extends ApplicationError {
  constructor(message: string, details?: Record<string, any>) {
    super(ErrorCode.PARSE_ERROR, message, details);
  }
}

export class ConfigError extends ApplicationError {
  constructor(message: string, details?: Record<string, any>) {
    super(ErrorCode.INVALID_CONFIG, message, details);
  }
}
