# C3 Monorepo Dependency Analysis

**Generated:** 2025-11-14
**Purpose:** Understanding package coupling for polyrepo migration planning

---

## Executive Summary

The C3 monorepo follows a **Clean Architecture pattern** with:
- **Entry Points (Apps):** CLI, BFF (Backend-for-Frontend), Web
- **Bounded Contexts:** 4 domain contexts (Parsing, Compliance, Discovery, Projection)
- **Shared Infrastructure:** Shared utilities, DI container (Wiring)
- **No circular dependencies detected**
- **Low-to-moderate coupling:** Clear dependency flow from shared → contexts → apps

---

## 1. DEPENDENCY GRAPH

### Overall Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                      ENTRY POINTS (Apps)                        │
├─────────────────────────────────────────────────────────────────┤
│  @c3/cli            @c3/bff           @c3/web                   │
│  (CLI Tool)         (API Server)      (React Frontend)           │
└─────────────────────────────────────────────────────────────────┘
        ↓                    ↓                    ↓
┌─────────────────────────────────────────────────────────────────┐
│              INFRASTRUCTURE / WIRING LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│  @c3/wiring (DI Container)                                       │
│  @c3/shared (Domain Models, Config, Utilities)                  │
└─────────────────────────────────────────────────────────────────┘
        ↓                                        ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BOUNDED CONTEXTS                              │
├─────────────────────────────────────────────────────────────────┤
│  @c3/parsing     @c3/projection    @c3/compliance  @c3/discovery│
│  (Code Analysis) (Graph Analysis)  (Rules Engine)  (Pattern AI)  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. DETAILED DEPENDENCY MATRIX

### All Package Dependencies

| Package | Internal Dependencies | External Dependencies |
|---------|----------------------|----------------------|
| **@c3/cli** | shared, wiring, parsing, compliance, projection, discovery | commander ^11.1.0, chalk ^5.3.0, ora ^8.0.1 |
| **@c3/bff** | shared, wiring, parsing, compliance, projection, discovery | express ^4.18.2, cors ^2.8.5, dotenv ^16.3.1 |
| **@c3/web** | None | react ^18.2.0, react-dom ^18.2.0, react-router-dom ^6.20.0, zustand ^4.4.7 |
| **@c3/shared** | None | zod ^3.22.4 |
| **@c3/wiring** | shared | None |
| **@c3/parsing** | shared | None |
| **@c3/compliance** | shared, parsing | None |
| **@c3/discovery** | shared, parsing, compliance | None |
| **@c3/projection** | shared, parsing | None |

---

## 3. DEPENDENCY FLOW ANALYSIS

### Dependency Depth (How many hops to reach external libs)

```
External Dependencies
    ↑
    │
  Apps (2 hops max)
    ├─→ cli, bff (direct to contexts + shared + wiring)
    └─→ web (standalone)
    │
  Wiring (1 hop)
    └─→ shared
    │
  Contexts (0-1 hops)
    ├─→ shared
    └─→ parsing (for compliance, discovery, projection)
    │
  Shared (direct to: zod)
```

### Dependency Chains

**Longest internal chain:**
```
discovery → parsing → shared
discovery → compliance → parsing → shared
```

**Most depended upon:**
```
shared ← all packages (9 total)
parsing ← compliance, discovery, projection (3 packages)
```

---

## 4. INTERDEPENDENCIES BETWEEN CONTEXTS

### Context-to-Context Dependencies

| From | To | Purpose |
|------|----|---------| 
| Compliance | Parsing | Rules operate on parsed code graphs |
| Discovery | Parsing | Pattern detection needs code structure |
| Discovery | Compliance | Pattern inference uses compliance rules |
| Projection | Parsing | Transformations operate on parsed graphs |
| **NONE** | **Discovery** | No other contexts depend on discovery |
| **NONE** | **Projection** | No other contexts depend on projection |

### Dependency Flow
```
Parsing (foundation)
    ↓
    ├─→ Compliance (rule evaluation)
    ├─→ Projection (graph transformations)
    └─→ Discovery (pattern + rule inference)
            ↓ (also depends on)
            Compliance
```

---

## 5. CIRCULAR DEPENDENCY CHECK

### Status: NO CIRCULAR DEPENDENCIES DETECTED ✓

Verification:
- Discovery depends on Compliance, not vice versa
- All context dependencies follow a DAG (Directed Acyclic Graph)
- Shared has zero internal dependencies
- Wiring only depends on Shared

---

## 6. COUPLING ANALYSIS

### Most Coupled Packages (Most Depended Upon)

