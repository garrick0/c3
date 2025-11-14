/**
 * Test DI Container
 * Specialized container for testing with mock services
 */

import { Container } from '../../wiring/Container.js';
import { TOKENS } from '../../wiring/dependencies.js';

export class TestContainer extends Container {
  /**
   * Register mock services for testing
   */
  registerMocks(): void {
    // Register mock services that can be used in tests
    this.registerSingleton(TOKENS.LOGGER, () => ({
      info: () => {},
      error: () => {},
      warn: () => {},
      debug: () => {}
    }));
  }

  /**
   * Create a clean test container
   */
  static create(): TestContainer {
    const container = new TestContainer();
    container.registerMocks();
    return container;
  }
}
