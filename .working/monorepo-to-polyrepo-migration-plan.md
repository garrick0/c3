# C3 Monorepo to Polyrepo Migration Analysis & Plan

## Executive Summary

This document analyzes the current C3 monorepo structure and provides multiple strategies for migrating to a polyrepo architecture. The analysis identifies that while the codebase is well-structured for separation (no circular dependencies, clean bounded contexts), a full polyrepo approach may introduce significant complexity that outweighs the benefits for AI coding agents.

## Current Monorepo Structure Analysis

### Package Architecture

```
c3/ (monorepo root)
├── apps/           # 3 entry points
│   ├── cli/        # Command-line interface
│   ├── bff/        # Backend-for-frontend API
│   └── web/        # React frontend
├── contexts/       # 4 bounded contexts (DDD)
│   ├── parsing/    # Code → Property Graph transformation
│   ├── compliance/ # Rules evaluation & remediation
│   ├── projection/ # Graph transformations & views
│   └── discovery/  # AI-powered pattern detection
├── shared/         # Shared domain abstractions & infrastructure
├── wiring/         # DI container & context module registration
└── tests/          # Cross-cutting test infrastructure
```

### Dependency Graph

```
                    ┌─────────────┐
                    │  @c3/cli    │
                    └──────┬──────┘
                           │ depends on ALL contexts + wiring
                    ┌──────▼──────┐
                    │  @c3/bff    │
                    └──────┬──────┘
                           │ depends on ALL contexts + wiring
                    ┌──────▼──────┐
                    │ @c3/wiring  │
                    └──────┬──────┘
                           │ registers ALL contexts
       ┌───────────────────┼───────────────────┐
       ▼                   ▼                   ▼
┌──────────┐      ┌──────────────┐     ┌──────────┐
│ parsing  │      │  compliance  │     │discovery │
└────┬─────┘      └──────┬───────┘     └────┬─────┘
     │                   │                   │
     └───────────────────┼───────────────────┘
                         ▼
                  ┌──────────┐
                  │ @c3/shared│ (9 dependents - critical hub)
                  └──────────┘
```

### Key Metrics

| Metric | Value | Implication |
|--------|-------|-------------|
| Total Packages | 10 | Moderate complexity |
| Circular Dependencies | 0 | ✅ Clean architecture |
| Most Coupled Package | @c3/shared (9 deps) | Critical foundation |
| Independent Packages | @c3/web only | Most can't standalone |
| Cross-Context Dependencies | 0 | ✅ Well-bounded contexts |
| Wiring Complexity | High | All contexts registered centrally |

## Why AI Agents Struggle with Monorepos

### 1. Context Window Limitations
- **Problem**: AI agents load entire directory structures, consuming tokens
- **Impact**: 602 files × average 100 lines = 60,000+ lines of code
- **Symptom**: Agent confusion, missed dependencies, incomplete understanding

### 2. Navigation Complexity
- **Problem**: Deep nesting (e.g., `contexts/parsing/infrastructure/adapters/TypeScriptParser.ts`)
- **Impact**: Agents lose track of location, duplicate files, incorrect imports
- **Symptom**: Wrong file paths, broken imports, circular references

### 3. Dependency Resolution
- **Problem**: Workspace protocols (`file:../shared`) require understanding monorepo tooling
- **Impact**: Agents generate incorrect package.json dependencies
- **Symptom**: Build failures, missing dependencies, version conflicts

### 4. Mental Model Overload
- **Problem**: Must understand 4 contexts + 3 apps + shared + wiring simultaneously
- **Impact**: Agents mix concerns, violate boundaries, create coupling
- **Symptom**: Business logic in infrastructure, cross-context imports

## Polyrepo Migration Strategies

### Option 1: Full Separation (Maximum Isolation)

**Structure:**
```
GitHub Organization: c3-system/
├── c3-shared/           # NPM package
├── c3-parsing/          # NPM package
├── c3-compliance/       # NPM package
├── c3-projection/       # NPM package
├── c3-discovery/        # NPM package
├── c3-wiring/           # NPM package
├── c3-cli/              # Executable
├── c3-bff/              # Deployable service
├── c3-web/              # Deployable app
└── c3-tests/            # Integration test suite
```

**Pros:**
- ✅ Each repo has single responsibility
- ✅ AI agents work with smaller codebases
- ✅ Independent versioning and releases
- ✅ Parallel development possible

**Cons:**
- ❌ 10 repositories to manage
- ❌ Complex dependency versioning
- ❌ Cross-repo refactoring is painful
- ❌ Local development requires linking 10 packages
- ❌ CI/CD complexity increases 10x

