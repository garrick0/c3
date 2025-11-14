# C3 - Code Standards Management System (Archived Monorepo)

> ⚠️ **This repository has been migrated to a polyrepo structure**

This monorepo is archived and no longer actively developed. All development has moved to separate repositories.

## New Polyrepo Structure

C3 is now split into 10 focused repositories:

### 🏗️ Platform
**Start Here:** [c3-platform](https://github.com/garrick0/c3-platform) - Orchestration, scripts, and documentation

### 📦 Libraries
- [c3-shared](https://github.com/garrick0/c3-shared) - Core domain abstractions (NPM: `c3-shared`)
- [c3-parsing](https://github.com/garrick0/c3-parsing) - Code parsing & property graphs (NPM: `c3-parsing`)
- [c3-compliance](https://github.com/garrick0/c3-compliance) - Rules evaluation (NPM: `c3-compliance`)
- [c3-projection](https://github.com/garrick0/c3-projection) - Graph transformations (NPM: `c3-projection`)
- [c3-discovery](https://github.com/garrick0/c3-discovery) - AI pattern detection (NPM: `c3-discovery`)
- [c3-wiring](https://github.com/garrick0/c3-wiring) - Dependency injection (NPM: `c3-wiring`)

### 🖥️ Applications
- [c3-cli](https://github.com/garrick0/c3-cli) - Command-line interface (NPM: `c3-cli`)
- [c3-bff](https://github.com/garrick0/c3-bff) - Backend-for-frontend API (NPM: `c3-bff`)
- [c3-web](https://github.com/garrick0/c3-web) - React web interface (NPM: `c3-web`)

## Getting Started with Polyrepo

```bash
# Clone the platform repository
git clone https://github.com/garrick0/c3-platform
cd c3-platform

# Setup everything
./scripts/setup-dev.sh

# Link packages
./scripts/link-all.sh

# Build all
./scripts/build-all.sh
```

See [c3-platform/GETTING-STARTED.md](https://github.com/garrick0/c3-platform/blob/main/GETTING-STARTED.md) for complete guide.

## Why Polyrepo?

The migration to polyrepo architecture provides:

- ✅ **Easier for AI agents** - Smaller, focused codebases
- ✅ **Clear boundaries** - Each context is truly independent
- ✅ **Better navigation** - Less nesting, clearer structure
- ✅ **Independent versioning** - Contexts can evolve separately
- ✅ **Parallel development** - Work on contexts without conflicts

## Migration Documentation

Complete migration documentation is in `.working/`:

- **polyrepo-implementation-plan.md** - 6-phase implementation plan
- **polyrepo-migration-summary.md** - Overall summary
- **phase-1-complete.md** through **phase-4-complete.md** - Phase details
- **dependency-analysis.md** - Detailed dependency analysis

## Monorepo Archive

This repository is tagged as:
- `monorepo-final-v0.1.0` - Final state before migration
- Branch: `polyrepo` - Contains migration documentation

### Original Monorepo Stats
- **Files:** 602
- **Lines:** 26,856
- **Packages:** 10 (apps/*, contexts/*, shared, wiring)
- **Architecture:** Modular monolith with bounded contexts

## What Was C3?

C3 (Code Standards Management System) is an AI-powered tool for enforcing code standards and architectural compliance. It:

1. **Parses** codebases into property graphs
2. **Discovers** patterns using Claude AI
3. **Evaluates** code against rules
4. **Projects** multiple analytical views
5. **Remediates** violations automatically

## License

MIT

---

**For current development, see:** https://github.com/garrick0/c3-platform
