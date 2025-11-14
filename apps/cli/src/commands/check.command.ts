/**
 * Check command - Check compliance against rules
 */

import { Command } from 'commander';
import { getContainer } from '../../../../wiring/bootstrap.js';
import { TOKENS } from '../../../../wiring/dependencies.js';
import { createLogger } from '@c3/shared';

export const checkCommand = new Command('check')
  .description('Check compliance against rules')
  .argument('<path>', 'Path to codebase')
  .option('--fix', 'Automatically fix violations')
  .action(async (path: string, options) => {
    const logger = createLogger('CLI:Check');
    logger.info('Checking compliance', { path });

    try {
      const container = await getContainer();

      // Parse first
      const parsingService = container.get(TOKENS.PARSING_SERVICE);
      const graph = await parsingService.parseCodebase(path);

      // Check compliance
      const evaluationEngine = container.get(TOKENS.EVALUATION_ENGINE);
      const ruleManagement = container.get(TOKENS.RULE_MANAGEMENT_SERVICE);
      const ruleSets = await ruleManagement.getAllRuleSets();

      const report = await evaluationEngine.evaluate(graph, ruleSets);

      const summary = report.getSummary();

      console.log(`\n📊 Compliance Report`);
      console.log(`  Total Violations: ${summary.totalViolations}`);
      console.log(`  Errors: ${summary.errorCount}`);
      console.log(`  Warnings: ${summary.warningCount}`);
      console.log(`  Info: ${summary.infoCount}`);

      if (report.passed()) {
        console.log(`\n✅ No compliance issues found`);
      } else {
        console.log(`\n❌ Compliance issues found`);
        process.exit(1);
      }
    } catch (error) {
      logger.error('Check failed', error as Error);
      console.error('❌ Check failed:', (error as Error).message);
      process.exit(1);
    }
  });
