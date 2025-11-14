/**
 * Violation - Instance of a rule violation
 */
import { Entity } from '@c3/shared';
import { Severity } from '../../value-objects/Severity.js';
import { ViolationContext } from './ViolationContext.js';
export declare class Violation extends Entity<string> {
    readonly ruleId: string;
    readonly ruleName: string;
    readonly severity: Severity;
    readonly message: string;
    readonly context: ViolationContext;
    readonly detectedAt: Date;
    constructor(id: string, ruleId: string, ruleName: string, severity: Severity, message: string, context: ViolationContext, detectedAt?: Date);
    /**
     * Check if this is an error
     */
    isError(): boolean;
    /**
     * Check if this is a warning
     */
    isWarning(): boolean;
    /**
     * Check if this is info
     */
    isInfo(): boolean;
    /**
     * Get file path
     */
    getFilePath(): string;
    /**
     * Get line number
     */
    getLineNumber(): number | undefined;
    /**
     * Format for display
     */
    format(): string;
}
//# sourceMappingURL=Violation.d.ts.map