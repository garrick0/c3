import { EvaluatorStrategy } from '../../domain/ports/EvaluatorStrategy.js';
import { Violation } from '../../domain/aggregates/Evaluation/Violation.js';

export class DependencyEvaluator implements EvaluatorStrategy {
  async evaluate(graph: any, rule: any): Promise<Violation[]> {
    return [];
  }

  supports(ruleType: string): boolean {
    return ruleType === 'dependency';
  }
}
