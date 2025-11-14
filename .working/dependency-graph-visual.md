# C3 Dependency Graph - Visual Reference

## 1. ASCII Dependency Graph (All Dependencies)

```
                    ┌──────────────────────┐
                    │   ENTRY POINTS       │
                    ├──────────────────────┤
                    │   @c3/cli            │
                    │   @c3/bff           │
                    │   @c3/web           │
                    └─┬────────────────┬──┘
                      │                │
                   ┌──┴────────┐       └─────────────────┐
                   │           │                         │
              ┌────▼──┐   ┌────▼──────┐          ┌──────▼─────┐
              │@c3/   │   │ @c3/      │          │External    │
              │wiring │   │ shared    │          │Libraries   │
              └────┬──┘   └─┬──┬──┬──┬┘          │(React,     │
                   │        │  │  │  │          │Express,    │
                   │        │  │  │  │          │Commander)  │
      ┌────────────┘        │  │  │  └─────────┬└────────────┘
      │                     │  │  │
      ▼                     │  │  │
   ┌─────┐                  │  │  │
   │                        │  │  │
   │                        │  │  │
   │ BOUNDED CONTEXTS       │  │  │
   │ ────────────────────   │  │  │
   │                        │  │  │
   ├──────────────────┐     │  │  │
   │@c3/parsing       ├─────┘  │  │
   │(Foundation)      │        │  │
   └──────────────────┘        │  │
          ▲                     │  │
          │              ┌──────┘  │
          │              │         │
          │        ┌─────▼────┐    │
          │        │@c3/      │    │
          │        │compliance│    │
          │        └─────┬────┘    │
          │              │         │
          │         ┌────▼──────┐  │
          │         │@c3/       │  │
          │         │discovery  │  │
          │         └─────┬─────┘  │
          │               │        │
          ├───────┬───────┤        │
          │       │       │        │
          │  ┌────▼──┐    │   ┌────▼──────┐
          │  │@c3/   │    └──▶│@c3/       │
          └─▶│project│        │projection │
             └───────┘        └───────────┘
```

---

## 2. Dependency Tree (Parent -> Child)

```
@c3/cli
├── @c3/shared ◄─── (zod)
├── @c3/wiring
│   └── @c3/shared
├── @c3/parsing
│   └── @c3/shared
├── @c3/compliance
│   ├── @c3/shared
│   └── @c3/parsing
├── @c3/projection
│   ├── @c3/shared
│   └── @c3/parsing
└── @c3/discovery
    ├── @c3/shared
    ├── @c3/parsing
    └── @c3/compliance

@c3/bff
├── @c3/shared ◄─── (zod)
├── @c3/wiring
│   └── @c3/shared
├── @c3/parsing
│   └── @c3/shared
├── @c3/compliance
│   ├── @c3/shared
│   └── @c3/parsing
├── @c3/projection
│   ├── @c3/shared
│   └── @c3/parsing
└── @c3/discovery
    ├── @c3/shared
    ├── @c3/parsing
    └── @c3/compliance

@c3/web
└── (no internal dependencies)

@c3/shared
└── zod (external)

@c3/wiring
└── @c3/shared
    └── zod (external)

@c3/parsing
└── @c3/shared
    └── zod (external)

@c3/compliance
├── @c3/shared
│   └── zod (external)
└── @c3/parsing
    └── @c3/shared

@c3/projection
├── @c3/shared
│   └── zod (external)
└── @c3/parsing
    └── @c3/shared

@c3/discovery
├── @c3/shared
│   └── zod (external)
├── @c3/parsing
│   └── @c3/shared
└── @c3/compliance
    ├── @c3/shared
    └── @c3/parsing
```

---

## 3. Dependency Reverse Tree (Who Depends On This?)

