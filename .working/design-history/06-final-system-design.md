# C3 Code Standards System - Final System Design

## System Overview

C3 is a modular code standards management system that parses codebases, discovers implicit patterns, evaluates compliance against rules, and provides remediation strategies. The system uses AI to infer architectural decisions and helps maintain consistent code standards across projects.

### Core Architecture

- **Architecture Pattern**: Modular Monolith with Bounded Contexts
- **Design Pattern**: Clean Architecture with Ports & Adapters per context
- **Extensibility**: DI with manual container, ports/adapters for plugins
- **Communication**: Direct service calls between contexts (no event bus for MVP)
- **Frontend**: Feature-Sliced Design architecture
- **Backend**: Express BFF for API aggregation
- **AI Integration**: Claude API for pattern discovery

### Bounded Contexts

1. **Parsing Context**: Transforms code into property graphs
2. **Compliance Context**: Manages rules, evaluates code, provides fixes
3. **Projection Context**: Transforms graphs into analytical views
4. **Discovery Context**: Uses AI to discover patterns and infer rules

## Complete Filesystem Structure

```
c3/
├── package.json                          # Root package configuration
├── tsconfig.json                         # TypeScript configuration
├── .env.example                          # Environment variables template
├── README.md                             # Project documentation
├── architecture.config.ts                # Example architecture configuration
│
├── apps/
│   ├── cli/
│   │   ├── package.json                 # CLI package configuration
│   │   ├── tsconfig.json                # CLI TypeScript config
│   │   ├── README.md                    # CLI documentation
│   │   ├── src/
│   │   │   ├── index.ts                 # CLI entry point, command registration
│   │   │   ├── cli.ts                   # CLI initialization and configuration
│   │   │   ├── commands/
│   │   │   │   ├── index.ts            # Command exports
│   │   │   │   ├── parse.command.ts    # Parse codebase into property graph
│   │   │   │   ├── check.command.ts    # Check compliance against rules
│   │   │   │   ├── discover.command.ts # Discover patterns using AI
│   │   │   │   ├── fix.command.ts      # Apply automated fixes
│   │   │   │   ├── visualize.command.ts # Generate visualization outputs
│   │   │   │   ├── init.command.ts     # Initialize project configuration
│   │   │   │   └── rules.command.ts    # Manage rules (add/remove/list)
│   │   │   ├── utils/
│   │   │   │   ├── logger.ts           # CLI-specific logging utilities
│   │   │   │   ├── spinner.ts          # Progress indicators
│   │   │   │   ├── prompts.ts          # Interactive prompts
│   │   │   │   └── output.ts           # Formatted output helpers
│   │   │   └── container/
│   │   │       └── cli.container.ts    # DI container setup for CLI
│   │   ├── bin/
│   │   │   └── c3.js                   # Executable entry script
│   │   └── tests/
│   │       ├── commands/
│   │       │   └── parse.test.ts       # Parse command tests
│   │       └── integration/
│   │           └── cli.e2e.test.ts     # CLI end-to-end tests
│   │
│   ├── bff/
│   │   ├── package.json                 # BFF package configuration
│   │   ├── tsconfig.json                # BFF TypeScript config
│   │   ├── README.md                    # BFF API documentation
│   │   ├── src/
│   │   │   ├── index.ts                 # Server entry point
│   │   │   ├── app.ts                   # Express app configuration
│   │   │   ├── server.ts                # Server initialization
│   │   │   ├── routes/
│   │   │   │   ├── index.ts            # Route registration
│   │   │   │   ├── health.routes.ts    # Health check endpoints
│   │   │   │   ├── parsing.routes.ts   # /api/parse endpoints
│   │   │   │   ├── compliance.routes.ts # /api/compliance endpoints
│   │   │   │   ├── discovery.routes.ts # /api/discovery endpoints
│   │   │   │   ├── projection.routes.ts # /api/projections endpoints
│   │   │   │   └── workspace.routes.ts # /api/workspace endpoints
│   │   │   ├── middleware/
│   │   │   │   ├── auth.middleware.ts  # Authentication handling
│   │   │   │   ├── error.middleware.ts # Global error handling
│   │   │   │   ├── validation.middleware.ts # Request validation
│   │   │   │   ├── cors.middleware.ts  # CORS configuration
│   │   │   │   └── logging.middleware.ts # Request logging
│   │   │   ├── aggregators/
│   │   │   │   ├── dashboard.aggregator.ts # Combine multiple context data
│   │   │   │   ├── report.aggregator.ts # Generate comprehensive reports
│   │   │   │   └── analysis.aggregator.ts # Full analysis orchestration
│   │   │   ├── validators/
│   │   │   │   ├── parsing.validators.ts # Parsing request validation
│   │   │   │   └── compliance.validators.ts # Compliance request validation
│   │   │   └── container/
│   │   │       └── bff.container.ts    # DI container setup for BFF
│   │   └── tests/
│   │       ├── routes/
│   │       │   └── compliance.test.ts  # Route tests
│   │       └── aggregators/
│   │           └── dashboard.test.ts   # Aggregator tests
│   │
│   └── web/
│       ├── package.json                 # Web app package configuration
│       ├── tsconfig.json                # Web TypeScript config
│       ├── vite.config.ts               # Vite bundler configuration
│       ├── index.html                   # HTML entry point
│       ├── README.md                    # Frontend documentation
│       ├── src/
│       │   ├── main.tsx                 # React app entry point
│       │   ├── app/
│       │   │   ├── App.tsx             # Root app component
│       │   │   ├── Router.tsx          # Route configuration
│       │   │   ├── providers/
│       │   │   │   ├── index.tsx       # Provider composition
│       │   │   │   ├── ThemeProvider.tsx # Theme context
│       │   │   │   └── AuthProvider.tsx # Authentication context
│       │   │   └── styles/
│       │   │       ├── globals.css     # Global styles
│       │   │       └── variables.css   # CSS variables
│       │   ├── pages/
│       │   │   ├── dashboard/
│       │   │   │   ├── index.tsx       # Dashboard exports
│       │   │   │   ├── DashboardPage.tsx # Main dashboard view
│       │   │   │   └── dashboard.module.css # Dashboard styles
│       │   │   ├── compliance/
│       │   │   │   ├── index.tsx       # Compliance exports
│       │   │   │   ├── CompliancePage.tsx # Compliance view
│       │   │   │   ├── RuleDetailPage.tsx # Individual rule view
│       │   │   │   └── compliance.module.css # Compliance styles
│       │   │   ├── discovery/
│       │   │   │   ├── index.tsx       # Discovery exports
│       │   │   │   ├── DiscoveryPage.tsx # Pattern discovery view
│       │   │   │   ├── PatternDetailPage.tsx # Pattern details
│       │   │   │   └── discovery.module.css # Discovery styles
│       │   │   ├── projection/
│       │   │   │   ├── index.tsx       # Projection exports
│       │   │   │   ├── ProjectionPage.tsx # Visualization selection
│       │   │   │   ├── GraphViewPage.tsx # Graph visualization
│       │   │   │   └── projection.module.css # Projection styles
│       │   │   └── settings/
│       │   │       ├── index.tsx       # Settings exports
│       │   │       ├── SettingsPage.tsx # Settings management
│       │   │       └── settings.module.css # Settings styles
│       │   ├── widgets/
│       │   │   ├── compliance-summary/
│       │   │   │   ├── index.ts       # Widget exports
│       │   │   │   ├── ComplianceSummary.tsx # Summary component
│       │   │   │   ├── ComplianceChart.tsx # Violation charts
│       │   │   │   └── ComplianceSummary.module.css # Widget styles
│       │   │   ├── rule-editor/
│       │   │   │   ├── index.ts       # Widget exports
│       │   │   │   ├── RuleEditor.tsx # Rule editing component
│       │   │   │   ├── RuleForm.tsx   # Rule form inputs
│       │   │   │   └── RuleEditor.module.css # Widget styles
│       │   │   ├── pattern-viewer/
│       │   │   │   ├── index.ts       # Widget exports
│       │   │   │   ├── PatternViewer.tsx # Pattern display
│       │   │   │   ├── EvidenceList.tsx # Evidence display
│       │   │   │   └── PatternViewer.module.css # Widget styles
│       │   │   └── graph-viewer/
│       │   │       ├── index.ts       # Widget exports
│       │   │       ├── GraphViewer.tsx # Graph visualization
│       │   │       ├── GraphControls.tsx # Zoom/pan controls
│       │   │       └── GraphViewer.module.css # Widget styles
│       │   ├── features/
│       │   │   ├── parsing/
│       │   │   │   ├── api/
│       │   │   │   │   └── parsing.api.ts # Parsing API client
│       │   │   │   ├── model/
│       │   │   │   │   ├── parsing.store.ts # Parsing state management
│       │   │   │   │   ├── parsing.types.ts # Type definitions
│       │   │   │   │   └── parsing.selectors.ts # State selectors
│       │   │   │   └── ui/
│       │   │   │       ├── ParsingStatus.tsx # Parsing status display
│       │   │   │       ├── FileTree.tsx # File tree display
│       │   │   │       └── ParsingProgress.tsx # Progress indicator
│       │   │   ├── compliance/
│       │   │   │   ├── api/
│       │   │   │   │   └── compliance.api.ts # Compliance API client
│       │   │   │   ├── model/
│       │   │   │   │   ├── compliance.store.ts # Compliance state
│       │   │   │   │   ├── compliance.types.ts # Type definitions
│       │   │   │   │   └── compliance.actions.ts # State actions
│       │   │   │   └── ui/
│       │   │   │       ├── ViolationList.tsx # Violation list display
│       │   │   │       ├── ViolationCard.tsx # Individual violation
│       │   │   │       ├── RuleList.tsx # Rule list display
│       │   │   │       └── FixButton.tsx # Apply fix action
│       │   │   ├── discovery/
│       │   │   │   ├── api/
│       │   │   │   │   └── discovery.api.ts # Discovery API client
│       │   │   │   ├── model/
│       │   │   │   │   ├── discovery.store.ts # Discovery state
│       │   │   │   │   └── discovery.types.ts # Type definitions
│       │   │   │   └── ui/
│       │   │   │       ├── PatternList.tsx # Pattern list display
│       │   │   │       ├── ConfidenceScore.tsx # Confidence display
│       │   │   │       └── AcceptRuleButton.tsx # Accept suggestion
│       │   │   └── projection/
│       │   │       ├── api/
│       │   │       │   └── projection.api.ts # Projection API client
│       │   │       ├── model/
│       │   │       │   ├── projection.store.ts # Projection state
│       │   │       │   └── projection.types.ts # Type definitions
│       │   │       └── ui/
│       │   │           ├── ViewSelector.tsx # View type selector
│       │   │           ├── GraphCanvas.tsx # Graph rendering canvas
│       │   │           └── ExportButton.tsx # Export visualization
│       │   ├── entities/
│       │   │   ├── rule/
│       │   │   │   ├── index.ts       # Rule entity exports
│       │   │   │   ├── rule.types.ts  # Rule type definitions
│       │   │   │   └── rule.utils.ts  # Rule utilities
│       │   │   ├── violation/
│       │   │   │   ├── index.ts       # Violation entity exports
│       │   │   │   ├── violation.types.ts # Violation types
│       │   │   │   └── violation.utils.ts # Violation utilities
│       │   │   ├── pattern/
│       │   │   │   ├── index.ts       # Pattern entity exports
│       │   │   │   ├── pattern.types.ts # Pattern types
│       │   │   │   └── pattern.utils.ts # Pattern utilities
│       │   │   └── graph/
│       │   │       ├── index.ts       # Graph entity exports
│       │   │       ├── graph.types.ts # Graph types
│       │   │       └── graph.utils.ts # Graph utilities
│       │   └── shared/
│       │       ├── api/
│       │       │   ├── client.ts      # API client setup
│       │       │   ├── interceptors.ts # Request/response interceptors
│       │       │   └── types.ts       # API type definitions
│       │       ├── ui/
│       │       │   ├── Button/
│       │       │   │   ├── Button.tsx # Button component
│       │       │   │   └── Button.module.css # Button styles
│       │       │   ├── Card/
│       │       │   │   ├── Card.tsx   # Card component
│       │       │   │   └── Card.module.css # Card styles
│       │       │   ├── Layout/
│       │       │   │   ├── Layout.tsx # Layout component
│       │       │   │   ├── Header.tsx # Header component
│       │       │   │   ├── Sidebar.tsx # Sidebar navigation
│       │       │   │   └── Layout.module.css # Layout styles
│       │       │   └── Form/
│       │       │       ├── Input.tsx  # Input component
│       │       │       ├── Select.tsx # Select component
│       │       │       └── Form.module.css # Form styles
│       │       └── lib/
│       │           ├── utils.ts       # Utility functions
│       │           ├── constants.ts   # App constants
│       │           └── hooks.ts       # Custom React hooks
│       ├── public/
│       │   └── assets/                 # Static assets
│       └── tests/
│           ├── setup.ts                # Test setup
│           └── features/
│               └── compliance.test.tsx # Feature tests
│
├── contexts/
│   ├── parsing/
│   │   ├── package.json                # Parsing context package
│   │   ├── tsconfig.json               # TypeScript configuration
│   │   ├── README.md                   # Context documentation
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── PropertyGraph.ts   # Core graph representation
│   │   │   │   ├── Node.ts            # Graph node entity
│   │   │   │   ├── Edge.ts            # Graph edge entity
│   │   │   │   ├── FileInfo.ts        # File metadata
│   │   │   │   └── Codebase.ts        # Codebase abstraction
│   │   │   ├── services/
│   │   │   │   ├── ParsingService.ts  # Main parsing orchestration
│   │   │   │   ├── GraphBuilder.ts    # Graph construction logic
│   │   │   │   ├── NodeFactory.ts     # Node creation logic
│   │   │   │   └── EdgeDetector.ts    # Edge/dependency detection
│   │   │   ├── ports/
│   │   │   │   ├── Parser.ts          # Parser interface
│   │   │   │   ├── GraphRepository.ts # Graph storage interface
│   │   │   │   ├── FileSystem.ts      # File system interface
│   │   │   │   └── Cache.ts           # Caching interface
│   │   │   └── value-objects/
│   │   │       ├── FilePath.ts        # File path value object
│   │   │       ├── NodeType.ts        # Node type enumeration
│   │   │       ├── EdgeType.ts        # Edge type enumeration
│   │   │       └── Language.ts        # Programming language
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── ParseCodebase.ts   # Parse entire codebase
│   │   │   │   ├── ParseFile.ts       # Parse single file
│   │   │   │   ├── GetPropertyGraph.ts # Retrieve parsed graph
│   │   │   │   ├── UpdateGraph.ts     # Incremental updates
│   │   │   │   └── ClearCache.ts      # Clear parsing cache
│   │   │   └── dto/
│   │   │       ├── ParseRequest.dto.ts # Parse request structure
│   │   │       ├── ParseOptions.dto.ts # Parsing options
│   │   │       ├── GraphResponse.dto.ts # Graph response structure
│   │   │       └── FileResponse.dto.ts # File parsing response
│   │   ├── infrastructure/
│   │   │   ├── adapters/
│   │   │   │   ├── FilesystemParser.ts # Basic filesystem parser
│   │   │   │   ├── TypeScriptParser.ts # TypeScript AST parser
│   │   │   │   ├── PythonParser.ts    # Python AST parser
│   │   │   │   ├── JavaParser.ts      # Java AST parser
│   │   │   │   └── NodeFileSystem.ts  # Node.js file system
│   │   │   ├── persistence/
│   │   │   │   ├── InMemoryGraphRepository.ts # In-memory storage
│   │   │   │   ├── FileGraphRepository.ts # File-based storage
│   │   │   │   └── RedisCache.ts      # Redis caching adapter
│   │   │   └── analyzers/
│   │   │       ├── DependencyAnalyzer.ts # Analyze dependencies
│   │   │       └── MetricsAnalyzer.ts # Code metrics calculation
│   │   ├── presentation/
│   │   │   ├── ParsingController.ts   # HTTP controller
│   │   │   └── ParsingCLI.ts         # CLI handler
│   │   └── tests/
│   │       ├── unit/
│   │       │   ├── domain/
│   │       │   │   └── GraphBuilder.test.ts
│   │       │   └── infrastructure/
│   │       │       └── TypeScriptParser.test.ts
│   │       ├── integration/
│   │       │   └── ParsingService.test.ts
│   │       └── fixtures/
│   │           └── sample-projects/
│   │
│   ├── compliance/
│   │   ├── package.json                # Compliance context package
│   │   ├── tsconfig.json               # TypeScript configuration
│   │   ├── README.md                   # Context documentation
│   │   ├── domain/
│   │   │   ├── aggregates/
│   │   │   │   ├── RuleSet/
│   │   │   │   │   ├── RuleSet.ts     # Rule collection aggregate
│   │   │   │   │   ├── Rule.ts        # Individual rule entity
│   │   │   │   │   ├── Condition.ts   # Rule condition
│   │   │   │   │   └── RuleSource.ts  # Where rule came from
│   │   │   │   ├── Evaluation/
│   │   │   │   │   ├── ComplianceReport.ts # Evaluation results
│   │   │   │   │   ├── Violation.ts   # Rule violation entity
│   │   │   │   │   ├── ViolationContext.ts # Violation details
│   │   │   │   │   └── Severity.ts    # Violation severity
│   │   │   │   └── Remediation/
│   │   │   │       ├── FixPlan.ts     # Collection of fixes
│   │   │   │       ├── Fix.ts         # Individual fix
│   │   │   │       ├── FixStrategy.ts # How to apply fix
│   │   │   │       └── Whitelist.ts   # Accepted violations
│   │   │   ├── services/
│   │   │   │   ├── RuleManagementService.ts # Rule CRUD operations
│   │   │   │   ├── EvaluationEngine.ts # Core evaluation logic
│   │   │   │   ├── RemediationService.ts # Fix generation/application
│   │   │   │   ├── ConfigurationParser.ts # Parse config files
│   │   │   │   └── WhitelistService.ts # Manage whitelisted items
│   │   │   ├── ports/
│   │   │   │   ├── RuleRepository.ts  # Rule storage interface
│   │   │   │   ├── EvaluatorStrategy.ts # Evaluation strategy
│   │   │   │   ├── FixStrategy.ts     # Fix strategy interface
│   │   │   │   ├── ConfigLoader.ts    # Config loading interface
│   │   │   │   └── NotificationService.ts # Violation notifications
│   │   │   └── value-objects/
│   │   │       ├── RuleType.ts        # Types of rules
│   │   │       ├── Severity.ts        # Severity levels
│   │   │       ├── FixType.ts         # Types of fixes
│   │   │       └── RuleId.ts          # Rule identifier
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── CheckCompliance.ts # Run compliance check
│   │   │   │   ├── ApplyFixes.ts      # Apply automated fixes
│   │   │   │   ├── ManageRules.ts     # Add/update/delete rules
│   │   │   │   ├── ImportRules.ts     # Import from config
│   │   │   │   ├── ExportRules.ts     # Export to config
│   │   │   │   └── WhitelistViolation.ts # Add to whitelist
│   │   │   └── dto/
│   │   │       ├── ComplianceReport.dto.ts # Report structure
│   │   │       ├── RuleConfig.dto.ts  # Rule configuration
│   │   │       ├── ViolationSummary.dto.ts # Violation summary
│   │   │       └── FixRequest.dto.ts  # Fix application request
│   │   ├── infrastructure/
│   │   │   ├── evaluators/
│   │   │   │   ├── DependencyEvaluator.ts # Check dependencies
│   │   │   │   ├── NamingEvaluator.ts # Check naming conventions
│   │   │   │   ├── StructureEvaluator.ts # Check structure rules
│   │   │   │   ├── ComplexityEvaluator.ts # Check complexity
│   │   │   │   └── CustomEvaluator.ts # User-defined evaluators
│   │   │   ├── fixers/
│   │   │   │   ├── RenameFixer.ts     # Fix naming issues
│   │   │   │   ├── MoveFixer.ts       # Move files/folders
│   │   │   │   ├── RefactorFixer.ts   # Refactoring fixes
│   │   │   │   └── ImportFixer.ts     # Fix import issues
│   │   │   ├── config/
│   │   │   │   ├── YamlConfigLoader.ts # Load YAML configs
│   │   │   │   ├── JsonConfigLoader.ts # Load JSON configs
│   │   │   │   └── TypeScriptConfigLoader.ts # Load TS configs
│   │   │   └── persistence/
│   │   │       ├── InMemoryRuleRepository.ts # In-memory rules
│   │   │       ├── FileRuleRepository.ts # File-based rules
│   │   │       └── DatabaseRuleRepository.ts # Database storage
│   │   ├── presentation/
│   │   │   ├── ComplianceController.ts # HTTP controller
│   │   │   └── ComplianceCLI.ts      # CLI handler
│   │   └── tests/
│   │       ├── unit/
│   │       │   ├── domain/
│   │       │   └── evaluators/
│   │       └── integration/
│   │
│   ├── projection/
│   │   ├── package.json                # Projection context package
│   │   ├── tsconfig.json               # TypeScript configuration
│   │   ├── README.md                   # Context documentation
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── Projection.ts      # Base projection concept
│   │   │   │   ├── ModuleProjection.ts # Module-level view
│   │   │   │   ├── LayerProjection.ts # Architectural layers
│   │   │   │   ├── DependencyMatrix.ts # Dependency analysis
│   │   │   │   ├── ComponentGraph.ts  # Component relationships
│   │   │   │   └── TreeProjection.ts  # Tree structure view
│   │   │   ├── services/
│   │   │   │   ├── ProjectionEngine.ts # Core projection logic
│   │   │   │   ├── GraphTransformer.ts # Graph transformations
│   │   │   │   ├── NodeAggregator.ts  # Node merging/grouping
│   │   │   │   ├── MetricsCalculator.ts # Calculate metrics
│   │   │   │   └── LayoutEngine.ts    # Layout algorithms
│   │   │   ├── ports/
│   │   │   │   ├── ProjectionStrategy.ts # Projection interface
│   │   │   │   ├── Renderer.ts        # Rendering interface
│   │   │   │   ├── Exporter.ts        # Export interface
│   │   │   │   └── ViewRepository.ts  # View storage
│   │   │   └── value-objects/
│   │   │       ├── ProjectionType.ts  # Types of projections
│   │   │       ├── AggregationLevel.ts # Aggregation levels
│   │   │       ├── ViewConfiguration.ts # View settings
│   │   │       └── ExportFormat.ts    # Export formats
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── GenerateProjection.ts # Create projection
│   │   │   │   ├── TransformGraph.ts  # Transform to view
│   │   │   │   ├── ExportVisualization.ts # Export view
│   │   │   │   ├── ListProjections.ts # List available views
│   │   │   │   └── CacheProjection.ts # Cache computed views
│   │   │   └── dto/
│   │   │       ├── ProjectionRequest.dto.ts # Request structure
│   │   │       ├── ProjectionResponse.dto.ts # Response structure
│   │   │       ├── ViewMetadata.dto.ts # View metadata
│   │   │       └── ExportOptions.dto.ts # Export options
│   │   ├── infrastructure/
│   │   │   ├── strategies/
│   │   │   │   ├── ModuleProjectionStrategy.ts # Module grouping
│   │   │   │   ├── LayerProjectionStrategy.ts # Layer separation
│   │   │   │   ├── ClusterProjectionStrategy.ts # Clustering
│   │   │   │   └── HierarchicalProjectionStrategy.ts # Hierarchy
│   │   │   ├── renderers/
│   │   │   │   ├── D3Renderer.ts      # D3.js rendering
│   │   │   │   ├── CanvasRenderer.ts  # Canvas rendering
│   │   │   │   ├── SVGRenderer.ts     # SVG generation
│   │   │   │   └── AsciiRenderer.ts   # ASCII art rendering
│   │   │   ├── exporters/
│   │   │   │   ├── SVGExporter.ts     # Export to SVG
│   │   │   │   ├── JSONExporter.ts    # Export to JSON
│   │   │   │   ├── DOTExporter.ts     # Export to Graphviz
│   │   │   │   └── MermaidExporter.ts # Export to Mermaid
│   │   │   ├── algorithms/
│   │   │   │   ├── ForceDirectedLayout.ts # Force-directed layout
│   │   │   │   ├── HierarchicalLayout.ts # Tree layout
│   │   │   │   └── CircularLayout.ts  # Circular layout
│   │   │   └── persistence/
│   │   │       └── InMemoryViewRepository.ts # View caching
│   │   ├── presentation/
│   │   │   ├── ProjectionController.ts # HTTP controller
│   │   │   └── ProjectionCLI.ts      # CLI handler
│   │   └── tests/
│   │       ├── unit/
│   │       │   └── ProjectionEngine.test.ts
│   │       └── integration/
│   │
│   └── discovery/
│       ├── package.json                # Discovery context package
│       ├── tsconfig.json               # TypeScript configuration
│       ├── README.md                   # Context documentation
│       ├── domain/
│       │   ├── aggregates/
│       │   │   ├── PatternAnalysis/
│       │   │   │   ├── Pattern.ts     # Discovered pattern entity
│       │   │   │   ├── Evidence.ts    # Supporting evidence
│       │   │   │   ├── Occurrence.ts  # Where pattern occurs
│       │   │   │   └── PatternType.ts # Type of pattern
│       │   │   ├── RuleInference/
│       │   │   │   ├── CandidateRule.ts # Inferred rule
│       │   │   │   ├── Confidence.ts  # Confidence score
│       │   │   │   ├── Rationale.ts   # Why rule makes sense
│       │   │   │   └── Example.ts     # Code examples
│       │   │   └── Research/
│       │   │       ├── ResearchSession.ts # Research session
│       │   │       ├── Query.ts       # Research query
│       │   │       ├── Finding.ts     # Research finding
│       │   │       └── Source.ts      # Information source
│       │   ├── services/
│       │   │   ├── PatternDetectionService.ts # Find patterns
│       │   │   ├── RuleInferenceService.ts # Infer rules
│       │   │   ├── DocumentationAnalyzer.ts # Analyze docs
│       │   │   ├── CodebaseResearcher.ts # Research codebase
│       │   │   └── ConfidenceCalculator.ts # Calculate confidence
│       │   ├── ports/
│       │   │   ├── LLMProvider.ts     # LLM interface
│       │   │   ├── PatternMatcher.ts  # Pattern matching
│       │   │   ├── EvidenceCollector.ts # Evidence gathering
│       │   │   ├── DocumentAnalyzer.ts # Document analysis
│       │   │   └── PatternRepository.ts # Pattern storage
│       │   └── value-objects/
│       │       ├── ConfidenceScore.ts # Confidence value
│       │       ├── PatternFrequency.ts # Frequency metric
│       │       ├── EvidenceStrength.ts # Evidence strength
│       │       └── ResearchDepth.ts   # Research depth level
│       ├── application/
│       │   ├── use-cases/
│       │   │   ├── DiscoverPatterns.ts # Discover patterns
│       │   │   ├── InferRules.ts      # Infer rules from patterns
│       │   │   ├── AnalyzeDocumentation.ts # Analyze docs
│       │   │   ├── ResearchArchitecture.ts # Research architecture
│       │   │   ├── GenerateRecommendations.ts # Generate suggestions
│       │   │   └── ExplainPattern.ts  # Explain discovered pattern
│       │   └── dto/
│       │       ├── DiscoveryRequest.dto.ts # Request structure
│       │       ├── PatternReport.dto.ts # Pattern report
│       │       ├── CandidateRules.dto.ts # Candidate rules
│       │       └── ResearchReport.dto.ts # Research findings
│       ├── infrastructure/
│       │   ├── llm/
│       │   │   ├── ClaudeLLMProvider.ts # Claude integration
│       │   │   ├── PromptTemplates.ts # Prompt engineering
│       │   │   ├── TokenManager.ts    # Token management
│       │   │   └── ResponseParser.ts  # Parse LLM responses
│       │   ├── pattern-matchers/
│       │   │   ├── RegexPatternMatcher.ts # Regex matching
│       │   │   ├── ASTPatternMatcher.ts # AST pattern matching
│       │   │   ├── StatisticalMatcher.ts # Statistical analysis
│       │   │   └── HeuristicMatcher.ts # Heuristic matching
│       │   ├── analyzers/
│       │   │   ├── NamingAnalyzer.ts  # Naming conventions
│       │   │   ├── StructureAnalyzer.ts # Structure patterns
│       │   │   ├── DependencyAnalyzer.ts # Dependency patterns
│       │   │   ├── ConfigAnalyzer.ts  # Config file analysis
│       │   │   └── ReadmeAnalyzer.ts  # README analysis
│       │   └── persistence/
│       │       └── InMemoryPatternRepository.ts # Pattern storage
│       ├── presentation/
│       │   ├── DiscoveryController.ts # HTTP controller
│       │   └── DiscoveryCLI.ts       # CLI handler
│       └── tests/
│           ├── unit/
│           │   └── PatternDetection.test.ts
│           ├── mocks/
│           │   └── MockLLMProvider.ts
│           └── integration/
│
├── shared/
│   ├── domain/
│   │   ├── core-abstractions/
│   │   │   ├── Codebase.ts            # Codebase entity
│   │   │   ├── Project.ts             # Project container
│   │   │   ├── AnalysisSession.ts     # Analysis session
│   │   │   └── Workspace.ts           # Multi-project workspace
│   │   ├── base/
│   │   │   ├── Entity.ts              # Base entity class
│   │   │   ├── ValueObject.ts         # Base value object
│   │   │   ├── AggregateRoot.ts       # Aggregate root base
│   │   │   └── DomainEvent.ts         # Domain event base
│   │   └── common/
│   │       ├── Result.ts              # Result type for errors
│   │       ├── Either.ts              # Either monad
│   │       └── Specification.ts       # Specification pattern
│   ├── infrastructure/
│   │   ├── Logger.ts                  # Shared logging service
│   │   ├── EventBus.ts                # Event communication
│   │   ├── Cache.ts                   # Caching abstraction
│   │   ├── Metrics.ts                 # Metrics collection
│   │   └── Tracer.ts                  # Distributed tracing
│   ├── configuration/
│   │   ├── ConfigurationService.ts    # Config management
│   │   ├── ConfigSchema.ts            # Config validation schema
│   │   ├── PresetManager.ts           # Preset rule sets
│   │   ├── ConfigTransformer.ts       # Transform configs
│   │   └── ConfigWatcher.ts           # Watch config changes
│   └── types/
│       ├── common.types.ts            # Common type definitions
│       ├── errors.types.ts            # Error type definitions
│       └── api.types.ts               # API type definitions
│
├── wiring/
│   ├── Container.ts                   # Manual DI container
│   ├── dependencies.ts                # Dependency definitions
│   ├── bootstrap.ts                   # Application bootstrap
│   ├── context-modules/
│   │   ├── parsing.module.ts         # Parsing context wiring
│   │   ├── compliance.module.ts      # Compliance context wiring
│   │   ├── projection.module.ts      # Projection context wiring
│   │   └── discovery.module.ts       # Discovery context wiring
│   └── factories/
│       ├── ParserFactory.ts          # Create parser instances
│       ├── EvaluatorFactory.ts       # Create evaluators
│       └── RendererFactory.ts        # Create renderers
│
├── config/
│   ├── default.config.ts              # Default configuration
│   ├── development.config.ts          # Development overrides
│   ├── production.config.ts           # Production settings
│   ├── test.config.ts                 # Test configuration
│   └── index.ts                       # Config loader with Zod
│
├── scripts/
│   ├── setup.sh                       # Initial setup script
│   ├── dev.sh                         # Development runner
│   ├── build.sh                       # Build all contexts
│   ├── test.sh                        # Run all tests
│   └── seed-data.ts                   # Seed sample data
│
├── tests/
│   ├── e2e/
│   │   ├── cli/
│   │   │   ├── full-analysis.e2e.test.ts # Complete CLI flow
│   │   │   ├── parse-check-fix.e2e.test.ts # Parse-check-fix flow
│   │   │   └── discover-apply.e2e.test.ts # Discovery flow
│   │   └── api/
│   │       ├── compliance-flow.e2e.test.ts # API compliance flow
│   │       └── dashboard.e2e.test.ts  # Dashboard aggregation
│   ├── integration/
│   │   ├── contexts/
│   │   │   ├── parsing-compliance.test.ts # Context integration
│   │   │   ├── discovery-compliance.test.ts # Discovery integration
│   │   │   └── compliance-projection.test.ts # Projection integration
│   │   └── wiring/
│   │       └── container.test.ts      # Container wiring test
│   ├── contracts/
│   │   ├── Parser.contract.test.ts    # Parser contract tests
│   │   ├── Evaluator.contract.test.ts # Evaluator contracts
│   │   └── LLMProvider.contract.test.ts # LLM provider contracts
│   └── test-utils/
│       ├── TestContainer.ts           # Test DI container
│       ├── builders/
│       │   ├── GraphBuilder.ts        # Build test graphs
│       │   ├── RuleBuilder.ts         # Build test rules
│       │   ├── PatternBuilder.ts      # Build test patterns
│       │   └── ViolationBuilder.ts    # Build test violations
│       ├── fixtures/
│       │   ├── sample-codebases/      # Sample codebases
│       │   ├── mock-responses/        # Mock API responses
│       │   └── test-configs/          # Test configurations
│       └── assertions/
│           ├── graphAssertions.ts     # Graph assertions
│           └── complianceAssertions.ts # Compliance assertions
│
└── docs/
    ├── architecture/
    │   ├── overview.md                # Architecture overview
    │   ├── bounded-contexts.md        # Context descriptions
    │   ├── decisions/
    │   │   ├── ADR-001-modular-monolith.md # Monolith decision
    │   │   ├── ADR-002-clean-architecture.md # Clean architecture
    │   │   ├── ADR-003-di-pattern.md  # DI over plugins
    │   │   └── ADR-004-four-contexts.md # Context boundaries
    │   └── diagrams/
    │       ├── system-overview.puml   # System diagram
    │       └── context-map.puml       # Context relationships
    ├── api/
    │   ├── openapi.yaml               # OpenAPI specification
    │   └── graphql.schema             # GraphQL schema (future)
    ├── guides/
    │   ├── getting-started.md         # Quick start guide
    │   ├── configuration.md           # Configuration guide
    │   ├── extending.md               # Extension guide
    │   └── cli-reference.md           # CLI documentation
    └── examples/
        ├── architecture.config.example.ts # Example config
        └── custom-evaluator.example.ts # Custom evaluator
```

