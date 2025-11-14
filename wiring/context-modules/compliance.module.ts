/**
 * Compliance context module - Wires all compliance dependencies
 */

import { Container } from '../Container.js';
import { TOKENS } from '../dependencies.js';
import { createLogger } from '@c3/shared';

// Domain
import { RuleManagementService } from '../../contexts/compliance/domain/services/RuleManagementService.js';
import { EvaluationEngine } from '../../contexts/compliance/domain/services/EvaluationEngine.js';
import { RemediationService } from '../../contexts/compliance/domain/services/RemediationService.js';

// Infrastructure
import { InMemoryRuleRepository } from '../../contexts/compliance/infrastructure/persistence/InMemoryRuleRepository.js';
import { DependencyEvaluator } from '../../contexts/compliance/infrastructure/evaluators/DependencyEvaluator.js';

// Application
import { CheckComplianceUseCase } from '../../contexts/compliance/application/use-cases/CheckCompliance.js';

export function registerComplianceContext(container: Container): void {
  const logger = createLogger('Compliance');

  // Register infrastructure
  container.registerSingleton(TOKENS.RULE_REPOSITORY, () => new InMemoryRuleRepository());
  container.registerSingleton(TOKENS.DEPENDENCY_EVALUATOR, () => new DependencyEvaluator());

  // Register domain services
  container.registerSingleton(TOKENS.RULE_MANAGEMENT_SERVICE, () =>
    new RuleManagementService(
      container.get(TOKENS.RULE_REPOSITORY),
      logger
    )
  );

  container.registerSingleton(TOKENS.EVALUATION_ENGINE, () => new EvaluationEngine(logger));

  container.registerSingleton(TOKENS.REMEDIATION_SERVICE, () => new RemediationService(logger));
}