**Rank 1: @c3/shared** (9 dependencies)
- Depended on by: cli, bff, web (implicit), wiring, parsing, compliance, discovery, projection
- Role: Cross-cutting domain models, types, configuration
- Migration Impact: CRITICAL - Must exist in all polyrepos or be published

**Rank 2: @c3/parsing** (3 dependencies)
- Depended on by: compliance, discovery, projection, cli, bff
- Role: Foundation layer for code analysis
- Migration Impact: HIGH - Core to compliance and discovery contexts

**Rank 3: @c3/wiring** (2 dependencies)
- Depended on by: cli, bff
- Role: Dependency injection container
- Migration Impact: MEDIUM - Entry points only

**Rank 4: @c3/compliance** (2 dependencies)
- Depended on by: discovery, cli, bff
- Role: Rule evaluation engine
- Migration Impact: MEDIUM - Used by discovery and apps

### Least Coupled Packages

**@c3/web** (0 internal dependencies)
- Completely standalone, uses only external libraries
- Migration Impact: TRIVIAL - Can move independently

**@c3/projection** (no dependents)
- Used by cli/bff only, not by other contexts
- Migration Impact: EASY - Self-contained

**@c3/discovery** (no internal dependents)
- Only depends on other contexts, not depended on
- Migration Impact: EASY - Self-contained

---

## 7. ENTRY POINT ANALYSIS

### @c3/cli

**Direct dependencies:**
- shared, wiring, parsing, compliance, projection, discovery

**External libraries:**
- commander (CLI framework)
- chalk (terminal colors)
- ora (spinners)

**Coupling:** HIGH (depends on all contexts)
**Role:** Orchestrator for code analysis operations
**Migration:** Needs all contexts or remote service calls

---

### @c3/bff

**Direct dependencies:**
- shared, wiring, parsing, compliance, projection, discovery

**External libraries:**
- express (HTTP server)
- cors (cross-origin)
- dotenv (environment config)

**Coupling:** HIGH (depends on all contexts)
**Role:** HTTP API exposing code analysis as microservices
**Migration:** Needs all contexts or remote service calls

---

### @c3/web

**Direct dependencies:** NONE

**External libraries:**
- react, react-dom
- react-router-dom (routing)
- zustand (state management)

**Coupling:** NONE
**Role:** Standalone frontend
**Migration:** Can move immediately, no changes needed

---

## 8. EXTERNAL DEPENDENCIES BY CONTEXT

### Direct External Dependencies

```
Shared Libraries:
├─ zod (3.22.4)
│  └─ Used by: shared, root package.json

CLI/BFF Common:
├─ commander (11.1.0) - CLI framework
├─ chalk (5.3.0) - Terminal colors
└─ ora (8.0.1) - Progress spinners

BFF Specific:
├─ express (4.18.2) - Web server
├─ cors (2.8.5) - CORS middleware
└─ dotenv (16.3.1) - Environment variables

Web Specific:
├─ react (18.2.0)
├─ react-dom (18.2.0)
├─ react-router-dom (6.20.0)
└─ zustand (4.4.7) - State management
```

### No problematic external dependencies detected
- All are well-maintained
- No conflicts between versions
- No peer dependency issues expected

---

## 9. WORKSPACE CONFIGURATION

### Current Setup (Monorepo)

```
Root: workspaces = ["apps/*", "contexts/*"]

Structure:
c3/
├── apps/
│   ├── cli/
│   ├── bff/
│   └── web/
├── contexts/
│   ├── parsing/
│   ├── compliance/
│   ├── discovery/
│   └── projection/
├── shared/
├── wiring/
└── package.json (workspaces config)
```

**Note:** Shared and Wiring are NOT in workspaces array but still have package.json files.
They're included via file: references in apps and contexts.

---

## 10. MIGRATION RECOMMENDATIONS

### Strategy: Modular Monorepo → Polyrepo

#### Phase 1: Identify Independent Services

**Group 1: Standalone (Move First)**
- @c3/web (no dependencies)
- @c3/wiring (only depends on shared)

**Group 2: Analysis Engine (Core Context)**
- @c3/shared (foundation layer)
- @c3/parsing (code analysis foundation)

**Group 3: Optional Extensions**
- @c3/projection (analysis transformations)
- @c3/compliance (rule engine)
- @c3/discovery (pattern detection)

**Group 4: Orchestrators**
- @c3/cli (uses all contexts)
- @c3/bff (uses all contexts)

#### Phase 2: Publication Strategy

**Option A: Publish to npm private registry**
```
@c3/shared → separate npm package
@c3/parsing → separate npm package
@c3/compliance → separate npm package
etc.
```

**Option B: Git submodules + workspaces**
```
Keep shared/wiring as git submodules
Publish specialized contexts as separate packages
```

