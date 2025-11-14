import { Violation } from '../aggregates/Evaluation/Violation.js';
export interface EvaluatorStrategy {
    evaluate(graph: any, rule: any): Promise<Violation[]>;
    supports(ruleType: string): boolean;
}
//# sourceMappingURL=EvaluatorStrategy.d.ts.map