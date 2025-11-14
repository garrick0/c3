# C3 Code Standards System - MVP Design Document

## Overview
Stubbed/mocked implementation of the full system architecture to validate design and establish clear boundaries. Focus on structure over implementation.

## Core Architecture Decisions
- **4 Bounded Contexts**: Parsing, Compliance, Visualization, Discovery
- **DI with Ports/Adapters** for extensibility
- **Manual DI Container** for simplicity
- **Express BFF** for API aggregation
- **Feature-Sliced Design** for frontend
- **Claude API** for LLM operations

## Complete Filesystem Structure

```
c3/
├── package.json
├── tsconfig.json
├── .env.example
├── README.md
│
├── apps/
│   ├── cli/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── index.ts                 # CLI entry point
│   │   │   ├── commands/
│   │   │   │   ├── parse.command.ts     # Parse codebase command
│   │   │   │   ├── check.command.ts     # Check compliance command
│   │   │   │   ├── discover.command.ts  # Discover patterns command
│   │   │   │   ├── fix.command.ts       # Apply fixes command
│   │   │   │   └── visualize.command.ts # Generate visualizations
│   │   │   └── utils/
│   │   │       ├── logger.ts
│   │   │       └── config.ts
│   │   └── bin/
│   │       └── c3.js                    # Executable
│   │
│   ├── bff/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── index.ts                 # Express server entry
│   │   │   ├── app.ts                   # Express app setup
│   │   │   ├── routes/
│   │   │   │   ├── index.ts
│   │   │   │   ├── parsing.routes.ts    # /api/parse endpoints
│   │   │   │   ├── compliance.routes.ts # /api/compliance endpoints
│   │   │   │   ├── discovery.routes.ts  # /api/discovery endpoints
│   │   │   │   └── visualization.routes.ts # /api/visualizations
│   │   │   ├── middleware/
│   │   │   │   ├── auth.middleware.ts
│   │   │   │   ├── error.middleware.ts
│   │   │   │   └── cors.middleware.ts
│   │   │   └── aggregators/
│   │   │       ├── dashboard.aggregator.ts  # Combine data for dashboard
│   │   │       └── report.aggregator.ts     # Generate reports
│   │   └── tests/
│   │
│   └── web/
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── index.html
│       ├── src/
│       │   ├── main.tsx                 # React entry point
│       │   ├── app/
│       │   │   ├── App.tsx
│       │   │   ├── providers/
│       │   │   │   └── index.tsx
│       │   │   └── styles/
│       │   │       └── globals.css
│       │   ├── pages/                   # Route pages
│       │   │   ├── dashboard/
│       │   │   │   ├── index.tsx
│       │   │   │   └── DashboardPage.tsx
│       │   │   ├── compliance/
│       │   │   │   ├── index.tsx
│       │   │   │   └── CompliancePage.tsx
│       │   │   ├── discovery/
│       │   │   │   ├── index.tsx
│       │   │   │   └── DiscoveryPage.tsx
│       │   │   └── visualization/
│       │   │       ├── index.tsx
│       │   │       └── VisualizationPage.tsx
│       │   ├── widgets/                 # Composed features
│       │   │   ├── compliance-summary/
│       │   │   │   ├── index.ts
│       │   │   │   ├── ComplianceSummary.tsx
│       │   │   │   └── ComplianceSummary.module.css
│       │   │   ├── rule-editor/
│       │   │   │   ├── index.ts
│       │   │   │   ├── RuleEditor.tsx
│       │   │   │   └── RuleEditor.module.css
│       │   │   └── graph-viewer/
│       │   │       ├── index.ts
│       │   │       ├── GraphViewer.tsx
│       │   │       └── GraphViewer.module.css
│       │   ├── features/                # Feature slices
│       │   │   ├── parsing/
│       │   │   │   ├── api/
│       │   │   │   │   └── parsing.api.ts
│       │   │   │   ├── model/
│       │   │   │   │   ├── parsing.store.ts
│       │   │   │   │   └── parsing.types.ts
│       │   │   │   └── ui/
│       │   │   │       └── ParsingStatus.tsx
│       │   │   ├── compliance/
│       │   │   │   ├── api/
│       │   │   │   │   └── compliance.api.ts
│       │   │   │   ├── model/
│       │   │   │   │   ├── compliance.store.ts
│       │   │   │   │   └── compliance.types.ts
│       │   │   │   └── ui/
│       │   │   │       ├── ViolationList.tsx
│       │   │   │       └── RuleList.tsx
│       │   │   ├── discovery/
│       │   │   │   ├── api/
│       │   │   │   ├── model/
│       │   │   │   └── ui/
│       │   │   └── visualization/
│       │   │       ├── api/
│       │   │       ├── model/
│       │   │       └── ui/
│       │   ├── entities/                # Domain entities
│       │   │   ├── rule/
│       │   │   │   ├── index.ts
│       │   │   │   └── rule.types.ts
│       │   │   ├── violation/
│       │   │   │   ├── index.ts
│       │   │   │   └── violation.types.ts
│       │   │   └── graph/
│       │   │       ├── index.ts
│       │   │       └── graph.types.ts
│       │   └── shared/
│       │       ├── api/
│       │       │   └── client.ts
│       │       ├── ui/
│       │       │   ├── Button/
│       │       │   ├── Card/
│       │       │   └── Layout/
│       │       └── lib/
│       │           └── utils.ts
│       └── public/
│
├── contexts/                             # Bounded contexts
│   ├── parsing/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── PropertyGraph.ts
│   │   │   │   ├── Node.ts
│   │   │   │   ├── Edge.ts
│   │   │   │   └── FileInfo.ts
│   │   │   ├── services/
│   │   │   │   ├── ParsingService.ts
│   │   │   │   └── GraphBuilder.ts
│   │   │   ├── ports/
│   │   │   │   ├── Parser.ts            # Interface for parsers
│   │   │   │   ├── GraphRepository.ts   # Interface for storage
│   │   │   │   └── FileSystem.ts        # Interface for file access
│   │   │   └── value-objects/
│   │   │       ├── FilePath.ts
│   │   │       └── NodeType.ts
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── ParseCodebase.ts
│   │   │   │   ├── GetPropertyGraph.ts
│   │   │   │   └── UpdateGraph.ts
│   │   │   └── dto/
│   │   │       ├── ParseRequest.dto.ts
│   │   │       └── GraphResponse.dto.ts
│   │   ├── infrastructure/
│   │   │   ├── adapters/
│   │   │   │   ├── FilesystemParser.ts  # Implements Parser
│   │   │   │   ├── TypeScriptParser.ts  # Implements Parser (stub)
│   │   │   │   ├── PythonParser.ts      # Implements Parser (stub)
│   │   │   │   └── NodeFileSystem.ts    # Implements FileSystem
│   │   │   └── persistence/
│   │   │       └── InMemoryGraphRepository.ts
│   │   └── presentation/
│   │       ├── ParsingController.ts     # For BFF
│   │       └── ParsingCLI.ts           # For CLI
│   │
│   ├── compliance/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── Rule.ts
│   │   │   │   ├── Violation.ts
│   │   │   │   ├── Fix.ts
│   │   │   │   └── Whitelist.ts
│   │   │   ├── services/
│   │   │   │   ├── RuleEngine.ts
│   │   │   │   ├── Evaluator.ts
│   │   │   │   └── Remediator.ts
│   │   │   ├── ports/
│   │   │   │   ├── RuleRepository.ts
│   │   │   │   ├── EvaluatorStrategy.ts
│   │   │   │   ├── FixStrategy.ts
│   │   │   │   └── ConfigLoader.ts
│   │   │   └── value-objects/
│   │   │       ├── RuleType.ts
│   │   │       ├── Severity.ts
│   │   │       └── FixType.ts
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── CheckCompliance.ts
│   │   │   │   ├── ApplyFixes.ts
│   │   │   │   ├── ManageRules.ts
│   │   │   │   └── WhitelistViolation.ts
│   │   │   └── dto/
│   │   │       ├── ComplianceReport.dto.ts
│   │   │       └── RuleConfig.dto.ts
│   │   ├── infrastructure/
│   │   │   ├── evaluators/
│   │   │   │   ├── DependencyEvaluator.ts
│   │   │   │   ├── NamingEvaluator.ts
│   │   │   │   └── StructureEvaluator.ts
│   │   │   ├── fixers/
│   │   │   │   ├── RenameFixer.ts
│   │   │   │   └── MoveFixer.ts
│   │   │   ├── config/
│   │   │   │   └── YamlConfigLoader.ts
│   │   │   └── persistence/
│   │   │       └── InMemoryRuleRepository.ts
│   │   └── presentation/
│   │       ├── ComplianceController.ts
│   │       └── ComplianceCLI.ts
│   │
│   ├── visualization/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── View.ts
│   │   │   │   ├── Layout.ts
│   │   │   │   └── Projection.ts
│   │   │   ├── services/
│   │   │   │   ├── ViewGenerator.ts
│   │   │   │   └── LayoutEngine.ts
│   │   │   ├── ports/
│   │   │   │   ├── Renderer.ts
│   │   │   │   ├── Exporter.ts
│   │   │   │   └── ViewRepository.ts
│   │   │   └── value-objects/
│   │   │       ├── ViewType.ts
│   │   │       └── ExportFormat.ts
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── GenerateView.ts
│   │   │   │   ├── ExportVisualization.ts
│   │   │   │   └── ListViews.ts
│   │   │   └── dto/
│   │   │       ├── ViewRequest.dto.ts
│   │   │       └── ViewResponse.dto.ts
│   │   ├── infrastructure/
│   │   │   ├── renderers/
│   │   │   │   ├── GraphRenderer.ts
│   │   │   │   ├── TreeRenderer.ts
│   │   │   │   └── MatrixRenderer.ts
│   │   │   ├── exporters/
│   │   │   │   ├── SVGExporter.ts
│   │   │   │   └── JSONExporter.ts
│   │   │   └── persistence/
│   │   │       └── InMemoryViewRepository.ts
│   │   └── presentation/
│   │       ├── VisualizationController.ts
│   │       └── VisualizationCLI.ts
│   │
│   └── discovery/
│       ├── package.json
│       ├── tsconfig.json
│       ├── domain/
│       │   ├── entities/
│       │   │   ├── Pattern.ts
│       │   │   ├── CandidateRule.ts
│       │   │   ├── Evidence.ts
│       │   │   └── Recommendation.ts
│       │   ├── services/
│       │   │   ├── PatternDetector.ts
│       │   │   ├── RuleInferencer.ts
│       │   │   └── ConfidenceScorer.ts
│       │   ├── ports/
│       │   │   ├── LLMProvider.ts
│       │   │   ├── DocumentAnalyzer.ts
│       │   │   └── PatternRepository.ts
│       │   └── value-objects/
│       │       ├── Confidence.ts
│       │       └── PatternType.ts
│       ├── application/
│       │   ├── use-cases/
│       │   │   ├── DiscoverPatterns.ts
│       │   │   ├── InferRules.ts
│       │   │   ├── AnalyzeDocumentation.ts
│       │   │   └── GenerateRecommendations.ts
│       │   └── dto/
│       │       ├── DiscoveryRequest.dto.ts
│       │       └── DiscoveryReport.dto.ts
│       ├── infrastructure/
│       │   ├── llm/
│       │   │   └── ClaudeLLMProvider.ts
│       │   ├── analyzers/
│       │   │   ├── ReadmeAnalyzer.ts
│       │   │   └── ConfigAnalyzer.ts
│       │   └── persistence/
│       │       └── InMemoryPatternRepository.ts
│       └── presentation/
│           ├── DiscoveryController.ts
│           └── DiscoveryCLI.ts
│
├── shared/
│   ├── domain/
│   │   ├── Result.ts                    # Result type for error handling
│   │   ├── Entity.ts                    # Base entity class
│   │   ├── ValueObject.ts               # Base value object class
│   │   └── DomainEvent.ts               # Base event class
│   ├── infrastructure/
│   │   ├── Logger.ts                    # Shared logging
│   │   ├── EventBus.ts                  # Event communication
│   │   └── Cache.ts                     # Caching abstraction
│   └── types/
│       ├── common.types.ts              # Common type definitions
│       └── errors.types.ts              # Error types
│
├── wiring/
│   ├── Container.ts                     # Manual DI container
│   ├── dependencies.ts                  # Dependency definitions
│   └── bootstrap.ts                     # Application bootstrap
│
├── config/
│   ├── default.config.ts                # Default configuration
│   ├── development.config.ts            # Dev overrides
│   └── index.ts                         # Config loader with Zod
│
├── scripts/
│   ├── setup.sh                         # Initial setup script
│   └── dev.sh                           # Development runner
│
└── docs/
    ├── architecture/
    │   ├── overview.md
    │   └── decisions/
    │       ├── ADR-001-bounded-contexts.md
    │       └── ADR-002-di-pattern.md
    └── api/
        └── openapi.yaml
```

