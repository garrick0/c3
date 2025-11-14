# C3 Polyrepo Quick Reference

## Account Configuration

- **GitHub Account:** garrick0 (personal, no organization needed)
- **NPM Packages:** Unscoped (c3-shared, c3-parsing, etc.)
- **Repository URLs:** github.com/garrick0/c3-*

## Repository Structure

```
~/dev/
├── c3-shared/          → npm: c3-shared
├── c3-wiring/          → npm: c3-wiring
├── c3-parsing/         → npm: c3-parsing
├── c3-compliance/      → npm: c3-compliance
├── c3-projection/      → npm: c3-projection
├── c3-discovery/       → npm: c3-discovery
├── c3-cli/             → npm: c3-cli
├── c3-bff/             → npm: c3-bff
├── c3-web/             → npm: c3-web
└── c3-platform/        → orchestration only
```

## Quick Start

### 1. Clone Platform
```bash
cd ~/dev
gh repo clone garrick0/c3-platform
cd c3-platform
```

### 2. Clone All Repos
```bash
./scripts/clone-all.sh
```

### 3. Install Dependencies
```bash
./scripts/setup-dev.sh
```

### 4. Link for Local Development
```bash
./scripts/link-all.sh
```

### 5. Build Everything
```bash
./scripts/build-all.sh
```

### 6. Test Everything
```bash
./scripts/test-all.sh
```

## Creating a New Repository

### Example: c3-parsing

```bash
# 1. Create repo on GitHub
gh repo create garrick0/c3-parsing --public

# 2. Clone locally
cd ~/dev
git clone https://github.com/garrick0/c3-parsing
cd c3-parsing

# 3. Copy files from monorepo
cp -r ~/dev/c3/contexts/parsing/* .

# 4. Create package.json
{
  "name": "c3-parsing",
  "version": "0.1.0",
  "dependencies": {
    "c3-shared": "^0.1.0"
  }
}

# 5. Build and publish
npm install
npm run build
npm test
npm publish
```

## Package Dependencies

### Dependency Order (for publishing)
1. c3-shared (no dependencies)
2. c3-parsing (depends on: shared)
3. c3-compliance (depends on: shared, parsing)
4. c3-projection (depends on: shared, parsing)
5. c3-discovery (depends on: shared, parsing, compliance)
6. c3-wiring (depends on: all contexts)
7. c3-cli (depends on: wiring)
8. c3-bff (depends on: wiring)
9. c3-web (no npm dependencies - calls BFF API)

### Import Examples

```typescript
// In c3-parsing
import { Result, Logger } from 'c3-shared';

// In c3-compliance
import { PropertyGraph } from 'c3-parsing';
import { Logger } from 'c3-shared';

// In c3-cli
import { bootstrap } from 'c3-wiring';
import { ParsingService } from 'c3-parsing';
```

## Local Development Workflow

### Working on a Single Package
```bash
cd ~/dev/c3-parsing
# Make changes...
npm run build

# Changes automatically available to linked packages
cd ~/dev/c3-cli
npm test  # Uses your local c3-parsing
```

### Working Across Multiple Packages
```bash
# Feature spanning parsing + compliance
cd ~/dev/c3-parsing
git checkout -b feature/new-graph-api
# Make changes...
npm run build

cd ~/dev/c3-compliance
git checkout -b feature/new-graph-api
# Make changes...
npm test  # Uses linked c3-parsing
```

### Publishing New Version
```bash
cd ~/dev/c3-platform

# Update all package.json versions
# Then publish in order:
./scripts/publish-all.sh
```

## Common Commands

### Build single package
```bash
cd ~/dev/c3-parsing
npm run build
```

### Test single package
```bash
cd ~/dev/c3-parsing
npm test
```

### Link package globally
```bash
cd ~/dev/c3-cli
npm link
c3 --help  # Now available globally
```

### Check what's linked
```bash
npm ls -g --depth=0 --link=true
```

### Unlink everything
```bash
cd ~/dev/c3-platform
# Create unlink-all.sh if needed
npm unlink -g c3-shared c3-parsing c3-compliance c3-projection c3-discovery c3-wiring c3-cli
```

## Troubleshooting

### "Module not found" errors
```bash
# Re-link everything
cd ~/dev/c3-platform
./scripts/link-all.sh
```

### Stale builds
```bash
# Rebuild everything
cd ~/dev/c3-platform
./scripts/build-all.sh
```

### Version conflicts
```bash
# Check versions
cd ~/dev
for dir in c3-*/; do
  echo "$dir: $(jq -r '.version' $dir/package.json)"
done
```

### npm link not working
```bash
# Use npm-link-shared instead
npm install -g npm-link-shared
cd ~/dev
npm-link-shared c3-shared c3-parsing c3-compliance c3-projection c3-discovery c3-wiring
```

## Phase Overview

| Phase | Duration | Key Deliverable |
|-------|----------|----------------|
| 1. Foundation | 3 days | Platform repo, CI/CD templates |
| 2. Core Libraries | 5 days | 6 context packages published |
| 3. Applications | 3 days | CLI, BFF, Web extracted |
| 4. Platform Tools | 3 days | Scripts, docs, automation |
| 5. Validation | 4 days | Testing, migration complete |
| 6. Optimization | 5 days | DX improvements |
| **Total** | **~5 weeks** | **Complete polyrepo** |

## Key Differences from Monorepo

| Aspect | Monorepo | Polyrepo |
|--------|----------|----------|
| File location | `contexts/parsing/` | `~/dev/c3-parsing/` |
| Import | `@c3/parsing` (local) | `c3-parsing` (npm) |
| Building | `npm run build` (root) | `./scripts/build-all.sh` |
| Testing | `npm test` (root) | `./scripts/test-all.sh` |
| Version | Single version | Synchronized versions |
| Git history | Shared | Independent |
| CI/CD | Single workflow | Per-repo + orchestration |

## No Organization Needed

**Personal account benefits:**
- ✅ Simpler setup (no org to create)
- ✅ Full control over repos
- ✅ No team management overhead
- ✅ Same workflow as organization
- ✅ Can migrate to org later if needed

**What's different:**
- URLs: `github.com/garrick0/c3-*` instead of `github.com/c3-system/c3-*`
- NPM: Unscoped (`c3-shared`) instead of scoped (`@c3-system/shared`)
- That's it!

---

**Full Documentation:** See `polyrepo-implementation-plan.md` for complete details

**Created:** 2025-01-14
**Location:** `/Users/samuelgleeson/dev/c3/.working/polyrepo-quick-reference.md`
