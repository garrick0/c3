// Example architecture configuration file
// This demonstrates how users would configure their code standards

export default {
  version: '1.0',

  // Extend preset rule sets
  extends: ['@c3/recommended'],

  // Define architecture style and structure
  architecture: {
    style: 'clean',
    layers: [
      { name: 'domain', path: 'src/domain' },
      { name: 'application', path: 'src/application' },
      { name: 'infrastructure', path: 'src/infrastructure' },
      { name: 'presentation', path: 'src/presentation' }
    ]
  },

  // Configure rules
  rules: {
    'no-circular-dependencies': 'error',
    'consistent-naming': ['error', { style: 'kebab-case' }],
    'layer-dependencies': ['error', { flow: 'inward' }],

    custom: [
      {
        name: 'no-direct-db-access-from-domain',
        severity: 'error',
        condition: {
          type: 'dependency',
          from: { layer: 'domain' },
          to: { matches: '**/database/**' },
          forbidden: true
        }
      }
    ]
  },

  // Whitelist violations
  whitelist: [
    {
      rule: 'consistent-naming',
      path: 'legacy/**',
      reason: 'Legacy code, will refactor in Q2'
    }
  ],

  // Discovery configuration
  discovery: {
    ignore: ['node_modules', 'dist', 'coverage'],
    hints: {
      'This is a DDD project': true,
      'We use ports and adapters': true
    }
  }
}
