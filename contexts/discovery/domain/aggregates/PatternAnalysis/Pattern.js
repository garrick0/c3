import { AggregateRoot } from '@c3/shared';
export class Pattern extends AggregateRoot {
    name;
    type;
    description;
    frequency;
    evidence = [];
    constructor(id, name, type, description, frequency) {
        super(id);
        this.name = name;
        this.type = type;
        this.description = description;
        this.frequency = frequency;
    }
    addEvidence(evidence) {
        this.evidence.push(evidence);
    }
    getEvidence() {
        return [...this.evidence];
    }
    getConfidence() {
        if (this.evidence.length === 0)
            return 0;
        return this.evidence.reduce((sum, e) => sum + e.strength, 0) / this.evidence.length;
    }
}
//# sourceMappingURL=Pattern.js.map