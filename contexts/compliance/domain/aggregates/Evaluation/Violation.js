/**
 * Violation - Instance of a rule violation
 */
import { Entity } from '@c3/shared';
import { Severity } from '../../value-objects/Severity.js';
export class Violation extends Entity {
    ruleId;
    ruleName;
    severity;
    message;
    context;
    detectedAt;
    constructor(id, ruleId, ruleName, severity, message, context, detectedAt = new Date()) {
        super(id);
        this.ruleId = ruleId;
        this.ruleName = ruleName;
        this.severity = severity;
        this.message = message;
        this.context = context;
        this.detectedAt = detectedAt;
    }
    /**
     * Check if this is an error
     */
    isError() {
        return this.severity === Severity.ERROR;
    }
    /**
     * Check if this is a warning
     */
    isWarning() {
        return this.severity === Severity.WARNING;
    }
    /**
     * Check if this is info
     */
    isInfo() {
        return this.severity === Severity.INFO;
    }
    /**
     * Get file path
     */
    getFilePath() {
        return this.context.filePath;
    }
    /**
     * Get line number
     */
    getLineNumber() {
        return this.context.lineNumber;
    }
    /**
     * Format for display
     */
    format() {
        const location = this.context.lineNumber
            ? `${this.context.filePath}:${this.context.lineNumber}`
            : this.context.filePath;
        return `[${this.severity}] ${this.ruleName}: ${this.message} (${location})`;
    }
}
//# sourceMappingURL=Violation.js.map