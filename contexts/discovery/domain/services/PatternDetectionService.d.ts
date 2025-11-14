import { Pattern } from '../aggregates/PatternAnalysis/Pattern.js';
import { PropertyGraph } from '@c3/parsing';
import { PatternMatcher } from '../ports/PatternMatcher.js';
import { Logger } from '@c3/shared';
export declare class PatternDetectionService {
    private matchers;
    private logger;
    constructor(matchers: PatternMatcher[], logger: Logger);
    detectPatterns(graph: PropertyGraph): Promise<Pattern[]>;
    findNamingPatterns(graph: PropertyGraph): Promise<Pattern[]>;
    findStructuralPatterns(graph: PropertyGraph): Promise<Pattern[]>;
    findArchitecturalPatterns(graph: PropertyGraph): Promise<Pattern[]>;
}
//# sourceMappingURL=PatternDetectionService.d.ts.map