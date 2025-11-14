/**
 * Rule - Individual compliance rule
 */
import { Entity } from '@c3/shared';
import { RuleType } from '../../value-objects/RuleType.js';
import { Severity } from '../../value-objects/Severity.js';
export class Rule extends Entity {
    name;
    description;
    type;
    severity;
    condition;
    metadata;
    isEnabled = true;
    constructor(id, name, description, type, severity, condition, metadata = {}) {
        super(id);
        this.name = name;
        this.description = description;
        this.type = type;
        this.severity = severity;
        this.condition = condition;
        this.metadata = metadata;
    }
    /**
     * Enable the rule
     */
    enable() {
        this.isEnabled = true;
    }
    /**
     * Disable the rule
     */
    disable() {
        this.isEnabled = false;
    }
    /**
     * Check if rule is error severity
     */
    isError() {
        return this.severity === Severity.ERROR;
    }
    /**
     * Check if rule is warning severity
     */
    isWarning() {
        return this.severity === Severity.WARNING;
    }
    /**
     * Check if rule is info severity
     */
    isInfo() {
        return this.severity === Severity.INFO;
    }
    /**
     * Get display name
     */
    getDisplayName() {
        return `[${this.severity}] ${this.name}`;
    }
    /**
     * Check if this is a built-in rule
     */
    isBuiltIn() {
        return this.type === RuleType.DEPENDENCY ||
            this.type === RuleType.NAMING ||
            this.type === RuleType.STRUCTURE;
    }
    /**
     * Check if this is a custom rule
     */
    isCustom() {
        return this.type === RuleType.CUSTOM;
    }
}
//# sourceMappingURL=Rule.js.map