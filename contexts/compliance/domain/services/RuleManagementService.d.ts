/**
 * RuleManagementService - CRUD operations for rules
 */
import { RuleSet } from '../aggregates/RuleSet/RuleSet.js';
import { Rule } from '../aggregates/RuleSet/Rule.js';
import { RuleRepository } from '../ports/RuleRepository.js';
import { Logger } from '@c3/shared';
export declare class RuleManagementService {
    private ruleRepository;
    private logger;
    constructor(ruleRepository: RuleRepository, logger: Logger);
    /**
     * Create a new rule set
     */
    createRuleSet(name: string, description: string, source: 'user' | 'config' | 'discovery'): Promise<RuleSet>;
    /**
     * Add rule to rule set
     */
    addRule(ruleSetId: string, rule: Rule): Promise<void>;
    /**
     * Remove rule from rule set
     */
    removeRule(ruleSetId: string, ruleId: string): Promise<void>;
    /**
     * Get all rule sets
     */
    getAllRuleSets(): Promise<RuleSet[]>;
    /**
     * Get rule set by ID
     */
    getRuleSet(id: string): Promise<RuleSet | undefined>;
}
//# sourceMappingURL=RuleManagementService.d.ts.map