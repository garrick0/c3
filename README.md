# C3 - Code Standards Management System

> AI-powered code standards enforcement and architectural compliance tool

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Overview

C3 analyzes codebases to detect patterns, enforce architectural rules, and maintain code standards. It uses AI to discover implicit standards and provides automated remediation strategies.

## Features

### 🔍 **Parse & Analyze**
Transform any codebase into a property graph representation, capturing files, classes, functions, and their relationships.

### 🤖 **AI-Powered Discovery**
Automatically detect patterns and infer architectural rules from your existing codebase using Claude AI.

### ✅ **Compliance Checking**
Evaluate your code against configured rules and architectural standards, catching violations early.

### 📊 **Visual Analytics**
Project your codebase into multiple views: module dependencies, layer diagrams, component graphs, and more.

### 🔧 **Automated Remediation**
Get automated fix suggestions and apply them with confidence.

## Quick Start

### Installation

```bash
# Clone and setup
git clone <repository-url>
cd c3
./scripts/setup.sh

# Configure environment
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

### Using CLI

```bash
# Link CLI globally
cd apps/cli && npm link

# Initialize in your project
cd /path/to/your/project
c3 init

# Discover patterns automatically
c3 discover .

# Check compliance
c3 check .

# Generate visualization
c3 visualize . --type module
```

### Using Web UI

```bash
# Start BFF server
cd apps/bff && npm run dev

# Start web frontend (new terminal)
cd apps/web && npm run dev

# Open http://localhost:5173
```

## Architecture

C3 is built as a **modular monolith** with **4 bounded contexts**:

```
┌─────────────────┐
│  Parsing        │  Transform code → Property Graph
└────────┬────────┘
         │
         ├────────→ ┌──────────────┐
         │          │ Compliance   │  Rules, Evaluation, Fixes
         │          └──────────────┘
         │
         ├────────→ ┌──────────────┐
         │          │ Projection   │  Graph Transformations & Views
         │          └──────────────┘
         │
         └────────→ ┌──────────────┐
                    │ Discovery    │  AI Pattern Detection
                    └──────────────┘
```

Each context follows **Clean Architecture** with clear separation of:
- **Domain Layer** - Business logic and entities
- **Application Layer** - Use cases and orchestration
- **Infrastructure Layer** - External integrations
- **Presentation Layer** - HTTP/CLI interfaces

## Project Structure

```
c3/
├── apps/           # Entry points
│   ├── cli/       # Command-line interface
│   ├── bff/       # Backend-for-Frontend API
│   └── web/       # React web application
├── contexts/       # Bounded contexts (domain logic)
│   ├── parsing/   # Code parsing and graph building
│   ├── compliance/# Rule management and evaluation
│   ├── projection/# Graph transformations
│   └── discovery/ # AI-powered pattern detection
├── shared/         # Shared domain and infrastructure
├── wiring/         # Dependency injection
├── config/         # Configuration management
└── docs/           # Documentation
```

## Key Concepts

### Property Graph
Universal representation of your codebase as nodes (files, classes, functions) and edges (dependencies, calls, imports).

### Rules & Compliance
Define standards as rules, evaluate your code against them, and track violations with configurable severity levels.

### Projections
Transform the property graph into different analytical views: module-level dependencies, architectural layers, component relationships.

### Pattern Discovery
AI analyzes your codebase to detect implicit patterns and suggests rules based on your existing practices.

## Configuration

Create `architecture.config.ts` in your project:

```typescript
export default {
  version: '1.0',
  extends: ['@c3/recommended'],

  architecture: {
    style: 'clean',
    layers: [
      { name: 'domain', path: 'src/domain' },
      { name: 'application', path: 'src/application' },
      { name: 'infrastructure', path: 'src/infrastructure' }
    ]
  },

  rules: {
    'no-circular-dependencies': 'error',
    'consistent-naming': ['warn', { style: 'kebab-case' }],
    'layer-dependencies': ['error', { flow: 'inward' }]
  }
}
```

## Documentation

- **[Getting Started](docs/guides/getting-started.md)** - Installation and first steps
- **[CLI Reference](docs/guides/cli-reference.md)** - Complete command reference
- **[Configuration Guide](docs/guides/configuration.md)** - Config file reference
- **[Architecture Overview](docs/architecture/overview.md)** - System design
- **[API Reference](docs/api/rest-api.md)** - REST API documentation

[Full Documentation →](docs/README.md)

## Development

### Prerequisites
- Node.js 18+
- npm 9+

### Setup Development Environment

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test

# Development mode (watch)
npm run dev
```

### Project Commands

```bash
npm run build        # Build all packages
npm run test         # Run all tests
npm run test:unit    # Unit tests only
npm run test:e2e     # E2E tests only
npm run lint         # Lint code
npm run typecheck    # Type check
```

## Technology Stack

- **TypeScript** - Type-safe codebase
- **Node.js** - Runtime environment
- **Express** - BFF API server
- **React** - Web frontend
- **Vite** - Frontend bundler
- **Vitest** - Testing framework
- **Commander** - CLI framework
- **Zod** - Schema validation
- **Claude AI** - Pattern detection

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details

## Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-org/c3/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/c3/discussions)

## Roadmap

### Current (MVP - v0.1)
- ✅ Core architecture and bounded contexts
- ✅ Property graph parsing
- ✅ Basic compliance checking
- ✅ Pattern discovery with AI
- ✅ CLI, API, and Web interfaces

### Next (v0.2)
- [ ] Real TypeScript/JavaScript parser implementation
- [ ] Complete rule evaluator implementations
- [ ] Interactive visualizations with D3.js
- [ ] Persistent storage (PostgreSQL)
- [ ] Enhanced Web UI

### Future
- [ ] IDE plugins (VS Code, JetBrains)
- [ ] CI/CD integrations
- [ ] Git hooks
- [ ] Multi-language support
- [ ] Custom plugin marketplace

## Acknowledgments

Built with Clean Architecture, Domain-Driven Design, and Feature-Sliced Design principles.

---

**Made with ❤️ for better code quality**