## File Descriptions by Context

### Parsing Context Files
- **PropertyGraph.ts**: Core data structure representing the codebase as nodes and edges
- **ParsingService.ts**: Orchestrates the parsing process across multiple files
- **Parser.ts**: Interface that all parser implementations must follow
- **TypeScriptParser.ts**: Parses TypeScript/JavaScript files using AST analysis
- **GraphBuilder.ts**: Constructs the property graph from parsed data

### Compliance Context Files
- **RuleSet.ts**: Aggregate root managing a collection of related rules
- **EvaluationEngine.ts**: Core engine that evaluates graphs against rules
- **RemediationService.ts**: Generates and applies fixes for violations
- **DependencyEvaluator.ts**: Evaluates dependency-related rules
- **ComplianceController.ts**: HTTP endpoints for compliance operations

### Projection Context Files
- **ProjectionEngine.ts**: Transforms property graphs into analytical views
- **ModuleProjectionStrategy.ts**: Groups nodes into module-level views
- **D3Renderer.ts**: Renders projections using D3.js library
- **SVGExporter.ts**: Exports projections as SVG files
- **ForceDirectedLayout.ts**: Layout algorithm for graph visualization

### Discovery Context Files
- **PatternDetectionService.ts**: Discovers patterns in the codebase
- **RuleInferenceService.ts**: Infers rules from discovered patterns
- **ClaudeLLMProvider.ts**: Integration with Claude API for AI analysis
- **DocumentationAnalyzer.ts**: Analyzes README and documentation
- **ConfidenceCalculator.ts**: Calculates confidence scores for inferences

### Shared/Infrastructure Files
- **Container.ts**: Manual dependency injection container
- **ConfigurationService.ts**: Manages architecture.config.ts loading
- **Logger.ts**: Centralized logging service
- **Result.ts**: Functional error handling type
- **TestContainer.ts**: Specialized container for testing

This structure provides a complete, extensible system with clear boundaries, comprehensive testing, and room for growth while maintaining architectural integrity.