```
@c3/shared (CRITICAL HUB - 9 dependents)
├── @c3/cli
├── @c3/bff
├── @c3/wiring
├── @c3/parsing
├── @c3/compliance
├── @c3/projection
├── @c3/discovery
└── Root package.json

@c3/parsing (HIGH - 5 dependents)
├── @c3/cli
├── @c3/bff
├── @c3/compliance
├── @c3/projection
└── @c3/discovery

@c3/wiring (MEDIUM - 2 dependents)
├── @c3/cli
└── @c3/bff

@c3/compliance (MEDIUM - 2 dependents)
├── @c3/cli (indirect via discovery)
├── @c3/bff (indirect via discovery)
└── @c3/discovery

@c3/projection (LOW - 2 dependents)
├── @c3/cli
└── @c3/bff

@c3/discovery (LOW - 2 dependents)
├── @c3/cli
└── @c3/bff

@c3/web (NONE - 0 dependents)
└── (independent)
```

---

## 4. Layered Architecture View

```
┌────────────────────────────────────────────────────────┐
│                    LAYER 3: APPS                       │
│    @c3/cli         @c3/bff         @c3/web             │
│  (Orchestrator)   (REST API)    (React Frontend)       │
└──────────────────┬─────────────────┬──────────────────┘
                   │                 │
┌──────────────────┴─────────────────┴──────────────────┐
│                  LAYER 2: CONTEXTS                     │
│                                                        │
│  @c3/parsing      @c3/compliance   @c3/projection     │
│  (Code Graph)     (Rules Engine)   (Transformations)  │
│                         ▲                              │
│                         │                              │
│                   @c3/discovery                        │
│                  (Pattern AI)                          │
└─────────────────────┬──────────────────────────────────┘
                      │
┌─────────────────────┴──────────────────────────────────┐
│            LAYER 1: INFRASTRUCTURE                     │
│                                                        │
│  @c3/shared           @c3/wiring                      │
│  (Models, Config)     (DI Container)                  │
└─────────────────────┬──────────────────────────────────┘
                      │
┌─────────────────────┴──────────────────────────────────┐
│              LAYER 0: EXTERNALS                        │
│                                                        │
│  zod              commander         react             │
│  (Validation)     (CLI)             (UI)              │
│                                                        │
│  express          chalk            zustand           │
│  (HTTP)           (Terminal)        (State)           │
└────────────────────────────────────────────────────────┘
```

---

## 5. Coupling Heatmap

```
              TO →
FROM ↓        shared parsing wiring compliance discovery projection cli  bff  web

shared        -       -       -      -          -         -          -    -    -
parsing       ●       -       -      -          -         -          -    -    -
wiring        ●       -       -      -          -         -          -    -    -
compliance    ●       ●       -      -          -         -          -    -    -
discovery     ●       ●       -      ●          -         -          -    -    -
projection    ●       ●       -      -          -         -          -    -    -
cli           ●       ●       ●      ●          ●         ●          -    -    -
bff           ●       ●       ●      ●          ●         ●          -    -    -
web           -       -       -      -          -         -          -    -    -

● = Depends on
- = No dependency
```

---

## 6. Dependency Propagation Path Analysis

### How changes to SHARED affect the system:
```
@c3/shared change
    ↓
┌───────────────────────────────────────────────┐
│ 9 packages must rebuild/redeploy:             │
│ parsing, compliance, projection, discovery    │
│ wiring, cli, bff, web, root                   │
└───────────────────────────────────────────────┘
    ↓
IMPACT: HIGH - All packages affected
```

### How changes to PARSING affect the system:
```
@c3/parsing change
    ↓
┌──────────────────────────────────────────────┐
│ 5 packages affected:                          │
│ compliance, discovery, projection             │
│ cli, bff                                      │
└──────────────────────────────────────────────┘
    ↓
IMPACT: HIGH - All dependent contexts affected
```

### How changes to DISCOVERY affect the system:
```
@c3/discovery change
    ↓
┌──────────────────────────────────────────────┐
│ 2 packages affected:                          │
│ cli, bff                                      │
└──────────────────────────────────────────────┘
    ↓
IMPACT: LOW - Only entry points affected
```

