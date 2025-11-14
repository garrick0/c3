import { Entity } from '@c3/shared';
import { Source } from './Source.js';
export declare class Finding extends Entity<string> {
    queryId: string;
    answer: string;
    sources: Source[];
    confidence: number;
    constructor(id: string, queryId: string, answer: string, sources: Source[], confidence: number);
}
//# sourceMappingURL=Finding.d.ts.map