## Key File Contents (Stubs)

### `/wiring/Container.ts`
```typescript
// Manual DI Container
export class Container {
  private services = new Map<string, any>();
  private factories = new Map<string, () => any>();

  register<T>(token: string, factory: () => T): void {
    this.factories.set(token, factory);
  }

  registerSingleton<T>(token: string, instance: T): void {
    this.services.set(token, instance);
  }

  get<T>(token: string): T {
    // Stub implementation
    return {} as T;
  }
}
```

### `/contexts/parsing/domain/ports/Parser.ts`
```typescript
export interface Parser {
  parse(source: string, metadata: FileInfo): Promise<PropertyGraph>;
  supports(file: FileInfo): boolean;
}
```

### `/contexts/compliance/domain/entities/Rule.ts`
```typescript
export class Rule {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: RuleType,
    public readonly condition: Condition,
    public readonly severity: Severity
  ) {}

  evaluate(graph: PropertyGraph): Violation[] {
    // Stub: return mock violations
    return [];
  }
}
```

### `/contexts/discovery/infrastructure/llm/ClaudeLLMProvider.ts`
```typescript
export class ClaudeLLMProvider implements LLMProvider {
  async analyze(prompt: string, context: any): Promise<string> {
    // Stub: Mock Claude API call
    console.log('Would call Claude API with:', prompt);
    return 'Mock LLM response';
  }

  async inferRules(graph: PropertyGraph): Promise<CandidateRule[]> {
    // Stub: Return mock candidate rules
    return [
      {
        id: 'mock-1',
        name: 'Use consistent file naming',
        confidence: 0.85,
        evidence: ['Found 90% kebab-case files']
      }
    ];
  }
}
```

