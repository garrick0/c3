import { AggregateRoot } from '@c3/shared';
export class ResearchSession extends AggregateRoot {
    codebaseId;
    startedAt;
    queries = [];
    findings = [];
    constructor(id, codebaseId, startedAt = new Date()) {
        super(id);
        this.codebaseId = codebaseId;
        this.startedAt = startedAt;
    }
    addQuery(query) {
        this.queries.push(query);
    }
    addFinding(finding) {
        this.findings.push(finding);
    }
    getQueries() {
        return [...this.queries];
    }
    getFindings() {
        return [...this.findings];
    }
}
//# sourceMappingURL=ResearchSession.js.map