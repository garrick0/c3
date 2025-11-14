import { Entity } from '@c3/shared';
export class Rationale extends Entity {
    reasoning;
    supportingEvidence;
    confidence;
    constructor(id, reasoning, supportingEvidence, confidence) {
        super(id);
        this.reasoning = reasoning;
        this.supportingEvidence = supportingEvidence;
        this.confidence = confidence;
    }
}
//# sourceMappingURL=Rationale.js.map