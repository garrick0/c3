# C3 System Design Refinements - Analysis & Recommendations

## 1. Visualization Context - It's Actually "Projection" Context

### Current Understanding (Incorrect)
I initially thought Visualization was just about rendering views - a presentation concern.

### Actual Responsibility (Correct)
The Visualization context contains **significant domain logic** for graph transformations and projections. It's not just "show a graph" but "transform the property graph into meaningful analytical views."

### Examples of Domain Logic in Visualization
```typescript
// Projecting file-level dependencies to module-level
function projectToModuleLevel(graph: PropertyGraph): ModuleGraph {
  // Complex logic to:
  // 1. Identify module boundaries (e.g., folders with package.json)
  // 2. Aggregate all files within each module
  // 3. Merge edges between files into edges between modules
  // 4. Calculate aggregate metrics (coupling, cohesion)
}

// Projecting to architectural layers
function projectToLayerView(graph: PropertyGraph): LayerGraph {
  // Complex logic to:
  // 1. Classify nodes into layers (domain, application, infrastructure)
  // 2. Validate dependency directions
  // 3. Identify layer violations
  // 4. Generate layer-to-layer dependency matrix
}
```

### Recommendation: Keep as Bounded Context but Rename

**New Name: "Projection" Context**

This better reflects that it's about **transforming and projecting** the property graph into analytical views, not just visualization.

### Projection Context Structure
```
contexts/projection/
├── domain/
│   ├── entities/
│   │   ├── Projection.ts           # Base projection concept
│   │   ├── ModuleProjection.ts     # Module-level view
│   │   ├── LayerProjection.ts      # Architectural layers
│   │   ├── DependencyMatrix.ts     # Dependency analysis
│   │   └── ComponentGraph.ts       # Component relationships
│   ├── services/
│   │   ├── ProjectionEngine.ts     # Core projection logic
│   │   ├── GraphTransformer.ts     # Graph transformation algorithms
│   │   ├── NodeAggregator.ts       # Node merging/grouping logic
│   │   └── MetricsCalculator.ts    # Calculate view-specific metrics
│   ├── ports/
│   │   ├── ProjectionStrategy.ts   # Interface for projection algorithms
│   │   ├── Renderer.ts             # Still need to render eventually
│   │   └── Exporter.ts             # Export projections
│   └── value-objects/
│       ├── ProjectionType.ts
│       ├── AggregationLevel.ts     # File, Module, Package, System
│       └── ViewConfiguration.ts
```

This context is definitely warranted as it contains complex domain logic for understanding and analyzing code structure at different levels of abstraction.

## 2. Discovery Context vs Standards Context - Detailed Analysis

### The Three Ways Rules Enter the System

1. **Discovery (AI/LLM)**: Infer from existing code patterns
2. **User Input (UI/CLI)**: Manual rule definition
3. **Configuration File**: Parse architecture.config.ts

### Analysis: Should These Be Together?

#### Option A: Single "Standards" Context
```
standards/
├── rule-management/     # CRUD for rules
├── discovery/          # AI-powered inference
├── evaluation/         # Check compliance
├── remediation/        # Fix violations
└── configuration/      # Parse config files
```

**Pros:**
- Single source of truth for all rules
- Easier rule lifecycle management
- Consistent rule validation

**Cons:**
- Very large context
- Discovery has very different technical needs (LLM, async, expensive)
- Different rates of change

#### Option B: Separate Discovery and Compliance Contexts

**Discovery Context**: Learn and suggest
- AI/LLM integration
- Pattern recognition
- Confidence scoring
- Evidence gathering
- Research capabilities

**Compliance Context**: Enforce and fix
- Rule management (CRUD)
- Configuration parsing
- Evaluation engine
- Remediation strategies
- Whitelist management

### Recommendation: Keep Them Separate

Discovery and Compliance should remain separate contexts because:

1. **Different Computational Models**
   - Discovery: Probabilistic, AI-driven, expensive
   - Compliance: Deterministic, rule-based, fast

2. **Different Bounded Context Language**
   - Discovery: "patterns", "evidence", "confidence", "inference"
   - Compliance: "rules", "violations", "fixes", "enforcement"

