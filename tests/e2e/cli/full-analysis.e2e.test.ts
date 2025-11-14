/**
 * E2E test: Full analysis flow
 */

import { describe, it, expect } from 'vitest';
import { getContainer } from '../../../wiring/bootstrap.js';
import { TOKENS } from '../../../wiring/dependencies.js';

describe('Full Analysis E2E', () => {
  it('should complete full analysis flow', async () => {
    // Arrange
    const container = await getContainer();
    const parsingService = container.get(TOKENS.PARSING_SERVICE);

    // Act
    const graph = await parsingService.parseCodebase('/test/path');

    // Assert
    expect(graph).toBeDefined();
    expect(graph.getNodeCount()).toBeGreaterThanOrEqual(0);
  });
});
