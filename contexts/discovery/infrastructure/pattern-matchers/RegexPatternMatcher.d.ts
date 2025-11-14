import { PatternMatcher } from '../../domain/ports/PatternMatcher.js';
import { Pattern } from '../../domain/aggregates/PatternAnalysis/Pattern.js';
import { PropertyGraph } from '@c3/parsing';
export declare class RegexPatternMatcher implements PatternMatcher {
    match(graph: PropertyGraph): Promise<Pattern[]>;
    supports(patternType: string): boolean;
    getName(): string;
}
//# sourceMappingURL=RegexPatternMatcher.d.ts.map