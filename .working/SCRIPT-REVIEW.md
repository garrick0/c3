# Script Review - Redundancy Analysis

## Current Scripts (7 total, 516 lines)

| Script | Lines | Purpose | Used By |
|--------|-------|---------|---------|
| setup-dev.sh | 72 | Clone + install (smart detection) | Users (first setup) |
| clone-all.sh | 28 | Clone all repos | setup-dev.sh |
| link-all.sh | 79 | Link packages for local dev | Users, publish-all.sh |
| build-all.sh | 46 | Build all packages in order | Users, publish-all.sh |
| test-all.sh | 45 | Test all packages | Users, publish-all.sh |
| publish-all.sh | 89 | Publish to NPM | Users (when publishing) |
| extract-context.sh | 157 | Extract context from monorepo | Users (one-time migration) |

---

## Redundancy Analysis

### 1. clone-all.sh ← COULD REMOVE

**Current usage:**
- Called by: `setup-dev.sh`
- Direct use: Rarely (setup-dev.sh is the interface)

**Is it redundant?**
- ✅ YES - Its functionality is entirely wrapped by setup-dev.sh
- Users should call setup-dev.sh, not clone-all.sh directly
- setup-dev.sh provides smarter behavior (detects existing repos)

**Recommendation:**
- **REMOVE** - Inline the cloning logic into setup-dev.sh
- Saves: 28 lines, reduces script count to 6
- Users call one less script

---

### 2. extract-context.sh ← KEEP (but could archive)

**Current usage:**
- Used during migration: 3 times (compliance, projection, discovery)
- Future use: Very unlikely (all contexts extracted)

**Is it redundant?**
- ⚠️ PARTIALLY - Migration is complete, won't be used again
- Could be useful if creating new contexts in future
- Large (157 lines) but self-contained

