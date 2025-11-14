/**
 * Parse command - Parse codebase into property graph
 */

import { Command } from 'commander';
import { getContainer } from '../../../../wiring/bootstrap.js';
import { TOKENS } from '../../../../wiring/dependencies.js';
import { createLogger } from '@c3/shared';

export const parseCommand = new Command('parse')
  .description('Parse codebase into property graph')
  .argument('<path>', 'Path to codebase')
  .option('-o, --output <file>', 'Output file for graph')
  .action(async (path: string, options) => {
    const logger = createLogger('CLI:Parse');
    logger.info('Parsing codebase', { path });

    try {
      const container = await getContainer();
      const parsingService = container.get(TOKENS.PARSING_SERVICE);

      const graph = await parsingService.parseCodebase(path);

      console.log(`✅ Parsed successfully`);
      console.log(`  Nodes: ${graph.getNodeCount()}`);
      console.log(`  Edges: ${graph.getEdgeCount()}`);
      console.log(`  Graph ID: ${graph.id}`);
    } catch (error) {
      logger.error('Parse failed', error as Error);
      console.error('❌ Parse failed:', (error as Error).message);
      process.exit(1);
    }
  });
