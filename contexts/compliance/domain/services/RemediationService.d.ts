import { FixPlan } from '../aggregates/Remediation/FixPlan.js';
import { Violation } from '../aggregates/Evaluation/Violation.js';
import { Logger } from '@c3/shared';
export declare class RemediationService {
    private logger;
    constructor(logger: Logger);
    generateFixPlan(violation: Violation): Promise<FixPlan>;
}
//# sourceMappingURL=RemediationService.d.ts.map