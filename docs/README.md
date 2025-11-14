# C3 Documentation

Welcome to the C3 documentation! This guide will help you understand, use, and extend the C3 Code Standards Management System.

## Documentation Structure

### 📚 User Guides
Start here if you're new to C3 or want to accomplish specific tasks.

- **[Getting Started](guides/getting-started.md)** - Installation and first steps
- **[CLI Reference](guides/cli-reference.md)** - Complete command-line reference
- **[Configuration Guide](guides/configuration.md)** - Configure C3 for your project
- **[API Reference](api/rest-api.md)** - REST API documentation
- **[Web UI Guide](guides/web-ui-guide.md)** - Using the web interface
- **[Troubleshooting](guides/troubleshooting.md)** - Common issues and solutions
- **[FAQ](guides/faq.md)** - Frequently asked questions

### 🏗️ Architecture
Understand how C3 is built and why.

- **[Overview](architecture/overview.md)** - System architecture overview
- **[Bounded Contexts](architecture/bounded-contexts.md)** - Domain boundaries and responsibilities
- **[Clean Architecture](architecture/clean-architecture.md)** - Layer separation pattern
- **[Dependency Injection](architecture/dependency-injection.md)** - DI container and wiring
- **[Data Flow](architecture/data-flow.md)** - How data flows through the system
- **[Extensibility](architecture/extensibility.md)** - Extension points and patterns
- **[Architecture Decisions](architecture/decisions/)** - ADRs documenting key decisions

### 🔧 Bounded Contexts
Deep dive into each domain context.

- **[Parsing Context](contexts/parsing/)** - Code parsing and property graphs
- **[Compliance Context](contexts/compliance/)** - Rules, evaluation, and fixes
- **[Projection Context](contexts/projection/)** - Graph transformations and views
- **[Discovery Context](contexts/discovery/)** - AI-powered pattern detection

### 💻 Development
For contributors working on C3.

- **[Development Setup](development/setup.md)** - Set up development environment
- **[Project Structure](development/project-structure.md)** - Codebase tour
- **[Coding Standards](development/coding-standards.md)** - Code style guide
- **[Testing Strategy](development/testing-strategy.md)** - How we test
- **[Debugging](development/debugging.md)** - Debugging tips and tools

### 📖 Examples
Learn by example with tutorials and sample code.

- **[Basic Usage](examples/basic-usage.md)** - Common workflows
- **[Custom Parser](examples/custom-parser.md)** - Write a language parser
- **[Custom Rule](examples/custom-rule.md)** - Define custom rules
- **[Custom Evaluator](examples/custom-evaluator.md)** - Create evaluators
- **[Architecture Configs](examples/architecture-configs/)** - Example configurations
- **[Use Cases](examples/use-cases/)** - Real-world scenarios

## Quick Links

### Common Tasks

- **Install C3**: [Getting Started](guides/getting-started.md#installation)
- **Run first analysis**: [Getting Started](guides/getting-started.md#quick-start)
- **Configure rules**: [Configuration Guide](guides/configuration.md)
- **Add custom parser**: [Custom Parser Example](examples/custom-parser.md)
- **Extend a context**: [Extensibility Guide](architecture/extensibility.md)
- **Report a bug**: [GitHub Issues](https://github.com/your-org/c3/issues)

### For Different Audiences

**👤 End Users** (Using C3 to analyze codebases):
1. [Getting Started](guides/getting-started.md)
2. [CLI Reference](guides/cli-reference.md)
3. [Configuration Guide](guides/configuration.md)
4. [Troubleshooting](guides/troubleshooting.md)

**🏢 Architects** (Configuring standards):
1. [Configuration Guide](guides/configuration.md)
2. [Architecture Configs Examples](examples/architecture-configs/)
3. [Custom Rules Guide](examples/custom-rule.md)

**👨‍💻 Developers** (Extending C3):
1. [Architecture Overview](architecture/overview.md)
2. [Development Setup](development/setup.md)
3. [Project Structure](development/project-structure.md)
4. [Testing Strategy](development/testing-strategy.md)
5. [CONTRIBUTING.md](../CONTRIBUTING.md)

**🔬 Contributors** (Working on C3 codebase):
1. [CONTRIBUTING.md](../CONTRIBUTING.md)
2. [Development Setup](development/setup.md)
3. [Coding Standards](development/coding-standards.md)
4. [Testing Strategy](development/testing-strategy.md)

## Documentation Conventions

### Code Examples

All code examples are:
- Complete and runnable
- Include necessary imports
- Show expected output
- Commented for clarity

### Diagrams

We use [Mermaid](https://mermaid.js.org/) for diagrams, which render automatically on GitHub and in many markdown viewers.

### Links

- Internal links use relative paths
- External links open in new tab (when supported)
- All links are validated

## Contributing to Documentation

Documentation improvements are always welcome!

- Fix typos or unclear explanations
- Add examples
- Improve existing guides
- Write new guides for missing topics

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## Getting Help

- **Documentation Issues**: [GitHub Issues](https://github.com/your-org/c3/issues) with `documentation` label
- **Questions**: [GitHub Discussions](https://github.com/your-org/c3/discussions)
- **Chat**: [Discord](https://discord.gg/your-channel)

---

**Last Updated**: November 14, 2024
**Version**: 0.1.0