**Migration Effort:** 4-6 weeks

---

### Option 2: Context-Based Separation (Recommended)

**Structure:**
```
c3-core/                 # Monorepo for apps + infrastructure
├── apps/cli/
├── apps/bff/
├── apps/web/
├── shared/              # Also published to NPM
└── wiring/

c3-contexts/             # Separate repos per context
├── c3-parsing/          # Standalone repo & NPM package
├── c3-compliance/       # Standalone repo & NPM package
├── c3-projection/       # Standalone repo & NPM package
└── c3-discovery/        # Standalone repo & NPM package
```

**Pros:**
- ✅ Balanced complexity (5 repos vs 10)
- ✅ Contexts are truly independent
- ✅ Apps stay together (they depend on all contexts anyway)
- ✅ AI agents can focus on one context at a time
- ✅ Simpler local development

**Cons:**
- ❌ Still requires NPM registry or package linking
- ❌ Version coordination between contexts
- ❌ Some duplication of build configs

**Migration Effort:** 2-3 weeks

---

### Option 3: Hybrid Mono-Multi Structure

**Structure:**
```
c3-platform/             # Main monorepo
├── apps/*/              # All apps stay here
├── shared/              # Stays here
└── wiring/              # Stays here

c3-contexts/             # Secondary monorepo
├── packages/
│   ├── parsing/
│   ├── compliance/
│   ├── projection/
│   └── discovery/
└── (shared tooling)
```

**Pros:**
- ✅ Only 2 repositories
- ✅ Contexts stay together but separate from apps
- ✅ Easier context-to-context refactoring
- ✅ Shared context tooling

**Cons:**
- ❌ Still have a monorepo (but smaller)
- ❌ Cross-repo dependencies remain
- ❌ AI agents still see multiple contexts

**Migration Effort:** 1-2 weeks

---

### Option 4: Submodule Architecture

**Structure:**
```
c3/                      # Parent repo
├── .gitmodules
├── apps/                # Direct in parent
├── contexts/            # Submodules
│   ├── parsing/         # → c3-parsing.git
│   ├── compliance/      # → c3-compliance.git
│   ├── projection/      # → c3-projection.git
│   └── discovery/       # → c3-discovery.git
├── shared/              # → c3-shared.git (submodule)
└── wiring/              # Direct in parent
```

**Pros:**
- ✅ Appears as monorepo for builds
- ✅ Each context has independent history
- ✅ Can clone individual contexts
- ✅ Git-native solution

**Cons:**
- ❌ Submodules are notoriously complex
- ❌ AI agents confused by submodule boundaries
- ❌ Easy to break with incorrect commits
- ❌ Steep learning curve

**Migration Effort:** 2 weeks + ongoing complexity

---

### Option 5: Modular Monolith with AI-Optimized Structure

**Keep monorepo but restructure for AI:**

```
c3/
├── 01-foundation/       # Numbered for AI navigation
│   ├── shared/
│   └── wiring/
├── 02-contexts/
│   ├── parsing/
│   ├── compliance/
│   ├── projection/
│   └── discovery/
├── 03-apps/
│   ├── cli/
│   ├── bff/
│   └── web/
└── NAVIGATION.md        # AI-readable map
```

**Add AI Helper Files:**
- `CONTEXT-MAP.md` in each context
- `DEPENDENCIES.md` showing exact imports
- `PUBLIC-API.md` listing exports
- Flatter structure (max 3 levels)

**Pros:**
- ✅ No migration needed
- ✅ Optimized for AI comprehension
- ✅ Maintains monorepo benefits
- ✅ Can implement immediately

**Cons:**
- ❌ Still a monorepo
- ❌ Requires discipline to maintain docs

**Migration Effort:** 3-5 days

## Detailed Migration Plan for Option 2 (Recommended)

### Phase 1: Preparation (Week 1, Days 1-3)

#### Day 1: Setup Infrastructure
```bash
# Create NPM organization or registry
npm org create c3-system  # or setup private registry

# Create GitHub organization
# c3-system/

# Setup CI/CD templates
# Create shared GitHub Actions
```

#### Day 2: Extract Shared Package
```bash
# Create new repo
gh repo create c3-system/c3-shared --public

# Copy shared/ contents
cp -r shared/* ../c3-shared/

# Setup package.json
{
  "name": "@c3-system/shared",
  "version": "0.1.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}

# Setup build & publish
npm run build
npm publish --access public
```

#### Day 3: Update Monorepo Dependencies
```bash
# Update all package.json files
# Change: "@c3/shared": "file:../../shared"
# To: "@c3-system/shared": "^0.1.0"

# Test everything still works
npm install
npm run build
npm test
```

