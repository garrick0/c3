/**
 * RuleSet - Aggregate root for a collection of related rules
 */
import { AggregateRoot } from '@c3/shared';
export class RuleSet extends AggregateRoot {
    name;
    description;
    source;
    rules = new Map();
    constructor(id, name, description, source) {
        super(id);
        this.name = name;
        this.description = description;
        this.source = source;
    }
    /**
     * Add a rule to the set
     */
    addRule(rule) {
        this.rules.set(rule.id, rule);
    }
    /**
     * Remove a rule from the set
     */
    removeRule(ruleId) {
        this.rules.delete(ruleId);
    }
    /**
     * Get rule by ID
     */
    getRule(ruleId) {
        return this.rules.get(ruleId);
    }
    /**
     * Get all rules
     */
    getRules() {
        return Array.from(this.rules.values());
    }
    /**
     * Get active rules only
     */
    getActiveRules() {
        return this.getRules().filter(r => r.isEnabled);
    }
    /**
     * Get rule count
     */
    getRuleCount() {
        return this.rules.size;
    }
    /**
     * Enable all rules
     */
    enableAll() {
        for (const rule of this.rules.values()) {
            rule.enable();
        }
    }
    /**
     * Disable all rules
     */
    disableAll() {
        for (const rule of this.rules.values()) {
            rule.disable();
        }
    }
}
//# sourceMappingURL=RuleSet.js.map