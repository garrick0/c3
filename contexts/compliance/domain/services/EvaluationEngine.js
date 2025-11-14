import { ComplianceReport } from '../aggregates/Evaluation/ComplianceReport.js';
export class EvaluationEngine {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    async evaluate(graph, ruleSets) {
        this.logger.info('Evaluating compliance');
        const report = new ComplianceReport(`report-${Date.now()}`, graph.id);
        return report;
    }
}
//# sourceMappingURL=EvaluationEngine.js.map