**Recommendation:**
- **MOVE to archive/** - Not needed for normal development
- Keep for reference but out of main scripts/
- OR **REMOVE** entirely if confident no new contexts needed

---

### 3. All others ← KEEP

**build-all.sh, link-all.sh, test-all.sh:**
- ✅ All actively used
- ✅ Called by publish-all.sh
- ✅ Called by users directly
- ✅ No overlap

**setup-dev.sh:**
- ✅ Primary entry point for setup
- ✅ Smart detection of existing repos
- ✅ User-facing (not called by other scripts)

**publish-all.sh:**
- ✅ Orchestrates: link → build → test → publish
- ✅ Called by users
- ✅ Unique purpose

---

## Redundancy in Logic

### Repo List Duplication

**Problem:** The repo list is defined in **5 different scripts**

```bash
# In setup-dev.sh
repos=("c3-shared" "c3-wiring" "c3-parsing" ...)

# In clone-all.sh
repos=("c3-shared" "c3-wiring" "c3-parsing" ...)

# In link-all.sh
repos=(c3-shared c3-parsing ...)  # Different style

# In build-all.sh
repos=("c3-shared" "c3-parsing" ...)

# In test-all.sh
repos=("c3-shared" "c3-parsing" ...)

# In publish-all.sh
repos=("c3-shared" "c3-parsing" ...)  # Different order
```

**Is this redundant?**
- ✅ YES - Duplicated 6 times
- If a repo is added/removed, must update 6 places
- Different orders in different scripts (build vs clone)

**Recommendation:**
- **CREATE** shared `scripts/repos.sh` with:
```bash
#!/bin/bash
# Shared repository lists

# All repositories
ALL_REPOS=(
  "c3-shared"
  "c3-wiring"
  "c3-parsing"
  "c3-compliance"
  "c3-projection"
  "c3-discovery"
  "c3-cli"
  "c3-bff"
  "c3-web"
)

# Build order (dependency order)
BUILD_ORDER=(
  "c3-shared"
  "c3-parsing"
  "c3-compliance"
  "c3-projection"
  "c3-discovery"
  "c3-wiring"
  "c3-cli"
  "c3-bff"
  "c3-web"
)

# Publish order (apps not published)
PUBLISH_ORDER=(
  "c3-shared"
  "c3-parsing"
  "c3-compliance"
  "c3-projection"
  "c3-discovery"
  "c3-wiring"
  "c3-cli"
  "c3-bff"
)
```

Then source it:
```bash
# In build-all.sh
source "$(dirname "$0")/repos.sh"
for repo in "${BUILD_ORDER[@]}"; do
  ...
done
```

**Benefits:**
- Single source of truth
- Add repo once, all scripts updated
- Clear documentation of different orderings

---

## Recommendations Summary

### Remove (2 items)

1. **clone-all.sh** - Inline into setup-dev.sh
   - Saves: 28 lines, 1 script file
   - Impact: Low (users call setup-dev.sh anyway)

2. **extract-context.sh** - Move to archive/ or remove
   - Saves: 157 lines, 1 script file (or just move)
   - Impact: None (migration complete, won't use again)

### Refactor (1 item)

3. **Extract repo lists** - Create scripts/repos.sh
   - Centralizes: 6 duplicate repo lists
   - Saves: ~60 lines total
   - Impact: Medium (easier maintenance)

### Keep As-Is (4 items)

4. **setup-dev.sh** - ✅ Keep (primary entry point)
5. **link-all.sh** - ✅ Keep (used by users + publish script)
6. **build-all.sh** - ✅ Keep (used by users + publish script)
7. **test-all.sh** - ✅ Keep (used by users + publish script)
8. **publish-all.sh** - ✅ Keep (NPM publishing)

---

## Proposed Changes

### Option A: Minimal Cleanup (Recommended)

**Remove:**
- clone-all.sh (inline into setup-dev.sh)
- extract-context.sh (migration complete, archive it)

**Result:**
- 7 scripts → 5 scripts
- 516 lines → 331 lines (36% reduction)
- Simpler script directory

### Option B: Aggressive Cleanup

**Remove:**
- clone-all.sh (inline)
- extract-context.sh (archive)

**Refactor:**
- Create repos.sh (shared config)
- Update all scripts to source repos.sh

**Result:**
- 7 scripts → 6 scripts (5 + repos.sh)
- Better maintainability
- Single source of truth for repo list

### Option C: Keep Everything

**Keep all 7 scripts as-is**

**Rationale:**
- Scripts work fine
- Low maintenance burden
- Clear separation of concerns
- extract-context.sh might be useful someday

---

## Recommendation: Option A

**Remove 2 scripts:**

1. **Inline clone-all.sh into setup-dev.sh**
   - Simpler for users (one less script to know about)
   - setup-dev.sh already has smarts around cloning
   - clone-all.sh is never called directly by users

2. **Remove extract-context.sh**
   - Migration is complete
   - All 4 contexts extracted
   - Very unlikely to create new contexts
   - Can always reference from git history if needed

**Keep 5 scripts:**
- setup-dev.sh (primary entry point)
- link-all.sh (essential for development)
- build-all.sh (essential for development)
- test-all.sh (essential for testing)
- publish-all.sh (essential for publishing)

**Impact:**
- Cleaner scripts directory
- Less to maintain
- No loss of functionality
- 36% fewer lines of code

---

## Analysis Details

### setup-dev.sh vs clone-all.sh

**Overlap:**
- Both clone repositories
- Both check if repos exist
- Both skip existing repos

**Difference:**
- setup-dev.sh: Also installs dependencies
- setup-dev.sh: Has user prompt
- clone-all.sh: Just clones (subset of setup-dev.sh)

**Verdict:** clone-all.sh is redundant, inline it

---

### extract-context.sh Usage

**Used during migration:**
- ✅ c3-compliance (worked perfectly)
- ✅ c3-projection (worked perfectly)
- ✅ c3-discovery (worked perfectly)

**Future usage:**
- ❓ Only if creating new bounded contexts
- ❓ Would need updates (references old monorepo)
- ❓ Very specialized, rarely needed

**Verdict:** Archive or remove (migration tool, not development tool)

---

## No Other Redundancy Found

**link-all.sh:**
- Unique purpose (creating symlinks)
- Used by: publish-all.sh, users directly
- Cannot be inlined (too complex, reused)

**build-all.sh:**
- Unique purpose (building in order)
- Used by: publish-all.sh, users directly
- Cannot be inlined (reused, complex)

**test-all.sh:**
- Unique purpose (testing all)
- Used by: publish-all.sh, users directly
- Simple but reused

**publish-all.sh:**
- Unique purpose (NPM publishing)
- Orchestrates other scripts
- User-facing only

**setup-dev.sh:**
- Unique purpose (first-time setup)
- User-facing only
- Could inline clone-all.sh into it

---

**Document Location:** `/Users/samuelgleeson/dev/c3/.working/SCRIPT-REVIEW.md`
**Recommendation:** Remove clone-all.sh and extract-context.sh
