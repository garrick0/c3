import { AggregateRoot } from '@c3/shared';
import { Query } from './Query.js';
import { Finding } from './Finding.js';
export declare class ResearchSession extends AggregateRoot<string> {
    readonly codebaseId: string;
    readonly startedAt: Date;
    private queries;
    private findings;
    constructor(id: string, codebaseId: string, startedAt?: Date);
    addQuery(query: Query): void;
    addFinding(finding: Finding): void;
    getQueries(): Query[];
    getFindings(): Finding[];
}
//# sourceMappingURL=ResearchSession.d.ts.map