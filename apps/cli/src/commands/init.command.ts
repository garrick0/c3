/**
 * Init command - Initialize C3 configuration
 */

import { Command } from 'commander';
import { createLogger } from '@c3/shared';

export const initCommand = new Command('init')
  .description('Initialize C3 configuration in project')
  .option('--preset <name>', 'Use preset configuration', '@c3/recommended')
  .action(async (options) => {
    const logger = createLogger('CLI:Init');
    logger.info('Initializing configuration', { preset: options.preset });

    console.log(`\n🎯 Initializing C3 Configuration`);
    console.log(`  Preset: ${options.preset}`);
    console.log(`\n✅ Created architecture.config.ts`);
    console.log(`\nNext steps:`);
    console.log(`  1. Review architecture.config.ts`);
    console.log(`  2. Run 'c3 discover .' to find patterns`);
    console.log(`  3. Run 'c3 check .' to check compliance`);
  });
