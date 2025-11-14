/**
 * RuleSet - Aggregate root for a collection of related rules
 */
import { AggregateRoot } from '@c3/shared';
import { Rule } from './Rule.js';
export declare class RuleSet extends AggregateRoot<string> {
    name: string;
    description: string;
    readonly source: 'user' | 'config' | 'discovery';
    private rules;
    constructor(id: string, name: string, description: string, source: 'user' | 'config' | 'discovery');
    /**
     * Add a rule to the set
     */
    addRule(rule: Rule): void;
    /**
     * Remove a rule from the set
     */
    removeRule(ruleId: string): void;
    /**
     * Get rule by ID
     */
    getRule(ruleId: string): Rule | undefined;
    /**
     * Get all rules
     */
    getRules(): Rule[];
    /**
     * Get active rules only
     */
    getActiveRules(): Rule[];
    /**
     * Get rule count
     */
    getRuleCount(): number;
    /**
     * Enable all rules
     */
    enableAll(): void;
    /**
     * Disable all rules
     */
    disableAll(): void;
}
//# sourceMappingURL=RuleSet.d.ts.map