import { FixPlan } from '../aggregates/Remediation/FixPlan.js';
export class RemediationService {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    async generateFixPlan(violation) {
        this.logger.info('Generating fix plan');
        return new FixPlan(`plan-${Date.now()}`, violation.id);
    }
}
//# sourceMappingURL=RemediationService.js.map