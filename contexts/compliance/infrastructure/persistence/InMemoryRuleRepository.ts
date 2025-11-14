import { RuleRepository } from '../../domain/ports/RuleRepository.js';
import { RuleSet } from '../../domain/aggregates/RuleSet/RuleSet.js';

export class InMemoryRuleRepository implements RuleRepository {
  private ruleSets = new Map<string, RuleSet>();

  async saveRuleSet(ruleSet: RuleSet): Promise<void> {
    this.ruleSets.set(ruleSet.id, ruleSet);
  }

  async findRuleSetById(id: string): Promise<RuleSet | undefined> {
    return this.ruleSets.get(id);
  }

  async listRuleSets(): Promise<RuleSet[]> {
    return Array.from(this.ruleSets.values());
  }

  async deleteRuleSet(id: string): Promise<void> {
    this.ruleSets.delete(id);
  }
}
