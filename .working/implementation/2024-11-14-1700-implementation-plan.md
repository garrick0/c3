# C3 System - Phased Implementation Plan

## Overview
This plan breaks down the implementation into 4 phases, each building on the previous one. Each phase has clear acceptance criteria and a defined filesystem state.

---

## Phase 1: Foundation & Core Infrastructure

### Goals
- Establish monorepo structure
- Set up shared infrastructure
- Create wiring/DI layer
- Establish basic types and abstractions

### Acceptance Criteria
- [ ] All package.json files created with correct dependencies
- [ ] TypeScript compilation works across all workspaces
- [ ] DI container can register and resolve dependencies
- [ ] Shared domain abstractions (Codebase, Project, Session) exist
- [ ] Configuration service can load and validate architecture.config.ts
- [ ] Basic logging and error handling infrastructure works

### Filesystem State After Phase 1
```
c3/
├── package.json                         ✅ Created
├── tsconfig.json                        ✅ Created
├── .env.example                         ✅ Created
├── README.md                            ✅ Created
├── architecture.config.ts               ✅ Created
│
├── shared/
│   ├── package.json                     ✅ Shared module config
│   ├── tsconfig.json                    ✅ TS config
│   ├── domain/
│   │   ├── core-abstractions/
│   │   │   ├── Codebase.ts             ✅ Stub implementation
│   │   │   ├── Project.ts              ✅ Stub implementation
│   │   │   ├── AnalysisSession.ts      ✅ Stub implementation
│   │   │   └── Workspace.ts            ✅ Stub implementation
│   │   ├── base/
│   │   │   ├── Entity.ts               ✅ Base class
│   │   │   ├── ValueObject.ts          ✅ Base class
│   │   │   ├── AggregateRoot.ts        ✅ Base class
│   │   │   └── DomainEvent.ts          ✅ Base class
│   │   └── common/
│   │       ├── Result.ts               ✅ Result type
│   │       ├── Either.ts               ✅ Either monad
│   │       └── Specification.ts        ✅ Specification pattern
│   ├── infrastructure/
│   │   ├── Logger.ts                   ✅ Logging service
│   │   ├── Cache.ts                    ✅ Cache abstraction
│   │   └── Metrics.ts                  ✅ Metrics stub
│   ├── configuration/
│   │   ├── ConfigurationService.ts     ✅ Config loader
│   │   ├── ConfigSchema.ts             ✅ Zod schema
│   │   ├── PresetManager.ts            ✅ Preset handling
│   │   └── ConfigTransformer.ts        ✅ Transform to rules
│   └── types/
│       ├── common.types.ts             ✅ Common types
│       ├── errors.types.ts             ✅ Error types
│       └── api.types.ts                ✅ API types
│
├── wiring/
│   ├── Container.ts                    ✅ DI container implementation
│   ├── dependencies.ts                 ✅ Dependency registry
│   ├── bootstrap.ts                    ✅ App initialization
│   └── factories/
│       ├── ParserFactory.ts            ✅ Parser factory stub
│       ├── EvaluatorFactory.ts         ✅ Evaluator factory stub
│       └── RendererFactory.ts          ✅ Renderer factory stub
│
├── config/
│   ├── default.config.ts               ✅ Default config
│   ├── development.config.ts           ✅ Dev config
│   ├── production.config.ts            ✅ Prod config
│   ├── test.config.ts                  ✅ Test config
│   └── index.ts                        ✅ Config loader
│
└── scripts/
    ├── setup.sh                        ✅ Setup script
    ├── dev.sh                          ✅ Dev runner
    ├── build.sh                        ✅ Build script
    └── test.sh                         ✅ Test runner
```

### Key Deliverables
1. Working monorepo with workspace resolution
2. Functioning DI container
3. Shared infrastructure ready for use
4. Configuration system working
5. Build and dev scripts operational

---

## Phase 2: Bounded Contexts - Domain Layer