### `/apps/bff/src/routes/compliance.routes.ts`
```typescript
export const complianceRoutes = Router();

complianceRoutes.post('/check', async (req, res) => {
  // Stub: return mock compliance report
  res.json({
    violations: [],
    summary: { total: 0, critical: 0 }
  });
});

complianceRoutes.get('/rules', async (req, res) => {
  // Stub: return mock rules
  res.json([
    { id: '1', name: 'No circular dependencies' }
  ]);
});
```

### `/apps/cli/src/commands/check.command.ts`
```typescript
export const checkCommand = {
  name: 'check',
  description: 'Check codebase compliance',
  action: async (options: any) => {
    console.log('Checking compliance...');
    // Stub: Mock compliance check
    console.log('✓ No violations found');
  }
};
```

## Integration Points

### Context Communication
```typescript
// Example: Parsing → Compliance
const graph = await parsingContext.parseCodebase(path);
const report = await complianceContext.checkCompliance(graph);

// Example: Discovery → Compliance
const candidateRules = await discoveryContext.discoverPatterns(graph);
await complianceContext.addRules(candidateRules);
```

### BFF Aggregation
```typescript
// Dashboard aggregator combines data from multiple contexts
async function getDashboardData() {
  const [compliance, patterns, views] = await Promise.all([
    complianceService.getSummary(),
    discoveryService.getRecentPatterns(),
    visualizationService.getAvailableViews()
  ]);

  return { compliance, patterns, views };
}
```

## Development Workflow

### Setup
```bash
npm install
npm run setup:contexts
npm run build:shared
```

### Running Services
```bash
# Terminal 1: BFF
cd apps/bff && npm run dev

# Terminal 2: Web
cd apps/web && npm run dev

# Terminal 3: CLI testing
cd apps/cli && npm link
c3 check ./test-project
```

## Next Steps for Implementation

1. **Create base structure** with all directories and package.json files
2. **Define all interfaces** (ports) across contexts
3. **Stub all implementations** with mock data
4. **Wire everything** through the container
5. **Add minimal UI** to visualize the flow
6. **Test end-to-end** flow with mock data

This structure provides:
- Clear separation of concerns
- All integration points defined
- Testable architecture
- Room for growth without restructuring
- Type safety throughout