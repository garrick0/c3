/**
 * FixPlan - Aggregate root for a set of fixes
 */

import { AggregateRoot } from '@c3/shared';
import { Fix } from './Fix.js';

export class FixPlan extends AggregateRoot<string> {
  private fixes: Map<string, Fix> = new Map();

  constructor(
    id: string,
    public readonly violationId: string,
    public readonly createdAt: Date = new Date()
  ) {
    super(id);
  }

  /**
   * Add fix to plan
   */
  addFix(fix: Fix): void {
    this.fixes.set(fix.id, fix);
  }

  /**
   * Remove fix from plan
   */
  removeFix(fixId: string): void {
    this.fixes.delete(fixId);
  }

  /**
   * Get all fixes
   */
  getFixes(): Fix[] {
    return Array.from(this.fixes.values());
  }

  /**
   * Get fix count
   */
  getFixCount(): number {
    return this.fixes.size;
  }

  /**
   * Check if plan is empty
   */
  isEmpty(): boolean {
    return this.fixes.size === 0;
  }

  /**
   * Check if all fixes can be auto-applied
   */
  canAutoApply(): boolean {
    return this.getFixes().every(f => f.canAutoApply);
  }

  /**
   * Get estimated impact
   */
  getEstimatedImpact(): {
    filesAffected: number;
    linesChanged: number;
  } {
    const fixes = this.getFixes();
    const files = new Set(fixes.map(f => f.filePath));

    return {
      filesAffected: files.size,
      linesChanged: fixes.reduce((sum, f) => sum + (f.metadata.linesChanged || 1), 0)
    };
  }
}