### Goals
- Create all 4 bounded context packages
- Implement domain entities, services, and ports for each context
- Define all interfaces (ports) that adapters will implement
- Create value objects and aggregates

### Acceptance Criteria
- [ ] All context package.json files exist with correct dependencies
- [ ] All domain entities compile without errors
- [ ] All ports (interfaces) are defined
- [ ] Domain services have stub implementations
- [ ] Value objects have basic validation
- [ ] Aggregates properly encapsulate entities
- [ ] Each context can be imported and used independently

### Filesystem State After Phase 2
```
c3/
├── [Phase 1 files...]                  ✅ All previous files
│
├── contexts/
│   ├── parsing/
│   │   ├── package.json                ✅ Context package
│   │   ├── tsconfig.json               ✅ TS config
│   │   ├── README.md                   ✅ Context docs
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── PropertyGraph.ts   ✅ Core entity
│   │   │   │   ├── Node.ts            ✅ Graph node
│   │   │   │   ├── Edge.ts            ✅ Graph edge
│   │   │   │   ├── FileInfo.ts        ✅ File metadata
│   │   │   │   └── Codebase.ts        ✅ Codebase entity
│   │   │   ├── services/
│   │   │   │   ├── ParsingService.ts  ✅ Main service stub
│   │   │   │   ├── GraphBuilder.ts    ✅ Graph builder stub
│   │   │   │   ├── NodeFactory.ts     ✅ Node factory stub
│   │   │   │   └── EdgeDetector.ts    ✅ Edge detector stub
│   │   │   ├── ports/
│   │   │   │   ├── Parser.ts          ✅ Parser interface
│   │   │   │   ├── GraphRepository.ts ✅ Storage interface
│   │   │   │   ├── FileSystem.ts      ✅ FS interface
│   │   │   │   └── Cache.ts           ✅ Cache interface
│   │   │   └── value-objects/
│   │   │       ├── FilePath.ts        ✅ Path VO
│   │   │       ├── NodeType.ts        ✅ Type enum
│   │   │       ├── EdgeType.ts        ✅ Edge enum
│   │   │       └── Language.ts        ✅ Language enum
│   │   └── index.ts                   ✅ Public API exports
│   │
│   ├── compliance/
│   │   ├── package.json                ✅ Context package
│   │   ├── tsconfig.json               ✅ TS config
│   │   ├── README.md                   ✅ Context docs
│   │   ├── domain/
│   │   │   ├── aggregates/
│   │   │   │   ├── RuleSet/
│   │   │   │   │   ├── RuleSet.ts     ✅ Aggregate root
│   │   │   │   │   ├── Rule.ts        ✅ Rule entity
│   │   │   │   │   ├── Condition.ts   ✅ Condition VO
│   │   │   │   │   └── RuleSource.ts  ✅ Source enum
│   │   │   │   ├── Evaluation/
│   │   │   │   │   ├── ComplianceReport.ts ✅ Report aggregate
│   │   │   │   │   ├── Violation.ts   ✅ Violation entity
│   │   │   │   │   ├── ViolationContext.ts ✅ Context VO
│   │   │   │   │   └── Severity.ts    ✅ Severity enum
│   │   │   │   └── Remediation/
│   │   │   │       ├── FixPlan.ts     ✅ Fix plan aggregate
│   │   │   │       ├── Fix.ts         ✅ Fix entity
│   │   │   │       ├── FixStrategy.ts ✅ Strategy interface
│   │   │   │       └── Whitelist.ts   ✅ Whitelist entity
│   │   │   ├── services/
│   │   │   │   ├── RuleManagementService.ts ✅ Rule CRUD stub
│   │   │   │   ├── EvaluationEngine.ts ✅ Evaluation stub
│   │   │   │   ├── RemediationService.ts ✅ Remediation stub
│   │   │   │   ├── ConfigurationParser.ts ✅ Config parser stub
│   │   │   │   └── WhitelistService.ts ✅ Whitelist stub
│   │   │   ├── ports/
│   │   │   │   ├── RuleRepository.ts  ✅ Storage interface
│   │   │   │   ├── EvaluatorStrategy.ts ✅ Evaluator interface
│   │   │   │   ├── FixStrategy.ts     ✅ Fix interface
│   │   │   │   └── ConfigLoader.ts    ✅ Config interface
│   │   │   └── value-objects/
│   │   │       ├── RuleType.ts        ✅ Type enum
│   │   │       ├── Severity.ts        ✅ Severity enum
│   │   │       ├── FixType.ts         ✅ Fix type enum
│   │   │       └── RuleId.ts          ✅ ID value object
│   │   └── index.ts                   ✅ Public API exports
│   │
│   ├── projection/
│   │   ├── package.json                ✅ Context package
│   │   ├── tsconfig.json               ✅ TS config
│   │   ├── README.md                   ✅ Context docs
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── Projection.ts      ✅ Base projection
│   │   │   │   ├── ModuleProjection.ts ✅ Module view
│   │   │   │   ├── LayerProjection.ts ✅ Layer view
│   │   │   │   ├── DependencyMatrix.ts ✅ Matrix view
│   │   │   │   ├── ComponentGraph.ts  ✅ Component view
│   │   │   │   └── TreeProjection.ts  ✅ Tree view
│   │   │   ├── services/
│   │   │   │   ├── ProjectionEngine.ts ✅ Engine stub
│   │   │   │   ├── GraphTransformer.ts ✅ Transformer stub
│   │   │   │   ├── NodeAggregator.ts  ✅ Aggregator stub
│   │   │   │   ├── MetricsCalculator.ts ✅ Metrics stub
│   │   │   │   └── LayoutEngine.ts    ✅ Layout stub
│   │   │   ├── ports/
│   │   │   │   ├── ProjectionStrategy.ts ✅ Strategy interface
│   │   │   │   ├── Renderer.ts        ✅ Renderer interface
│   │   │   │   ├── Exporter.ts        ✅ Exporter interface
│   │   │   │   └── ViewRepository.ts  ✅ Storage interface
│   │   │   └── value-objects/
│   │   │       ├── ProjectionType.ts  ✅ Type enum
│   │   │       ├── AggregationLevel.ts ✅ Level enum
│   │   │       ├── ViewConfiguration.ts ✅ Config VO
│   │   │       └── ExportFormat.ts    ✅ Format enum
│   │   └── index.ts                   ✅ Public API exports
│   │
│   └── discovery/
│       ├── package.json                ✅ Context package
│       ├── tsconfig.json               ✅ TS config
│       ├── README.md                   ✅ Context docs
│       ├── domain/
│       │   ├── aggregates/
│       │   │   ├── PatternAnalysis/
│       │   │   │   ├── Pattern.ts     ✅ Pattern aggregate
│       │   │   │   ├── Evidence.ts    ✅ Evidence entity
│       │   │   │   ├── Occurrence.ts  ✅ Occurrence VO
│       │   │   │   └── PatternType.ts ✅ Type enum
│       │   │   ├── RuleInference/
│       │   │   │   ├── CandidateRule.ts ✅ Rule aggregate
│       │   │   │   ├── Confidence.ts  ✅ Confidence VO
│       │   │   │   ├── Rationale.ts   ✅ Rationale VO
│       │   │   │   └── Example.ts     ✅ Example entity
│       │   │   └── Research/
│       │   │       ├── ResearchSession.ts ✅ Session aggregate
│       │   │       ├── Query.ts       ✅ Query entity
│       │   │       ├── Finding.ts     ✅ Finding entity
│       │   │       └── Source.ts      ✅ Source VO
│       │   ├── services/
│       │   │   ├── PatternDetectionService.ts ✅ Detection stub
│       │   │   ├── RuleInferenceService.ts ✅ Inference stub
│       │   │   ├── DocumentationAnalyzer.ts ✅ Doc analyzer stub
│       │   │   ├── CodebaseResearcher.ts ✅ Researcher stub
│       │   │   └── ConfidenceCalculator.ts ✅ Confidence stub
│       │   ├── ports/
│       │   │   ├── LLMProvider.ts     ✅ LLM interface
│       │   │   ├── PatternMatcher.ts  ✅ Matcher interface
│       │   │   ├── EvidenceCollector.ts ✅ Collector interface
│       │   │   ├── DocumentAnalyzer.ts ✅ Analyzer interface
│       │   │   └── PatternRepository.ts ✅ Storage interface
│       │   └── value-objects/
│       │       ├── ConfidenceScore.ts ✅ Score VO
│       │       ├── PatternFrequency.ts ✅ Frequency VO
│       │       ├── EvidenceStrength.ts ✅ Strength enum
│       │       └── ResearchDepth.ts   ✅ Depth enum
│       └── index.ts                   ✅ Public API exports
```

