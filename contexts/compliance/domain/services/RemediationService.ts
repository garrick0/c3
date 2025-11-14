import { FixPlan } from '../aggregates/Remediation/FixPlan.js';
import { Violation } from '../aggregates/Evaluation/Violation.js';
import { Logger } from '@c3/shared';

export class RemediationService {
  constructor(private logger: Logger) {}

  async generateFixPlan(violation: Violation): Promise<FixPlan> {
    this.logger.info('Generating fix plan');
    return new FixPlan(`plan-${Date.now()}`, violation.id);
  }
}
