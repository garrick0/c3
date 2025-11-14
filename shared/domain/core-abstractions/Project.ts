/**
 * Project - Container for analysis configuration and rule sets
 * Represents a configured instance of codebase analysis
 */

import { Codebase } from './Codebase.js';

export interface Configuration {
  version: string;
  extends?: string[];
  rules: Record<string, any>;
  whitelist?: any[];
  discovery?: {
    ignore: string[];
    hints: Record<string, boolean>;
  };
}

export interface RuleSet {
  id: string;
  name: string;
  rules: any[]; // Will be properly typed in compliance context
  source: 'user' | 'config' | 'discovery';
}

export class Project {
  private ruleSets: RuleSet[] = [];

  constructor(
    public readonly id: string,
    public readonly codebase: Codebase,
    public configuration: Configuration
  ) {}

  /**
   * Add a rule set to the project
   * Stub: Stores in memory array
   */
  addRuleSet(ruleSet: RuleSet): void {
    this.ruleSets.push(ruleSet);
  }

  /**
   * Get all rule sets for this project
   * Stub: Returns stored rule sets
   */
  getRuleSets(): RuleSet[] {
    return [...this.ruleSets];
  }

  /**
   * Update project configuration
   * Stub: Replaces configuration
   */
  updateConfiguration(config: Configuration): void {
    this.configuration = config;
  }

  /**
   * Get rule set by ID
   * Stub: Simple array find
   */
  getRuleSetById(id: string): RuleSet | undefined {
    return this.ruleSets.find(rs => rs.id === id);
  }

  /**
   * Remove rule set
   * Stub: Filter array
   */
  removeRuleSet(id: string): void {
    this.ruleSets = this.ruleSets.filter(rs => rs.id !== id);
  }
}