### Key Deliverables
1. All 4 bounded contexts with domain layer complete
2. All interfaces (ports) defined
3. Core entities and aggregates with stub logic
4. Value objects with validation
5. Domain services with stub implementations
6. Each context independently compilable

---

## Phase 3: Application & Infrastructure Layers

### Goals
- Implement use cases for each context
- Create DTOs for request/response
- Implement infrastructure adapters (parsers, evaluators, LLM, etc.)
- Add persistence implementations
- Wire contexts together through DI

### Acceptance Criteria
- [ ] All use cases implemented with stub logic
- [ ] DTOs created for all operations
- [ ] At least one adapter per port implemented
- [ ] In-memory repositories working
- [ ] Contexts can be wired together via DI
- [ ] Mock data flows through entire system
- [ ] Basic end-to-end flow works (parse → evaluate → report)

### Filesystem State After Phase 3
```
c3/
├── [Phase 1 & 2 files...]              ✅ All previous files
│
├── contexts/
│   ├── parsing/
│   │   ├── [domain layer...]           ✅ From Phase 2
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── ParseCodebase.ts   ✅ Use case implemented
│   │   │   │   ├── ParseFile.ts       ✅ Use case implemented
│   │   │   │   ├── GetPropertyGraph.ts ✅ Use case implemented
│   │   │   │   ├── UpdateGraph.ts     ✅ Use case implemented
│   │   │   │   └── ClearCache.ts      ✅ Use case implemented
│   │   │   └── dto/
│   │   │       ├── ParseRequest.dto.ts ✅ Request DTO
│   │   │       ├── ParseOptions.dto.ts ✅ Options DTO
│   │   │       ├── GraphResponse.dto.ts ✅ Response DTO
│   │   │       └── FileResponse.dto.ts ✅ File DTO
│   │   └── infrastructure/
│   │       ├── adapters/
│   │       │   ├── FilesystemParser.ts ✅ FS parser stub
│   │       │   ├── TypeScriptParser.ts ✅ TS parser stub
│   │       │   ├── PythonParser.ts    ✅ Python parser stub
│   │       │   └── NodeFileSystem.ts  ✅ Node FS adapter
│   │       └── persistence/
│   │           └── InMemoryGraphRepository.ts ✅ In-memory storage
│   │
│   ├── compliance/
│   │   ├── [domain layer...]           ✅ From Phase 2
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── CheckCompliance.ts ✅ Use case implemented
│   │   │   │   ├── ApplyFixes.ts      ✅ Use case implemented
│   │   │   │   ├── ManageRules.ts     ✅ Use case implemented
│   │   │   │   ├── ImportRules.ts     ✅ Use case implemented
│   │   │   │   ├── ExportRules.ts     ✅ Use case implemented
│   │   │   │   └── WhitelistViolation.ts ✅ Use case implemented
│   │   │   └── dto/
│   │   │       ├── ComplianceReport.dto.ts ✅ Report DTO
│   │   │       ├── RuleConfig.dto.ts  ✅ Config DTO
│   │   │       ├── ViolationSummary.dto.ts ✅ Summary DTO
│   │   │       └── FixRequest.dto.ts  ✅ Fix DTO
│   │   └── infrastructure/
│   │       ├── evaluators/
│   │       │   ├── DependencyEvaluator.ts ✅ Evaluator stub
│   │       │   ├── NamingEvaluator.ts ✅ Evaluator stub
│   │       │   └── StructureEvaluator.ts ✅ Evaluator stub
│   │       ├── fixers/
│   │       │   ├── RenameFixer.ts     ✅ Fixer stub
│   │       │   └── MoveFixer.ts       ✅ Fixer stub
│   │       ├── config/
│   │       │   └── TypeScriptConfigLoader.ts ✅ Config loader
│   │       └── persistence/
│   │           └── InMemoryRuleRepository.ts ✅ In-memory storage
│   │
│   ├── projection/
│   │   ├── [domain layer...]           ✅ From Phase 2
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── GenerateProjection.ts ✅ Use case implemented
│   │   │   │   ├── TransformGraph.ts  ✅ Use case implemented
│   │   │   │   ├── ExportVisualization.ts ✅ Use case implemented
│   │   │   │   └── ListProjections.ts ✅ Use case implemented
│   │   │   └── dto/
│   │   │       ├── ProjectionRequest.dto.ts ✅ Request DTO
│   │   │       ├── ProjectionResponse.dto.ts ✅ Response DTO
│   │   │       └── ViewMetadata.dto.ts ✅ Metadata DTO
│   │   └── infrastructure/
│   │       ├── strategies/
│   │       │   ├── ModuleProjectionStrategy.ts ✅ Strategy stub
│   │       │   └── LayerProjectionStrategy.ts ✅ Strategy stub
│   │       ├── renderers/
│   │       │   ├── SVGRenderer.ts     ✅ Renderer stub
│   │       │   └── AsciiRenderer.ts   ✅ Renderer stub
│   │       └── exporters/
│   │           ├── SVGExporter.ts     ✅ Exporter stub
│   │           └── JSONExporter.ts    ✅ Exporter stub
│   │
│   └── discovery/
│       ├── [domain layer...]           ✅ From Phase 2
│       ├── application/
│       │   ├── use-cases/
│       │   │   ├── DiscoverPatterns.ts ✅ Use case implemented
│       │   │   ├── InferRules.ts      ✅ Use case implemented
│       │   │   ├── AnalyzeDocumentation.ts ✅ Use case implemented
│       │   │   └── ResearchArchitecture.ts ✅ Use case implemented
│       │   └── dto/
│       │       ├── DiscoveryRequest.dto.ts ✅ Request DTO
│       │       ├── PatternReport.dto.ts ✅ Report DTO
│       │       └── CandidateRules.dto.ts ✅ Rules DTO
│       └── infrastructure/
│           ├── llm/
│           │   ├── ClaudeLLMProvider.ts ✅ Claude adapter stub
│           │   └── PromptTemplates.ts ✅ Prompt templates
│           ├── pattern-matchers/
│           │   └── RegexPatternMatcher.ts ✅ Matcher stub
│           ├── analyzers/
│           │   ├── NamingAnalyzer.ts  ✅ Analyzer stub
│           │   └── ReadmeAnalyzer.ts  ✅ Analyzer stub
│           └── persistence/
│               └── InMemoryPatternRepository.ts ✅ In-memory storage
│
└── wiring/
    └── context-modules/
        ├── parsing.module.ts           ✅ Parsing wiring
        ├── compliance.module.ts        ✅ Compliance wiring
        ├── projection.module.ts        ✅ Projection wiring
        └── discovery.module.ts         ✅ Discovery wiring
```