### How changes to WEB affect the system:
```
@c3/web change
    ↓
┌──────────────────────────────────────────────┐
│ 0 packages affected                          │
│ (completely isolated)                        │
└──────────────────────────────────────────────┘
    ↓
IMPACT: NONE - Completely independent
```

---

## 7. Context Isolation Analysis

### Isolation Score (0=Isolated, 10=Highly Coupled)

```
@c3/web:        0 ████░░░░░░ Completely isolated
@c3/projection: 2 ██░░░░░░░░ Very isolated
@c3/discovery:  3 ███░░░░░░░ Well isolated
@c3/compliance: 3 ███░░░░░░░ Well isolated
@c3/parsing:    5 █████░░░░░ Moderately coupled
@c3/wiring:     6 ██████░░░░ Coupled (only to shared)
@c3/cli:        8 ████████░░ Highly coupled (uses all)
@c3/bff:        8 ████████░░ Highly coupled (uses all)
@c3/shared:     9 █████████░ Core dependency
```

---

## 8. Change Impact Analysis Matrix

If you change this package, these are impacted:

| Changed Package | Direct Impact | Indirect Impact | Total Blast Radius |
|-----------------|---------------|-----------------|-------------------|
| @c3/shared | All 9 | None | 9 packages (100%) |
| @c3/parsing | 5 (compliance, discovery, projection, cli, bff) | None | 5 packages (55%) |
| @c3/compliance | 2 (discovery, cli, bff) | None | 2 packages (22%) |
| @c3/discovery | 2 (cli, bff) | None | 2 packages (22%) |
| @c3/wiring | 2 (cli, bff) | None | 2 packages (22%) |
| @c3/projection | 2 (cli, bff) | None | 2 packages (22%) |
| @c3/cli | 0 | None | 0 packages (0%) |
| @c3/bff | 0 | None | 0 packages (0%) |
| @c3/web | 0 | None | 0 packages (0%) |

---

## 9. Polyrepo Separation Impact

### Scenario 1: Move @c3/web to separate repo
```
Impact: TRIVIAL
Required changes: None
Integration: Separate npm install
Breaking changes: None
```

### Scenario 2: Move @c3/parsing to separate repo
```
Impact: MEDIUM
Required changes:
  - Publish @c3/parsing to npm
  - Update imports in: compliance, discovery, projection, cli, bff
Integration: npm install @c3/parsing
Breaking changes: Version management needed
```

### Scenario 3: Move @c3/compliance to separate repo
```
Impact: MEDIUM
Required changes:
  - Publish @c3/parsing first (dependency)
  - Publish @c3/compliance to npm
  - Update imports in: discovery, cli, bff
Integration: npm install @c3/compliance
Breaking changes: Version management needed for both
```

### Scenario 4: Move all contexts to separate repos (RECOMMENDED)
```
Impact: HIGH (but manageable)
Execution order:
  1. Publish @c3/shared to npm private registry
  2. Publish @c3/parsing to npm
  3. Create separate repos for: projection, compliance, discovery
  4. Update cli/bff to install from npm
  5. (Optional) Publish cli/bff as separate apps

Integration points:
  - All contexts depend on shared version
  - Compliance & Discovery share parsing version
  - Discovery depends on Compliance version

Benefit: Teams can develop contexts independently
Cost: Versioning complexity, CI/CD changes
```

---

## 10. Summary: Dependency Strength by Layer

```
Foundation (Stable)        -> Contexts (Variable)     -> Apps (Unstable)
─────────────────────────────────────────────────────────────────────

Instability Index: 0.0     |  0.17-0.33              |   0.75
Coupling Level: Hub        |  Moderate               |   High
Change Frequency: Low      |  Medium                 |   High
Testability: Easy          |  Moderate               |   Requires fixtures

Key packages:
• @c3/shared              • @c3/parsing            • @c3/cli
• @c3/wiring              • @c3/compliance         • @c3/bff
(Depended on many times)  • @c3/discovery          (Depends on many)
(Few outgoing deps)       • @c3/projection         (Few depending on them)
                         (Balance of deps)
```

