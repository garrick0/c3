/**
 * Violation - Instance of a rule violation
 */

import { Entity } from '@c3/shared';
import { Severity } from '../../value-objects/Severity.js';
import { ViolationContext } from './ViolationContext.js';

export class Violation extends Entity<string> {
  constructor(
    id: string,
    public readonly ruleId: string,
    public readonly ruleName: string,
    public readonly severity: Severity,
    public readonly message: string,
    public readonly context: ViolationContext,
    public readonly detectedAt: Date = new Date()
  ) {
    super(id);
  }

  /**
   * Check if this is an error
   */
  isError(): boolean {
    return this.severity === Severity.ERROR;
  }

  /**
   * Check if this is a warning
   */
  isWarning(): boolean {
    return this.severity === Severity.WARNING;
  }

  /**
   * Check if this is info
   */
  isInfo(): boolean {
    return this.severity === Severity.INFO;
  }

  /**
   * Get file path
   */
  getFilePath(): string {
    return this.context.filePath;
  }

  /**
   * Get line number
   */
  getLineNumber(): number | undefined {
    return this.context.lineNumber;
  }

  /**
   * Format for display
   */
  format(): string {
    const location = this.context.lineNumber
      ? `${this.context.filePath}:${this.context.lineNumber}`
      : this.context.filePath;

    return `[${this.severity}] ${this.ruleName}: ${this.message} (${location})`;
  }
}
