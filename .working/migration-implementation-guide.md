# C3 Polyrepo Migration - Implementation Guide

**Last Updated:** 2025-11-14  
**Status:** Planning Phase

---

## Quick Decision Matrix

| Scenario | Recommendation | Effort | Risk | Timeline |
|----------|----------------|--------|------|----------|
| Move web only | Trivial | <1 day | Very Low | Immediate |
| Move web + shared | Easy | 1-2 days | Low | Week 1 |
| Move 1-2 contexts | Medium | 2-3 days each | Medium | Week 2-3 |
| Move all contexts | High | 1-2 weeks | Medium-High | Month 1-2 |
| Full polyrepo split | Critical | 3-4 weeks | High | Month 2-3 |

---

## Phase 1: Foundation Setup (Week 1-2)

### Task 1.1: Publish @c3/shared

**What to do:**
1. Create private npm registry or use npm package
2. Tag current version (e.g., v0.1.0)
3. Publish to registry: `npm publish`
4. Update all references from `file:../../shared` to `@c3/shared@^0.1.0`

**Files affected:**
- All package.json files (wiring, parsing, compliance, discovery, projection)
- CI/CD configuration

**Implementation:**
```bash
# In c3/shared directory
npm version patch
npm publish --registry [YOUR_REGISTRY]

# In dependent packages
npm install @c3/shared@^0.1.0
```

**Risk:** Medium (first published package)  
**Rollback:** Keep monorepo as fallback, revert file: references

---

### Task 1.2: Create shared npm dependency baseline

**Checklist:**
- [ ] Decide: npm registry (private vs public)
- [ ] Set up authentication if needed
- [ ] Document versioning strategy
- [ ] Create CI/CD step to publish shared on release
- [ ] Update docs with usage instructions

---

## Phase 2: Easy Separations (Week 2-3)

### Task 2.1: Separate @c3/web to its own repo

**Complexity:** Trivial (no dependencies)

**Steps:**
1. Create new repo: `c3-web`
2. Copy `apps/web/` → new repo root
3. Update package.json versions if needed
4. Remove from c3 monorepo
5. Update docs with new repo location

**No code changes required** - Web has zero internal dependencies

**Implementation:**
```bash
# New repo
mkdir c3-web
cp -r apps/web/* c3-web/
cd c3-web
npm install
npm run build
```

**Risk:** Very Low (completely isolated)  
**Rollback:** Copy back into apps/web/

---

### Task 2.2: Extract @c3/parsing as separate package

**Complexity:** Easy-to-Medium

**Dependencies:**
- Only depends on @c3/shared (which must be published first)

**Steps:**
1. Publish @c3/shared (from Phase 1.1)
2. Create new repo: `c3-parsing`
3. Copy `contexts/parsing/` → new repo
4. Update imports: `@c3/shared` (from file reference)
5. Update c3 to use: `npm install @c3/parsing`
6. Remove from contexts/

**Files to update in consumers:**
- `cli/package.json`: Remove `@c3/parsing` file ref, add npm ref
- `bff/package.json`: Same
- `compliance/package.json`: Same
- `discovery/package.json`: Same
- `projection/package.json`: Same

**Implementation:**
```bash
# New c3-parsing repo
mkdir c3-parsing
cp -r contexts/parsing/* c3-parsing/
cd c3-parsing
npm install
npm run build
npm publish --registry [YOUR_REGISTRY]

# In c3 monorepo
npm install @c3/parsing@^0.1.0 --save
```

**Versioning Strategy:**
```json
// Option 1: Keep in sync with monorepo
"@c3/parsing": "^0.1.0"  // Always update together

// Option 2: Use semantic versioning
"@c3/parsing": "^1.0.0"  // Independent versions
```

**Risk:** Low (simple dependency tree)  
**Rollback:** Copy back, revert file refs

---

## Phase 3: Mid-Level Contexts (Week 3-4)

### Task 3.1: Extract @c3/compliance

**Dependencies:**
- @c3/shared
- @c3/parsing

**Steps (in order):**
1. Ensure parsing is published (from Phase 2.2)
2. Create repo: `c3-compliance`
3. Copy `contexts/compliance/` → new repo
4. Update imports: `@c3/shared`, `@c3/parsing` (from file refs to npm)
5. Publish: `npm publish`
6. Update consumers in monorepo

