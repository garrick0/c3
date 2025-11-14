/**
 * Development environment configuration
 */

export default {
  logging: {
    level: 'debug'
  },

  bff: {
    cors: {
      enabled: true,
      origins: ['*']
    }
  },

  cache: {
    ttl: 60 // Short TTL for development
  }
};
