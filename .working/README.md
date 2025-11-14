# C3 Polyrepo Migration Analysis - Documentation Index

This analysis contains comprehensive documentation for planning a polyrepo migration for the C3 monorepo. All documents are stored in `.working/` directory (not committed to git).

## Documents Included

### 1. **dependency-analysis.md** (Main Reference)
The comprehensive dependency analysis report covering:
- Complete dependency matrix for all packages
- Detailed coupling analysis
- Circular dependency checks
- Afferent/Efferent coupling metrics
- Instability index calculations
- Migration recommendations by risk level
- Proposed polyrepo structure

**Use this for:** Understanding package relationships and planning overall migration strategy

---

### 2. **dependency-graph-visual.md** (Visual Reference)
ASCII diagrams and visual representations:
- Layered architecture diagrams
- Dependency trees (parent→child and reverse)
- Coupling heatmap
- Change impact analysis matrix
- Context isolation scoring
- Blast radius analysis for code changes

**Use this for:** Quickly understanding the dependency structure visually, presenting to team

---

### 3. **migration-implementation-guide.md** (Tactical Details)
Step-by-step implementation guide:
- Phase-by-phase execution plan
- Specific tasks with effort estimates
- Pre/post migration checklists
- Version management strategies
- CI/CD changes required
- Risk mitigation strategies
- Rollback procedures

**Use this for:** Actually executing the migration, task planning, team coordination

---

## Quick Summary

### The 9 Packages in C3

| Package | Type | Role | Isolation |
|---------|------|------|-----------|
| @c3/shared | Library | Domain models, config | Critical hub (9 dependents) |
| @c3/wiring | Library | DI container | Hub (2 dependents) |
| @c3/parsing | Context | Code analysis foundation | Moderate (5 dependents) |
| @c3/compliance | Context | Rule evaluation | Low (2 dependents) |
| @c3/discovery | Context | Pattern detection | Low (2 dependents) |
| @c3/projection | Context | Graph transformations | Low (2 dependents) |
| @c3/cli | App | Command-line tool | Low (depends on all) |
| @c3/bff | App | REST API backend | Low (depends on all) |
| @c3/web | App | React frontend | HIGH (independent) |

### No Circular Dependencies ✓
All packages follow a Directed Acyclic Graph (DAG) pattern - safe to separate.

---

## Recommended Migration Path

### Easiest → Most Difficult Order

**PHASE 1: Foundation** (Week 1-2)
1. Publish @c3/shared to npm (all packages depend on it)
2. _(Optional)_ Extract @c3/web to separate repo (zero dependencies)

**PHASE 2: Core Contexts** (Week 2-3)
1. Extract @c3/parsing to npm (foundation for other contexts)

**PHASE 3: Dependent Contexts** (Week 3-4)
1. Extract @c3/compliance (depends on parsing)
2. Extract @c3/projection (depends on parsing)
3. Extract @c3/discovery (depends on parsing + compliance)

**PHASE 4: Entry Points** (Week 4+)
- Option A: Keep @c3/cli, @c3/bff in monorepo with @c3/shared & @c3/wiring ✓ RECOMMENDED
- Option B: Extract to separate repos (if you want full polyrepo)

### Final Recommended Structure

```
c3-foundation/ (monorepo)
├── apps/cli
├── apps/bff
├── apps/web
├── shared/ (also published to npm)
└── wiring/

+ Separate published packages:
c3-parsing/
c3-compliance/
c3-discovery/
c3-projection/
```

**Why this structure?**
- CLI & BFF are tightly coupled (depend on all contexts)
- Easier local development (single repo)
- Simpler integration testing
- Lower operational overhead
- Clearer ownership for each context

---

## Key Metrics Summary

### Coupling (How connected are packages?)
- **@c3/shared:** Stability Index = 0.0 (Very Stable - good foundation) ✓
- **@c3/parsing:** Stability Index = 0.17 (Very Stable)
- **@c3/cli:** Stability Index = 0.75 (Unstable - depends on many)
- **@c3/bff:** Stability Index = 0.75 (Unstable - depends on many)
- **@c3/web:** Stability Index = N/A (Independent)

