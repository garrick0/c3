import { Pattern } from '../aggregates/PatternAnalysis/Pattern.js';
import { PropertyGraph } from '@c3/parsing';
import { PatternMatcher } from '../ports/PatternMatcher.js';
import { Logger } from '@c3/shared';

export class PatternDetectionService {
  constructor(
    private matchers: PatternMatcher[],
    private logger: Logger
  ) {}

  async detectPatterns(graph: PropertyGraph): Promise<Pattern[]> {
    this.logger.info('Detecting patterns in codebase');

    const patterns: Pattern[] = [];

    for (const matcher of this.matchers) {
      const matched = await matcher.match(graph);
      patterns.push(...matched);
    }

    return patterns;
  }

  async findNamingPatterns(graph: PropertyGraph): Promise<Pattern[]> {
    return [];
  }

  async findStructuralPatterns(graph: PropertyGraph): Promise<Pattern[]> {
    return [];
  }

  async findArchitecturalPatterns(graph: PropertyGraph): Promise<Pattern[]> {
    return [];
  }
}