**Option C: Mono-to-Poly (Recommended)**
```
Keep: shared, parsing (foundation)
Separate: compliance, discovery, projection, wiring (optional)
Apps: cli, bff, web as separate repos (consume via npm)
```

#### Phase 3: Dependency Injection

**Current:** Wiring container at /wiring
**After Migration:** 
- Each service owns its own DI setup
- Shared types remain centralized
- Contexts expose factories/constructors

#### Phase 4: Integration Points

**For @c3/cli and @c3/bff:**
Option 1: Monorepo (if they must stay coupled to all contexts)
Option 2: Microservices (cli calls bff/specialized services)
Option 3: Hybrid (shared foundation, context-specific APIs)

---

## 11. COUPLING METRICS

### Afferent Coupling (AC) - Incoming Dependencies
```
@c3/shared:     AC=9 (most coupled - hub)
@c3/parsing:    AC=5
@c3/wiring:     AC=2
@c3/compliance: AC=2
@c3/discovery:  AC=2
@c3/projection: AC=1
@c3/web:        AC=0 (independent)
```

### Efferent Coupling (EC) - Outgoing Dependencies
```
@c3/cli:        EC=6 (most coupled - orchestrator)
@c3/bff:        EC=6 (most coupled - orchestrator)
@c3/discovery:  EC=3
@c3/compliance: EC=2
@c3/projection: EC=2
@c3/parsing:    EC=1
@c3/wiring:     EC=1
@c3/web:        EC=0 (independent)
@c3/shared:     EC=0 (foundation)
```

### Instability Index (I = EC / (AC + EC))
```
0 = Stable (depended on, stable)
1 = Unstable (depends on others)

@c3/shared:     I=0/9 = 0.0 (STABLE - good foundation)
@c3/parsing:    I=1/6 = 0.17 (STABLE - good dependency)
@c3/wiring:     I=1/3 = 0.33 (STABLE)
@c3/cli:        I=6/8 = 0.75 (UNSTABLE - many dependencies)
@c3/bff:        I=6/8 = 0.75 (UNSTABLE - many dependencies)
@c3/web:        I=0/0 = INDEPENDENT
```

---

## 12. RISK ASSESSMENT FOR POLYREPO MIGRATION

### Low Risk - Can separate immediately
- @c3/web (no dependencies)

### Medium Risk - Needs shared published
- @c3/wiring, @c3/parsing, @c3/projection

### High Risk - Complex dependencies
- @c3/compliance (needs parsing)
- @c3/discovery (needs parsing + compliance)
- @c3/cli (needs all contexts)
- @c3/bff (needs all contexts)

### Critical Dependency
- @c3/shared (must be accessible to all)

---

## 13. POLYREPO STRUCTURE PROPOSAL

### Option: Mono-to-Poly Hybrid

```
c3-foundation/ (monorepo)
├── apps/
│   ├── cli/
│   ├── bff/
│   └── web/
├── shared/       (published to npm)
└── wiring/       (internal DI setup)

c3-parsing/ (separate repo)
├── src/
├── package.json (depends on @c3/shared)
└── dist/

c3-compliance/ (separate repo)
├── src/
├── package.json (depends on @c3/shared, @c3/parsing)
└── dist/

c3-discovery/ (separate repo)
├── src/
├── package.json (depends on @c3/shared, @c3/parsing, @c3/compliance)
└── dist/

c3-projection/ (separate repo)
├── src/
├── package.json (depends on @c3/shared, @c3/parsing)
└── dist/
```

### Benefits
- Shared remains single source of truth
- Contexts can evolve independently
- Apps can be updated without all contexts
- Clearer ownership boundaries

### Trade-offs
- More complex CI/CD setup
- Version management for shared
- Need to publish/version contexts independently

---

## SUMMARY TABLE: Quick Migration Reference

| Package | Independence | Dependencies | Complexity | Migrate When |
|---------|--------------|--------------|-----------|--------------|
| @c3/web | HIGH | 0 | TRIVIAL | Phase 1 |
| @c3/shared | CRITICAL | 0 | LOW | Phase 1 |
| @c3/wiring | MEDIUM | 1 (shared) | LOW | Phase 1 |
| @c3/parsing | MEDIUM | 1 (shared) | MEDIUM | Phase 2 |
| @c3/projection | HIGH | 2 | MEDIUM | Phase 2 |
| @c3/compliance | MEDIUM | 2 | HIGH | Phase 3 |
| @c3/discovery | MEDIUM | 3 | HIGH | Phase 3 |
| @c3/cli | LOW | 6 | HIGH | Phase 4 |
| @c3/bff | LOW | 6 | HIGH | Phase 4 |

---

