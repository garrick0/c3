/**
 * Discovery context module - Wires all discovery dependencies
 */

import { Container } from '../Container.js';
import { TOKENS } from '../dependencies.js';
import { createLogger } from '@c3/shared';

// Domain
import { PatternDetectionService } from '../../contexts/discovery/domain/services/PatternDetectionService.js';
import { RuleInferenceService } from '../../contexts/discovery/domain/services/RuleInferenceService.js';
import { DocumentationAnalyzer } from '../../contexts/discovery/domain/services/DocumentationAnalyzer.js';
import { CodebaseResearcher } from '../../contexts/discovery/domain/services/CodebaseResearcher.js';
import { ConfidenceCalculator } from '../../contexts/discovery/domain/services/ConfidenceCalculator.js';

// Infrastructure
import { ClaudeLLMProvider } from '../../contexts/discovery/infrastructure/llm/ClaudeLLMProvider.js';
import { RegexPatternMatcher } from '../../contexts/discovery/infrastructure/pattern-matchers/RegexPatternMatcher.js';
import { InMemoryPatternRepository } from '../../contexts/discovery/infrastructure/persistence/InMemoryPatternRepository.js';

export function registerDiscoveryContext(container: Container): void {
  const logger = createLogger('Discovery');
  const apiKey = process.env.ANTHROPIC_API_KEY || 'mock-key';

  // Register infrastructure
  container.registerSingleton(TOKENS.LLM_PROVIDER, () => new ClaudeLLMProvider(apiKey));
  container.registerSingleton(TOKENS.REGEX_PATTERN_MATCHER, () => new RegexPatternMatcher());
  container.registerSingleton(TOKENS.PATTERN_REPOSITORY, () => new InMemoryPatternRepository());

  // Register domain services
  container.registerSingleton(TOKENS.PATTERN_DETECTION_SERVICE, () =>
    new PatternDetectionService(
      [container.get(TOKENS.REGEX_PATTERN_MATCHER)],
      logger
    )
  );

  container.registerSingleton(TOKENS.RULE_INFERENCE_SERVICE, () =>
    new RuleInferenceService(
      container.get(TOKENS.LLM_PROVIDER),
      logger
    )
  );

  container.registerSingleton('DocumentationAnalyzer', () => new DocumentationAnalyzer(logger));
  container.registerSingleton('CodebaseResearcher', () =>
    new CodebaseResearcher(
      container.get(TOKENS.LLM_PROVIDER),
      logger
    )
  );
  container.registerSingleton('ConfidenceCalculator', () => new ConfidenceCalculator());
}
