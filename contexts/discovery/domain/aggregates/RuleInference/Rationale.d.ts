import { Entity } from '@c3/shared';
export declare class Rationale extends Entity<string> {
    reasoning: string;
    supportingEvidence: string[];
    confidence: number;
    constructor(id: string, reasoning: string, supportingEvidence: string[], confidence: number);
}
//# sourceMappingURL=Rationale.d.ts.map