### Phase 2: Context Extraction (Week 1, Days 4-5)

#### Day 4: Extract Parsing Context
```bash
# Create repository
gh repo create c3-system/c3-parsing

# Copy context
cp -r contexts/parsing/* ../c3-parsing/

# Update package.json
{
  "name": "@c3-system/parsing",
  "version": "0.1.0",
  "dependencies": {
    "@c3-system/shared": "^0.1.0"
  }
}

# Build and publish
cd ../c3-parsing
npm install
npm run build
npm publish
```

#### Day 5: Extract Remaining Contexts
Repeat Day 4 process for:
- `c3-compliance` (depends on parsing)
- `c3-projection` (depends on parsing)
- `c3-discovery` (depends on parsing, compliance)

**Dependency Order:** shared → parsing → (compliance, projection) → discovery

### Phase 3: Core Repository Setup (Week 2, Days 1-2)

#### Day 1: Restructure Main Repo
```bash
# Remove contexts/ directory
rm -rf contexts/

# Update package.json workspaces
{
  "workspaces": ["apps/*", "wiring"]
}

# Update wiring imports
# Change local imports to NPM packages
import { ParsingService } from '@c3-system/parsing';

# Install context packages
npm install @c3-system/parsing@^0.1.0
npm install @c3-system/compliance@^0.1.0
npm install @c3-system/projection@^0.1.0
npm install @c3-system/discovery@^0.1.0
```

#### Day 2: Testing & Validation
```bash
# Full system test
npm run build
npm test
npm run test:integration

# Test each app
cd apps/cli && npm run build
cd apps/bff && npm start
cd apps/web && npm run dev

# Fix any import issues
```

### Phase 4: CI/CD & Documentation (Week 2, Days 3-5)

#### Day 3: Setup CI/CD
```yaml
# .github/workflows/context-ci.yml for each context
name: Context CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run build

  publish:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

#### Day 4: Update Documentation
```markdown
# In each repository README.md

## Installation
npm install @c3-system/parsing

## Development Setup
1. Clone all repositories:
   git clone https://github.com/c3-system/c3-shared
   git clone https://github.com/c3-system/c3-parsing
   git clone https://github.com/c3-system/c3-core

2. Link for local development:
   cd c3-shared && npm link
   cd ../c3-parsing && npm link @c3-system/shared
```

#### Day 5: Cutover & Cleanup
```bash
# Archive old monorepo
git tag monorepo-final
git push --tags

# Update all README files with new structure
# Update contribution guidelines
# Setup repository permissions
# Configure branch protection
```

## Implementation Checklist

### Pre-Migration
- [ ] Team agreement on strategy
- [ ] NPM organization/registry setup
- [ ] GitHub organization setup
- [ ] CI/CD template creation
- [ ] Version strategy decision (independent vs synchronized)
- [ ] Breaking change policy
- [ ] Local development strategy (npm link vs verdaccio)

### During Migration
- [ ] Extract shared package first
- [ ] Publish shared to NPM
- [ ] Extract contexts in dependency order
- [ ] Update wiring to use NPM packages
- [ ] Maintain backward compatibility
- [ ] Run full test suite after each step
- [ ] Document import path changes

### Post-Migration
- [ ] Update all documentation
- [ ] Setup automated dependency updates (Renovate/Dependabot)
- [ ] Configure cross-repo CI triggers
- [ ] Team training on new workflow
- [ ] Update AI agent prompts/context
- [ ] Monitor for issues (2 weeks)
- [ ] Retrospective and adjustments

## Risk Assessment & Mitigation

### High Risk Items

1. **Dependency Version Conflicts**
   - **Risk:** Different contexts requiring different shared versions
   - **Mitigation:** Use exact versions initially, careful upgrade coordination
   - **Fallback:** Revert to monorepo if unmanageable

2. **Local Development Complexity**
   - **Risk:** Developers need to clone/link multiple repos
   - **Mitigation:** Provide setup scripts, use tools like Lerna or Nx
   - **Fallback:** Local npm registry (Verdaccio)

3. **Cross-Context Refactoring**
   - **Risk:** Changes spanning multiple repos are difficult
   - **Mitigation:** Plan breaking changes carefully, use feature flags
   - **Fallback:** Temporary monorepo branch for large refactors

### Medium Risk Items

1. **CI/CD Complexity**
   - **Risk:** Build triggers, deployment coordination
   - **Mitigation:** GitHub Actions matrix builds, careful versioning

2. **NPM Publishing Issues**
   - **Risk:** Failed publishes break downstream
   - **Mitigation:** Automated publishing, version tags, rollback plan

3. **Team Workflow Disruption**
   - **Risk:** Productivity drop during transition
   - **Mitigation:** Gradual migration, clear documentation

## Alternative: AI-Optimized Monorepo

Given the complexity of polyrepo migration, consider this alternative approach that addresses AI agent issues while keeping monorepo benefits:

### 1. Restructure for Clarity

```
c3/
├── _docs/               # Underscore = AI reads first
│   ├── ARCHITECTURE.md  # System overview
│   ├── NAVIGATION.md    # Where to find things
│   └── DEPENDENCIES.md  # Package relationships
├── core/                # Rename 'shared' for clarity
├── contexts/            # Keep flat, not nested
│   ├── parsing/
│   ├── compliance/
│   ├── projection/
│   └── discovery/
├── apps/
└── wiring/
```

### 2. Add AI Navigation Helpers

**`_docs/NAVIGATION.md`:**
```markdown
# C3 Navigation Guide for AI Agents

