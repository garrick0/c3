/**
 * Default configuration for C3
 */

export default {
  // Application
  app: {
    name: 'c3',
    version: '0.1.0',
    environment: process.env.NODE_ENV || 'development'
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'json'
  },

  // Cache
  cache: {
    enabled: process.env.CACHE_ENABLED !== 'false',
    ttl: parseInt(process.env.CACHE_TTL || '3600', 10)
  },

  // BFF Server
  bff: {
    port: parseInt(process.env.BFF_PORT || '3001', 10),
    host: process.env.BFF_HOST || 'localhost',
    cors: {
      enabled: true,
      origins: ['http://localhost:5173']
    }
  },

  // LLM
  llm: {
    provider: 'claude',
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: 'claude-3-sonnet-20240229',
    maxTokens: 4096
  },

  // Parsing
  parsing: {
    maxFileSize: 1024 * 1024, // 1MB
    ignorePatterns: ['node_modules', 'dist', 'coverage', '.git']
  },

  // Discovery
  discovery: {
    enabled: true,
    confidenceThreshold: 0.7
  }
};
