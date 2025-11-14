/**
 * RuleManagementService - CRUD operations for rules
 */

import { RuleSet } from '../aggregates/RuleSet/RuleSet.js';
import { Rule } from '../aggregates/RuleSet/Rule.js';
import { RuleRepository } from '../ports/RuleRepository.js';
import { Logger } from '@c3/shared';

export class RuleManagementService {
  constructor(
    private ruleRepository: RuleRepository,
    private logger: Logger
  ) {}

  /**
   * Create a new rule set
   */
  async createRuleSet(
    name: string,
    description: string,
    source: 'user' | 'config' | 'discovery'
  ): Promise<RuleSet> {
    this.logger.info('Creating rule set', { name, source });

    const ruleSet = new RuleSet(
      `ruleset-${Date.now()}`,
      name,
      description,
      source
    );

    await this.ruleRepository.saveRuleSet(ruleSet);

    return ruleSet;
  }

  /**
   * Add rule to rule set
   */
  async addRule(ruleSetId: string, rule: Rule): Promise<void> {
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
  async removeRule(ruleSetId: string, ruleId: string): Promise<void> {
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
  async getAllRuleSets(): Promise<RuleSet[]> {
    return this.ruleRepository.listRuleSets();
  }

  /**
   * Get rule set by ID
   */
  async getRuleSet(id: string): Promise<RuleSet | undefined> {
    return this.ruleRepository.findRuleSetById(id);
  }
}
