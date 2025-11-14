/**
 * Configuration loader with Zod validation
 */

import { z } from 'zod';
import defaultConfig from './default.config.js';
import developmentConfig from './development.config.js';
import productionConfig from './production.config.js';
import testConfig from './test.config.js';

/**
 * Configuration schema
 */
const ConfigSchema = z.object({
  app: z.object({
    name: z.string(),
    version: z.string(),
    environment: z.string()
  }),
  logging: z.object({
    level: z.enum(['debug', 'info', 'warn', 'error']),
    format: z.string()
  }),
  cache: z.object({
    enabled: z.boolean(),
    ttl: z.number()
  }),
  bff: z.object({
    port: z.number(),
    host: z.string(),
    cors: z.object({
      enabled: z.boolean(),
      origins: z.array(z.string())
    })
  }),
  llm: z.object({
    provider: z.string(),
    apiKey: z.string().optional(),
    model: z.string(),
    maxTokens: z.number()
  }),
  parsing: z.object({
    maxFileSize: z.number(),
    ignorePatterns: z.array(z.string())
  }),
  discovery: z.object({
    enabled: z.boolean(),
    confidenceThreshold: z.number()
  })
});

export type AppConfig = z.infer<typeof ConfigSchema>;

/**
 * Load configuration based on environment
 */
export function loadConfig(): AppConfig {
  const env = process.env.NODE_ENV || 'development';

  let envConfig = {};
  switch (env) {
    case 'production':
      envConfig = productionConfig;
      break;
    case 'test':
      envConfig = testConfig;
      break;
    case 'development':
    default:
      envConfig = developmentConfig;
      break;
  }

  // Merge default with environment-specific config
  const merged = {
    ...defaultConfig,
    ...envConfig,
    // Deep merge objects
    app: { ...defaultConfig.app, ...envConfig.app },
    logging: { ...defaultConfig.logging, ...envConfig.logging },
    cache: { ...defaultConfig.cache, ...envConfig.cache },
    bff: {
      ...defaultConfig.bff,
      ...envConfig.bff,
      cors: { ...defaultConfig.bff.cors, ...envConfig.bff?.cors }
    },
    llm: { ...defaultConfig.llm, ...envConfig.llm },
    parsing: { ...defaultConfig.parsing, ...envConfig.parsing },
    discovery: { ...defaultConfig.discovery, ...envConfig.discovery }
  };

  // Validate and return
  return ConfigSchema.parse(merged);
}

/**
 * Global config instance
 */
export const config = loadConfig();
