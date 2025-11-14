# C3 Polyrepo Migration Implementation Plan

**GitHub Account:** garrick0 (personal account, no organization)
**NPM Packages:** Unscoped (c3-shared, c3-parsing, etc.) - simpler than @garrick0/c3-shared
**Repositories:** github.com/garrick0/c3-*

## Target Architecture

### Repository Structure

All repositories at the same filesystem level:

```
~/dev/
├── c3-shared/           # NPM package: c3-shared
├── c3-wiring/           # NPM package: c3-wiring
├── c3-parsing/          # NPM package: c3-parsing
├── c3-compliance/       # NPM package: c3-compliance
├── c3-projection/       # NPM package: c3-projection
├── c3-discovery/        # NPM package: c3-discovery
├── c3-cli/              # NPM package: c3-cli (executable)
├── c3-bff/              # NPM package: c3-bff (deployable)
├── c3-web/              # NPM package: c3-web (deployable)
└── c3-platform/         # Orchestration repo (minimal)
```

### Dependency Graph

```
                    c3-cli
                      │
                      ├─────────────┐
                      ▼             ▼
                  c3-wiring ─────► c3-bff
                      │             │
        ┌─────────────┼─────────────┼─────────────┐
        ▼             ▼             ▼             ▼
   c3-parsing   c3-compliance  c3-projection  c3-discovery
        │             │             │             │
        └─────────────┴─────────────┴─────────────┘
                      ▼
                  c3-shared


   c3-web (independent - calls BFF API)
```

### Package Purposes

| Package | Type | Purpose | Dependents |
|---------|------|---------|------------|
| **c3-shared** | Library | Core domain abstractions, Result types, Logger | 8 |
| **c3-wiring** | Library | DI container, bootstrap logic | 2 (CLI, BFF) |
| **c3-parsing** | Library | Code → PropertyGraph transformation | 5 |
| **c3-compliance** | Library | Rules evaluation & remediation | 3 |
| **c3-projection** | Library | Graph transformations & views | 3 |
| **c3-discovery** | Library | AI-powered pattern detection | 3 |
| **c3-cli** | Executable | Command-line interface | 0 |
| **c3-bff** | Service | Backend-for-frontend API | 1 (Web) |
| **c3-web** | App | React frontend | 0 |
| **c3-platform** | Meta | Scripts, docs, orchestration | N/A |

## Migration Phases

---

## Phase 1: Foundation Setup (Week 1)

**Goal:** Establish infrastructure for polyrepo development and publishing.

### Tasks

#### 1.1 Setup NPM Scope

**Using personal account (garrick0) - No organization needed!**

```bash
# Option A: Public NPM packages under your personal scope
# Packages will be: @garrick0/shared, @garrick0/parsing, etc.
# No setup needed - just publish directly

# Option B: Unscoped packages (simpler)
# Packages will be: c3-shared, c3-parsing, etc.
# Check availability: npm view c3-shared
# Reserve names if available

# Option C: Private registry (Verdaccio) for local development
npm install -g verdaccio
verdaccio
# Configure .npmrc to point to local registry
```

**Recommendation:** Use unscoped packages (c3-shared, c3-parsing, etc.) for simplicity, or scoped packages (@garrick0/c3-shared) if unscoped names are taken.

#### 1.2 GitHub Setup

**Using personal GitHub account: garrick0**

```bash
# No organization creation needed
# Repositories will be: github.com/garrick0/c3-shared, etc.

# Verify GitHub CLI is authenticated
gh auth status

# Ready to create repos!
```

#### 1.3 Setup Development Environment
```bash
# Create workspace directory
mkdir ~/dev/c3-repos
cd ~/dev/c3-repos

# Install linking tools
npm install -g npm-link-shared
```

#### 1.4 Create Repository Template

Create `.github` repository with shared CI/CD templates:

```yaml
# .github/workflows/lib-ci.yml
name: Library CI
on: [push, pull_request]
jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run typecheck
      - run: npm test
      - run: npm run build

  publish:
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    needs: test-and-build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

#### 1.5 Create c3-platform Repository

```bash
cd ~/dev/c3-repos
gh repo create garrick0/c3-platform --public
git clone https://github.com/garrick0/c3-platform
cd c3-platform

# Create structure
mkdir -p scripts docs

# Create orchestration scripts
cat > scripts/clone-all.sh << 'EOF'
#!/bin/bash
# Clone all C3 repositories from garrick0's GitHub
repos=(
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

for repo in "${repos[@]}"; do
  if [ ! -d "../$repo" ]; then
    gh repo clone garrick0/$repo ../$repo
  fi
done
EOF

chmod +x scripts/clone-all.sh
```

### Acceptance Criteria

- [ ] NPM publishing strategy decided (scoped @garrick0/* vs unscoped c3-*)
- [ ] GitHub CLI authenticated as garrick0
- [ ] `c3-platform` repository created at garrick0/c3-platform
- [ ] CI/CD templates created and tested
- [ ] Development workspace structure defined
- [ ] .npmrc configured (if using private registry)

### Deliverables

1. NPM scope decision: `@garrick0/*` or `c3-*` packages
2. GitHub repositories under: `github.com/garrick0/*`
3. Repository: `garrick0/c3-platform` with scripts
4. Documentation: Development setup guide
5. CI/CD templates in c3-platform/.github/workflows/

---

## Phase 2: Extract Core Libraries (Week 1-2)

**Goal:** Extract shared, wiring, and context packages as independent NPM packages.

### Phase 2.1: Extract c3-shared

#### Tasks

```bash
# Create repository
cd ~/dev/c3-repos
gh repo create garrick0/c3-shared --public
git clone https://github.com/garrick0/c3-shared
cd c3-shared

# Copy from monorepo
cp -r ~/dev/c3/shared/* .

# Create package.json
cat > package.json << 'EOF'
{
  "name": "c3-shared",
  "version": "0.1.0",
  "description": "Shared domain abstractions and infrastructure for C3",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./domain": "./dist/domain/index.js",
    "./infrastructure": "./dist/infrastructure/index.js",
    "./configuration": "./dist/configuration/index.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "vitest run",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "typescript": "^5.3.3",
    "vitest": "^1.0.4"
  },
  "publishConfig": {
    "access": "public"
  }
}
EOF

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022"],
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
EOF

# Reorganize to src/
mkdir -p src
mv domain application infrastructure configuration src/

# Create barrel exports
cat > src/index.ts << 'EOF'
// Domain
export * from './domain/index.js';

// Infrastructure
export * from './infrastructure/index.js';

// Configuration
export * from './configuration/index.js';
EOF

# Build and test
npm install
npm run build
npm test

# Publish
npm publish
```

#### Acceptance Criteria

- [ ] Repository `c3-shared` created and cloned
- [ ] All files from `shared/` copied and organized
- [ ] Package builds successfully with TypeScript
- [ ] All tests pass
- [ ] Package published to NPM registry
- [ ] Package can be installed: `npm install c3-shared`
- [ ] Version tagged: `v0.1.0`

### Phase 2.2: Extract c3-parsing

#### Tasks

```bash
cd ~/dev/c3-repos
gh repo create garrick0/c3-parsing --public
git clone https://github.com/garrick0/c3-parsing
cd c3-parsing

# Copy context
cp -r ~/dev/c3/contexts/parsing/* .

# Update package.json
cat > package.json << 'EOF'
{
  "name": "c3-parsing",
  "version": "0.1.0",
  "description": "Code parsing and property graph construction for C3",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./domain": "./dist/domain/index.js",
    "./application": "./dist/application/index.js",
    "./infrastructure": "./dist/infrastructure/index.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "c3-shared": "^0.1.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "typescript": "^5.3.3",
    "vitest": "^1.0.4"
  }
}
EOF

# Build and publish
npm install
npm run build
npm test
npm publish
```

#### Acceptance Criteria

- [ ] Repository `c3-parsing` created
- [ ] Depends on `c3-shared` from NPM
- [ ] Builds successfully
- [ ] Tests pass
- [ ] Published to NPM
- [ ] Version tagged: `v0.1.0`

### Phase 2.3: Extract Remaining Contexts

Repeat Phase 2.2 process for:

1. **c3-compliance** (depends on: shared, parsing)
2. **c3-projection** (depends on: shared, parsing)
3. **c3-discovery** (depends on: shared, parsing, compliance)

**Extraction Order:** shared → parsing → (compliance, projection) → discovery

#### Acceptance Criteria (Each Context)

- [ ] Repository created on GitHub
- [ ] All context files copied
- [ ] Dependencies updated to use NPM packages
- [ ] TypeScript compilation successful
- [ ] Tests pass
- [ ] Published to NPM registry
- [ ] Git tag created for version

### Phase 2.4: Extract c3-wiring

```bash
cd ~/dev/c3-repos
gh repo create garrick0/c3-wiring --public
git clone https://github.com/garrick0/c3-wiring
cd c3-wiring

# Copy wiring
cp -r ~/dev/c3/wiring/* .

# Update package.json
cat > package.json << 'EOF'
{
  "name": "c3-wiring",
  "version": "0.1.0",
  "description": "Dependency injection and context wiring for C3",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "vitest run"
  },
  "dependencies": {
    "c3-shared": "^0.1.0",
    "c3-parsing": "^0.1.0",
    "c3-compliance": "^0.1.0",
    "c3-projection": "^0.1.0",
    "c3-discovery": "^0.1.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "typescript": "^5.3.3",
    "vitest": "^1.0.4"
  }
}
EOF

# Update imports in context-modules/*.ts
# Change: import { ... } from '../../contexts/parsing'
# To: import { ... } from 'c3-parsing'

npm install
npm run build
npm publish
```

#### Acceptance Criteria

- [ ] Repository `c3-wiring` created
- [ ] All context imports updated to NPM packages
- [ ] Bootstrap logic works with external packages
- [ ] Builds successfully
- [ ] Published to NPM

### Deliverables

1. ✅ `c3-shared@0.1.0` published to NPM
2. ✅ `c3-parsing@0.1.0` published to NPM
3. ✅ `c3-compliance@0.1.0` published to NPM
4. ✅ `c3-projection@0.1.0` published to NPM
5. ✅ `c3-discovery@0.1.0` published to NPM
6. ✅ `c3-wiring@0.1.0` published to NPM

---

## Phase 3: Extract Applications (Week 2)

**Goal:** Extract CLI, BFF, and Web as independent deployable applications.

### Phase 3.1: Extract c3-cli

#### Tasks

```bash
cd ~/dev/c3-repos
gh repo create garrick0/c3-cli --public
git clone https://github.com/garrick0/c3-cli
cd c3-cli

# Copy app
cp -r ~/dev/c3/apps/cli/* .

# Update package.json
cat > package.json << 'EOF'
{
  "name": "c3-cli",
  "version": "0.1.0",
  "description": "Command-line interface for C3",
  "type": "module",
  "bin": {
    "c3": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts",
    "start": "node dist/index.js",
    "test": "vitest run"
  },
  "dependencies": {
    "c3-shared": "^0.1.0",
    "c3-wiring": "^0.1.0",
    "c3-parsing": "^0.1.0",
    "c3-compliance": "^0.1.0",
    "c3-projection": "^0.1.0",
    "c3-discovery": "^0.1.0",
    "commander": "^11.1.0",
    "chalk": "^5.3.0",
    "ora": "^7.0.1"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "vitest": "^1.0.4"
  },
  "publishConfig": {
    "access": "public"
  }
}
EOF

# Add shebang to src/index.ts
# #!/usr/bin/env node

npm install
npm run build
npm test

# Test CLI locally
npm link
c3 --help

# Publish
npm publish
```

#### Acceptance Criteria

- [ ] Repository `c3-cli` created
- [ ] All dependencies updated to NPM packages
- [ ] CLI builds and runs successfully
- [ ] All 6 commands work: parse, check, fix, project, discover, visualize
- [ ] Can be installed globally: `npm install -g c3-cli`
- [ ] Published to NPM

### Phase 3.2: Extract c3-bff

#### Tasks

```bash
cd ~/dev/c3-repos
gh repo create garrick0/c3-bff --public
git clone https://github.com/garrick0/c3-bff
cd c3-bff

# Copy app
cp -r ~/dev/c3/apps/bff/* .

# Update package.json
cat > package.json << 'EOF'
{
  "name": "c3-bff",
  "version": "0.1.0",
  "description": "Backend-for-frontend API for C3",
  "type": "module",
  "main": "./dist/index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts",
    "start": "node dist/index.js",
    "test": "vitest run"
  },
  "dependencies": {
    "c3-shared": "^0.1.0",
    "c3-wiring": "^0.1.0",
    "c3-parsing": "^0.1.0",
    "c3-compliance": "^0.1.0",
    "c3-projection": "^0.1.0",
    "c3-discovery": "^0.1.0",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "vitest": "^1.0.4"
  }
}
EOF

# Create .env.example
cat > .env.example << 'EOF'
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
EOF

npm install
npm run build
npm test
npm run dev  # Test server starts

# Publish
npm publish
```

#### Acceptance Criteria

- [ ] Repository `c3-bff` created
- [ ] All dependencies updated to NPM packages
- [ ] Server starts successfully
- [ ] All API endpoints respond correctly
- [ ] CORS configured for Web app
- [ ] Published to NPM

### Phase 3.3: Extract c3-web

#### Tasks

```bash
cd ~/dev/c3-repos
gh repo create garrick0/c3-web --public
git clone https://github.com/garrick0/c3-web
cd c3-web

# Copy app
cp -r ~/dev/c3/apps/web/* .

# Update package.json
cat > package.json << 'EOF'
{
  "name": "c3-web",
  "version": "0.1.0",
  "description": "Web interface for C3",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "lint": "eslint . --ext ts,tsx"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.8",
    "vitest": "^1.0.4"
  }
}
EOF

# Create .env.example
cat > .env.example << 'EOF'
VITE_API_URL=http://localhost:3001
EOF

npm install
npm run build
npm run dev  # Test app runs

# Publish (not typical for frontends, but possible)
npm publish
```

#### Acceptance Criteria

- [ ] Repository `c3-web` created
- [ ] No direct dependencies on C3 packages (calls BFF API)
- [ ] App builds successfully
- [ ] App runs in dev mode
- [ ] App can connect to BFF
- [ ] Production build works

### Deliverables

1. ✅ `c3-cli@0.1.0` - Installable CLI tool
2. ✅ `c3-bff@0.1.0` - Deployable API server
3. ✅ `c3-web@0.1.0` - Deployable frontend

---

## Phase 4: Platform Orchestration (Week 2-3)

**Goal:** Create tooling for managing the polyrepo development workflow.

### Phase 4.1: Development Scripts

Create in `c3-platform/scripts/`:

#### `setup-dev.sh`
```bash
#!/bin/bash
set -e

echo "🚀 Setting up C3 development environment..."

# Clone all repositories
./scripts/clone-all.sh

# Install dependencies in all repos
repos=(
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

for repo in "${repos[@]}"; do
  echo "📦 Installing $repo..."
  cd ../$repo
  npm install
  cd ../c3-platform
done

echo "✅ Development environment ready!"
echo "Run './scripts/link-all.sh' to link packages for local development"
```

#### `link-all.sh`
```bash
#!/bin/bash
set -e

echo "🔗 Linking all C3 packages for local development..."

# Link shared first (everything depends on it)
cd ../c3-shared
npm link
cd ../c3-platform

# Link contexts
for repo in c3-parsing c3-compliance c3-projection c3-discovery; do
  cd ../$repo
  npm link c3-shared
  npm link
  cd ../c3-platform
done

# Link wiring
cd ../c3-wiring
npm link c3-shared
npm link c3-parsing
npm link c3-compliance
npm link c3-projection
npm link c3-discovery
npm link
cd ../c3-platform

# Link apps
cd ../c3-cli
npm link c3-shared
npm link c3-wiring
npm link c3-parsing
npm link c3-compliance
npm link c3-projection
npm link c3-discovery
cd ../c3-platform

cd ../c3-bff
npm link c3-shared
npm link c3-wiring
npm link c3-parsing
npm link c3-compliance
npm link c3-projection
npm link c3-discovery
cd ../c3-platform

echo "✅ All packages linked!"
```

#### `build-all.sh`
```bash
#!/bin/bash
set -e

echo "🏗️  Building all C3 packages..."

# Build in dependency order
repos=(
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

for repo in "${repos[@]}"; do
  echo "Building $repo..."
  cd ../$repo
  npm run build
  cd ../c3-platform
done

echo "✅ All packages built!"
```

#### `test-all.sh`
```bash
#!/bin/bash
set -e

echo "🧪 Testing all C3 packages..."

failed=()

repos=(
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

for repo in "${repos[@]}"; do
  echo "Testing $repo..."
  cd ../$repo
  if ! npm test; then
    failed+=($repo)
  fi
  cd ../c3-platform
done

if [ ${#failed[@]} -eq 0 ]; then
  echo "✅ All tests passed!"
  exit 0
else
  echo "❌ Tests failed in: ${failed[*]}"
  exit 1
fi
```

#### `publish-all.sh`
```bash
#!/bin/bash
set -e

echo "📦 Publishing all C3 packages..."

# Confirm
read -p "Are you sure you want to publish all packages? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  exit 1
fi

# Build first
./scripts/build-all.sh

# Test first
./scripts/test-all.sh

# Publish in dependency order
repos=(
  "c3-shared"
  "c3-parsing"
  "c3-compliance"
  "c3-projection"
  "c3-discovery"
  "c3-wiring"
  "c3-cli"
  "c3-bff"
)

for repo in "${repos[@]}"; do
  echo "Publishing $repo..."
  cd ../$repo
  npm publish
  cd ../c3-platform
done

echo "✅ All packages published!"
```

### Phase 4.2: Documentation

Create in `c3-platform/docs/`:

#### `DEVELOPMENT.md`
```markdown
# C3 Development Guide

## Initial Setup

1. Clone the platform repository:
   ```bash
   git clone https://github.com/garrick0/c3-platform
   cd c3-platform
   ```

2. Run setup script:
   ```bash
   ./scripts/setup-dev.sh
   ```

3. Link packages for local development:
   ```bash
   ./scripts/link-all.sh
   ```

## Repository Structure

All repositories are siblings:

```
~/dev/c3-repos/
├── c3-shared/
├── c3-parsing/
├── c3-compliance/
├── c3-projection/
├── c3-discovery/
├── c3-wiring/
├── c3-cli/
├── c3-bff/
├── c3-web/
└── c3-platform/  (this repo)
```

## Working on a Package

```bash
# Make changes in any repo
cd ../c3-parsing
# ... edit files ...
npm run build

# Changes automatically available to linked packages
cd ../c3-cli
npm test  # Uses local c3-parsing
```

## Building Everything

```bash
cd c3-platform
./scripts/build-all.sh
```

## Testing Everything

```bash
cd c3-platform
./scripts/test-all.sh
```

## Publishing

```bash
cd c3-platform
./scripts/publish-all.sh
```
```

#### `VERSIONING.md`
```markdown
# C3 Versioning Strategy

## Semantic Versioning

All packages follow semver: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes

## Synchronized Versions

All C3 packages share the same version number for simplicity.

When releasing:
1. Update version in all package.json files
2. Update changelogs
3. Tag all repositories
4. Publish in dependency order

## Version Compatibility

| Package | Compatible Versions |
|---------|-------------------|
| Contexts | Exact match with shared |
| Wiring | Exact match with contexts |
| Apps | Compatible minor with wiring |

Example:
- If `c3-shared` is `1.2.3`
- Then `c3-parsing` should be `1.2.x`
- And `c3-cli` can be `1.x.x`
```

### Phase 4.3: CI/CD Orchestration

Create `.github/workflows/cross-repo-test.yml`:

```yaml
name: Cross-Repo Integration Test

on:
  repository_dispatch:
    types: [dependency-updated]

jobs:
  test-integration:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout platform
        uses: actions/checkout@v4
        with:
          repository: garrick0/c3-platform

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Clone all repos
        run: |
          cd ..
          ./c3-platform/scripts/clone-all.sh

      - name: Install and link
        run: |
          cd ..
          ./c3-platform/scripts/setup-dev.sh
          ./c3-platform/scripts/link-all.sh

      - name: Build all
        run: |
          cd ..
          ./c3-platform/scripts/build-all.sh

      - name: Test all
        run: |
          cd ..
          ./c3-platform/scripts/test-all.sh
```

### Acceptance Criteria

- [ ] All development scripts created and tested
- [ ] Scripts executable and handle errors gracefully
- [ ] Documentation complete and accurate
- [ ] CI/CD workflow tests cross-repo integration
- [ ] Version management strategy documented
- [ ] Team can clone and setup in < 10 minutes

### Deliverables

1. ✅ `c3-platform` with complete scripts
2. ✅ Development documentation
3. ✅ Versioning strategy
4. ✅ CI/CD orchestration
5. ✅ Quick start guide

---

## Phase 5: Validation & Cutover (Week 3)

**Goal:** Validate the polyrepo setup and migrate production workflows.

### Phase 5.1: Integration Testing

#### Tasks

1. **Clone fresh environment**
   ```bash
   cd ~/test-c3
   git clone https://github.com/garrick0/c3-platform
   cd c3-platform
   ./scripts/setup-dev.sh
   ./scripts/link-all.sh
   ```

2. **Build everything**
   ```bash
   ./scripts/build-all.sh
   ```

3. **Run all tests**
   ```bash
   ./scripts/test-all.sh
   ```

4. **Test CLI end-to-end**
   ```bash
   cd ../c3-cli
   npm link
   c3 parse ../test-project
   c3 check ../test-project
   c3 visualize ../test-project
   ```

5. **Test BFF + Web**
   ```bash
   # Terminal 1
   cd ../c3-bff
   npm start

   # Terminal 2
   cd ../c3-web
   npm run dev

   # Browser: http://localhost:5173
   # Verify all pages work
   ```

#### Acceptance Criteria

- [ ] Fresh clone and setup completes without errors
- [ ] All packages build successfully
- [ ] All tests pass
- [ ] CLI commands work correctly
- [ ] BFF API responds correctly
- [ ] Web app loads and functions
- [ ] No broken imports or dependencies
- [ ] Performance is acceptable

### Phase 5.2: Update Documentation

#### Tasks

1. Update main README in each repo
2. Update CONTRIBUTING.md for new workflow
3. Create migration guide for team
4. Update CI/CD documentation
5. Create troubleshooting guide

#### Acceptance Criteria

- [ ] Each repository has complete README
- [ ] CONTRIBUTING.md reflects polyrepo workflow
- [ ] Migration guide available for team
- [ ] All documentation reviewed and approved

### Phase 5.3: Archive Monorepo

#### Tasks

```bash
cd ~/dev/c3

# Tag final monorepo state
git tag monorepo-final-v0.1.0
git push origin --tags

# Archive branch
git checkout -b archive/monorepo
git push origin archive/monorepo

# Update README
cat > README.md << 'EOF'
# C3 - Archived Monorepo

⚠️ **This repository is archived**

The C3 project has migrated to a polyrepo structure.

## New Repositories (Personal Account: garrick0)

- Platform: https://github.com/garrick0/c3-platform
- Shared: https://github.com/garrick0/c3-shared (NPM: c3-shared)
- Parsing: https://github.com/garrick0/c3-parsing (NPM: c3-parsing)
- Compliance: https://github.com/garrick0/c3-compliance (NPM: c3-compliance)
- Projection: https://github.com/garrick0/c3-projection (NPM: c3-projection)
- Discovery: https://github.com/garrick0/c3-discovery (NPM: c3-discovery)
- Wiring: https://github.com/garrick0/c3-wiring (NPM: c3-wiring)
- CLI: https://github.com/garrick0/c3-cli (NPM: c3-cli)
- BFF: https://github.com/garrick0/c3-bff (NPM: c3-bff)
- Web: https://github.com/garrick0/c3-web (NPM: c3-web)

## Getting Started

See: https://github.com/garrick0/c3-platform
EOF

git add README.md
git commit -m "docs: archive monorepo and redirect to polyrepo"
git push origin archive/monorepo

# Archive on GitHub
gh repo archive garrick0/c3-monorepo
```

#### Acceptance Criteria

- [ ] Monorepo tagged with final version
- [ ] Archive branch created
- [ ] README updated with redirect
- [ ] GitHub repository archived
- [ ] Team notified of archival

### Deliverables

1. ✅ Complete polyrepo environment validated
2. ✅ All documentation updated
3. ✅ Monorepo archived
4. ✅ Team migrated to new workflow

---

## Phase 6: Optimization (Week 3-4)

**Goal:** Optimize the polyrepo workflow based on team feedback.

### Phase 6.1: Dependency Management

#### Tasks

1. **Setup Renovate Bot**
   ```json
   // renovate.json in each repo
   {
     "extends": ["config:base"],
     "packageRules": [
       {
         "matchPackagePatterns": ["^c3-"],
         "groupName": "c3 packages"
       }
     ]
   }
   ```

2. **Setup npm-check-updates**
   ```bash
   # In c3-platform
   npm install -g npm-check-updates

   # Create script
   cat > scripts/update-deps.sh << 'EOF'
   #!/bin/bash
   for repo in c3-*; do
     cd ../$repo
     ncu -u
     npm install
     cd ../c3-platform
   done
   EOF
   ```

#### Acceptance Criteria

- [ ] Renovate configured in all repos
- [ ] Dependency update script works
- [ ] Cross-repo dependency updates automated

### Phase 6.2: Local Development Improvements

#### Tasks

1. **Create Docker Compose for full stack**
   ```yaml
   # c3-platform/docker-compose.yml
   version: '3.8'
   services:
     bff:
       build: ../c3-bff
       ports:
         - "3001:3001"
       environment:
         - NODE_ENV=development

     web:
       build: ../c3-web
       ports:
         - "5173:5173"
       environment:
         - VITE_API_URL=http://localhost:3001
   ```

2. **Create workspace file for VS Code**
   ```json
   // c3.code-workspace
   {
     "folders": [
       { "path": "../c3-shared" },
       { "path": "../c3-parsing" },
       { "path": "../c3-compliance" },
       { "path": "../c3-projection" },
       { "path": "../c3-discovery" },
       { "path": "../c3-wiring" },
       { "path": "../c3-cli" },
       { "path": "../c3-bff" },
       { "path": "../c3-web" },
       { "path": "../c3-platform" }
     ],
     "settings": {
       "typescript.tsdk": "node_modules/typescript/lib"
     }
   }
   ```

#### Acceptance Criteria

- [ ] Docker Compose runs full stack
- [ ] VS Code workspace loads all repos
- [ ] Development experience is smooth

### Deliverables

1. ✅ Automated dependency management
2. ✅ Improved local development tooling
3. ✅ Team feedback incorporated

---

## Success Metrics

### Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Clone + Setup Time | < 10 min | `time ./scripts/setup-dev.sh` |
| Build Time (All) | < 5 min | `time ./scripts/build-all.sh` |
| Test Time (All) | < 3 min | `time ./scripts/test-all.sh` |
| Dependency Update | < 1 day | Time from shared update to apps |
| CI/CD Time | < 10 min | GitHub Actions duration |

### Developer Experience Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| New developer onboarding | < 30 min | Time to first working build |
| Context switch time | < 2 min | Change context, see changes in app |
| Cross-repo refactor time | 2-3x monorepo | Team estimation |
| AI agent effectiveness | 80% reduction in errors | Agent error rate |

### Repository Health Metrics

| Metric | Target |
|--------|--------|
| Test coverage (each repo) | > 80% |
| Build success rate | > 95% |
| Dependency freshness | < 30 days outdated |
| Documentation completeness | 100% |

---

## Risk Mitigation

### High Risk Items

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Version conflicts | High | Medium | Synchronized versions, strict deps |
| NPM publish failures | High | Low | Automated publishing, rollback plan |
| Local setup complexity | Medium | High | Comprehensive scripts, documentation |
| CI/CD failures | Medium | Medium | Cross-repo integration tests |

### Contingency Plans

**If migration fails:**
1. Revert to monorepo from git tag
2. Unpublish problematic NPM packages
3. Restore original package.json files

**If performance degrades:**
1. Measure specific bottlenecks
2. Optimize build scripts (parallel builds)
3. Consider build caching (Turborepo)

**If team struggles with workflow:**
1. Additional training sessions
2. Pair programming sessions
3. Simplified scripts
4. Consider gradual migration

---

## Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| Phase 1: Foundation | 3 days | NPM org, GitHub org, templates |
| Phase 2: Core Libraries | 5 days | 6 NPM packages published |
| Phase 3: Applications | 3 days | 3 deployable apps |
| Phase 4: Platform | 3 days | Scripts, docs, CI/CD |
| Phase 5: Validation | 4 days | Testing, migration, archival |
| Phase 6: Optimization | 5 days | Tooling improvements |
| **Total** | **23 days (~5 weeks)** | **Complete polyrepo** |

---

## Post-Migration Workflow

### Daily Development

```bash
# Start of day
cd ~/dev/c3-repos/c3-platform
git pull

# Work on a context
cd ../c3-parsing
git checkout -b feature/real-typescript-parser
# ... make changes ...
npm run build
npm test

# Test in CLI
cd ../c3-cli
npm test  # Uses linked c3-parsing
c3 parse ../test-project

# Commit and push
cd ../c3-parsing
git add .
git commit -m "feat(parsing): implement real TypeScript parser"
git push origin feature/real-typescript-parser

# Create PR
gh pr create --title "feat: Real TypeScript parser" --body "..."
```

### Publishing a New Version

```bash
cd ~/dev/c3-repos/c3-platform

# Update versions in all repos (manually or with script)
./scripts/update-versions.sh 0.2.0

# Build and test everything
./scripts/build-all.sh
./scripts/test-all.sh

# Publish
./scripts/publish-all.sh

# Tag all repos
./scripts/tag-all.sh v0.2.0
```

### Working Across Contexts

```bash
# Feature spanning parsing + compliance
cd ../c3-parsing
git checkout -b feature/new-node-type

# Make changes
npm run build

cd ../c3-compliance
git checkout -b feature/new-node-type

# Changes in parsing are automatically available
npm test  # Uses linked c3-parsing

# Both PRs reference each other
```

---

## Next Steps

1. **Review this plan with team** - Ensure alignment
2. **Setup NPM organization** - Public or private?
3. **Create GitHub organization** - Team access
4. **Allocate 5 weeks** - For full migration
5. **Assign phase owners** - Distribute work
6. **Schedule checkpoints** - Weekly reviews
7. **Prepare rollback plan** - Safety net

---

**Document Location:** `/Users/samuelgleeson/dev/c3/.working/polyrepo-implementation-plan.md`
**Created:** 2025-01-14
**Version:** 1.0
**Status:** Ready for Review