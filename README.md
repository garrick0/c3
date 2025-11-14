# C3 - Code Standards Management System

A modular system for parsing, analyzing, and enforcing code standards across projects.

## Features

- **Parse**: Transform codebases into property graphs
- **Discover**: AI-powered pattern detection and rule inference
- **Evaluate**: Check compliance against architectural rules
- **Visualize**: Project graphs into analytical views
- **Remediate**: Automated fix suggestions and application

## Architecture

C3 is built as a modular monolith with 4 bounded contexts:

1. **Parsing Context**: Code → Property Graph
2. **Compliance Context**: Rules, Evaluation, Fixes
3. **Projection Context**: Graph Transformations & Views
4. **Discovery Context**: AI-Powered Pattern Detection

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run development servers
npm run dev

# Run CLI
cd apps/cli
npm link
c3 --help
```

## Project Structure

```
c3/
├── apps/          # Entry points (CLI, BFF, Web)
├── contexts/      # Bounded contexts
├── shared/        # Shared domain & infrastructure
├── wiring/        # Dependency injection
└── config/        # Configuration management
```

## Documentation

See the `docs/` directory for detailed documentation.
