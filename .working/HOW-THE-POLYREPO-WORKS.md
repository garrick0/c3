# How the C3 Polyrepo Works

**Complete System Overview with Filesystem Visualizations**

---

## Table of Contents

1. [The Big Picture](#the-big-picture)
2. [Filesystem Structure](#filesystem-structure)
3. [How Repositories Fit Together](#how-repositories-fit-together)
4. [Dependency Flow](#dependency-flow)
5. [Development Workflow](#development-workflow)
6. [Package Linking Explained](#package-linking-explained)
7. [Build Process](#build-process)
8. [Import System](#import-system)
9. [Scripts Explained](#scripts-explained)
10. [Real-World Examples](#real-world-examples)

---

## The Big Picture

C3 is now **10 separate Git repositories** that work together as a cohesive system. Each repository is:
- Independently versioned
- Independently buildable
- Independently testable
- Connected through NPM packages

### The 10 Repositories

```
┌─────────────────────────────────────────────────────────┐
│                    C3 ECOSYSTEM                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────┐
│  c3-platform    │  Orchestration (scripts, docs, CI/CD)
└─────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  FOUNDATION LAYER                       │
├─────────────────────────────────────────────────────────┤
│  c3-shared      │  Domain abstractions, Result, Logger  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  CONTEXT LAYER                          │
├────────────────┬────────────────┬────────────────────────┤
│  c3-parsing    │ c3-compliance  │  c3-projection        │
│  Graph builder │ Rule evaluator │  Graph transformer    │
├────────────────┴────────────────┴────────────────────────┤
│  c3-discovery                                           │
│  AI pattern detection                                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  INTEGRATION LAYER                      │
├─────────────────────────────────────────────────────────┤
│  c3-wiring      │  DI Container + Context Registration  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  APPLICATION LAYER                      │
├──────────────┬────────────────┬─────────────────────────┤
│  c3-cli      │   c3-bff       │      c3-web            │
│  Commands    │   REST API     │      React UI          │
└──────────────┴────────────────┴─────────────────────────┘
```

---

## Filesystem Structure

### Your Development Directory

After running `./scripts/setup-dev.sh`, your filesystem looks like this:

```
~/dev/
│
├── c3-platform/                 # 🏗️ Orchestration Hub
│   ├── scripts/                 # 7 automation scripts
│   │   ├── clone-all.sh         # Clone all repos
│   │   ├── setup-dev.sh         # Complete setup
│   │   ├── link-all.sh          # Link packages
│   │   ├── build-all.sh         # Build all
│   │   ├── test-all.sh          # Test all
│   │   ├── publish-all.sh       # Publish to NPM
│   │   └── extract-context.sh   # Extract new contexts
│   ├── docs/
│   │   ├── DEVELOPMENT.md       # Development guide
│   │   ├── PUBLISHING.md        # NPM publishing guide
│   │   └── TROUBLESHOOTING.md   # Problem solving
│   ├── .github/workflows/
│   │   ├── lib-ci.yml           # Library CI template
│   │   └── app-ci.yml           # Application CI template
│   ├── c3.code-workspace        # VS Code workspace (all 10 repos)
│   ├── docker-compose.yml       # Full stack orchestration
│   ├── GETTING-STARTED.md       # Quick start guide
│   └── README.md                # Platform overview
│
├── c3-shared/                   # 📦 Foundation Library
│   ├── src/
│   │   ├── domain/              # Base classes & abstractions
│   │   │   ├── base/            # Entity, ValueObject, AggregateRoot
│   │   │   ├── common/          # Result, Either, Specification
│   │   │   └── core-abstractions/ # Codebase, Project, Session
│   │   ├── infrastructure/      # Logger, Cache, Metrics
│   │   ├── configuration/       # ConfigurationService
│   │   ├── types/               # TypeScript types
│   │   └── index.ts             # Barrel export
│   ├── dist/                    # Built output (gitignored)
│   ├── package.json             # NPM: c3-shared@0.1.0
│   ├── tsconfig.json
│   ├── .github/workflows/ci.yml # CI/CD
│   └── README.md
│
├── c3-parsing/                  # 📦 Parsing Context
│   ├── src/
│   │   ├── domain/              # Clean Architecture: Domain Layer
│   │   │   ├── entities/        # PropertyGraph, Node, Edge
│   │   │   ├── value-objects/   # NodeType, EdgeType, Language
│   │   │   ├── services/        # ParsingService, GraphBuilder
│   │   │   └── ports/           # Parser, GraphRepository interfaces
│   │   ├── application/         # Application Layer
│   │   │   ├── use-cases/       # ParseCodebase, ParseFile
│   │   │   └── dto/             # Request/Response objects
│   │   ├── infrastructure/      # Infrastructure Layer
│   │   │   ├── adapters/        # TypeScriptParser, PythonParser
│   │   │   └── persistence/     # InMemoryGraphRepository
│   │   └── index.ts
│   ├── dist/
│   ├── package.json             # Depends on: c3-shared
│   └── ...
│
├── c3-compliance/               # 📦 Compliance Context
│   ├── src/
│   │   ├── domain/
│   │   │   ├── aggregates/      # RuleSet, ComplianceReport, FixPlan
│   │   │   │   ├── RuleSet/     # Rule, RuleSet, Condition
│   │   │   │   ├── Evaluation/  # Violation, ComplianceReport
│   │   │   │   └── Remediation/ # Fix, FixPlan, FixStrategy
│   │   │   ├── value-objects/   # Severity, RuleType, FixType
│   │   │   ├── services/        # EvaluationEngine, RemediationService
│   │   │   └── ports/           # RuleRepository, EvaluatorStrategy
│   │   ├── application/
│   │   │   └── use-cases/       # CheckCompliance, ApplyFixes
│   │   ├── infrastructure/
│   │   │   ├── evaluators/      # DependencyEvaluator
│   │   │   └── persistence/     # InMemoryRuleRepository
│   │   └── index.ts
│   ├── dist/
│   ├── package.json             # Depends on: c3-shared, c3-parsing
│   └── ...
│
├── c3-projection/               # 📦 Projection Context
│   ├── src/
│   │   ├── domain/
│   │   │   ├── entities/        # Projection (abstract), ModuleProjection
│   │   │   │                    # LayerProjection, ComponentGraph, etc.
│   │   │   ├── value-objects/   # ProjectionType, AggregationLevel
│   │   │   ├── services/        # ProjectionEngine, GraphTransformer
│   │   │   └── ports/           # Renderer, Exporter interfaces
│   │   ├── application/
│   │   │   └── use-cases/       # GenerateProjection
│   │   ├── infrastructure/
│   │   │   ├── strategies/      # ModuleProjectionStrategy
│   │   │   ├── renderers/       # SVGRenderer
│   │   │   └── persistence/     # InMemoryViewRepository
│   │   └── index.ts
│   ├── dist/
│   ├── package.json             # Depends on: c3-shared, c3-parsing
│   └── ...
│
├── c3-discovery/                # 📦 Discovery Context
│   ├── src/
│   │   ├── domain/
│   │   │   ├── aggregates/      # Pattern, CandidateRule, ResearchSession
│   │   │   │   ├── PatternAnalysis/ # Pattern, Evidence, Occurrence
│   │   │   │   ├── RuleInference/   # CandidateRule, Confidence
│   │   │   │   └── Research/        # ResearchSession, Finding
│   │   │   ├── value-objects/   # ConfidenceScore, PatternFrequency
│   │   │   ├── services/        # PatternDetection, RuleInference
│   │   │   └── ports/           # LLMProvider, PatternMatcher
│   │   ├── application/
│   │   │   └── use-cases/       # DiscoverPatterns, InferRules
│   │   ├── infrastructure/
│   │   │   ├── llm/             # ClaudeLLMProvider
│   │   │   ├── pattern-matchers/ # RegexPatternMatcher
│   │   │   └── persistence/     # InMemoryPatternRepository
│   │   └── index.ts
│   ├── dist/
│   ├── package.json             # Depends on: c3-shared, c3-parsing, c3-compliance
│   └── ...
│
├── c3-wiring/                   # 📦 DI Container
│   ├── src/
│   │   ├── Container.ts         # DI container implementation
│   │   ├── bootstrap.ts         # System initialization
│   │   ├── dependencies.ts      # Service tokens
│   │   ├── context-modules/     # Context registration (stubbed)
│   │   │   ├── parsing.module.ts
│   │   │   ├── compliance.module.ts
│   │   │   ├── projection.module.ts
│   │   │   └── discovery.module.ts
│   │   ├── factories/           # Service factories
│   │   │   ├── ParserFactory.ts
│   │   │   ├── EvaluatorFactory.ts
│   │   │   └── RendererFactory.ts
│   │   └── index.ts
│   ├── dist/
│   ├── package.json             # Depends on: all contexts
│   └── ...
│
├── c3-cli/                      # 🖥️ Command-Line App
│   ├── src/
│   │   ├── commands/            # CLI commands
│   │   │   ├── parse.command.ts    # c3 parse
│   │   │   ├── check.command.ts    # c3 check
│   │   │   ├── fix.command.ts      # c3 fix
│   │   │   ├── visualize.command.ts # c3 visualize
│   │   │   ├── discover.command.ts  # c3 discover
│   │   │   └── init.command.ts     # c3 init
│   │   ├── utils/               # CLI utilities
│   │   │   ├── logger.ts        # Console logging
│   │   │   ├── output.ts        # Formatted output
│   │   │   └── spinner.ts       # Loading spinners
│   │   └── index.ts             # Entry point (#!/usr/bin/env node)
│   ├── bin/
│   │   └── c3.js                # Executable
│   ├── dist/
│   ├── package.json             # Depends on: c3-wiring, all contexts
│   ├── .env.example
│   └── ...
│
├── c3-bff/                      # 🌐 Backend API
│   ├── src/
│   │   ├── routes/              # Express routes
│   │   │   ├── parsing.routes.ts    # /api/parsing
│   │   │   ├── compliance.routes.ts # /api/compliance
│   │   │   ├── projection.routes.ts # /api/projection
│   │   │   ├── discovery.routes.ts  # /api/discovery
│   │   │   └── index.ts             # Router aggregation
│   │   ├── middleware/          # Express middleware
│   │   │   ├── error.middleware.ts  # Error handling
│   │   │   └── logging.middleware.ts # Request logging
│   │   ├── aggregators/         # Data aggregation
│   │   │   └── dashboard.aggregator.ts
│   │   ├── app.ts               # Express app setup
│   │   ├── server.ts            # Server creation
│   │   ├── config.ts            # Configuration
│   │   └── index.ts             # Entry point
│   ├── dist/
│   ├── package.json             # Depends on: c3-wiring, all contexts, express
│   ├── .env.example
│   ├── Dockerfile
│   └── ...
│
├── c3-web/                      # 🎨 React Frontend
│   ├── src/
│   │   ├── app/                 # App shell
│   │   │   ├── App.tsx          # Main app with routing
│   │   │   └── styles/
│   │   ├── pages/               # FSD: Pages
│   │   │   ├── dashboard/       # Dashboard page
│   │   │   ├── compliance/      # Compliance page
│   │   │   ├── discovery/       # Discovery page
│   │   │   └── projection/      # Projection page
│   │   ├── widgets/             # FSD: Widgets (composite UI)
│   │   │   ├── compliance-summary/
│   │   │   └── graph-viewer/
│   │   ├── features/            # FSD: Features (business logic)
│   │   │   ├── compliance/
│   │   │   │   ├── api/         # API calls
│   │   │   │   └── ui/          # Feature UI
│   │   │   └── discovery/
│   │   ├── shared/              # FSD: Shared
│   │   │   ├── api/             # HTTP client
│   │   │   └── ui/              # Shared components
│   │   └── main.tsx             # Entry point
│   ├── dist/                    # Vite build output
│   ├── package.json             # No C3 deps (calls BFF API)
│   ├── .env.example
│   ├── Dockerfile
│   ├── index.html
│   └── vite.config.ts
│
└── c3/                          # 📦 Original Monorepo (Archived)
    ├── .working/                # Migration documentation
    ├── README.md                # Redirect to polyrepo
    └── (original code preserved)
```

---

## How Repositories Fit Together

### The Dependency Graph

```
                         User Interaction
                               │
                ┌──────────────┼──────────────┐
                ▼              ▼              ▼
         ┌──────────┐   ┌──────────┐   ┌──────────┐
         │ c3-cli   │   │ c3-bff   │   │ c3-web   │
         │ (binary) │   │ (API)    │   │ (UI)     │
         └─────┬────┘   └─────┬────┘   └─────┬────┘
               │              │              │
               └──────────────┼──────────────┘
                              ▼
                       ┌──────────────┐
                       │  c3-wiring   │  ← Dependency Injection
                       │  (DI)        │
                       └──────┬───────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
         ┌────────────┐ ┌─────────────┐ ┌─────────────┐
         │ c3-parsing │ │c3-compliance│ │c3-projection│
         │            │ │             │ │             │
         └─────┬──────┘ └──────┬──────┘ └──────┬──────┘
               │               │               │
               └───────────────┼───────────────┘
                               ▼
                        ┌──────────────┐
                        │c3-discovery  │
                        └──────┬───────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
         ┌────────────┐ ┌─────────────┐ ┌─────────────┐
         │ c3-parsing │ │c3-compliance│ │  c3-shared  │
         │            │ │             │ │             │
         └─────┬──────┘ └──────┬──────┘ └──────┬──────┘
               │               │               │
               └───────────────┴───────────────┘
                               ▼
                        ┌──────────────┐
                        │  c3-shared   │  ← Everything depends on this
                        └──────────────┘
```

### Dependency Matrix

| Package | Depends On | Depended On By |
|---------|------------|----------------|
| **c3-shared** | None | 8 packages (everything) |
| **c3-parsing** | c3-shared | 5 packages |
| **c3-compliance** | c3-shared, c3-parsing | 3 packages |
| **c3-projection** | c3-shared, c3-parsing | 2 packages |
| **c3-discovery** | c3-shared, c3-parsing, c3-compliance | 2 packages |
| **c3-wiring** | All 5 contexts | 2 packages |
| **c3-cli** | c3-wiring (+ all via wiring) | None |
| **c3-bff** | c3-wiring (+ all via wiring) | c3-web (API) |
| **c3-web** | None (calls BFF API) | None |
| **c3-platform** | None (orchestration only) | N/A |

---

## Dependency Flow

### How Packages Import Each Other

#### Example 1: c3-parsing uses c3-shared

**c3-parsing/src/domain/entities/PropertyGraph.ts:**
```typescript
import { Entity } from 'c3-shared';

export class PropertyGraph extends Entity<string> {
  // PropertyGraph IS-A Entity from c3-shared
}
```

**How this works:**
1. c3-shared is built → creates `dist/index.js` with Entity export
2. c3-parsing is linked to c3-shared via `npm link c3-shared`
3. TypeScript resolves `c3-shared` to `~/dev/c3-shared/dist/index.js`
4. PropertyGraph can extend Entity

#### Example 2: c3-compliance uses c3-parsing

**c3-compliance/src/domain/services/EvaluationEngine.ts:**
```typescript
import { PropertyGraph } from 'c3-parsing';
import { Logger } from 'c3-shared';

export class EvaluationEngine {
  async evaluate(graph: PropertyGraph, rules: RuleSet[]) {
    // Uses PropertyGraph from c3-parsing
    // Uses Logger from c3-shared
  }
}
```

**How this works:**
1. c3-parsing builds and exports PropertyGraph
2. c3-compliance links to c3-parsing: `npm link c3-parsing`
3. c3-compliance can import and use PropertyGraph type

#### Example 3: c3-cli uses everything via c3-wiring

**c3-cli/src/commands/parse.command.ts:**
```typescript
import { bootstrap, TOKENS } from 'c3-wiring';

export const parseCommand = new Command('parse')
  .action(async (path: string) => {
    const container = await bootstrap();
    const parsingService = container.get(TOKENS.PARSING_SERVICE) as any;

    const graph = await parsingService.parseCodebase(path);
    // parsingService is from c3-parsing, accessed via c3-wiring
  });
```

**How this works:**
1. c3-wiring imports all contexts
2. c3-wiring registers services in DI container
3. c3-cli imports bootstrap from c3-wiring
4. c3-cli gets services via container (no direct context imports)

### The npm link Chain

```
Step 1: Build c3-shared
  c3-shared/
    npm run build
    → Creates dist/index.js
    npm link
    → Available globally as 'c3-shared'

Step 2: Build c3-parsing (depends on c3-shared)
  c3-parsing/
    npm link c3-shared
    → node_modules/c3-shared → ~/dev/c3-shared
    npm run build
    → Can import from c3-shared ✅
    → Creates dist/index.js
    npm link
    → Available globally as 'c3-parsing'

Step 3: Build c3-compliance (depends on c3-shared, c3-parsing)
  c3-compliance/
    npm link c3-shared c3-parsing
    → node_modules/c3-shared → ~/dev/c3-shared
    → node_modules/c3-parsing → ~/dev/c3-parsing
    npm run build
    → Can import from both ✅
    → Creates dist/index.js
    npm link
    → Available globally as 'c3-compliance'

Step 4-6: Same pattern for projection, discovery, wiring

Step 7: Build c3-cli (depends on wiring)
  c3-cli/
    npm link c3-wiring
    → Gets wiring + all contexts through wiring
    npm run build
    → Can access all services ✅
    npm link
    → 'c3' command available globally
```

---

## Development Workflow

### Making a Change to c3-parsing

```
┌─────────────────────────────────────────────────────────┐
│ 1. Edit files in c3-parsing                             │
│    ~/dev/c3-parsing/src/domain/entities/Node.ts         │
│    Add new method: getType()                            │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│ 2. Build c3-parsing                                     │
│    cd ~/dev/c3-parsing                                  │
│    npm run build                                        │
│    → Compiles TypeScript                               │
│    → Outputs to dist/                                  │
│    → Updates dist/index.js                             │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Changes automatically available to linked packages   │
│    Because of: npm link c3-parsing                      │
│                                                         │
│    c3-compliance/node_modules/c3-parsing                │
│    → Symlink to ~/dev/c3-parsing                       │
│    → Sees updated dist/index.js immediately            │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│ 4. Test in dependent package                           │
│    cd ~/dev/c3-compliance                               │
│    npm test                                             │
│    → Uses your local c3-parsing changes ✅             │
└─────────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Commit and push                                      │
│    cd ~/dev/c3-parsing                                  │
│    git add .                                            │
│    git commit -m "feat: add getType method to Node"    │
│    git push origin feature/node-get-type               │
│    gh pr create                                         │
└─────────────────────────────────────────────────────────┘
```

### Cross-Package Feature Development

**Scenario:** Add a new node type that needs changes in both parsing and compliance

```
Repository: c3-parsing
├── Branch: feature/custom-node-type
├── Changes:
│   ├── Add NodeType.CUSTOM enum value
│   ├── Update Node entity
│   └── Update TypeScriptParser
└── Commit: "feat: add custom node type support"

Repository: c3-compliance
├── Branch: feature/custom-node-type
├── Changes:
│   ├── Add rules for custom nodes
│   └── Update evaluators
└── Commit: "feat: support custom node type in evaluation"

Pull Requests:
├── PR 1 (c3-parsing): "feat: add custom node type"
│   Body: "Part 1 of 2. See also: garrick0/c3-compliance#XX"
│
└── PR 2 (c3-compliance): "feat: evaluate custom nodes"
    Body: "Part 2 of 2. Depends on: garrick0/c3-parsing#XX"

Testing:
  npm link allows testing both changes together before merging
```

---

## Package Linking Explained

### What is npm link?

npm link creates **symlinks** between packages for local development.

### Visual Explanation

**Without npm link:**
```
c3-compliance/
├── node_modules/
│   └── c3-parsing/           ← Would download from NPM
│       └── dist/             ← Would be published version
```

**With npm link:**
```
c3-compliance/
├── node_modules/
│   └── c3-parsing/           ← SYMLINK to ~/dev/c3-parsing
│       └── (points to)
│           ~/dev/c3-parsing/
│           ├── src/          ← Your local source
│           └── dist/         ← Your local builds
```

### How to Link

```bash
# Step 1: Make package available globally
cd ~/dev/c3-shared
npm link
# Creates: /usr/local/lib/node_modules/c3-shared → ~/dev/c3-shared

# Step 2: Link in dependent package
cd ~/dev/c3-parsing
npm link c3-shared
# Creates: ~/dev/c3-parsing/node_modules/c3-shared → /usr/local/lib/node_modules/c3-shared → ~/dev/c3-shared
```

### The link-all.sh Script

**What it does:**
```bash
#!/bin/bash

# 1. Link c3-shared globally
cd ~/dev/c3-shared && npm link

# 2. Link c3-parsing (depends on shared)
cd ~/dev/c3-parsing
npm link c3-shared      # Use shared
npm link                # Make parsing available

# 3. Link c3-compliance (depends on shared + parsing)
cd ~/dev/c3-compliance
npm link c3-shared c3-parsing  # Use both
npm link                       # Make compliance available

# ... continues for all packages
```

**Result:**
- All packages can see each other's latest builds
- Changes in one package immediately available to others (after rebuild)
- No need to publish to NPM for development

---

## Build Process

### Build Order Matters

Packages must build in **dependency order**:

```
1. c3-shared        (no dependencies)
   ↓ build
2. c3-parsing       (needs c3-shared built)
   ↓ build
3. c3-compliance    (needs c3-shared + c3-parsing built)
   c3-projection    (needs c3-shared + c3-parsing built)  } Can build in parallel
   ↓ build
4. c3-discovery     (needs c3-shared + c3-parsing + c3-compliance built)
   ↓ build
5. c3-wiring        (needs all contexts built)
   ↓ build
6. c3-cli           (needs c3-wiring built)
   c3-bff           (needs c3-wiring built)                } Can build in parallel
   ↓ build
7. c3-web           (no C3 dependencies)
```

### What Happens During Build

**For c3-parsing:**

```
Input:
  c3-parsing/src/
  ├── domain/
  │   ├── entities/
  │   │   └── PropertyGraph.ts
  │   └── services/
  │       └── ParsingService.ts
  ├── application/
  └── infrastructure/

TypeScript Compilation (npm run build):
  1. Read tsconfig.json
  2. Find all .ts files in src/
  3. Resolve imports:
     - 'c3-shared' → node_modules/c3-shared → ~/dev/c3-shared/dist
  4. Type check
  5. Transpile to JavaScript
  6. Generate .d.ts declaration files
  7. Create source maps

Output:
  c3-parsing/dist/
  ├── domain/
  │   ├── entities/
  │   │   ├── PropertyGraph.js
  │   │   ├── PropertyGraph.d.ts      ← Type definitions
  │   │   └── PropertyGraph.js.map    ← Source map
  │   └── services/
  │       └── ParsingService.js
  ├── application/
  ├── infrastructure/
  └── index.js                        ← Main entry point
```

### The build-all.sh Script

```bash
#!/bin/bash

# Build each package in order
for repo in c3-shared c3-parsing c3-compliance ...; do
  cd ../$repo
  npm run build
  # If build fails, script stops (set -e)
done
```

**Why it works:**
- Builds in dependency order
- Each package can import from previously built packages
- Linked packages always have latest builds

---

## Import System

### How Imports Resolve

**Before (Monorepo):**
```typescript
// In contexts/compliance/domain/services/EvaluationEngine.ts
import { PropertyGraph } from '@c3/parsing';
```

Resolved to:
```
@c3/parsing → tsconfig paths → ../../parsing
```

**After (Polyrepo):**
```typescript
// In c3-compliance/src/domain/services/EvaluationEngine.ts
import { PropertyGraph } from 'c3-parsing';
```

Resolves to:
```
c3-parsing
  → node_modules/c3-parsing
  → (symlink) ~/dev/c3-parsing/dist/index.js
  → exports PropertyGraph
```

### Import Path Types

**1. Internal Imports (within same package):**
```typescript
// In c3-parsing/src/domain/services/ParsingService.ts
import { PropertyGraph } from '../entities/PropertyGraph.js';
//                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                            Relative path within c3-parsing
```

**2. External Package Imports:**
```typescript
// In c3-parsing/src/domain/services/ParsingService.ts
import { Logger } from 'c3-shared';
//                     ^^^^^^^^^^
//                     NPM package (linked to ~/dev/c3-shared)
```

**3. Subpath Imports:**
```typescript
// In c3-cli (or external packages)
import { Logger } from 'c3-shared/infrastructure';
//                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                     Uses 'exports' in package.json
```

**Enabled by package.json:**
```json
{
  "name": "c3-shared",
  "exports": {
    ".": "./dist/index.js",
    "./domain": "./dist/domain/index.js",
    "./infrastructure": "./dist/infrastructure/index.js"
  }
}
```

### Import Update Example

**What changed during migration:**

```typescript
// BEFORE (monorepo)
import { Entity } from '@c3/shared';
import { PropertyGraph } from '@c3/parsing';
import { Rule } from '@c3/compliance';

// AFTER (polyrepo)
import { Entity } from 'c3-shared';
import { PropertyGraph } from 'c3-parsing';
import { Rule } from 'c3-compliance';
```

**How we updated:**
```bash
find src -name "*.ts" -exec sed -i '' 's/@c3\/shared/c3-shared/g' {} \;
```

Updated ~500 import statements across all packages.

---

## Scripts Explained

### 1. clone-all.sh

**Purpose:** Clone all 9 C3 repositories from GitHub

**What it does:**
```bash
repos=(c3-shared c3-parsing c3-compliance ...)

for repo in "${repos[@]}"; do
  gh repo clone garrick0/$repo ../$repo
  # Clones to ~/dev/c3-shared, ~/dev/c3-parsing, etc.
done
```

**When to use:** First time setup, or to get missing repos

---

### 2. setup-dev.sh

**Purpose:** Complete development environment setup

**What it does:**
```bash
# 1. Clone all repos (calls clone-all.sh)
./scripts/clone-all.sh

# 2. Install dependencies in each
for repo in c3-shared c3-parsing ...; do
  cd ../$repo
  npm install
done

# 3. Done! Now link and build
```

**When to use:** First time setup

---

### 3. link-all.sh

**Purpose:** Link all packages for local development

**What it does:**
```bash
# Link in dependency order

# 1. Shared (foundation)
cd ~/dev/c3-shared
npm link                    # Make available globally

# 2. Parsing (needs shared)
cd ~/dev/c3-parsing
npm link c3-shared          # Use shared from ~/dev
npm link                    # Make parsing available

# 3. Compliance (needs shared + parsing)
cd ~/dev/c3-compliance
npm link c3-shared c3-parsing
npm link

# ... continues
```

**Creates:**
```
Global links:
  /usr/local/lib/node_modules/
  ├── c3-shared → ~/dev/c3-shared
  ├── c3-parsing → ~/dev/c3-parsing
  └── ...

Local links:
  ~/dev/c3-parsing/node_modules/
  └── c3-shared → /usr/local/lib/node_modules/c3-shared → ~/dev/c3-shared

  ~/dev/c3-compliance/node_modules/
  ├── c3-shared → ~/dev/c3-shared
  └── c3-parsing → ~/dev/c3-parsing
```

**When to use:** After clone, or when links break

---

### 4. build-all.sh

**Purpose:** Build all packages in dependency order

**What it does:**
```bash
repos=(c3-shared c3-parsing c3-compliance ...)

for repo in "${repos[@]}"; do
  cd ../$repo
  npm run build
  # Runs: tsc (TypeScript compiler)
  # Creates: dist/ directory
done
```

**When to use:**
- After initial setup
- After pulling changes from GitHub
- When you want to rebuild everything

---

### 5. test-all.sh

**Purpose:** Run tests in all packages

**What it does:**
```bash
for repo in c3-shared c3-parsing ...; do
  cd ../$repo
  npm test
  # Runs: vitest run
done
```

**When to use:** Before committing, before publishing

---

### 6. publish-all.sh

**Purpose:** Publish all packages to NPM

**What it does:**
```bash
# 1. Verify NPM login
npm whoami

# 2. Build all
./scripts/build-all.sh

# 3. Test all
./scripts/test-all.sh

# 4. Publish in order
for repo in c3-shared c3-parsing ...; do
  cd ../$repo

  # Check if version already published
  if ! npm view $name@$version; then
    npm publish
  fi
done
```

**When to use:** When ready to publish to NPM registry

---

### 7. extract-context.sh

**Purpose:** Extract a new context from monorepo

**What it does:**
```bash
# Usage: ./extract-context.sh compliance "Description"

# 1. Create GitHub repo
gh repo create garrick0/c3-compliance

# 2. Clone locally
git clone ...

# 3. Copy from monorepo
cp -r ~/dev/c3/contexts/compliance/* .

# 4. Reorganize to src/
mkdir src && mv domain application infrastructure src/

# 5. Update imports (@c3/* → c3-*)
find src -name "*.ts" -exec sed ...

# 6. Create package.json, tsconfig.json
# 7. Copy .gitignore, .npmignore, CI/CD
# 8. Install, link, build
# 9. Commit and push
```

**When to use:** Extracting new contexts (already used for 3 contexts in Phase 2)

---

## Real-World Examples

### Example 1: Implementing Real TypeScript Parser

**Goal:** Replace stub TypeScriptParser with real implementation

**Steps:**

1. **Work in c3-parsing:**
   ```bash
   cd ~/dev/c3-parsing
   git checkout -b feature/real-typescript-parser
   ```

2. **Install dependencies:**
   ```bash
   npm install @babel/parser @babel/traverse
   ```

3. **Edit TypeScriptParser:**
   ```bash
   # Edit: src/infrastructure/adapters/TypeScriptParser.ts
   # Replace stub with real parsing using @babel/parser
   ```

4. **Build:**
   ```bash
   npm run build
   ```

5. **Test in CLI:**
   ```bash
   cd ~/dev/c3-cli
   c3 parse ~/dev/c3-shared
   # Uses your new parser implementation ✅
   ```

6. **Commit and PR:**
   ```bash
   cd ~/dev/c3-parsing
   git add .
   git commit -m "feat: implement real TypeScript parser using Babel"
   git push origin feature/real-typescript-parser
   gh pr create --title "feat: Real TypeScript Parser"
   ```

---

### Example 2: Adding a New Rule Type

**Goal:** Add support for "performance" rules

**Requires changes in:** c3-compliance only

**Steps:**

1. **Work in c3-compliance:**
   ```bash
   cd ~/dev/c3-compliance
   git checkout -b feature/performance-rules
   ```

2. **Add to RuleType enum:**
   ```typescript
   // src/domain/value-objects/RuleType.ts
   export enum RuleType {
     ARCHITECTURAL,
     DEPENDENCY,
     NAMING,
     PERFORMANCE  // ← New
   }
   ```

3. **Create evaluator:**
   ```typescript
   // src/infrastructure/evaluators/PerformanceEvaluator.ts
   export class PerformanceEvaluator implements EvaluatorStrategy {
     async evaluate(graph: PropertyGraph, rule: Rule): Promise<Violation[]> {
       // Implementation
     }
   }
   ```

4. **Build and test:**
   ```bash
   npm run build
   npm test
   ```

5. **Test in CLI:**
   ```bash
   cd ~/dev/c3-cli
   c3 check ~/dev/c3-shared --rules performance
   ```

6. **Commit:**
   ```bash
   cd ~/dev/c3-compliance
   git add .
   git commit -m "feat: add performance rule type"
   git push origin feature/performance-rules
   gh pr create
   ```

**No other repos affected!** This is the benefit of polyrepo - isolated changes.

---

### Example 3: Working Across Multiple Contexts

**Goal:** Add "confidence score" to violations that comes from discovery patterns

**Requires changes in:**
- c3-discovery (generate confidence)
- c3-compliance (store confidence on violation)
- c3-cli (display confidence)

**Steps:**

1. **Start in c3-discovery:**
   ```bash
   cd ~/dev/c3-discovery
   git checkout -b feature/violation-confidence

   # Add getConfidenceScore() to Pattern
   npm run build
   npm link  # Make available
   ```

2. **Move to c3-compliance:**
   ```bash
   cd ~/dev/c3-compliance
   git checkout -b feature/violation-confidence

   # Link updated c3-discovery
   npm link c3-discovery

   # Add confidence field to Violation
   # Import Pattern from c3-discovery
   npm run build
   npm link  # Make available
   ```

3. **Move to c3-cli:**
   ```bash
   cd ~/dev/c3-cli
   git checkout -b feature/violation-confidence

   # Link updated c3-compliance
   npm link c3-compliance

   # Update check command to display confidence
   npm run build
   ```

4. **Test integrated change:**
   ```bash
   c3 check ~/dev/c3-shared
   # Shows confidence scores ✅
   ```

5. **Create 3 PRs:**
   ```bash
   # PR 1: c3-discovery
   cd ~/dev/c3-discovery
   gh pr create --title "feat: add confidence scoring to patterns" \
     --body "Part 1/3. See also: garrick0/c3-compliance#XX, garrick0/c3-cli#XX"

   # PR 2: c3-compliance
   cd ~/dev/c3-compliance
   gh pr create --title "feat: add confidence to violations" \
     --body "Part 2/3. Depends on: garrick0/c3-discovery#XX"

   # PR 3: c3-cli
   cd ~/dev/c3-cli
   gh pr create --title "feat: display violation confidence" \
     --body "Part 3/3. Depends on: garrick0/c3-compliance#XX"
   ```

**Merge order:** discovery → compliance → cli

---

## How the System Works at Runtime

### CLI Execution Flow

```
User runs: c3 parse /path/to/code

1. CLI Entry Point
   c3-cli/dist/index.js
   ├── Loads Commander
   └── Registers commands

2. Parse Command
   c3-cli/dist/commands/parse.command.js
   ├── Imports: bootstrap from 'c3-wiring'
   ├── Calls: bootstrap()
   └── Gets: ParsingService from container

3. Wiring Bootstrap
   c3-wiring/dist/bootstrap.js
   ├── Creates: Container
   ├── Registers: Parsing context
   ├── Registers: Compliance context
   ├── Registers: Projection context
   └── Registers: Discovery context

4. Container Resolution
   c3-wiring/dist/Container.js
   ├── get(TOKENS.PARSING_SERVICE)
   └── Returns: ParsingService instance

5. Parsing Service (from c3-parsing)
   c3-parsing/dist/domain/services/ParsingService.js
   ├── Uses: TypeScriptParser from c3-parsing/infrastructure
   ├── Uses: Logger from c3-shared
   ├── Creates: PropertyGraph from c3-parsing/domain
   └── Returns: graph

6. Back to CLI
   c3-cli/dist/commands/parse.command.js
   ├── Receives: PropertyGraph
   ├── Formats: output with chalk
   └── Displays: to user
```

### API Request Flow

```
User visits: http://localhost:5173/compliance

1. React App (c3-web)
   src/pages/compliance/CompliancePage.tsx
   ├── Renders: UI
   └── Calls: API via fetch

2. HTTP Request
   GET http://localhost:3001/api/compliance/check
   ├── From: c3-web (browser)
   └── To: c3-bff (server)

3. BFF Router (c3-bff)
   src/routes/compliance.routes.ts
   ├── Receives: Express request
   ├── Gets: EvaluationEngine from container
   └── Calls: evaluationEngine.evaluate()

4. Evaluation Engine (from c3-compliance)
   c3-compliance/dist/domain/services/EvaluationEngine.js
   ├── Receives: PropertyGraph, Rules
   ├── Evaluates: Graph against rules
   └── Returns: ComplianceReport

5. BFF Response
   c3-bff/dist/routes/compliance.routes.ts
   ├── Formats: ComplianceReport as JSON
   └── Sends: res.json(report)

6. React App
   src/pages/compliance/CompliancePage.tsx
   ├── Receives: JSON response
   ├── Updates: React state
   └── Renders: Violations in UI
```

---

## Package.json Deep Dive

### c3-shared (Foundation)

```json
{
  "name": "c3-shared",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",        ← Entry point
  "types": "./dist/index.d.ts",     ← TypeScript types
  "exports": {                      ← Subpath exports
    ".": "./dist/index.js",
    "./domain": "./dist/domain/index.js",
    "./infrastructure": "./dist/infrastructure/index.js"
  },
  "files": ["dist/", "README.md"],  ← What gets published to NPM
  "dependencies": {
    "zod": "^3.22.4"                ← External dependency
  },
  "devDependencies": {              ← Build-time only
    "typescript": "^5.3.3",
    "vitest": "^1.0.4"
  }
}
```

**No C3 dependencies** - This is the foundation

---

### c3-parsing (Context)

```json
{
  "name": "c3-parsing",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./domain": "./dist/domain/index.js",
    "./application": "./dist/application/index.js",
    "./infrastructure": "./dist/infrastructure/index.js"
  },
  "dependencies": {
    "c3-shared": "^0.1.0"           ← Depends on c3-shared
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "vitest": "^1.0.4"
  }
}
```

**In development:** `c3-shared` is linked (symlink to ~/dev/c3-shared)
**When published:** `c3-shared` would install from NPM

---

### c3-wiring (Integration)

```json
{
  "name": "c3-wiring",
  "dependencies": {
    "c3-shared": "^0.1.0",
    "c3-parsing": "^0.1.0",
    "c3-compliance": "^0.1.0",
    "c3-projection": "^0.1.0",
    "c3-discovery": "^0.1.0"
  }
}
```

**Depends on all contexts** - Registers them in DI container

---

### c3-cli (Application)

```json
{
  "name": "c3-cli",
  "bin": {
    "c3": "./dist/index.js"         ← Executable entry point
  },
  "dependencies": {
    "c3-wiring": "^0.1.0",          ← Only direct dependency
    "commander": "^11.1.0",         ← CLI framework
    "chalk": "^5.3.0",              ← Colors
    "ora": "^7.0.1"                 ← Spinners
  }
}
```

**CLI only imports c3-wiring** - Gets everything else through DI

---

### c3-web (Frontend)

```json
{
  "name": "c3-web",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1"
  }
}
```

**No C3 dependencies!** - Communicates with BFF via HTTP API

---

## Directory Structure Comparison

### Single Package Detail: c3-parsing

```
c3-parsing/
│
├── .github/workflows/           # CI/CD
│   └── ci.yml                   # Auto-build, test, publish
│
├── src/                         # Source code
│   ├── domain/                  # Domain layer (business logic)
│   │   ├── entities/            # Core domain objects
│   │   │   ├── PropertyGraph.ts # Main aggregate
│   │   │   ├── Node.ts          # Graph node
│   │   │   ├── Edge.ts          # Graph edge
│   │   │   └── FileInfo.ts      # File metadata
│   │   ├── value-objects/       # Immutable values
│   │   │   ├── NodeType.ts      # Enum
│   │   │   ├── EdgeType.ts      # Enum
│   │   │   ├── Language.ts      # Enum
│   │   │   └── FilePath.ts      # Value object
│   │   ├── services/            # Domain services
│   │   │   ├── ParsingService.ts   # Main orchestrator
│   │   │   ├── GraphBuilder.ts     # Graph construction
│   │   │   ├── NodeFactory.ts      # Node creation
│   │   │   └── EdgeDetector.ts     # Relationship detection
│   │   └── ports/               # Interfaces (Hexagonal Architecture)
│   │       ├── Parser.ts           # Parser interface
│   │       ├── GraphRepository.ts  # Repository interface
│   │       └── FileSystem.ts       # File system interface
│   │
│   ├── application/             # Application layer (use cases)
│   │   ├── use-cases/           # Business operations
│   │   │   ├── ParseCodebase.ts    # Main use case
│   │   │   ├── ParseFile.ts        # Single file parsing
│   │   │   ├── GetPropertyGraph.ts # Retrieve graph
│   │   │   ├── UpdateGraph.ts      # Incremental update
│   │   │   └── ClearCache.ts       # Cache management
│   │   └── dto/                 # Data Transfer Objects
│   │       ├── ParseRequest.dto.ts
│   │       ├── GraphResponse.dto.ts
│   │       └── ParseOptions.dto.ts
│   │
│   ├── infrastructure/          # Infrastructure layer (external concerns)
│   │   ├── adapters/            # Port implementations
│   │   │   ├── TypeScriptParser.ts  # TS parsing (STUB)
│   │   │   ├── PythonParser.ts      # Python parsing (STUB)
│   │   │   ├── FilesystemParser.ts  # File listing
│   │   │   └── NodeFileSystem.ts    # Node.js fs wrapper
│   │   └── persistence/         # Data storage
│   │       └── InMemoryGraphRepository.ts  # In-memory storage
│   │
│   └── index.ts                 # Public API (barrel export)
│
├── dist/                        # Compiled output (gitignored)
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── PropertyGraph.js
│   │   │   ├── PropertyGraph.d.ts     # TypeScript declarations
│   │   │   ├── PropertyGraph.js.map   # Source maps
│   │   │   └── ...
│   │   └── ...
│   ├── application/
│   ├── infrastructure/
│   └── index.js                 # Built entry point
│
├── node_modules/                # Dependencies (gitignored)
│   └── c3-shared/               # Symlink → ~/dev/c3-shared
│
├── package.json                 # Package configuration
├── package-lock.json            # Locked dependencies
├── tsconfig.json                # TypeScript configuration
├── tsconfig.tsbuildinfo         # TS incremental build cache
├── .gitignore                   # Git ignore rules
├── .npmignore                   # NPM publish ignore rules
└── README.md                    # Package documentation
```

---

## How Repositories Fit Together

### Scenario: User Runs `c3 check ./my-project`

**The Journey of a Request:**

```
┌──────────────────────────────────────────────────────────────┐
│ 1. User Terminal                                             │
│    $ c3 check ./my-project                                   │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. c3-cli (~/dev/c3-cli/dist/index.js)                      │
│    - Executable installed via: npm link                      │
│    - Location: /usr/local/bin/c3 → ~/dev/c3-cli/dist/index.js│
│    - Commander parses: 'check' command                       │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ 3. Check Command (c3-cli/dist/commands/check.command.js)    │
│    import { bootstrap, TOKENS } from 'c3-wiring';            │
│    - Resolves: c3-wiring → ~/dev/c3-wiring/dist/index.js   │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ 4. Wiring Bootstrap (c3-wiring/dist/bootstrap.js)           │
│    - Creates: Container                                      │
│    - Calls: registerParsingContext(container)               │
│    - Calls: registerComplianceContext(container)            │
│    - Returns: Fully configured container                    │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ 5. Get Services (via Container)                             │
│    const parsingService = container.get(TOKENS.PARSING)     │
│    const evaluationEngine = container.get(TOKENS.EVALUATION)│
│                                                              │
│    - TOKENS.PARSING resolves to c3-parsing services         │
│    - TOKENS.EVALUATION resolves to c3-compliance services   │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ 6. Parse Phase (c3-parsing/dist/domain/services/...)        │
│    const graph = await parsingService.parseCodebase(path)   │
│    - Calls: TypeScriptParser.parse()                        │
│    - Calls: PythonParser.parse()                            │
│    - Calls: FilesystemParser.parse()                        │
│    - Builds: PropertyGraph (c3-parsing/domain/entities)     │
│    - Uses: Logger from c3-shared                            │
│    - Returns: PropertyGraph instance                        │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ 7. Evaluation Phase (c3-compliance/dist/domain/services/)   │
│    const report = await evaluationEngine.evaluate(graph)    │
│    - Loads: Rules from config                               │
│    - Calls: DependencyEvaluator.evaluate()                  │
│    - Creates: Violation instances                           │
│    - Builds: ComplianceReport (aggregate)                   │
│    - Returns: ComplianceReport                              │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ 8. Output (back in c3-cli/commands/check.command.js)        │
│    - Formats: ComplianceReport                              │
│    - Uses: chalk for colors                                 │
│    - Displays: Violations to console                        │
└──────────────────────────────────────────────────────────────┘
```

**Packages involved:**
1. c3-cli (entry point)
2. c3-wiring (DI bootstrap)
3. c3-parsing (parse code → graph)
4. c3-compliance (evaluate graph → violations)
5. c3-shared (Logger, Result types used throughout)

---

## Import Resolution Visual

### How `import { Logger } from 'c3-shared'` Resolves

```
Code:
  c3-parsing/src/domain/services/ParsingService.ts
  import { Logger } from 'c3-shared';
                          ^^^^^^^^^^

TypeScript Compilation:
  1. Looks in: c3-parsing/node_modules/c3-shared
  2. Finds: Symlink → ~/dev/c3-shared
  3. Reads: ~/dev/c3-shared/package.json
     {
       "main": "./dist/index.js",
       "types": "./dist/index.d.ts"
     }
  4. Loads types from: ~/dev/c3-shared/dist/index.d.ts
  5. Type checks: Logger ✅
  6. Compiles to: import { Logger } from 'c3-shared';

Runtime (Node.js):
  1. import 'c3-shared'
  2. Resolves: node_modules/c3-shared → ~/dev/c3-shared
  3. Loads: ~/dev/c3-shared/dist/index.js
  4. Executes: Logger class from c3-shared
  5. Returns: Logger constructor ✅

Result:
  ParsingService can use Logger from c3-shared
```

### The Symlink Chain

```
c3-parsing/node_modules/c3-shared
  ↓ (symlink)
/usr/local/lib/node_modules/c3-shared
  ↓ (symlink)
~/dev/c3-shared
  ├── dist/index.js           ← JavaScript code
  └── dist/index.d.ts         ← TypeScript types
```

**Why this works:**
1. `npm link` creates global symlink
2. `npm link c3-shared` creates local symlink
3. Node.js follows symlinks transparently
4. TypeScript reads .d.ts files for types

---

## The Build Pipeline

### Complete Build Flow

```
┌────────────────────────────────────────────────────────────┐
│ 1. Build c3-shared                                         │
│    cd ~/dev/c3-shared                                      │
│    npm run build                                           │
│    ────────────────────────────────────────────            │
│    Input:  src/**/*.ts                                     │
│    Process: TypeScript Compiler (tsc)                      │
│    Output: dist/**/*.js + .d.ts + .js.map                 │
│    Time:   ~5 seconds                                      │
└────────────────────┬───────────────────────────────────────┘
                     ▼
┌────────────────────────────────────────────────────────────┐
│ 2. Build c3-parsing                                        │
│    cd ~/dev/c3-parsing                                     │
│    npm run build                                           │
│    ────────────────────────────────────────────            │
│    Imports: c3-shared from node_modules/c3-shared         │
│             (symlink → ~/dev/c3-shared/dist)              │
│    Process: TypeScript reads c3-shared/dist/index.d.ts    │
│    Output: dist/**/*.js + .d.ts                           │
│    Time:   ~8 seconds                                      │
└────────────────────┬───────────────────────────────────────┘
                     ▼
┌────────────────────────────────────────────────────────────┐
│ 3. Build c3-compliance (parallel with projection)         │
│    cd ~/dev/c3-compliance                                  │
│    npm run build                                           │
│    ────────────────────────────────────────────            │
│    Imports: c3-shared, c3-parsing                          │
│    Process: TypeScript resolves both via symlinks         │
│    Output: dist/**/*.js + .d.ts                           │
│    Time:   ~7 seconds                                      │
└────────────────────┬───────────────────────────────────────┘
                     ▼
┌────────────────────────────────────────────────────────────┐
│ 4. Build c3-discovery                                      │
│    cd ~/dev/c3-discovery                                   │
│    npm run build                                           │
│    ────────────────────────────────────────────            │
│    Imports: c3-shared, c3-parsing, c3-compliance           │
│    Process: TypeScript resolves 3 packages via symlinks   │
│    Output: dist/**/*.js + .d.ts                           │
│    Time:   ~7 seconds                                      │
└────────────────────┬───────────────────────────────────────┘
                     ▼
┌────────────────────────────────────────────────────────────┐
│ 5. Build c3-wiring                                         │
│    cd ~/dev/c3-wiring                                      │
│    npm run build                                           │
│    ────────────────────────────────────────────            │
│    Imports: All 5 contexts                                 │
│    Process: TypeScript resolves all via symlinks          │
│    Output: dist/**/*.js + .d.ts                           │
│    Time:   ~5 seconds                                      │
└────────────────────┬───────────────────────────────────────┘
                     ▼
┌────────────────────────────────────────────────────────────┐
│ 6. Build c3-cli                                            │
│    cd ~/dev/c3-cli                                         │
│    npm run build                                           │
│    ────────────────────────────────────────────            │
│    Imports: c3-wiring (gets contexts transitively)         │
│    Process: TypeScript resolves via symlink               │
│    Output: dist/**/*.js (executable)                      │
│    Special: Adds #!/usr/bin/env node to dist/index.js     │
│    Time:   ~6 seconds                                      │
└────────────────────┬───────────────────────────────────────┘
                     ▼
┌────────────────────────────────────────────────────────────┐
│ 7. Build c3-bff (parallel with cli)                       │
│    Similar to CLI                                          │
│    Time: ~6 seconds                                        │
└────────────────────┬───────────────────────────────────────┘
                     ▼
┌────────────────────────────────────────────────────────────┐
│ 8. Build c3-web                                            │
│    cd ~/dev/c3-web                                         │
│    npm run build                                           │
│    ────────────────────────────────────────────            │
│    Process: tsc (type check) + vite build (bundle)        │
│    Output: dist/index.html + bundled JS/CSS               │
│    Size: 168KB (gzipped: 54KB)                            │
│    Time: ~10 seconds                                       │
└────────────────────────────────────────────────────────────┘

Total Time: ~2 minutes (60 seconds)
```

---

## Package Exports and Imports

### What Each Package Exports

**c3-shared exports:**
```typescript
// dist/index.js exports:
export * from './domain/base/Entity.js';
export * from './domain/base/ValueObject.js';
export * from './domain/base/AggregateRoot.js';
export * from './domain/common/Result.js';
export * from './domain/common/Either.js';
export * from './domain/core-abstractions/Codebase.js';
export * from './infrastructure/Logger.js';
export * from './infrastructure/Cache.js';
// ... etc
```

**c3-parsing exports:**
```typescript
// dist/index.js exports:
export * from './domain/entities/PropertyGraph.js';
export * from './domain/entities/Node.js';
export * from './domain/entities/Edge.js';
export * from './domain/services/ParsingService.js';
export * from './application/use-cases/ParseCodebase.js';
// ... etc
```

**c3-wiring exports:**
```typescript
// dist/index.js exports:
export * from './Container.js';
export * from './bootstrap.js';
export * from './dependencies.js';  // TOKENS
export * from './factories/ParserFactory.js';
// ... etc
```

### What Each Package Imports

**c3-parsing imports:**
```typescript
import { Entity, Logger, Result } from 'c3-shared';
// That's it! Only depends on shared
```

**c3-compliance imports:**
```typescript
import { Entity, Logger } from 'c3-shared';
import { PropertyGraph, Node } from 'c3-parsing';
// Depends on shared + parsing
```

**c3-cli imports:**
```typescript
import { bootstrap, TOKENS } from 'c3-wiring';
import { Command } from 'commander';
import chalk from 'chalk';
// Only imports wiring (gets contexts via DI)
```

**c3-web imports:**
```typescript
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// No C3 imports! Calls BFF via fetch()
```

---

## The VS Code Workspace

### What c3.code-workspace Does

**File location:** `~/dev/c3-platform/c3.code-workspace`

**When you run:** `code c3.code-workspace`

**What happens:**
```
VS Code opens with 10 folders in a single window:

EXPLORER
├── 🏗️ Platform       (~/dev/c3-platform)
├── 📦 Shared         (~/dev/c3-shared)
├── 📦 Parsing        (~/dev/c3-parsing)
├── 📦 Compliance     (~/dev/c3-compliance)
├── 📦 Projection     (~/dev/c3-projection)
├── 📦 Discovery      (~/dev/c3-discovery)
├── 📦 Wiring         (~/dev/c3-wiring)
├── 🖥️ CLI           (~/dev/c3-cli)
├── 🌐 BFF           (~/dev/c3-bff)
└── 🎨 Web           (~/dev/c3-web)
```

**Benefits:**
- ✅ Search across all repos
- ✅ Global find/replace
- ✅ Unified Git panel
- ✅ Cross-repo references work
- ✅ IntelliSense across packages

**Workspace configuration:**
```json
{
  "folders": [
    { "name": "🏗️ Platform", "path": "." },
    { "name": "📦 Shared", "path": "../c3-shared" },
    // ... all 10 repos
  ],
  "settings": {
    "typescript.tsdk": "node_modules/typescript/lib",
    "files.exclude": {
      "**/node_modules": true,  // Hide noise
      "**/dist": true
    }
  }
}
```

---

## Docker Compose Explained

### What docker-compose.yml Does

**File location:** `~/dev/c3-platform/docker-compose.yml`

**When you run:** `docker-compose up`

**What happens:**

```
┌────────────────────────────────────────────────────────────┐
│ Docker Compose Orchestration                               │
└────────────────────────────────────────────────────────────┘

Service 1: bff
  ├── Build: ~/dev/c3-bff/Dockerfile
  │   ├── FROM node:18-alpine
  │   ├── COPY package.json
  │   ├── RUN npm ci
  │   ├── COPY src/
  │   └── RUN npm run build
  ├── Port: 3001:3001
  ├── Environment:
  │   ├── PORT=3001
  │   ├── HOST=0.0.0.0
  │   └── CORS_ORIGIN=http://localhost:5173
  ├── Volume: ~/dev/c3-bff:/app (hot reload)
  └── Command: npm run dev

Service 2: web
  ├── Build: ~/dev/c3-web/Dockerfile
  │   ├── FROM node:18-alpine
  │   ├── COPY package.json
  │   ├── RUN npm ci
  │   ├── COPY src/
  │   └── RUN npm run build
  ├── Port: 5173:5173
  ├── Environment:
  │   └── VITE_API_URL=http://localhost:3001
  ├── Volume: ~/dev/c3-web:/app (hot reload)
  ├── Depends: bff (starts after bff)
  └── Command: npm run dev
```

**Result:**
- BFF available at: http://localhost:3001
- Web available at: http://localhost:5173
- Code changes trigger hot reload
- No manual service management

---

## Complete System Architecture

### Layered View

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                      │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │   c3-web    │  │    c3-bff    │  │     c3-cli      │   │
│  │  (React UI) │  │ (Express API)│  │ (Commander CLI) │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
└────────────────────────────┬────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                     INTEGRATION LAYER                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              c3-wiring (DI Container)                 │  │
│  │  - Registers all contexts                            │  │
│  │  - Provides bootstrap()                              │  │
│  │  - Manages service lifecycle                         │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      DOMAIN LAYER                           │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ c3-parsing  │  │c3-compliance │  │ c3-projection   │   │
│  │ ┌─────────┐ │  │ ┌──────────┐ │  │ ┌─────────────┐ │   │
│  │ │ Domain  │ │  │ │ Domain   │ │  │ │   Domain    │ │   │
│  │ ├─────────┤ │  │ ├──────────┤ │  │ ├─────────────┤ │   │
│  │ │  App    │ │  │ │   App    │ │  │ │     App     │ │   │
│  │ ├─────────┤ │  │ ├──────────┤ │  │ ├─────────────┤ │   │
│  │ │ Infra   │ │  │ │  Infra   │ │  │ │    Infra    │ │   │
│  │ └─────────┘ │  │ └──────────┘ │  │ └─────────────┘ │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              c3-discovery                            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐    │  │
│  │  │  Domain  │  │   App    │  │  Infra (LLM)   │    │  │
│  │  └──────────┘  └──────────┘  └────────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    FOUNDATION LAYER                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                 c3-shared                            │  │
│  │  - Entity, ValueObject, AggregateRoot               │  │
│  │  - Result, Either (functional types)                │  │
│  │  - Logger, Cache, Metrics                           │  │
│  │  - Codebase, Project, Session abstractions          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Through Layers

```
User Request (CLI or Web)
  ↓
Presentation Layer (CLI/BFF/Web)
  ↓
Integration Layer (c3-wiring)
  ↓
  ├→ Parsing Context → PropertyGraph
  ├→ Compliance Context → ComplianceReport
  ├→ Projection Context → Visualization
  └→ Discovery Context → Patterns
     ↓
Foundation Layer (c3-shared)
  ├→ Logger (logging)
  ├→ Result (error handling)
  └→ Entity (domain modeling)
```

---

## Real-World Development Scenarios

### Scenario 1: Fix a Bug in c3-shared

**Problem:** Logger.child() has a bug

```bash
# 1. Work in c3-shared
cd ~/dev/c3-shared
git checkout -b fix/logger-child-bug

# 2. Fix the bug
code src/infrastructure/Logger.ts
# Make changes...

# 3. Build
npm run build
# ✅ dist/infrastructure/Logger.js updated

# 4. Test impact on dependent packages
cd ~/dev/c3-parsing
npm test
# ✅ Uses updated Logger via link

cd ~/dev/c3-compliance
npm test
# ✅ Uses updated Logger via link

# 5. All good! Commit
cd ~/dev/c3-shared
git add .
git commit -m "fix: Logger.child() null reference error"
git push origin fix/logger-child-bug
gh pr create

# 6. After merge, rebuild everything
cd ~/dev/c3-platform
./scripts/build-all.sh
# Ensures all packages use fixed version
```

**Impact:** 8 packages automatically get the fix (all depend on shared)

---

### Scenario 2: Add New CLI Command

**Goal:** Add `c3 analyze` command

```bash
# 1. Work in c3-cli only (self-contained change)
cd ~/dev/c3-cli
git checkout -b feature/analyze-command

# 2. Create command file
cat > src/commands/analyze.command.ts << 'EOF'
import { Command } from 'commander';
import { bootstrap, TOKENS } from 'c3-wiring';

export const analyzeCommand = new Command('analyze')
  .description('Deep analysis of codebase')
  .argument('<path>', 'Path to codebase')
  .action(async (path: string) => {
    const container = await bootstrap();
    const parsingService = container.get(TOKENS.PARSING_SERVICE);
    const evaluationEngine = container.get(TOKENS.EVALUATION_ENGINE);

    // Use both services
    const graph = await parsingService.parseCodebase(path);
    const report = await evaluationEngine.evaluate(graph, []);

    console.log('Analysis complete!');
  });
EOF

# 3. Register in index.ts
# Add: program.addCommand(analyzeCommand);

# 4. Build
npm run build

# 5. Test
c3 analyze ~/dev/c3-shared
# ✅ New command works!

# 6. Commit
git add .
git commit -m "feat: add analyze command"
git push origin feature/analyze-command
gh pr create
```

**Impact:** Only c3-cli changed. No other packages affected.

---

### Scenario 3: Add Support for Go Language

**Goal:** Parse Go files

**Requires changes in:** c3-parsing only

```bash
# 1. Work in c3-parsing
cd ~/dev/c3-parsing
git checkout -b feature/go-parser

# 2. Add Go to Language enum
code src/domain/value-objects/Language.ts
# Add: GO = 'go'

# 3. Create GoParser
code src/infrastructure/adapters/GoParser.ts
# Implement Parser interface

# 4. Export from index.ts
# Add: export * from './infrastructure/adapters/GoParser.js';

# 5. Build
npm run build

# 6. Test in CLI
cd ~/dev/c3-cli
c3 parse ~/path/to/go/project
# ✅ Parses Go files now

# 7. Commit
cd ~/dev/c3-parsing
git add .
git commit -m "feat: add Go language parser"
git push origin feature/go-parser
gh pr create
```

**Impact:**
- c3-parsing: Changed
- c3-cli, c3-bff: Automatically work with Go (use updated c3-parsing)
- c3-compliance, c3-projection, c3-discovery: Can now evaluate Go code

---

## TypeScript Configuration

### How tsconfig.json Works in Polyrepo

**c3-shared/tsconfig.json:**
```json
{
  "compilerOptions": {
    "rootDir": "./src",      // Source files here
    "outDir": "./dist",      // Output here
    "declaration": true,     // Generate .d.ts files
    "composite": true        // For project references
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

**c3-parsing/tsconfig.json:**
```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "declaration": true
    // No "references" needed! npm link handles it
  }
}
```

**Key difference from monorepo:**
- ❌ No more `"references": [{ "path": "../shared" }]`
- ❌ No more `"paths": { "@c3/*": [...] }`
- ✅ Just standard Node.js module resolution
- ✅ npm link provides the connections

---

## Git Workflow

### Feature Development

**Single-repo feature:**
```bash
cd ~/dev/c3-parsing
git checkout -b feature/my-feature
# Make changes
git commit -m "feat: ..."
git push origin feature/my-feature
gh pr create
```

**Multi-repo feature:**
```bash
# Same branch name in each repo
cd ~/dev/c3-parsing
git checkout -b feature/big-feature

cd ~/dev/c3-compliance
git checkout -b feature/big-feature

# Make changes in both
# Test together via links
# Create PRs that reference each other
```

### Keeping in Sync

**Pull all repos:**
```bash
cd ~/dev
for dir in c3-*/; do
  echo "Updating $dir"
  cd "$dir"
  git pull
  cd ..
done
```

**Or create a script:**
```bash
cd ~/dev/c3-platform
cat > scripts/pull-all.sh << 'EOF'
#!/bin/bash
for dir in c3-*/; do
  cd ../$dir
  git pull
  cd ../c3-platform
done
EOF
chmod +x scripts/pull-all.sh
```

---

## Summary: The Complete Picture

### Physical Layout
```
Your Machine:
  ~/dev/
  ├── c3-shared/    ← Git repo → GitHub → (future) NPM
  ├── c3-parsing/   ← Git repo → GitHub → (future) NPM
  ├── c3-compliance/← Git repo → GitHub → (future) NPM
  ├── ... (7 more repos)
  └── c3-platform/  ← Orchestration scripts

Global NPM:
  /usr/local/lib/node_modules/
  ├── c3-shared/    ← Symlink → ~/dev/c3-shared
  ├── c3-parsing/   ← Symlink → ~/dev/c3-parsing
  └── ... (via npm link)

GitHub:
  github.com/garrick0/
  ├── c3-shared     ← Public repo
  ├── c3-parsing    ← Public repo
  ├── ... (8 more)
  └── c3-platform   ← Public repo

NPM Registry (future):
  npmjs.com/package/
  ├── c3-shared     ← Published version
  ├── c3-parsing    ← Published version
  └── ... (when you run publish-all.sh)
```

### Logical Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                         Users                               │
└───────────────────┬─────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────────────────────┐
│              Entry Points (3 repos)                         │
│  CLI (commands) | BFF (REST API) | Web (React UI)          │
└───────────────────┬─────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────────────────────┐
│           Integration (1 repo)                              │
│  Wiring (DI Container + Context Registration)              │
└───────────────────┬─────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────────────────────┐
│           Bounded Contexts (4 repos)                        │
│  Parsing | Compliance | Projection | Discovery             │
│  Each with: Domain → Application → Infrastructure          │
└───────────────────┬─────────────────────────────────────────┘
                    ▼
┌─────────────────────────────────────────────────────────────┐
│              Foundation (1 repo)                            │
│  Shared (Domain abstractions + Infrastructure)             │
└─────────────────────────────────────────────────────────────┘
```

### Development Flow
```
Developer
  ↓ edits
Repository (Git)
  ↓ builds
Package (dist/)
  ↓ links
Dependent Packages (node_modules/symlink)
  ↓ imports
Application (CLI/BFF/Web)
  ↓ executes
User sees result
```

---

## Key Concepts

### 1. Repository = Package = Bounded Context

Each repository is:
- A Git repository (version control)
- An NPM package (distribution)
- A bounded context or app (domain boundary)

### 2. npm link = Development Symlinks

Connects packages locally without publishing to NPM.

### 3. Dependency Order

Build order follows dependency graph:
- Foundation first (c3-shared)
- Contexts second (c3-parsing, etc.)
- Integration third (c3-wiring)
- Applications last (c3-cli, c3-bff, c3-web)

### 4. Clean Architecture Per Package

Each context package has:
- `domain/` - Business logic (pure, no external deps)
- `application/` - Use cases (orchestration)
- `infrastructure/` - External adapters (parsers, repos, APIs)

### 5. Scripts Automate Complexity

7 scripts handle all polyrepo complexity:
- Clone, setup, link, build, test, publish, extract

---

## What Makes This Work

### Critical Success Factors

1. **Zero Circular Dependencies**
   - Clean dependency graph (DAG)
   - Can build in linear order
   - No deadlocks

2. **npm link Magic**
   - Symlinks provide instant updates
   - No need to publish for development
   - Changes immediately visible

3. **Automation Scripts**
   - Hide complexity from developers
   - Enforce correct build order
   - Consistent process

4. **Clean Architecture**
   - Clear boundaries (Ports & Adapters)
   - Domain layer has no external deps
   - Easy to extract into separate packages

5. **Consistent Structure**
   - All packages follow same pattern
   - Predictable locations
   - Easy to navigate

---

## Filesystem Quick Reference

### Find a File

**In monorepo:**
```
File: RuleSet.ts
Path: contexts/compliance/domain/aggregates/RuleSet/RuleSet.ts
```

**In polyrepo:**
```
File: RuleSet.ts
Repo: c3-compliance
Path: ~/dev/c3-compliance/src/domain/aggregates/RuleSet/RuleSet.ts
```

**How to find:**
```bash
# Option 1: grep across all repos
cd ~/dev
grep -r "class RuleSet" c3-*/src

# Option 2: VS Code workspace search
code c3.code-workspace
Cmd+Shift+F → "class RuleSet"

# Option 3: Educated guess
# RuleSet is compliance domain → c3-compliance/src/domain/aggregates/
```

### Project Navigation Map

```
Need to work on...         → Go to repository...

Parsing logic              → c3-parsing
Rules & evaluation         → c3-compliance
Visualizations             → c3-projection
AI features                → c3-discovery
Dependency injection       → c3-wiring
CLI commands               → c3-cli
API endpoints              → c3-bff
UI components              → c3-web
Base classes (Entity, etc) → c3-shared
Build scripts              → c3-platform
```

---

## Conclusion

The C3 polyrepo is **10 independent repositories** connected through:

1. **npm link** - Symlinks for local development
2. **NPM packages** - Standard module system
3. **Dependency order** - Clean architecture enables extraction
4. **Automation scripts** - Hide complexity
5. **Shared conventions** - Consistent structure

**Benefits:**
- ✅ AI agents work with 75% less code per session
- ✅ Clearer boundaries and ownership
- ✅ Independent versioning and releases
- ✅ Parallel development possible
- ✅ Smaller, focused repositories

**Tradeoffs:**
- ⚠️ More repos to manage (10 vs 1)
- ⚠️ Setup takes longer (10 min vs 2 min)
- ⚠️ Cross-repo changes need coordination

**Overall:** The architecture is well-suited for AI-assisted development while maintaining good developer experience through automation.

---

**Document Location:** `/Users/samuelgleeson/dev/c3/.working/HOW-THE-POLYREPO-WORKS.md`
**Created:** 2025-01-14
**Length:** ~1,000 lines
**Purpose:** Complete system understanding guide
