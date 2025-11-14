/**
 * Production environment configuration
 */

export default {
  logging: {
    level: 'warn'
  },

  bff: {
    cors: {
      enabled: true,
      origins: process.env.ALLOWED_ORIGINS?.split(',') || []
    }
  },

  cache: {
    ttl: 3600 // 1 hour
  }
};
