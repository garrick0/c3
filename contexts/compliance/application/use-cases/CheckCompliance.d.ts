import { ComplianceReport } from '../../domain/aggregates/Evaluation/ComplianceReport.js';
import { EvaluationEngine } from '../../domain/services/EvaluationEngine.js';
import { RuleManagementService } from '../../domain/services/RuleManagementService.js';
import { PropertyGraph } from '@c3/parsing';
import { Logger } from '@c3/shared';
export declare class CheckComplianceUseCase {
    private evaluationEngine;
    private ruleManagement;
    private logger;
    constructor(evaluationEngine: EvaluationEngine, ruleManagement: RuleManagementService, logger: Logger);
    execute(graph: PropertyGraph): Promise<ComplianceReport>;
}
//# sourceMappingURL=CheckCompliance.d.ts.map