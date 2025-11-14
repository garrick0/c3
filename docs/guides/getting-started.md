# Getting Started with C3

## Installation

```bash
# Clone repository
git clone <repository-url>
cd c3

# Run setup script
./scripts/setup.sh

# Update .env with your Claude API key
echo "ANTHROPIC_API_KEY=your_key_here" >> .env
```

## Quick Start

### Using CLI

```bash
# Link CLI globally
cd apps/cli && npm link

# Initialize configuration in your project
cd /path/to/your/project
c3 init

# Discover patterns
c3 discover .

# Check compliance
c3 check .

# Generate visualization
c3 visualize . --type module
```

### Using API

```bash
# Start BFF server
cd apps/bff
npm run dev

# Server runs at http://localhost:3001
```

### Using Web UI

```bash
# Start web frontend
cd apps/web
npm run dev

# UI runs at http://localhost:5173
```

## Basic Workflow

1. **Initialize** - Create `architecture.config.ts` in your project
2. **Discover** - Let AI discover patterns and suggest rules
3. **Configure** - Accept or customize rules
4. **Check** - Run compliance checks
5. **Fix** - Apply automated fixes
6. **Visualize** - Generate analytics and reports

## Configuration

Edit `architecture.config.ts`:

```typescript
export default {
  version: '1.0',
  extends: ['@c3/recommended'],
  architecture: {
    style: 'clean',
    layers: [
      { name: 'domain', path: 'src/domain' },
      { name: 'application', path: 'src/application' }
    ]
  },
  rules: {
    'no-circular-dependencies': 'error',
    'consistent-naming': 'warn'
  }
}
```

## Next Steps

- Read the [Configuration Guide](./configuration.md)
- Learn about [Extending C3](./extending.md)
- Review [CLI Reference](./cli-reference.md)
