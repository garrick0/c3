/**
 * Transform configuration to internal rule format
 * Converts user-friendly config to domain entities
 */

import type { Config, CustomRule } from './ConfigSchema.js';

/**
 * Internal rule representation (will be properly typed in compliance context)
 */
export interface InternalRule {
  id: string;
  name: string;
  severity: 'error' | 'warn' | 'info';
  type: string;
  config: Record<string, any>;
  source: 'config' | 'user' | 'discovery';
}

export class ConfigTransformer {
  /**
   * Transform config to internal rules
   * Stub: Converts rule definitions to internal format
   */
  static toRules(config: Config): InternalRule[] {
    const rules: InternalRule[] = [];

    if (!config.rules) return rules;

    let ruleIndex = 0;

    for (const [name, ruleConfig] of Object.entries(config.rules)) {
      if (name === 'custom') continue; // Handle custom rules separately

      const rule = this.transformBuiltInRule(name, ruleConfig, ruleIndex++);
      rules.push(rule);
    }

    // Transform custom rules
    if (config.rules.custom && Array.isArray(config.rules.custom)) {
      for (const customRule of config.rules.custom as CustomRule[]) {
        rules.push(this.transformCustomRule(customRule, ruleIndex++));
      }
    }

    return rules;
  }

  /**
   * Transform built-in rule configuration
   */
  private static transformBuiltInRule(
    name: string,
    config: string | any[],
    index: number
  ): InternalRule {
    let severity: 'error' | 'warn' | 'info' = 'error';
    let ruleConfig: Record<string, any> = {};

    if (typeof config === 'string') {
      severity = config as 'error' | 'warn' | 'info';
    } else if (Array.isArray(config)) {
      severity = config[0] as 'error' | 'warn' | 'info';
      ruleConfig = config[1] || {};
    }

    return {
      id: `built-in-${index}`,
      name,
      severity,
      type: 'built-in',
      config: ruleConfig,
      source: 'config'
    };
  }

  /**
   * Transform custom rule
   */
  private static transformCustomRule(
    customRule: CustomRule,
    index: number
  ): InternalRule {
    return {
      id: `custom-${index}`,
      name: customRule.name,
      severity: customRule.severity,
      type: 'custom',
      config: { condition: customRule.condition },
      source: 'config'
    };
  }

  /**
   * Transform whitelist entries
   */
  static toWhitelist(config: Config): Array<{
    rule: string;
    path: string;
    reason?: string;
  }> {
    return config.whitelist || [];
  }

  /**
   * Extract discovery configuration
   */
  static toDiscoveryConfig(config: Config): {
    ignore: string[];
    hints: Record<string, boolean>;
  } {
    return {
      ignore: config.discovery?.ignore || [],
      hints: config.discovery?.hints || {}
    };
  }
}
