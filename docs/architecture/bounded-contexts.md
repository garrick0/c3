# Bounded Contexts

## Context Map

```
┌─────────────────┐
│  Parsing        │
│  (Core)         │
└────────┬────────┘
         │
         ├────────→ ┌──────────────┐
         │          │ Compliance   │
         │          └──────────────┘
         │
         ├────────→ ┌──────────────┐
         │          │ Projection   │
         │          └──────────────┘
         │
         └────────→ ┌──────────────┐
                    │ Discovery    │
                    └──────────────┘
```

## Context Details

### Parsing Context
**Domain Language**: Graph, Node, Edge, Parser
**Core Concepts**: PropertyGraph as universal representation
**Dependencies**: None (base context)

### Compliance Context
**Domain Language**: Rule, Violation, Fix, Evaluation
**Core Concepts**: RuleSet, ComplianceReport, FixPlan (3 aggregates)
**Dependencies**: Parsing (for PropertyGraph)

### Projection Context
**Domain Language**: Projection, View, Transformation
**Core Concepts**: Multiple projection types, graph transformations
**Dependencies**: Parsing (for PropertyGraph)

### Discovery Context
**Domain Language**: Pattern, Evidence, Confidence, Inference
**Core Concepts**: PatternAnalysis, RuleInference, Research (3 aggregates)
**Dependencies**: Parsing (for PropertyGraph), Compliance (for Rule types)

## Anti-Corruption Layers

Each context exposes only what's necessary through its public API (index.ts).
Internal implementation details remain private.
