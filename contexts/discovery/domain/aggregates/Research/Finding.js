import { Entity } from '@c3/shared';
export class Finding extends Entity {
    queryId;
    answer;
    sources;
    confidence;
    constructor(id, queryId, answer, sources, confidence) {
        super(id);
        this.queryId = queryId;
        this.answer = answer;
        this.sources = sources;
        this.confidence = confidence;
    }
}
//# sourceMappingURL=Finding.js.map