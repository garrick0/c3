import { ResearchSession } from '../aggregates/Research/ResearchSession.js';
export class CodebaseResearcher {
    llmProvider;
    logger;
    constructor(llmProvider, logger) {
        this.llmProvider = llmProvider;
        this.logger = logger;
    }
    async researchArchitecture(graph) {
        this.logger.info('Researching codebase architecture');
        const session = new ResearchSession(`session-${Date.now()}`, graph.id);
        return session;
    }
    async findImplicitStandards(graph) {
        return [];
    }
    async gatherEvidence(pattern) {
        return [];
    }
}
//# sourceMappingURL=CodebaseResearcher.js.map