### Key Deliverables
1. All use cases implemented with stub logic
2. All DTOs created
3. Infrastructure adapters implemented (stubs)
4. In-memory repositories for all contexts
5. DI wiring for all contexts
6. End-to-end flow demonstrable with mock data

---

## Phase 4: Entry Points & Integration

### Goals
- Create CLI application
- Create BFF (Express API)
- Create Web frontend (React)
- Add presentation controllers
- Implement full integration tests
- Add documentation

### Acceptance Criteria
- [ ] CLI commands work end-to-end with mock data
- [ ] BFF API endpoints respond correctly
- [ ] Frontend can make requests and display results
- [ ] All entry points use same wired contexts
- [ ] Integration tests pass for all flows
- [ ] E2E tests demonstrate complete workflows
- [ ] Documentation is complete and accurate

### Filesystem State After Phase 4 (Complete System)
```
c3/
├── [All previous files...]             ✅ Phases 1-3 complete
│
├── apps/
│   ├── cli/
│   │   ├── package.json                ✅ CLI package
│   │   ├── tsconfig.json               ✅ TS config
│   │   ├── src/
│   │   │   ├── index.ts               ✅ CLI entry point
│   │   │   ├── cli.ts                 ✅ CLI setup
│   │   │   ├── commands/
│   │   │   │   ├── parse.command.ts   ✅ Parse command
│   │   │   │   ├── check.command.ts   ✅ Check command
│   │   │   │   ├── discover.command.ts ✅ Discover command
│   │   │   │   ├── fix.command.ts     ✅ Fix command
│   │   │   │   ├── visualize.command.ts ✅ Visualize command
│   │   │   │   └── init.command.ts    ✅ Init command
│   │   │   ├── utils/
│   │   │   │   ├── logger.ts          ✅ CLI logger
│   │   │   │   ├── spinner.ts         ✅ Progress spinner
│   │   │   │   └── output.ts          ✅ Output formatter
│   │   │   └── container/
│   │   │       └── cli.container.ts   ✅ CLI DI setup
│   │   └── bin/
│   │       └── c3.js                  ✅ Executable
│   │
│   ├── bff/
│   │   ├── package.json                ✅ BFF package
│   │   ├── tsconfig.json               ✅ TS config
│   │   ├── src/
│   │   │   ├── index.ts               ✅ Server entry
│   │   │   ├── app.ts                 ✅ Express app
│   │   │   ├── server.ts              ✅ Server init
│   │   │   ├── routes/
│   │   │   │   ├── index.ts           ✅ Route registration
│   │   │   │   ├── health.routes.ts   ✅ Health check
│   │   │   │   ├── parsing.routes.ts  ✅ Parsing endpoints
│   │   │   │   ├── compliance.routes.ts ✅ Compliance endpoints
│   │   │   │   ├── discovery.routes.ts ✅ Discovery endpoints
│   │   │   │   └── projection.routes.ts ✅ Projection endpoints
│   │   │   ├── middleware/
│   │   │   │   ├── error.middleware.ts ✅ Error handling
│   │   │   │   ├── validation.middleware.ts ✅ Validation
│   │   │   │   └── logging.middleware.ts ✅ Request logging
│   │   │   ├── aggregators/
│   │   │   │   ├── dashboard.aggregator.ts ✅ Dashboard data
│   │   │   │   └── report.aggregator.ts ✅ Report generation
│   │   │   └── container/
│   │   │       └── bff.container.ts   ✅ BFF DI setup
│   │   └── tests/
│   │       └── routes/
│   │           └── compliance.test.ts ✅ Route tests
│   │
│   └── web/
│       ├── package.json                ✅ Web package
│       ├── tsconfig.json               ✅ TS config
│       ├── vite.config.ts              ✅ Vite config
│       ├── index.html                  ✅ HTML entry
│       ├── src/
│       │   ├── main.tsx               ✅ React entry
│       │   ├── app/
│       │   │   ├── App.tsx            ✅ Root component
│       │   │   ├── Router.tsx         ✅ Routing
│       │   │   └── styles/
│       │   │       └── globals.css    ✅ Global styles
│       │   ├── pages/
│       │   │   ├── dashboard/
│       │   │   │   └── DashboardPage.tsx ✅ Dashboard
│       │   │   ├── compliance/
│       │   │   │   └── CompliancePage.tsx ✅ Compliance view
│       │   │   ├── discovery/
│       │   │   │   └── DiscoveryPage.tsx ✅ Discovery view
│       │   │   └── projection/
│       │   │       └── ProjectionPage.tsx ✅ Projection view
│       │   ├── widgets/
│       │   │   ├── compliance-summary/
│       │   │   │   └── ComplianceSummary.tsx ✅ Summary widget
│       │   │   └── graph-viewer/
│       │   │       └── GraphViewer.tsx ✅ Graph widget
│       │   ├── features/
│       │   │   ├── parsing/
│       │   │   │   ├── api/
│       │   │   │   │   └── parsing.api.ts ✅ API client
│       │   │   │   ├── model/
│       │   │   │   │   └── parsing.store.ts ✅ State
│       │   │   │   └── ui/
│       │   │   │       └── ParsingStatus.tsx ✅ UI component
│       │   │   ├── compliance/
│       │   │   │   ├── api/
│       │   │   │   │   └── compliance.api.ts ✅ API client
│       │   │   │   ├── model/
│       │   │   │   │   └── compliance.store.ts ✅ State
│       │   │   │   └── ui/
│       │   │   │       └── ViolationList.tsx ✅ UI component
│       │   │   ├── discovery/
│       │   │   │   └── [similar structure] ✅ Discovery feature
│       │   │   └── projection/
│       │   │       └── [similar structure] ✅ Projection feature
│       │   ├── entities/
│       │   │   ├── rule/
│       │   │   │   └── rule.types.ts  ✅ Rule types
│       │   │   ├── violation/
│       │   │   │   └── violation.types.ts ✅ Violation types
│       │   │   └── pattern/
│       │   │       └── pattern.types.ts ✅ Pattern types
│       │   └── shared/
│       │       ├── api/
│       │       │   └── client.ts      ✅ API client
│       │       ├── ui/
│       │       │   ├── Button/
│       │       │   │   └── Button.tsx ✅ Button component
│       │       │   ├── Card/
│       │       │   │   └── Card.tsx   ✅ Card component
│       │       │   └── Layout/
│       │       │       └── Layout.tsx ✅ Layout component
│       │       └── lib/
│       │           └── utils.ts       ✅ Utilities
│       └── tests/
│           └── setup.ts               ✅ Test setup
│
├── contexts/
│   ├── parsing/
│   │   └── presentation/
│   │       ├── ParsingController.ts   ✅ HTTP controller
│   │       └── ParsingCLI.ts         ✅ CLI handler
│   ├── compliance/
│   │   └── presentation/
│   │       ├── ComplianceController.ts ✅ HTTP controller
│   │       └── ComplianceCLI.ts      ✅ CLI handler
│   ├── projection/
│   │   └── presentation/
│   │       ├── ProjectionController.ts ✅ HTTP controller
│   │       └── ProjectionCLI.ts      ✅ CLI handler
│   └── discovery/
│       └── presentation/
│           ├── DiscoveryController.ts ✅ HTTP controller
│           └── DiscoveryCLI.ts       ✅ CLI handler
│
├── tests/
│   ├── e2e/
│   │   ├── cli/
│   │   │   ├── full-analysis.e2e.test.ts ✅ Complete flow
│   │   │   └── parse-check-fix.e2e.test.ts ✅ Parse flow
│   │   └── api/
│   │       └── compliance-flow.e2e.test.ts ✅ API flow
│   ├── integration/
│   │   ├── contexts/
│   │   │   ├── parsing-compliance.test.ts ✅ Integration
│   │   │   └── discovery-compliance.test.ts ✅ Integration
│   │   └── wiring/
│   │       └── container.test.ts      ✅ DI tests
│   ├── contracts/
│   │   ├── Parser.contract.test.ts    ✅ Parser contract
│   │   └── Evaluator.contract.test.ts ✅ Evaluator contract
│   └── test-utils/
│       ├── TestContainer.ts           ✅ Test container
│       ├── builders/
│       │   ├── GraphBuilder.ts        ✅ Test builder
│       │   └── RuleBuilder.ts         ✅ Test builder
│       └── fixtures/
│           └── sample-codebases/      ✅ Test fixtures
│
└── docs/
    ├── architecture/
    │   ├── overview.md                ✅ Architecture overview
    │   ├── bounded-contexts.md        ✅ Context docs
    │   └── decisions/
    │       ├── ADR-001-modular-monolith.md ✅ ADR
    │       ├── ADR-002-clean-architecture.md ✅ ADR
    │       └── ADR-003-di-pattern.md  ✅ ADR
    ├── api/
    │   └── openapi.yaml               ✅ API spec
    ├── guides/
    │   ├── getting-started.md         ✅ Quick start
    │   ├── configuration.md           ✅ Config guide
    │   └── extending.md               ✅ Extension guide
    └── examples/
        └── architecture.config.example.ts ✅ Example config
```

