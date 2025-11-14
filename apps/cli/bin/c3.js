#!/usr/bin/env node

// Import and run the CLI
import('../dist/index.js').catch(err => {
  console.error('Failed to start CLI:', err);
  process.exit(1);
});
