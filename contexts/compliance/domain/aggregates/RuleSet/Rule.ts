/**
 * Rule - Individual compliance rule
 */

import { Entity } from '@c3/shared';
import { Condition } from './Condition.js';
import { RuleType } from '../../value-objects/RuleType.js';
import { Severity } from '../../value-objects/Severity.js';

export class Rule extends Entity<string> {
  public isEnabled: boolean = true;

  constructor(
    id: string,
    public name: string,
    public description: string,
    public type: RuleType,
    public severity: Severity,
    public condition: Condition,
    public metadata: Record<string, any> = {}
  ) {
    super(id);
  }

  /**
   * Enable the rule
   */
  enable(): void {
    this.isEnabled = true;
  }

  /**
   * Disable the rule
   */
  disable(): void {
    this.isEnabled = false;
  }

  /**
   * Check if rule is error severity
   */
  isError(): boolean {
    return this.severity === Severity.ERROR;
  }

  /**
   * Check if rule is warning severity
   */
  isWarning(): boolean {
    return this.severity === Severity.WARNING;
  }

  /**
   * Check if rule is info severity
   */
  isInfo(): boolean {
    return this.severity === Severity.INFO;
  }

  /**
   * Get display name
   */
  getDisplayName(): string {
    return `[${this.severity}] ${this.name}`;
  }

  /**
   * Check if this is a built-in rule
   */
  isBuiltIn(): boolean {
    return this.type === RuleType.DEPENDENCY ||
           this.type === RuleType.NAMING ||
           this.type === RuleType.STRUCTURE;
  }

  /**
   * Check if this is a custom rule
   */
  isCustom(): boolean {
    return this.type === RuleType.CUSTOM;
  }
}