### Key Deliverables
1. Working CLI with all commands
2. Working BFF with all endpoints
3. Working Web UI with all features
4. Presentation layer for all contexts
5. Complete test suite (unit, integration, E2E)
6. Full documentation
7. Complete end-to-end demo capability

---

## Implementation Timeline

- **Phase 1**: ~2-3 days - Foundation
- **Phase 2**: ~3-4 days - Domain layers
- **Phase 3**: ~4-5 days - Application & Infrastructure
- **Phase 4**: ~5-6 days - Entry points & Integration

**Total**: ~14-18 days for complete stub implementation

---

## Validation Strategy

### After Each Phase
1. Run `npm run build` - All packages must compile
2. Run `npm run typecheck` - No type errors
3. Run `npm run test` - All tests pass
4. Manual smoke test of new functionality

### Phase-Specific Validation

**Phase 1**:
```bash
# Verify DI container works
node -e "const {Container} = require('./wiring/Container'); const c = new Container(); console.log('✓ Container works')"

# Verify config loads
node -e "const config = require('./config'); console.log('✓ Config loads')"
```

**Phase 2**:
```bash
# Import each context
node -e "const parsing = require('./contexts/parsing'); console.log('✓ Parsing context')"
node -e "const compliance = require('./contexts/compliance'); console.log('✓ Compliance context')"
node -e "const projection = require('./contexts/projection'); console.log('✓ Projection context')"
node -e "const discovery = require('./contexts/discovery'); console.log('✓ Discovery context')"
```

