/**
 * RuleManagementService - CRUD operations for rules
 */
import { RuleSet } from '../aggregates/RuleSet/RuleSet.js';
export class RuleManagementService {
    ruleRepository;
    logger;
    constructor(ruleRepository, logger) {
        this.ruleRepository = ruleRepository;
        this.logger = logger;
    }
    /**
     * Create a new rule set
     */
    async createRuleSet(name, description, source) {
        this.logger.info('Creating rule set', { name, source });
        const ruleSet = new RuleSet(`ruleset-${Date.now()}`, name, description, source);
        await this.ruleRepository.saveRuleSet(ruleSet);
        return ruleSet;
    }
    /**
     * Add rule to rule set
     */
    async addRule(ruleSetId, rule) {
        this.logger.info('Adding rule to set', { ruleSetId, ruleId: rule.id });
        const ruleSet = await this.ruleRepository.findRuleSetById(ruleSetId);
        if (!ruleSet) {
            throw new Error(`RuleSet not found: ${ruleSetId}`);
        }
        ruleSet.addRule(rule);
        await this.ruleRepository.saveRuleSet(ruleSet);
    }
    /**
     * Remove rule from rule set
     */
    async removeRule(ruleSetId, ruleId) {
        this.logger.info('Removing rule from set', { ruleSetId, ruleId });
        const ruleSet = await this.ruleRepository.findRuleSetById(ruleSetId);
        if (!ruleSet) {
            throw new Error(`RuleSet not found: ${ruleSetId}`);
        }
        ruleSet.removeRule(ruleId);
        await this.ruleRepository.saveRuleSet(ruleSet);
    }
    /**
     * Get all rule sets
     */
    async getAllRuleSets() {
        return this.ruleRepository.listRuleSets();
    }
    /**
     * Get rule set by ID
     */
    async getRuleSet(id) {
        return this.ruleRepository.findRuleSetById(id);
    }
}
//# sourceMappingURL=RuleManagementService.js.map