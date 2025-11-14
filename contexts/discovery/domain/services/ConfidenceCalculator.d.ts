import { Pattern } from '../aggregates/PatternAnalysis/Pattern.js';
import { ConfidenceScore } from '../value-objects/ConfidenceScore.js';
export declare class ConfidenceCalculator {
    calculate(pattern: Pattern): ConfidenceScore;
    calculateFromEvidence(evidenceCount: number, evidenceStrength: number[]): number;
}
//# sourceMappingURL=ConfidenceCalculator.d.ts.map