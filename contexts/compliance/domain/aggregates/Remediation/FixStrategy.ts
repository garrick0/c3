/**
 * FixStrategy - Interface for fix strategies
 */

import { Fix } from './Fix.js';

export interface FixStrategy {
  /**
   * Generate fix for a violation
   */
  generateFix(violation: any): Promise<Fix | null>;

  /**
   * Apply a fix
   */
  applyFix(fix: Fix): Promise<boolean>;

  /**
   * Validate fix before applying
   */
  validateFix(fix: Fix): Promise<boolean>;

  /**
   * Get strategy name
   */
  getName(): string;
}
