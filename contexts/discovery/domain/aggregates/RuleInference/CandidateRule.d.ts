import { AggregateRoot } from '@c3/shared';
import { Confidence } from './Confidence.js';
import { Rationale } from './Rationale.js';
import { Example } from './Example.js';
export declare class CandidateRule extends AggregateRoot<string> {
    name: string;
    description: string;
    confidence: Confidence;
    suggestedSeverity: 'error' | 'warning' | 'info';
    private rationales;
    private examples;
    constructor(id: string, name: string, description: string, confidence: Confidence, suggestedSeverity: 'error' | 'warning' | 'info');
    addRationale(rationale: Rationale): void;
    addExample(example: Example): void;
    getRationales(): Rationale[];
    getExamples(): Example[];
    isHighConfidence(): boolean;
}
//# sourceMappingURL=CandidateRule.d.ts.map