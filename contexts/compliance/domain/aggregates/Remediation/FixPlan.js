/**
 * FixPlan - Aggregate root for a set of fixes
 */
import { AggregateRoot } from '@c3/shared';
export class FixPlan extends AggregateRoot {
    violationId;
    createdAt;
    fixes = new Map();
    constructor(id, violationId, createdAt = new Date()) {
        super(id);
        this.violationId = violationId;
        this.createdAt = createdAt;
    }
    /**
     * Add fix to plan
     */
    addFix(fix) {
        this.fixes.set(fix.id, fix);
    }
    /**
     * Remove fix from plan
     */
    removeFix(fixId) {
        this.fixes.delete(fixId);
    }
    /**
     * Get all fixes
     */
    getFixes() {
        return Array.from(this.fixes.values());
    }
    /**
     * Get fix count
     */
    getFixCount() {
        return this.fixes.size;
    }
    /**
     * Check if plan is empty
     */
    isEmpty() {
        return this.fixes.size === 0;
    }
    /**
     * Check if all fixes can be auto-applied
     */
    canAutoApply() {
        return this.getFixes().every(f => f.canAutoApply);
    }
    /**
     * Get estimated impact
     */
    getEstimatedImpact() {
        const fixes = this.getFixes();
        const files = new Set(fixes.map(f => f.filePath));
        return {
            filesAffected: files.size,
            linesChanged: fixes.reduce((sum, f) => sum + (f.metadata.linesChanged || 1), 0)
        };
    }
}
//# sourceMappingURL=FixPlan.js.map