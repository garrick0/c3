import { PatternMatcher } from '../../domain/ports/PatternMatcher.js';
import { Pattern } from '../../domain/aggregates/PatternAnalysis/Pattern.js';
import { PatternType } from '../../domain/aggregates/PatternAnalysis/PatternType.js';
import { PropertyGraph } from '@c3/parsing';

export class RegexPatternMatcher implements PatternMatcher {
  async match(graph: PropertyGraph): Promise<Pattern[]> {
    return [];
  }

  supports(patternType: string): boolean {
    return patternType === 'naming';
  }

  getName(): string {
    return 'RegexPatternMatcher';
  }
}