3. **Different Actors/Personas**
   - Discovery: Used occasionally by architects to understand codebase
   - Compliance: Used continuously by developers and CI/CD

4. **Different SLAs**
   - Discovery: Can be slow (minutes), runs on-demand
   - Compliance: Must be fast (seconds), runs frequently

### Detailed Discovery Context

```
contexts/discovery/
├── domain/
│   ├── aggregates/
│   │   ├── PatternAnalysis/
│   │   │   ├── Pattern.ts              # Root entity
│   │   │   ├── Evidence.ts             # What supports this pattern
│   │   │   ├── Occurrence.ts           # Where pattern appears
│   │   │   └── PatternType.ts          # Structural, naming, architectural
│   │   │
│   │   ├── RuleInference/
│   │   │   ├── CandidateRule.ts        # Root entity
│   │   │   ├── Confidence.ts           # How sure are we
│   │   │   ├── Rationale.ts            # Why this rule makes sense
│   │   │   └── Example.ts              # Code examples
│   │   │
│   │   └── Research/
│   │       ├── ResearchSession.ts      # Root entity
│   │       ├── Query.ts                # What we're researching
│   │       ├── Finding.ts              # What we learned
│   │       └── Source.ts               # README, config, code
│   │
│   ├── services/
│   │   ├── PatternDetectionService.ts
│   │   │   // Analyzes graph to find recurring patterns
│   │   │   // findNamingPatterns(), findStructuralPatterns(), findArchitecturalPatterns()
│   │   │
│   │   ├── RuleInferenceService.ts
│   │   │   // Converts patterns into actionable rules
│   │   │   // inferFromPatterns(), generateRuleConditions(), calculateConfidence()
│   │   │
│   │   ├── DocumentationAnalyzer.ts
│   │   │   // Extracts intent from docs
│   │   │   // analyzeReadme(), analyzeComments(), analyzeCommitMessages()
│   │   │
│   │   └── CodebaseResearcher.ts
│   │       // Orchestrates multi-source analysis
│   │       // researchArchitecture(), findImplicitStandards(), gatherEvidence()
│   │
│   ├── ports/
│   │   ├── LLMProvider.ts
│   │   │   // Interface for AI providers
│   │   │   // analyze(prompt, context), complete(prompt), embed(text)
│   │   │
│   │   ├── PatternMatcher.ts
│   │   │   // Interface for pattern matching strategies
│   │   │   // match(graph, patternType), score(matches)
│   │   │
│   │   └── EvidenceCollector.ts
│   │       // Interface for gathering supporting evidence
│   │       // collect(pattern), rank(evidence)
│   │
│   └── value-objects/
│       ├── ConfidenceScore.ts          # 0.0 to 1.0
│       ├── PatternFrequency.ts         # How often pattern occurs
│       └── EvidenceStrength.ts         # Weak, moderate, strong
│
├── application/
│   ├── use-cases/
│   │   ├── AnalyzeCodebasePatterns.ts
│   │   │   // Input: PropertyGraph, Output: Pattern[]
│   │   │   // Main orchestration for pattern detection
│   │   │
│   │   ├── InferArchitectureRules.ts
│   │   │   // Input: Pattern[], Output: CandidateRule[]
│   │   │   // Converts patterns to rules with LLM help
│   │   │
│   │   ├── ResearchStandards.ts
│   │   │   // Input: ResearchQuery, Output: ResearchFindings
│   │   │   // Deep dive into specific areas
│   │   │
│   │   ├── GenerateArchitectureConfig.ts
│   │   │   // Input: CandidateRule[], Output: ConfigFile
│   │   │   // Creates architecture.config.ts from discoveries
│   │   │
│   │   └── ExplainPattern.ts
│   │       // Input: PatternId, Output: Explanation
│   │       // Provides detailed explanation of why pattern exists
│   │
│   └── dto/
│       ├── PatternReport.dto.ts
│       ├── CandidateRulesSet.dto.ts
│       └── ResearchFindings.dto.ts
│
└── infrastructure/
    ├── llm/
    │   ├── ClaudeLLMProvider.ts
    │   │   // Implements LLMProvider using Claude API
    │   │   // Handles prompt engineering, token management
    │   │
    │   └── PromptTemplates.ts
    │       // Reusable prompts for different analysis types
    │
    ├── pattern-matchers/
    │   ├── RegexPatternMatcher.ts     # Fast regex-based matching
    │   ├── ASTPatternMatcher.ts       # AST-based pattern matching
    │   └── StatisticalMatcher.ts     # Statistical anomaly detection
    │
    └── analyzers/
        ├── NamingConventionAnalyzer.ts
        ├── FolderStructureAnalyzer.ts
        ├── DependencyPatternAnalyzer.ts
        └── ConfigurationAnalyzer.ts
```

