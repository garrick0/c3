/**
 * RuleSet - Aggregate root for a collection of related rules
 */

import { AggregateRoot } from '@c3/shared';
import { Rule } from './Rule.js';

export class RuleSet extends AggregateRoot<string> {
  private rules: Map<string, Rule> = new Map();

  constructor(
    id: string,
    public name: string,
    public description: string,
    public readonly source: 'user' | 'config' | 'discovery'
  ) {
    super(id);
  }

  /**
   * Add a rule to the set
   */
  addRule(rule: Rule): void {
    this.rules.set(rule.id, rule);
  }

  /**
   * Remove a rule from the set
   */
  removeRule(ruleId: string): void {
    this.rules.delete(ruleId);
  }

  /**
   * Get rule by ID
   */
  getRule(ruleId: string): Rule | undefined {
    return this.rules.get(ruleId);
  }

  /**
   * Get all rules
   */
  getRules(): Rule[] {
    return Array.from(this.rules.values());
  }

  /**
   * Get active rules only
   */
  getActiveRules(): Rule[] {
    return this.getRules().filter(r => r.isEnabled);
  }

  /**
   * Get rule count
   */
  getRuleCount(): number {
    return this.rules.size;
  }

  /**
   * Enable all rules
   */
  enableAll(): void {
    for (const rule of this.rules.values()) {
      rule.enable();
    }
  }

  /**
   * Disable all rules
   */
  disableAll(): void {
    for (const rule of this.rules.values()) {
      rule.disable();
    }
  }
}