### Change Impact (If you modify package X, how many others break?)
- Change @c3/shared → 9 packages affected (100%) ⚠️
- Change @c3/parsing → 5 packages affected (55%) ⚠️
- Change @c3/discovery → 2 packages affected (22%)
- Change @c3/web → 0 packages affected (0%) ✓

### Afferent Coupling (How many packages depend on this?)
```
@c3/shared:     9 dependents (CRITICAL HUB)
@c3/parsing:    5 dependents (IMPORTANT)
@c3/wiring:     2 dependents
@c3/compliance: 2 dependents
@c3/discovery:  2 dependents
@c3/projection: 2 dependents (low usage)
@c3/web:        0 dependents (independent)
```

---

## Decision Points Before Starting

Answer these questions to finalize your plan:

1. **What's your npm registry?**
   - npm Inc (public) / GitHub Packages / Artifactory / Self-hosted?

2. **Who owns each context after separation?**
   - Single team? Different teams? Distributed?

3. **How frequently do contexts change?**
   - Stable (few changes) vs Active (constant updates)?

4. **Version management preference?**
   - Synchronized (all v0.1.0) vs Independent (mixed versions)?

5. **Are CLI/BFF external tools or internal?**
   - Published npm packages vs Internal usage only?

6. **Timeline constraints?**
   - How long do you have for migration?

---

## Expected Timeline & Effort

| Phase | Duration | Effort | Risk |
|-------|----------|--------|------|
| Phase 1: Shared foundation | 3-5 days | Medium | Low |
| Phase 2: Parsing extraction | 2-3 days | Easy | Low |
| Phase 3: Other contexts (3) | 2-3 days each | Medium | Medium |
| Phase 4: Apps (Optional) | 3-5 days each | High | High |
| **Total (Recommended)** | **2 weeks** | **Medium** | **Low-Medium** |
| Full polyrepo (All) | 3-4 weeks | High | Medium-High |

---

## Risks & Mitigations

### Highest Risks

**Risk 1: Breaking changes to @c3/shared**
- Impact: All 9 packages affected
- Mitigation: Strict semantic versioning, maintain backward compatibility

**Risk 2: Hidden cross-dependencies missed during extraction**
- Impact: Build failures after separation
- Mitigation: Thorough code audit before each extraction, integration tests

**Risk 3: Version incompatibilities between contexts**
- Impact: Runtime errors due to API mismatches
- Mitigation: Automated integration tests, exact version pinning

**Risk 4: npm registry failure/downtime**
- Impact: Can't install packages in CI/CD
- Mitigation: Use established provider (npm Inc, GitHub), document registry URL

---

## Recommended Reading Order

1. **Start here:** This README
2. **Then read:** dependency-analysis.md (sections 1-6)
3. **For visuals:** dependency-graph-visual.md (section 5 - Coupling Heatmap)
4. **For execution:** migration-implementation-guide.md (Phases 1-2)
5. **Later phases:** migration-implementation-guide.md (Phases 3-4)

---

## Questions or Concerns?

Before executing any phase:
1. Review the relevant sections of dependency-analysis.md
2. Check the detailed steps in migration-implementation-guide.md
3. Verify the rollback plan (Section: Rollback Plan)
4. Confirm team alignment on structure
5. Validate npm registry access

---

## Files Location

All analysis documents are in:
```
/Users/samuelgleeson/dev/c3/.working/
├── README.md (this file)
├── dependency-analysis.md (comprehensive analysis)
├── dependency-graph-visual.md (visual diagrams)
└── migration-implementation-guide.md (step-by-step guide)
```

These files are in `.gitignore` and won't be committed to the repository.

---

## Document Generation Details

Generated: 2025-11-14
Analysis based on: All 9 package.json files in C3 monorepo
- /Users/samuelgleeson/dev/c3/apps/cli/package.json
- /Users/samuelgleeson/dev/c3/apps/bff/package.json
- /Users/samuelgleeson/dev/c3/apps/web/package.json
- /Users/samuelgleeson/dev/c3/contexts/parsing/package.json
- /Users/samuelgleeson/dev/c3/contexts/compliance/package.json
- /Users/samuelgleeson/dev/c3/contexts/discovery/package.json
- /Users/samuelgleeson/dev/c3/contexts/projection/package.json
- /Users/samuelgleeson/dev/c3/shared/package.json
- /Users/samuelgleeson/dev/c3/wiring/package.json

---

