# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Real TypeScript/JavaScript parser implementation
- Complete rule evaluator implementations
- Interactive visualizations with D3.js
- Persistent storage (PostgreSQL/SQLite)
- Enhanced Web UI features

## [0.1.0] - 2024-11-14

### Added

#### Architecture
- Modular monolith architecture with 4 bounded contexts
- Clean architecture pattern across all contexts
- Dependency injection with manual container
- Ports & adapters for extensibility

#### Bounded Contexts
- **Parsing Context**: Transform code into property graphs
  - PropertyGraph, Node, Edge entities
  - Filesystem, TypeScript, Python parsers (stubbed)
  - Graph builder and node factory services
- **Compliance Context**: Rules, evaluation, and remediation
  - RuleSet, Evaluation, Remediation aggregates
  - Rule management and evaluation engine
  - Fix generation and whitelist support
- **Projection Context**: Graph transformations and views
  - Module, Layer, Matrix, Component, Tree projections
  - Graph transformer and node aggregator
  - Metrics calculator and layout engine
- **Discovery Context**: AI-powered pattern detection
  - Pattern analysis, rule inference, research aggregates
  - Claude AI integration
  - Pattern detection and confidence scoring

#### Entry Points
- **CLI Application**: 6 commands (parse, check, discover, fix, visualize, init)
- **BFF API**: RESTful endpoints for all contexts
- **Web UI**: React application with Feature-Sliced Design
  - Dashboard, Compliance, Discovery, Projection pages
  - Responsive layout and navigation

#### Infrastructure
- Shared domain abstractions (Codebase, Project, Session, Workspace)
- Base classes (Entity, ValueObject, AggregateRoot)
- Common patterns (Result, Either, Specification)
- Logger, Cache, Metrics services
- Configuration system with Zod validation

#### Configuration
- architecture.config.ts support
- Preset rule sets
- Environment-based configuration
- Config schema validation

#### Testing
- Test infrastructure with builders
- Contract tests for interfaces
- Integration tests for context interactions
- E2E tests for complete flows

#### Documentation
- Architecture overview and bounded context docs
- ADR-001: Modular monolith decision
- Getting started guide
- Context READMEs

### Implementation Notes

This release provides a complete stubbed implementation demonstrating the full architecture. All components are functional with mock data to validate the design before real implementation.

**Statistics**:
- 330+ files created
- ~10,000 lines of code
- 4 bounded contexts
- 3 entry points
- 33 domain entities
- 19 domain services
- 17 ports (interfaces)
- 10 infrastructure adapters

---

[0.1.0]: https://github.com/your-org/c3/releases/tag/v0.1.0
