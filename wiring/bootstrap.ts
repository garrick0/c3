/**
 * Application bootstrap
 * Sets up the DI container with all dependencies
 */

import { Container } from './Container.js';
import { TOKENS } from './dependencies.js';
import {
  createLogger,
  createCache,
  createMetrics,
  createConfigurationService,
  createPresetManager,
  LogLevel
} from '../shared/index.js';

/**
 * Bootstrap the application
 * Creates and configures the DI container
 */
export async function bootstrap(): Promise<Container> {
  const container = new Container();

  // Register infrastructure services as singletons
  container.registerSingleton(TOKENS.LOGGER, () =>
    createLogger('c3', LogLevel.INFO)
  );

  container.registerSingleton(TOKENS.CACHE, () => createCache());

  container.registerSingleton(TOKENS.METRICS, () => createMetrics());

  // Register configuration services as singletons
  container.registerSingleton(
    TOKENS.CONFIG_SERVICE,
    () => createConfigurationService()
  );

  container.registerSingleton(
    TOKENS.PRESET_MANAGER,
    () => createPresetManager()
  );

  // Register all context modules
  // Import dynamically to avoid circular dependencies
  const { registerParsingContext } = await import('./context-modules/parsing.module.js');
  const { registerComplianceContext } = await import('./context-modules/compliance.module.js');
  const { registerProjectionContext } = await import('./context-modules/projection.module.js');
  const { registerDiscoveryContext } = await import('./context-modules/discovery.module.js');

  registerParsingContext(container);
  registerComplianceContext(container);
  registerProjectionContext(container);
  registerDiscoveryContext(container);

  return container;
}

/**
 * Global container instance
 * Can be imported by entry points
 */
let globalContainer: Container | undefined;

/**
 * Get or create global container
 */
export async function getContainer(): Promise<Container> {
  if (!globalContainer) {
    globalContainer = await bootstrap();
  }
  return globalContainer;
}

/**
 * Reset global container (useful for testing)
 */
export function resetContainer(): void {
  globalContainer = undefined;
}
