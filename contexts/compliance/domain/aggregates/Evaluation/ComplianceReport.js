/**
 * ComplianceReport - Aggregate root for evaluation results
 */
import { AggregateRoot } from '@c3/shared';
export class ComplianceReport extends AggregateRoot {
    codebaseId;
    createdAt;
    violations = new Map();
    constructor(id, codebaseId, createdAt = new Date()) {
        super(id);
        this.codebaseId = codebaseId;
        this.createdAt = createdAt;
    }
    /**
     * Add violation to report
     */
    addViolation(violation) {
        this.violations.set(violation.id, violation);
    }
    /**
     * Get all violations
     */
    getViolations() {
        return Array.from(this.violations.values());
    }
    /**
     * Get violations by severity
     */
    getViolationsBySeverity(severity) {
        return this.getViolations().filter(v => v.severity.toString() === severity);
    }
    /**
     * Get violations by rule ID
     */
    getViolationsByRule(ruleId) {
        return this.getViolations().filter(v => v.ruleId === ruleId);
    }
    /**
     * Get violation count
     */
    getViolationCount() {
        return this.violations.size;
    }
    /**
     * Generate summary
     */
    getSummary() {
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
    hasErrors() {
        return this.getViolations().some(v => v.severity.toString() === 'error');
    }
    /**
     * Check if passed (no errors)
     */
    passed() {
        return !this.hasErrors();
    }
}
//# sourceMappingURL=ComplianceReport.js.map