**Files to update:**
- `cli/package.json`
- `bff/package.json`
- `discovery/package.json` (most important)

**Critical:** Discovery depends on Compliance - update order matters

**Risk:** Medium (Discovery is dependent)  
**Implementation order:**
1. Publish @c3/compliance
2. Update Discovery to use published version
3. Update CLI/BFF to use published version

---

### Task 3.2: Extract @c3/projection

**Dependencies:**
- @c3/shared
- @c3/parsing

**Steps:**
1. Create repo: `c3-projection`
2. Copy `contexts/projection/` → new repo
3. Update imports: `@c3/shared`, `@c3/parsing`
4. Publish to npm
5. Update consumers (cli, bff)

**Note:** Projection has zero dependents, so no downstream impact

**Risk:** Low (self-contained, no dependents)

---

### Task 3.3: Extract @c3/discovery

**Dependencies:**
- @c3/shared
- @c3/parsing
- @c3/compliance (must already be published)

**Steps:**
1. Ensure compliance is published
2. Create repo: `c3-discovery`
3. Copy `contexts/discovery/` → new repo
4. Update all imports to npm versions
5. Publish to npm
6. Update consumers (cli, bff)

**Critical Dependency Chain:**
```
discovery
  ├─ shared (published)
  ├─ parsing (published)
  └─ compliance (must exist before discovery can be published)
```

**Risk:** Medium (deep dependency chain)

---

## Phase 4: Entry Points (Week 4-5)

### Task 4.1: Extract @c3/wiring

**Dependencies:**
- @c3/shared

**Purpose:** DI container for dependency injection

**Decision Point:** Keep in monorepo with apps, or separate?

**Option A: Keep in monorepo (Recommended)**
- Pros: Simpler app setup, DI stays centralized
- Cons: Another package to manage
- Best for: Small teams, rapid iteration

**Option B: Separate repo**
- Pros: Independent versioning
- Cons: Adds complexity
- Best for: Large teams, strict separation

**Implementation (if separating):**
1. Create repo: `c3-wiring`
2. Copy `wiring/` → new repo
3. Update imports
4. Publish to npm
5. Update cli, bff to install

**Risk:** Medium (used by all entry points)

---

### Task 4.2: Extract @c3/cli as separate repo

**Dependencies:**
- All contexts (parsing, compliance, projection, discovery)
- @c3/shared
- @c3/wiring
- External: commander, chalk, ora

**Decision:** Monorepo vs separate repo?

**Option A: Keep in monorepo (Recommended)**
- Pros: Easy testing with all contexts
- Cons: Can't be published independently
- Best for: Internal tool

**Option B: Separate repo with git submodules**
- Pros: Independent deployment
- Cons: Complex local development
- Best for: CLI as published tool

**Option C: Separate repo with npm dependencies**
- Pros: Clean separation
- Cons: All contexts must be published first
- Best for: Public CLI tool

**If separating:**
```bash
mkdir c3-cli
cp -r apps/cli/* c3-cli/
# Update all package.json file: refs to npm versions
npm install
```

**Risk:** High (depends on all contexts)

---

### Task 4.3: Extract @c3/bff as separate repo

**Dependencies:** Same as CLI (all contexts)

**Decision:** Monorepo vs separate?

**Option A: Keep in monorepo (Recommended)**
- Easier for teams to manage together
- Backend + frontend in one place
- Better for full-stack testing

**Option B: Separate repo**
- Independent versioning
- Separate deployment pipeline
- Better for microservices architecture

**Implementation similar to CLI if separating**

---

## Recommended Approach: Hybrid Mono-to-Poly

```
PHASE 1-2: Foundation & Easy
├─ Publish @c3/shared to npm
├─ Extract @c3/web to separate repo (optional)
└─ Extract @c3/parsing to separate repo

PHASE 3: Mid-Level Contexts
├─ Extract @c3/compliance → npm
├─ Extract @c3/projection → npm
└─ Extract @c3/discovery → npm

PHASE 4: Keep in Monorepo (Recommended)
├─ @c3/cli → stays in monorepo
├─ @c3/bff → stays in monorepo
├─ @c3/wiring → stays in monorepo
└─ Monorepo: apps/* + shared/ + wiring/
```

