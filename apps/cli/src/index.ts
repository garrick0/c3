#!/usr/bin/env node
/**
 * CLI Entry Point
 */

import { Command } from 'commander';
import { parseCommand } from './commands/parse.command.js';
import { checkCommand } from './commands/check.command.js';
import { discoverCommand } from './commands/discover.command.js';
import { fixCommand } from './commands/fix.command.js';
import { visualizeCommand } from './commands/visualize.command.js';
import { initCommand } from './commands/init.command.js';

const program = new Command();

program
  .name('c3')
  .description('Code Standards Management System')
  .version('0.1.0');

// Register commands
program.addCommand(parseCommand);
program.addCommand(checkCommand);
program.addCommand(discoverCommand);
program.addCommand(fixCommand);
program.addCommand(visualizeCommand);
program.addCommand(initCommand);

// Parse arguments
program.parse();
