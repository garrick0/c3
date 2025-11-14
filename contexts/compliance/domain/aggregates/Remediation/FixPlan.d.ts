/**
 * FixPlan - Aggregate root for a set of fixes
 */
import { AggregateRoot } from '@c3/shared';
import { Fix } from './Fix.js';
export declare class FixPlan extends AggregateRoot<string> {
    readonly violationId: string;
    readonly createdAt: Date;
    private fixes;
    constructor(id: string, violationId: string, createdAt?: Date);
    /**
     * Add fix to plan
     */
    addFix(fix: Fix): void;
    /**
     * Remove fix from plan
     */
    removeFix(fixId: string): void;
    /**
     * Get all fixes
     */
    getFixes(): Fix[];
    /**
     * Get fix count
     */
    getFixCount(): number;
    /**
     * Check if plan is empty
     */
    isEmpty(): boolean;
    /**
     * Check if all fixes can be auto-applied
     */
    canAutoApply(): boolean;
    /**
     * Get estimated impact
     */
    getEstimatedImpact(): {
        filesAffected: number;
        linesChanged: number;
    };
}
//# sourceMappingURL=FixPlan.d.ts.map