/**
 * Rule - Individual compliance rule
 */
import { Entity } from '@c3/shared';
import { Condition } from './Condition.js';
import { RuleType } from '../../value-objects/RuleType.js';
import { Severity } from '../../value-objects/Severity.js';
export declare class Rule extends Entity<string> {
    name: string;
    description: string;
    type: RuleType;
    severity: Severity;
    condition: Condition;
    metadata: Record<string, any>;
    isEnabled: boolean;
    constructor(id: string, name: string, description: string, type: RuleType, severity: Severity, condition: Condition, metadata?: Record<string, any>);
    /**
     * Enable the rule
     */
    enable(): void;
    /**
     * Disable the rule
     */
    disable(): void;
    /**
     * Check if rule is error severity
     */
    isError(): boolean;
    /**
     * Check if rule is warning severity
     */
    isWarning(): boolean;
    /**
     * Check if rule is info severity
     */
    isInfo(): boolean;
    /**
     * Get display name
     */
    getDisplayName(): string;
    /**
     * Check if this is a built-in rule
     */
    isBuiltIn(): boolean;
    /**
     * Check if this is a custom rule
     */
    isCustom(): boolean;
}
//# sourceMappingURL=Rule.d.ts.map