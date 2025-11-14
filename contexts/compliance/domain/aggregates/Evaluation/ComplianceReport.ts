/**
 * ComplianceReport - Aggregate root for evaluation results
 */

import { AggregateRoot } from '@c3/shared';
import { Violation } from './Violation.js';

export interface ReportSummary {
  totalViolations: number;
  errorCount: number;
  warningCount: number;
  infoCount: number;
  filesAnalyzed: number;
  rulesEvaluated: number;
}

export class ComplianceReport extends AggregateRoot<string> {
  private violations: Map<string, Violation> = new Map();

  constructor(
    id: string,
    public readonly codebaseId: string,
    public readonly createdAt: Date = new Date()
  ) {
    super(id);
  }

  /**
   * Add violation to report
   */
  addViolation(violation: Violation): void {
    this.violations.set(violation.id, violation);
  }

  /**
   * Get all violations
   */
  getViolations(): Violation[] {
    return Array.from(this.violations.values());
  }

  /**
   * Get violations by severity
   */
  getViolationsBySeverity(severity: string): Violation[] {
    return this.getViolations().filter(v => v.severity.toString() === severity);
  }

  /**
   * Get violations by rule ID
   */
  getViolationsByRule(ruleId: string): Violation[] {
    return this.getViolations().filter(v => v.ruleId === ruleId);
  }

  /**
   * Get violation count
   */
  getViolationCount(): number {
    return this.violations.size;
  }

  /**
   * Generate summary
   */
  getSummary(): ReportSummary {
    const violations = this.getViolations();

    return {
      totalViolations: violations.length,
      errorCount: violations.filter(v => v.severity.toString() === 'error').length,
      warningCount: violations.filter(v => v.severity.toString() === 'warning').length,
      infoCount: violations.filter(v => v.severity.toString() === 'info').length,
      filesAnalyzed: new Set(violations.map(v => v.context.filePath)).size,
      rulesEvaluated: new Set(violations.map(v => v.ruleId)).size
    };
  }

  /**
   * Check if has any errors
   */
  hasErrors(): boolean {
    return this.getViolations().some(v => v.severity.toString() === 'error');
  }

  /**
   * Check if passed (no errors)
   */
  passed(): boolean {
    return !this.hasErrors();
  }
}