### Rationale for keeping apps in monorepo:

1. **CLI & BFF are tightly coupled** - Both depend on ALL contexts
2. **Easier local development** - Single clone, single npm install
3. **Simpler testing** - Integration tests with all contexts
4. **Shared deployment** - Usually deployed together
5. **Lower overhead** - Fewer repos to manage

### Final Structure After Migration:

```
c3-foundation/ (monorepo)
├── apps/
│   ├── cli/
│   │   └── Depends on: @c3/parsing, @c3/compliance, @c3/discovery, @c3/projection, @c3/shared
│   ├── bff/
│   │   └── Depends on: @c3/parsing, @c3/compliance, @c3/discovery, @c3/projection, @c3/shared
│   └── web/ (or separate: c3-web)
│       └── No dependencies
├── shared/ (or: npm @c3/shared)
│   └── Published to npm
└── wiring/
    └── Internal DI container

c3-parsing/ (separate repo)
├── src/
└── Depends on: @c3/shared

c3-compliance/ (separate repo)
├── src/
└── Depends on: @c3/shared, @c3/parsing

c3-discovery/ (separate repo)
├── src/
└── Depends on: @c3/shared, @c3/parsing, @c3/compliance

c3-projection/ (separate repo)
├── src/
└── Depends on: @c3/shared, @c3/parsing
```

---

## Implementation Checklist

### Pre-Migration
- [ ] Audit all internal imports (ensure no hidden cross-dependencies)
- [ ] Document current build/deploy process
- [ ] Create backup of current monorepo
- [ ] Plan npm registry strategy
- [ ] Create list of who accesses each package

### Phase 1: Shared Foundation
- [ ] Set up npm registry/private packages
- [ ] Create @c3/shared publishing workflow
- [ ] Publish v0.1.0 of @c3/shared
- [ ] Update local monorepo to use published shared
- [ ] Test all packages still build

### Phase 2: Context Extraction
- [ ] Create c3-parsing repo
- [ ] Publish @c3/parsing
- [ ] Update c3-foundation to use published parsing
- [ ] Create c3-compliance repo
- [ ] Publish @c3/compliance
- [ ] Create c3-discovery repo
- [ ] Publish @c3/discovery
- [ ] Create c3-projection repo
- [ ] Publish @c3/projection
- [ ] Run integration tests for all apps

### Phase 3: Optional Extractions
- [ ] (Optional) Create c3-web repo
- [ ] (Optional) Create c3-cli repo
- [ ] (Optional) Create c3-bff repo

### Post-Migration
- [ ] Update CI/CD pipelines
- [ ] Update documentation
- [ ] Update local dev setup guides
- [ ] Train team on new workflow
- [ ] Plan versioning/release strategy
- [ ] Set up cross-repo testing

---

## Version Management Strategy

### Approach 1: Synchronized Versioning (Simpler)
```json
All packages at same version:
@c3/shared: 0.1.0
@c3/parsing: 0.1.0
@c3/compliance: 0.1.0
@c3/discovery: 0.1.0
@c3/projection: 0.1.0

// When releasing:
// 1. Bump all to 0.1.1
// 2. Tag all as v0.1.1
// 3. Publish all at once
```

**Pros:**
- Simple to track
- Release all together
- Clear changelog

**Cons:**
- Artificial version coupling
- Can't patch one context independently

### Approach 2: Independent Versioning (Flexible)
```json
@c3/shared: 0.5.0 (stable, many releases)
@c3/parsing: 1.2.0 (active development)
@c3/compliance: 0.3.0 (stable, few changes)
@c3/discovery: 1.5.0 (under heavy development)
@c3/projection: 0.1.0 (new context)

// When releasing:
// 1. Only update packages with changes
// 2. Use semantic versioning per package
// 3. Document changes in each repo
```

**Pros:**
- Flexible versioning
- Independent releases
- Clear separation of concerns

**Cons:**
- More complex tracking
- Harder to correlate versions
- Need version matrix documentation

### Recommendation: Synchronized for stability

Start with synchronized versioning. Move to independent versioning later if needed.

---

## CI/CD Changes Required

