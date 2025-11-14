/**
 * Integration test: Parsing → Compliance
 */

import { describe, it, expect } from 'vitest';
import { GraphBuilder } from '../../test-utils/builders/GraphBuilder.js';
import { EvaluationEngine } from '../../../contexts/compliance/domain/services/EvaluationEngine.js';
import { createLogger } from '@c3/shared';

describe('Parsing → Compliance Integration', () => {
  it('should evaluate parsed graph', async () => {
    // Arrange
    const graph = new GraphBuilder()
      .withNode('node1', 'test.ts')
      .build();

    const engine = new EvaluationEngine(createLogger('test'));

    // Act
    const report = await engine.evaluate(graph, []);

    // Assert
    expect(report).toBeDefined();
    expect(report.codebaseId).toBe(graph.id);
  });
});
