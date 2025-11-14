export class PatternDetectionService {
    matchers;
    logger;
    constructor(matchers, logger) {
        this.matchers = matchers;
        this.logger = logger;
    }
    async detectPatterns(graph) {
        this.logger.info('Detecting patterns in codebase');
        const patterns = [];
        for (const matcher of this.matchers) {
            const matched = await matcher.match(graph);
            patterns.push(...matched);
        }
        return patterns;
    }
    async findNamingPatterns(graph) {
        return [];
    }
    async findStructuralPatterns(graph) {
        return [];
    }
    async findArchitecturalPatterns(graph) {
        return [];
    }
}
//# sourceMappingURL=PatternDetectionService.js.map