### Detailed Compliance Context

```
contexts/compliance/
├── domain/
│   ├── aggregates/
│   │   ├── RuleSet/
│   │   │   ├── RuleSet.ts              # Root - Collection of rules
│   │   │   ├── Rule.ts                 # Individual rule
│   │   │   ├── Condition.ts            # What to check
│   │   │   └── RuleSource.ts           # User, Config, Discovery
│   │   │
│   │   ├── Evaluation/
│   │   │   ├── ComplianceReport.ts     # Root - Result of evaluation
│   │   │   ├── Violation.ts            # Rule violation
│   │   │   ├── ViolationContext.ts     # Where and why
│   │   │   └── Severity.ts             # Error, Warning, Info
│   │   │
│   │   └── Remediation/
│   │       ├── FixPlan.ts              # Root - Set of fixes
│   │       ├── Fix.ts                  # Individual fix
│   │       ├── FixStrategy.ts          # How to fix
│   │       └── Whitelist.ts            # Accepted violations
│   │
│   ├── services/
│   │   ├── RuleManagementService.ts
│   │   │   // CRUD operations for rules
│   │   │   // addRule(), updateRule(), deleteRule(), importFromConfig()
│   │   │
│   │   ├── EvaluationEngine.ts
│   │   │   // Core evaluation logic
│   │   │   // evaluate(graph, ruleset), checkRule(graph, rule)
│   │   │
│   │   ├── RemediationService.ts
│   │   │   // Generate and apply fixes
│   │   │   // generateFixes(violations), applyFix(fix), validateFix()
│   │   │
│   │   └── ConfigurationParser.ts
│   │       // Parse architecture.config.ts
│   │       // parse(configFile), validate(config), toRules(config)
│   │
│   └── ports/
│       ├── RuleRepository.ts
│       ├── EvaluationStrategy.ts
│       ├── FixStrategy.ts
│       └── ConfigLoader.ts
```

## 3. Configuration Management Strategy

### architecture.config.ts Structure

```typescript
// At project root (user's project, not c3)
export default {
  // Metadata
  version: '1.0',
  extends: ['@c3/recommended'],  // Preset rule sets

  // Architecture style
  architecture: {
    style: 'clean',  // clean, layered, modular, microservices
    layers: [
      { name: 'domain', path: 'src/domain' },
      { name: 'application', path: 'src/application' },
      { name: 'infrastructure', path: 'src/infrastructure' }
    ]
  },

  // Rules
  rules: {
    // Built-in rules with configuration
    'no-circular-dependencies': 'error',
    'consistent-naming': ['error', { style: 'kebab-case' }],
    'layer-dependencies': ['error', {
      flow: 'inward',  // domain <- application <- infrastructure
    }],

    // Custom rules
    custom: [
      {
        name: 'no-direct-db-access-from-domain',
        severity: 'error',
        condition: {
          type: 'dependency',
          from: { layer: 'domain' },
          to: { matches: '**/database/**' },
          forbidden: true
        }
      }
    ]
  },

  // Whitelisted violations
  whitelist: [
    {
      rule: 'consistent-naming',
      path: 'legacy/**',
      reason: 'Legacy code, will refactor in Q2'
    }
  ],

  // Discovery hints (helps AI understand your codebase)
  discovery: {
    ignore: ['node_modules', 'dist', 'coverage'],
    hints: {
      'This is a DDD project': true,
      'We use ports and adapters': true
    }
  }
}
```

### Config Context (New Shared Module)

