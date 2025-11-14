import { ComplianceReport } from '../../domain/aggregates/Evaluation/ComplianceReport.js';
import { EvaluationEngine } from '../../domain/services/EvaluationEngine.js';
import { RuleManagementService } from '../../domain/services/RuleManagementService.js';
import { PropertyGraph } from '@c3/parsing';
import { Logger } from '@c3/shared';

export class CheckComplianceUseCase {
  constructor(
    private evaluationEngine: EvaluationEngine,
    private ruleManagement: RuleManagementService,
    private logger: Logger
  ) {}

  async execute(graph: PropertyGraph): Promise<ComplianceReport> {
    this.logger.info('Checking compliance');
    const ruleSets = await this.ruleManagement.getAllRuleSets();
    return this.evaluationEngine.evaluate(graph, ruleSets);
  }
}
