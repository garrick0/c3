import { ComplianceReport } from '../aggregates/Evaluation/ComplianceReport.js';
import { PropertyGraph } from '@c3/parsing';
import { RuleSet } from '../aggregates/RuleSet/RuleSet.js';
import { Logger } from '@c3/shared';
export declare class EvaluationEngine {
    private logger;
    constructor(logger: Logger);
    evaluate(graph: PropertyGraph, ruleSets: RuleSet[]): Promise<ComplianceReport>;
}
//# sourceMappingURL=EvaluationEngine.d.ts.map