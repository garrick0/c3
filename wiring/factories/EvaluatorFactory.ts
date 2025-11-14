/**
 * Evaluator factory for creating evaluator instances
 * Stub implementation
 */

export interface Evaluator {
  evaluate(graph: any, rule: any): any[];
  supports(ruleType: string): boolean;
}

export class EvaluatorFactory {
  private evaluators: Map<string, Evaluator> = new Map();

  /**
   * Register an evaluator for rule types
   */
  register(ruleTypes: string[], evaluator: Evaluator): void {
    for (const type of ruleTypes) {
      this.evaluators.set(type, evaluator);
    }
  }

  /**
   * Get evaluator for rule type
   * Stub: Returns from map or undefined
   */
  getEvaluator(ruleType: string): Evaluator | undefined {
    return this.evaluators.get(ruleType);
  }

  /**
   * Check if evaluator exists for rule type
   */
  hasEvaluator(ruleType: string): boolean {
    return this.evaluators.has(ruleType);
  }

  /**
   * Get all supported rule types
   */
  getSupportedRuleTypes(): string[] {
    return Array.from(this.evaluators.keys());
  }
}

/**
 * Create evaluator factory
 */
export function createEvaluatorFactory(): EvaluatorFactory {
  return new EvaluatorFactory();
}
