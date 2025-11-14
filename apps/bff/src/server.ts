/**
 * Server initialization
 */

import { createApp } from './app.js';
import { getContainer } from '../../../wiring/bootstrap.js';

export async function createServer() {
  // Initialize DI container
  const container = await getContainer();

  // Create Express app with container
  const app = createApp(container);

  return app;
}
