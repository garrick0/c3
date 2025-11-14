import { ResearchSession } from '../aggregates/Research/ResearchSession.js';
import { PropertyGraph } from '@c3/parsing';
import { LLMProvider } from '../ports/LLMProvider.js';
import { Logger } from '@c3/shared';
export declare class CodebaseResearcher {
    private llmProvider;
    private logger;
    constructor(llmProvider: LLMProvider, logger: Logger);
    researchArchitecture(graph: PropertyGraph): Promise<ResearchSession>;
    findImplicitStandards(graph: PropertyGraph): Promise<string[]>;
    gatherEvidence(pattern: string): Promise<any[]>;
}
//# sourceMappingURL=CodebaseResearcher.d.ts.map