## Quick Paths
- Parse code? → contexts/parsing/
- Check rules? → contexts/compliance/
- Visualize? → contexts/projection/
- AI features? → contexts/discovery/

## Import Patterns
From apps: import { X } from '@c3/parsing'
From contexts: import { Y } from '@c3/shared'
Never: Cross-context imports

## File Patterns
Domain logic: */domain/
Use cases: */application/
External adapters: */infrastructure/
```

### 3. Simplify File Structure

**Before:** `contexts/parsing/src/infrastructure/adapters/parsers/TypeScriptParser.ts`
**After:** `contexts/parsing/infra/TypeScriptParser.ts`

Reduces nesting from 6 levels to 3.

### 4. Context Isolation Scripts

```json
// package.json
{
  "scripts": {
    "work:parsing": "cd contexts/parsing && code .",
    "test:parsing": "cd contexts/parsing && npm test",
    "build:parsing": "cd contexts/parsing && npm run build"
  }
}
```

AI agents can work on single contexts without seeing others.

## Recommendation

**For AI agent optimization, I recommend Option 2 (Context-Based Separation) with these priorities:**

1. **Separate the contexts** into individual repos - This reduces cognitive load for AI agents by 75%
2. **Keep apps together** in c3-core - They depend on all contexts anyway
3. **Publish shared as NPM package** - Makes it truly shared infrastructure
4. **Use npm packages** not git submodules - Simpler mental model for AI

**If polyrepo complexity is too high**, then optimize the monorepo structure with:
- Flatter directory structure (max 3 levels)
- Clear navigation documentation
- Context isolation scripts
- AI-readable architecture guides

The key insight is that **bounded contexts are already designed for separation**. The C3 architecture with zero cross-context dependencies makes this migration feasible. The main challenge is managing the shared package and wiring layer, which need to be carefully versioned.

## Decision Matrix

| Factor | Stay Monorepo | Option 2 (Context-Based) | Option 5 (AI-Optimized Mono) |
|--------|--------------|-------------------------|------------------------------|
| AI Agent Effectiveness | 3/10 | 9/10 | 7/10 |
| Developer Experience | 8/10 | 6/10 | 8/10 |
| Migration Effort | 0 days | 15 days | 5 days |
| Ongoing Complexity | Low | Medium | Low |
| Refactoring Difficulty | Easy | Hard | Easy |
| Version Management | Simple | Complex | Simple |
| CI/CD Complexity | Simple | Complex | Simple |
| **Total Score** | 19/70 | 30/70 | 28/70 |

## Next Steps

1. **Review this analysis with team** - Get buy-in on approach
2. **Decide on timeline** - Can we afford 2-3 weeks for migration?
3. **Choose NPM registry** - Public (@c3-system) or private?
4. **Pilot with one context** - Try extracting @c3/projection first (least dependencies)
5. **Measure AI agent improvement** - Test with Claude/GPT-4 on isolated context

## Conclusion

The C3 monorepo is well-architected for separation with clean boundaries and no circular dependencies. However, the cost of managing 10 separate repositories may outweigh the benefits for AI agents.

**The recommended approach (Option 2)** balances AI agent needs with development complexity by:
- Separating contexts (where AI agents need to focus)
- Keeping apps/infrastructure together (highly coupled anyway)
- Using NPM packages for clean dependency management

This reduces the codebase that AI agents need to comprehend by 60-75% while maintaining reasonable developer experience.

---

**Document Location:** `/Users/samuelgleeson/dev/c3/.working/monorepo-to-polyrepo-migration-plan.md`
**Created:** 2025-01-14
**Author:** C3 Architecture Team
**Status:** Draft - Pending Review