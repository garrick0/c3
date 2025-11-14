import { ConfidenceScore } from '../value-objects/ConfidenceScore.js';
export class ConfidenceCalculator {
    calculate(pattern) {
        const baseConfidence = pattern.frequency / 100;
        const evidenceBoost = pattern.getEvidence().length * 0.1;
        const total = Math.min(baseConfidence + evidenceBoost, 1);
        return ConfidenceScore.create(total);
    }
    calculateFromEvidence(evidenceCount, evidenceStrength) {
        if (evidenceStrength.length === 0)
            return 0;
        const avgStrength = evidenceStrength.reduce((a, b) => a + b, 0) / evidenceStrength.length;
        return Math.min(avgStrength * (evidenceCount / 10), 1);
    }
}
//# sourceMappingURL=ConfidenceCalculator.js.map