```
shared/configuration/
├── ConfigurationService.ts
│   // Loads and validates architecture.config.ts
│   // load(path), validate(config), watch(callback)
│
├── ConfigSchema.ts
│   // Zod schema for type-safe config
│
├── PresetManager.ts
│   // Manages preset rule sets
│   // loadPreset(name), mergePresets(configs)
│
└── ConfigTransformer.ts
    // Transforms config to internal rule format
    // toRules(config), toWhitelist(config)
```

### How Contexts Access Configuration

```typescript
// In Compliance Context
class RuleManagementService {
  constructor(
    private configService: ConfigurationService,
    private ruleRepository: RuleRepository
  ) {}

  async loadFromConfig(): Promise<void> {
    const config = await this.configService.load();
    const rules = ConfigTransformer.toRules(config);
    await this.ruleRepository.saveAll(rules);
  }
}

// In Discovery Context
class CodebaseResearcher {
  constructor(private configService: ConfigurationService) {}

  async research(graph: PropertyGraph): Promise<ResearchFindings> {
    const config = await this.configService.load();
    const hints = config.discovery?.hints || {};
    // Use hints to guide analysis
  }
}
```

## 4. Testing Strategy

### Testing Principles
1. **Each context is independently testable**
2. **Use test doubles at context boundaries**
3. **Integration tests verify context interactions**
4. **End-to-end tests verify complete flows**

### Testing Structure

```
c3/
├── contexts/
│   ├── parsing/
│   │   └── tests/
│   │       ├── unit/
│   │       │   ├── domain/
│   │       │   │   ├── PropertyGraph.test.ts
│   │       │   │   └── GraphBuilder.test.ts
│   │       │   └── infrastructure/
│   │       │       ├── FilesystemParser.test.ts
│   │       │       └── TypeScriptParser.test.ts
│   │       ├── integration/
│   │       │   └── ParsingService.integration.test.ts
│   │       └── fixtures/
│   │           ├── sample-project/
│   │           └── mock-graphs.ts
│   │
│   ├── compliance/
│   │   └── tests/
│   │       ├── unit/
│   │       ├── integration/
│   │       └── fixtures/
│   │
│   ├── projection/
│   │   └── tests/
│   │       └── unit/
│   │           └── ProjectionEngine.test.ts
│   │
│   └── discovery/
│       └── tests/
│           ├── unit/
│           └── mocks/
│               └── MockLLMProvider.ts
│
├── tests/
│   ├── e2e/
│   │   ├── cli/
│   │   │   ├── parse-check-fix.e2e.test.ts
│   │   │   └── discover-rules.e2e.test.ts
│   │   └── api/
│   │       └── full-analysis.e2e.test.ts
│   │
│   ├── integration/
│   │   ├── contexts/
│   │   │   ├── parsing-to-compliance.test.ts
│   │   │   └── discovery-to-compliance.test.ts
│   │   └── wiring/
│   │       └── container.test.ts
│   │
│   └── test-utils/
│       ├── TestContainer.ts         # DI container for tests
│       ├── builders/                # Test data builders
│       │   ├── GraphBuilder.ts
│       │   ├── RuleBuilder.ts
│       │   └── ViolationBuilder.ts
│       └── assertions/              # Custom assertions
│           └── graphAssertions.ts
```

### Test Double Strategy

```typescript
// Test doubles for context boundaries
export class MockParsingContext implements ParsingPort {
  parse = jest.fn().mockResolvedValue(mockGraph);
}

export class MockComplianceContext implements CompliancePort {
  evaluate = jest.fn().mockResolvedValue(mockReport);
}

export class StubLLMProvider implements LLMProvider {
  analyze = async () => "Mock analysis";
}

// In tests
describe('ComplianceService', () => {
  let service: ComplianceService;
  let mockParser: MockParsingContext;

  beforeEach(() => {
    mockParser = new MockParsingContext();
    service = new ComplianceService(mockParser);
  });

  it('should evaluate parsed graph', async () => {
    const report = await service.checkCompliance('/path');
    expect(mockParser.parse).toHaveBeenCalledWith('/path');
  });
});
```

### Testing Levels