### Current (Monorepo)
```yaml
test:
  script:
    - npm ci
    - npm run test

build:
  script:
    - npm run build
    - All packages built in one step
```

### After Migration

**For extracted contexts:**
```yaml
# c3-parsing/.github/workflows/release.yml
publish:
  steps:
    - npm version patch
    - npm publish
    - git push
```

**For monorepo (cli + bff + web + shared + wiring):**
```yaml
# c3-foundation/.github/workflows/test.yml
test:
  steps:
    - npm ci
    - npm install @c3/parsing @c3/compliance @c3/discovery @c3/projection
    - npm run test
```

### Cross-Repo Testing (New)

Need automated workflow to:
1. Publish new context version
2. Update foundation to use new version
3. Run integration tests in foundation
4. If tests pass: publish to production
5. If tests fail: revert context version

Example (GitHub Actions):
```yaml
name: Integration Test on Context Publish

on:
  repository_dispatch:
    types: [context-published]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          repository: c3-foundation
      
      - name: Install new context version
        run: npm install @c3/${{ github.event.client_payload.package }}@${{ github.event.client_payload.version }}
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Report results
        run: |
          # Send results back to context repo
          curl -X POST https://api.github.com/...
```

---

## Risk Mitigation Strategies

### Risk 1: Version Mismatches

**Scenario:** CLI tries to use incompatible versions of contexts

**Mitigation:**
- Lock exact versions in monorepo apps
- Use npm audit to find conflicts
- Create dependency version matrix
- Automated integration tests

### Risk 2: Breaking Changes in Shared

**Scenario:** Update to @c3/shared breaks all consumers

**Mitigation:**
- Use semantic versioning strictly
- Maintain @c3/shared in monorepo during transition
- Create compatibility layer if needed
- Document breaking changes clearly

### Risk 3: Lost Context Dependencies

**Scenario:** Move context, miss a hidden dependency

**Mitigation:**
- Audit source code before moving (grep for imports)
- Test build in isolation before publishing
- Run full integration tests after extraction
- Keep unused file refs as fallback during transition

### Risk 4: NPM Registry Failure

**Scenario:** Private npm registry goes down

**Mitigation:**
- Use reputable service (npm Inc, GitHub Packages, Artifactory)
- Keep monorepo as fallback during transition
- Document registry URL in all docs
- Test publish/install workflow before going live

---

## Success Criteria

### Phase 1 Complete When:
- [ ] @c3/shared published successfully
- [ ] All packages install @c3/shared from npm
- [ ] All tests pass
- [ ] CI/CD pipeline updated

### Phase 2 Complete When:
- [ ] All 4 contexts published
- [ ] Monorepo uses published versions
- [ ] Integration tests pass
- [ ] No regressions in functionality

### Full Migration Complete When:
- [ ] All intended repos separated
- [ ] Documentation updated
- [ ] Team trained on new workflow
- [ ] CI/CD fully automated
- [ ] Version management automated
- [ ] 2+ successful releases in new structure

---

## Rollback Plan

### At Any Point Before Full Migration:

1. **Keep backup:** Git branch `backup/pre-polyrepo`
2. **Revert publishing:** Unpublish npm packages if needed
3. **Restore file refs:** Change back to `file:../` paths
4. **Merge down:** Pull contexts back into monorepo

### If Migration Fails Midway:

```bash
# Restore from backup
git checkout backup/pre-polyrepo
npm ci
npm run build
npm run test

# OR selective restore:
git checkout main -- apps/ contexts/ shared/ wiring/ package.json
npm ci
```

---

## Next Steps

1. **Review** this document with team
2. **Decide** on final polyrepo structure
3. **Schedule** Phase 1 work
4. **Create** npm registry access
5. **Execute** Phase 1
6. **Evaluate** results before Phase 2
7. **Document** lessons learned

---

## Questions to Answer Before Starting

1. **Who maintains each context after separation?**
   - Single team or distributed ownership?

2. **How often do versions need to be released?**
   - Daily? Weekly? Per-demand?

3. **Can contexts have breaking changes independently?**
   - Or must they be coordinated?

4. **Do you need to publish CLI/BFF as npm packages?**
   - Or are they internal tools only?

5. **What's your npm registry strategy?**
   - npm Inc (public), GitHub Packages, Artifactory, self-hosted?

---

