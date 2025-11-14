/**
 * Test environment configuration
 */

export default {
  logging: {
    level: 'error' // Quiet during tests
  },

  cache: {
    enabled: false // Disable cache in tests
  },

  bff: {
    port: 3002 // Different port for tests
  },

  llm: {
    apiKey: 'test-api-key' // Mock API key for tests
  }
};
