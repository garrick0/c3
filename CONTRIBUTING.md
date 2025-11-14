# Contributing to C3

Thank you for your interest in contributing to C3! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Assume good intentions

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/your-org/c3/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - System information (OS, Node version, etc.)
   - Error messages and logs

### Suggesting Features

1. Check [Discussions](https://github.com/your-org/c3/discussions) for similar ideas
2. Create a discussion in the "Ideas" category
3. Describe:
   - The problem you're trying to solve
   - Your proposed solution
   - Alternative solutions considered
   - Impact on existing functionality

### Contributing Code

#### 1. Development Setup

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/c3.git
cd c3

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test
```

#### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Test additions/fixes

#### 3. Make Your Changes

Follow our coding standards:

**TypeScript**:
- Use strict mode
- Avoid `any` type
- Export interfaces from domain layer
- Use meaningful variable names
- Add JSDoc to public APIs

**Architecture**:
- Respect bounded context boundaries
- Follow clean architecture layers
- Use ports/adapters for external dependencies
- Domain logic stays in domain layer
- No circular dependencies

**Testing**:
- Write unit tests for domain logic
- Write integration tests for context interactions
- Write E2E tests for complete flows
- Maintain test coverage

#### 4. Test Your Changes

```bash
# Run all tests
npm test

# Run specific test
npm test -- path/to/test.ts

# Type check
npm run typecheck

# Lint
npm run lint
```

#### 5. Commit Your Changes

Follow conventional commits:

```bash
git commit -m "feat(parsing): add Python parser support"
git commit -m "fix(compliance): resolve circular dependency check"
git commit -m "docs: update CLI reference"
```

Format: `<type>(<scope>): <description>`

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `refactor` - Code refactoring
- `test` - Tests
- `chore` - Maintenance

Scopes:
- `parsing`, `compliance`, `projection`, `discovery` - Contexts
- `cli`, `bff`, `web` - Entry points
- `shared`, `wiring`, `config` - Infrastructure

#### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Link to related issue
- Screenshots/GIFs if UI changes
- Test results

## Development Guidelines

### Project Structure

```
c3/
├── contexts/      # Bounded contexts - domain logic
├── apps/          # Entry points - no business logic
├── shared/        # Shared domain/infrastructure
├── wiring/        # Dependency injection
├── config/        # Configuration
├── tests/         # Cross-context tests
└── docs/          # Documentation
```

### Adding a New Feature

#### New Parser

1. Create parser in `contexts/parsing/infrastructure/adapters/`
2. Implement `Parser` interface
3. Add to `parsing.module.ts` registration
4. Add tests
5. Update documentation

#### New Rule Type

1. Add rule type to `compliance/domain/value-objects/RuleType.ts`
2. Create evaluator in `compliance/infrastructure/evaluators/`
3. Implement `EvaluatorStrategy` interface
4. Register in `compliance.module.ts`
5. Add tests
6. Update documentation

#### New Projection Type

1. Create projection entity in `projection/domain/entities/`
2. Extend `Projection` base class
3. Create strategy in `projection/infrastructure/strategies/`
4. Register in `projection.module.ts`
5. Add tests
6. Update documentation

### Testing Requirements

All contributions must include tests:

**Unit Tests** - For domain logic
```typescript
describe('PropertyGraph', () => {
  it('should add nodes', () => {
    const graph = new PropertyGraph('id', metadata);
    graph.addNode(node);
    expect(graph.getNodeCount()).toBe(1);
  });
});
```

**Integration Tests** - For context interactions
```typescript
describe('Parsing → Compliance', () => {
  it('should evaluate parsed graph', async () => {
    const graph = await parsingService.parse(path);
    const report = await evaluationEngine.evaluate(graph, rules);
    expect(report).toBeDefined();
  });
});
```

**Contract Tests** - For interface implementations
```typescript
describe('Parser Contract', () => {
  it('should implement Parser interface', () => {
    expect(parser.parse).toBeDefined();
    expect(parser.supports).toBeDefined();
  });
});
```

### Code Review Process

1. Automated checks must pass (tests, lint, typecheck)
2. At least one maintainer review required
3. Address review feedback
4. Squash commits if requested
5. Maintainer will merge when ready

## Getting Help

- **Questions**: Use [GitHub Discussions](https://github.com/your-org/c3/discussions)
- **Bugs**: Create an [Issue](https://github.com/your-org/c3/issues)
- **Chat**: Join our [Discord](https://discord.gg/your-channel) (if available)

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Thanked in the community

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to C3!** 🙏
