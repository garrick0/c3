import { AggregateRoot } from '@c3/shared';
import { Evidence } from './Evidence.js';
import { PatternType } from './PatternType.js';
export declare class Pattern extends AggregateRoot<string> {
    name: string;
    type: PatternType;
    description: string;
    frequency: number;
    private evidence;
    constructor(id: string, name: string, type: PatternType, description: string, frequency: number);
    addEvidence(evidence: Evidence): void;
    getEvidence(): Evidence[];
    getConfidence(): number;
}
//# sourceMappingURL=Pattern.d.ts.map