import { EvaluatorStrategy } from '../../domain/ports/EvaluatorStrategy.js';
import { Violation } from '../../domain/aggregates/Evaluation/Violation.js';
export declare class DependencyEvaluator implements EvaluatorStrategy {
    evaluate(graph: any, rule: any): Promise<Violation[]>;
    supports(ruleType: string): boolean;
}
//# sourceMappingURL=DependencyEvaluator.d.ts.map