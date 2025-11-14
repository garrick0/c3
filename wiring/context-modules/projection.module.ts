/**
 * Projection context module - Wires all projection dependencies
 */

import { Container } from '../Container.js';
import { TOKENS } from '../dependencies.js';
import { createLogger } from '@c3/shared';

// Domain
import { ProjectionEngine } from '../../contexts/projection/domain/services/ProjectionEngine.js';
import { GraphTransformer } from '../../contexts/projection/domain/services/GraphTransformer.js';
import { NodeAggregator } from '../../contexts/projection/domain/services/NodeAggregator.js';
import { MetricsCalculator } from '../../contexts/projection/domain/services/MetricsCalculator.js';
import { LayoutEngine } from '../../contexts/projection/domain/services/LayoutEngine.js';

// Infrastructure
import { ModuleProjectionStrategy } from '../../contexts/projection/infrastructure/strategies/ModuleProjectionStrategy.js';
import { SVGRenderer } from '../../contexts/projection/infrastructure/renderers/SVGRenderer.js';
import { InMemoryViewRepository } from '../../contexts/projection/infrastructure/persistence/InMemoryViewRepository.js';

export function registerProjectionContext(container: Container): void {
  const logger = createLogger('Projection');

  // Register infrastructure
  container.registerSingleton(TOKENS.VIEW_REPOSITORY, () => new InMemoryViewRepository());

  // Register strategies
  const moduleStrategy = new ModuleProjectionStrategy();

  // Register domain services
  container.registerSingleton(TOKENS.PROJECTION_ENGINE, () =>
    new ProjectionEngine([moduleStrategy], logger)
  );

  container.registerSingleton('GraphTransformer', () => new GraphTransformer());
  container.registerSingleton('NodeAggregator', () => new NodeAggregator());
  container.registerSingleton('MetricsCalculator', () => new MetricsCalculator());
  container.registerSingleton('LayoutEngine', () => new LayoutEngine());
}
