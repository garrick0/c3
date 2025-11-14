import { ComplianceReport } from '../aggregates/Evaluation/ComplianceReport.js';
import { PropertyGraph } from '@c3/parsing';
import { RuleSet } from '../aggregates/RuleSet/RuleSet.js';
import { Logger } from '@c3/shared';

export class EvaluationEngine {
  constructor(private logger: Logger) {}

  async evaluate(graph: PropertyGraph, ruleSets: RuleSet[]): Promise<ComplianceReport> {
    this.logger.info('Evaluating compliance');
    const report = new ComplianceReport(`report-${Date.now()}`, graph.id);
    return report;
  }
}