**Phase 3**:
```bash
# Test use case execution
node -e "const {ParseCodebase} = require('./contexts/parsing/application/use-cases/ParseCodebase'); console.log('✓ Use case executable')"

# Test wiring
node -e "const {bootstrap} = require('./wiring/bootstrap'); bootstrap(); console.log('✓ Wiring complete')"
```

**Phase 4**:
```bash
# Test CLI
c3 --help
c3 parse ./test-project
c3 check ./test-project

# Test BFF
curl http://localhost:3001/health
curl http://localhost:3001/api/compliance/rules

# Test Web
# Open http://localhost:5173 in browser
```

---

## Success Criteria for Complete System

1. ✅ All TypeScript compiles without errors
2. ✅ All tests pass (unit, integration, E2E)
3. ✅ CLI commands execute end-to-end with mock data
4. ✅ BFF API responds to all endpoint requests
5. ✅ Web UI displays data from all contexts
6. ✅ Mock data flows through complete system
7. ✅ DI container wires all dependencies correctly
8. ✅ Configuration system loads architecture.config.ts
9. ✅ Documentation is complete and accurate
10. ✅ Code follows clean architecture principles

---

## Notes

- Each phase builds on the previous one
- Stub implementations return mock data but follow real interfaces
- Focus is on structure validation, not real functionality
- All files have proper TypeScript types
- Every context is independently compilable
- Testing infrastructure grows with each phase