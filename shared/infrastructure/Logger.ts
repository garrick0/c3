/**
 * Logger service for application-wide logging
 * Stub implementation using console
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export interface LogContext {
  [key: string]: any;
}

export class Logger {
  private level: LogLevel;
  private serviceName: string;

  constructor(serviceName: string, level: LogLevel = LogLevel.INFO) {
    this.serviceName = serviceName;
    this.level = level;
  }

  /**
   * Log debug message
   * Stub: Uses console.debug
   */
  debug(message: string, context?: LogContext): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(`[${this.serviceName}] DEBUG:`, message, context || '');
    }
  }

  /**
   * Log info message
   * Stub: Uses console.log
   */
  info(message: string, context?: LogContext): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(`[${this.serviceName}] INFO:`, message, context || '');
    }
  }

  /**
   * Log warning message
   * Stub: Uses console.warn
   */
  warn(message: string, context?: LogContext): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(`[${this.serviceName}] WARN:`, message, context || '');
    }
  }

  /**
   * Log error message
   * Stub: Uses console.error
   */
  error(message: string, error?: Error, context?: LogContext): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(`[${this.serviceName}] ERROR:`, message, error, context || '');
    }
  }

  /**
   * Create child logger with additional context
   * Stub: Creates new logger with combined name
   */
  child(childName: string): Logger {
    return new Logger(`${this.serviceName}:${childName}`, this.level);
  }

  /**
   * Check if should log at level
   */
  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    const currentIndex = levels.indexOf(this.level);
    const targetIndex = levels.indexOf(level);
    return targetIndex >= currentIndex;
  }

  /**
   * Set log level
   */
  setLevel(level: LogLevel): void {
    this.level = level;
  }
}

/**
 * Create a logger instance
 */
export function createLogger(serviceName: string, level?: LogLevel): Logger {
  return new Logger(serviceName, level);
}
