/**
 * Visualize command - Generate visualizations
 */

import { Command } from 'commander';
import { getContainer } from '../../../../wiring/bootstrap.js';
import { TOKENS } from '../../../../wiring/dependencies.js';
import { createLogger } from '@c3/shared';
import { ProjectionType, AggregationLevel, ViewConfiguration } from '@c3/projection';

export const visualizeCommand = new Command('visualize')
  .description('Generate visualization of codebase')
  .argument('<path>', 'Path to codebase')
  .option('-t, --type <type>', 'Projection type (module|layer|tree)', 'module')
  .option('-o, --output <file>', 'Output file')
  .action(async (path: string, options) => {
    const logger = createLogger('CLI:Visualize');
    logger.info('Generating visualization', { path, type: options.type });

    try {
      const container = await getContainer();

      // Parse first
      const parsingService = container.get(TOKENS.PARSING_SERVICE);
      const graph = await parsingService.parseCodebase(path);

      // Generate projection
      const projectionEngine = container.get(TOKENS.PROJECTION_ENGINE);
      const config = ViewConfiguration.create({
        projectionType: ProjectionType.MODULE,
        aggregationLevel: AggregationLevel.MODULE
      });

      const projection = await projectionEngine.project(graph, config);
      const summary = projection.getSummary();

      console.log(`\n📊 Visualization Generated`);
      console.log(`  Type: ${options.type}`);
      console.log(`  Summary:`, summary);
    } catch (error) {
      logger.error('Visualize failed', error as Error);
      console.error('❌ Visualize failed:', (error as Error).message);
      process.exit(1);
    }
  });
