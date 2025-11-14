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
export declare class ComplianceReport extends AggregateRoot<string> {
    readonly codebaseId: string;
    readonly createdAt: Date;
    private violations;
    constructor(id: string, codebaseId: string, createdAt?: Date);
    /**
     * Add violation to report
     */
    addViolation(violation: Violation): void;
    /**
     * Get all violations
     */
    getViolations(): Violation[];
    /**
     * Get violations by severity
     */
    getViolationsBySeverity(severity: string): Violation[];
    /**
     * Get violations by rule ID
     */
    getViolationsByRule(ruleId: string): Violation[];
    /**
     * Get violation count
     */
    getViolationCount(): number;
    /**
     * Generate summary
     */
    getSummary(): ReportSummary;
    /**
     * Check if has any errors
     */
    hasErrors(): boolean;
    /**
     * Check if passed (no errors)
     */
    passed(): boolean;
}
//# sourceMappingURL=ComplianceReport.d.ts.map