import { AggregateRoot } from '@c3/shared';
export class CandidateRule extends AggregateRoot {
    name;
    description;
    confidence;
    suggestedSeverity;
    rationales = [];
    examples = [];
    constructor(id, name, description, confidence, suggestedSeverity) {
        super(id);
        this.name = name;
        this.description = description;
        this.confidence = confidence;
        this.suggestedSeverity = suggestedSeverity;
    }
    addRationale(rationale) {
        this.rationales.push(rationale);
    }
    addExample(example) {
        this.examples.push(example);
    }
    getRationales() {
        return [...this.rationales];
    }
    getExamples() {
        return [...this.examples];
    }
    isHighConfidence() {
        return this.confidence.value > 0.8;
    }
}
//# sourceMappingURL=CandidateRule.js.map