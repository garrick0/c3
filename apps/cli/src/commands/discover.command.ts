/**
 * Discover command - Discover patterns using AI
 */

import { Command } from 'commander';
import { getContainer } from '../../../../wiring/bootstrap.js';
import { TOKENS } from '../../../../wiring/dependencies.js';
import { createLogger } from '@c3/shared';

export const discoverCommand = new Command('discover')
  .description('Discover patterns and infer rules using AI')
  .argument('<path>', 'Path to codebase')
  .option('--accept', 'Automatically accept high-confidence rules')
  .action(async (path: string, options) => {
    const logger = createLogger('CLI:Discover');
    logger.info('Discovering patterns', { path });

    try {
      const container = await getContainer();

      // Parse first
      const parsingService = container.get(TOKENS.PARSING_SERVICE);
      const graph = await parsingService.parseCodebase(path);

      // Detect patterns
      const patternDetection = container.get(TOKENS.PATTERN_DETECTION_SERVICE);
      const patterns = await patternDetection.detectPatterns(graph);

      // Infer rules
      const ruleInference = container.get(TOKENS.RULE_INFERENCE_SERVICE);
      const candidateRules = await ruleInference.inferRules(patterns);

      console.log(`\n🔍 Discovery Results`);
      console.log(`  Patterns Found: ${patterns.length}`);
      console.log(`  Candidate Rules: ${candidateRules.length}`);

      if (candidateRules.length > 0) {
        console.log(`\n📋 Suggested Rules:`);
        candidateRules.forEach(rule => {
          console.log(`  - ${rule.name} (confidence: ${rule.confidence.value.toFixed(2)})`);
        });
      }
    } catch (error) {
      logger.error('Discover failed', error as Error);
      console.error('❌ Discover failed:', (error as Error).message);
      process.exit(1);
    }
  });
