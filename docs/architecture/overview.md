# C3 Architecture Overview

## System Design

C3 is a modular code standards management system built as a modular monolith with 4 bounded contexts.

## Bounded Contexts

### 1. Parsing Context
Transforms source code into property graphs for analysis.

**Responsibilities**:
- Parse files using language-specific parsers
- Build property graph representation
- Detect nodes and edges (dependencies, relationships)
- Cache parsed results

### 2. Compliance Context
Manages rules, evaluates code, and provides fixes.

**Responsibilities**:
- CRUD operations for rules
- Evaluate code against rules
- Generate violations and reports
- Provide fix strategies
- Manage whitelisted violations

### 3. Projection Context
Transforms graphs into analytical views.

**Responsibilities**:
- Project graphs to different aggregation levels
- Generate module, layer, and component views
- Calculate metrics (coupling, cohesion)
- Render and export visualizations

### 4. Discovery Context
AI-powered pattern detection and rule inference.

**Responsibilities**:
- Detect patterns in codebases
- Infer rules from patterns using LLM
- Analyze documentation
- Research architecture decisions
- Calculate confidence scores

## Architecture Patterns

### Clean Architecture
Each context follows clean architecture:
- **Domain Layer**: Core business logic, entities, services
- **Application Layer**: Use cases, DTOs
- **Infrastructure Layer**: Adapters, repositories
- **Presentation Layer**: Controllers for HTTP/CLI

### Ports & Adapters
- Domain defines ports (interfaces)
- Infrastructure provides adapters (implementations)
- DI container wires them together

### Dependency Injection
- Manual DI container
- Context modules for wiring
- Singleton and transient registration
- Type-safe resolution

## Entry Points

### CLI (`apps/cli`)
Command-line interface for developers.

**Commands**:
- `c3 parse <path>` - Parse codebase
- `c3 check <path>` - Check compliance
- `c3 discover <path>` - Discover patterns
- `c3 fix <path>` - Apply fixes
- `c3 visualize <path>` - Generate visualizations
- `c3 init` - Initialize configuration

### BFF (`apps/bff`)
Backend-for-Frontend API aggregation layer.

**Endpoints**:
- `POST /api/parse` - Parse codebase
- `POST /api/compliance/check` - Check compliance
- `GET /api/compliance/rules` - List rules
- `POST /api/discovery/patterns` - Discover patterns
- `POST /api/projections` - Generate projections

### Web (`apps/web`)
React frontend with Feature-Sliced Design.

**Pages**:
- Dashboard - Overview and quick actions
- Compliance - View violations and rules
- Discovery - Pattern detection and rule suggestions
- Projections - Visualizations and analytics

## Data Flow

```
Code Files
    ↓
[Parsing Context] → Property Graph
    ↓
[Compliance Context] → Violations & Fixes
    ↓
[Projection Context] → Analytical Views
    ↓
[Discovery Context] → Patterns & Candidate Rules
```

## Technology Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Backend**: Express
- **Frontend**: React + Vite
- **AI**: Claude API
- **Testing**: Vitest
- **Build**: TypeScript Compiler

## Configuration

### architecture.config.ts
User-defined configuration for:
- Architecture style (clean, layered, etc.)
- Layer definitions
- Rules and severity
- Whitelisted violations
- Discovery hints

### Application Config
Environment-based configuration in `config/`:
- Server settings
- LLM configuration
- Cache settings
- Logging levels