1. **Unit Tests** (per context)
   - Test domain logic in isolation
   - Mock all external dependencies
   - Fast, focused, numerous

2. **Integration Tests** (context boundaries)
   - Test interaction between contexts
   - Use real implementations where possible
   - Test data flow and transformations

3. **E2E Tests** (complete flows)
   - Test CLI commands end-to-end
   - Test API endpoints with real services
   - Use test projects as fixtures

4. **Contract Tests** (for extensibility)
   ```typescript
   // Ensure all parsers meet the contract
   describe.each([
     ['TypeScript', new TypeScriptParser()],
     ['Python', new PythonParser()],
   ])('%s Parser Contract', (name, parser) => {
     it('should implement Parser interface', () => {
       expect(parser.parse).toBeDefined();
       expect(parser.supports).toBeDefined();
     });

     it('should return PropertyGraph', async () => {
       const result = await parser.parse('code');
       expect(result).toMatchObject({
         nodes: expect.any(Array),
         edges: expect.any(Array)
       });
     });
   });
   ```

## 5. Missing Core Abstractions

### Add These Domain Entities

```typescript
// shared/domain/core-abstractions/

export class Codebase {
  constructor(
    public readonly id: string,
    public readonly rootPath: string,
    public readonly name: string,
    public readonly metadata: CodebaseMetadata
  ) {}

  // Represents the codebase being analyzed
  getFiles(): FileInfo[] { }
  getSize(): CodebaseSize { }
  getLanguages(): Language[] { }
}

export class Project {
  constructor(
    public readonly id: string,
    public readonly codebase: Codebase,
    public readonly configuration: Configuration,
    public readonly ruleSets: RuleSet[]
  ) {}

  // Container for a specific analysis configuration
  addRuleSet(rules: RuleSet): void { }
  updateConfiguration(config: Configuration): void { }
}

export class AnalysisSession {
  constructor(
    public readonly id: string,
    public readonly project: Project,
    public readonly startedAt: Date,
    public readonly status: SessionStatus
  ) {}

  // Represents a single analysis run
  recordViolation(violation: Violation): void { }
  complete(report: ComplianceReport): void { }
  abort(reason: string): void { }
}

export class Workspace {
  constructor(
    public readonly id: string,
    public readonly projects: Project[],
    public readonly defaultConfig: Configuration
  ) {}

  // Manages multiple projects/codebases
  addProject(project: Project): void { }
  findProject(codebasePath: string): Project | null { }
}
```

### Where These Fit

```typescript
// Example usage in Parsing Context
class ParseCodebaseUseCase {
  async execute(codebase: Codebase): Promise<PropertyGraph> {
    const session = new AnalysisSession(
      uuid(),
      codebase.project,
      new Date(),
      'parsing'
    );

    try {
      const graph = await this.parser.parse(codebase);
      session.complete(graph);
      return graph;
    } catch (error) {
      session.abort(error.message);
      throw error;
    }
  }
}

// Example usage in Compliance Context
class EvaluateComplianceUseCase {
  async execute(
    project: Project,
    graph: PropertyGraph
  ): Promise<ComplianceReport> {
    const rules = project.ruleSets.flatMap(rs => rs.rules);
    const violations = await this.evaluator.evaluate(graph, rules);

    const session = project.currentSession;
    violations.forEach(v => session.recordViolation(v));

    return new ComplianceReport(violations, project, session);
  }
}
```

## Summary of Recommendations

1. **Keep Visualization as "Projection" Context** - It has significant domain logic for graph transformations

2. **Keep Discovery and Compliance Separate** - Different computational models, actors, and SLAs

3. **Add Configuration Management** as shared module with architecture.config.ts support

4. **Implement Comprehensive Testing Strategy** - Unit, integration, E2E, and contract tests

5. **Add Core Domain Abstractions** - Codebase, Project, Session, Workspace

6. **Enhance Discovery Context** with detailed aggregates for Pattern Analysis, Rule Inference, and Research

7. **Structure Compliance Context** with clear aggregates for RuleSet, Evaluation, and Remediation

These refinements maintain the architectural integrity while adding the missing pieces for a complete system.