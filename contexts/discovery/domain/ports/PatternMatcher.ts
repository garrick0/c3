import { Pattern } from '../aggregates/PatternAnalysis/Pattern.js';
import { PropertyGraph } from '@c3/parsing';

export interface PatternMatcher {
  match(graph: PropertyGraph): Promise<Pattern[]>;
  supports(patternType: string): boolean;
  getName(): string;
}
