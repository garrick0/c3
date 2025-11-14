# CLI Reference

Complete reference for all C3 command-line commands.

## Installation

```bash
cd apps/cli
npm link
```

This makes the `c3` command available globally.

## Global Options

All commands support these options:

```
--help, -h       Show help
--version, -v    Show version
--verbose        Enable verbose logging
--quiet          Suppress output
```

## Commands

### `c3 init`

Initialize C3 configuration in your project.

**Usage**:
```bash
c3 init [options]
```

**Options**:
- `--preset <name>` - Use preset configuration (default: `@c3/recommended`)

**Available Presets**:
- `@c3/recommended` - Recommended rules for most projects
- `@c3/strict` - Strict rule enforcement
- `@c3/minimal` - Minimal rule set

**Example**:
```bash
# Initialize with default preset
c3 init

# Initialize with strict preset
c3 init --preset @c3/strict
```

**Output**:
- Creates `architecture.config.ts` in current directory
- Shows next steps

---

### `c3 parse`

Parse codebase into a property graph.

**Usage**:
```bash
c3 parse <path> [options]
```

**Arguments**:
- `<path>` - Path to codebase (required)

**Options**:
- `-o, --output <file>` - Save graph to file (JSON format)
- `--ignore <patterns>` - Additional ignore patterns (comma-separated)
- `--max-size <bytes>` - Maximum file size to parse (default: 1MB)
- `--parsers <list>` - Enable specific parsers (comma-separated)

**Example**:
```bash
# Parse current directory
c3 parse .

# Parse with output file
c3 parse ./src --output graph.json

# Parse with custom ignore patterns
c3 parse . --ignore "*.test.ts,*.spec.ts"

# Parse with specific parsers
c3 parse . --parsers typescript,python
```

**Output**:
```
✅ Parsed successfully
  Nodes: 1,234
  Edges: 567
  Graph ID: graph-1234567890
```

---

### `c3 check`

Check compliance against configured rules.

**Usage**:
```bash
c3 check <path> [options]
```

**Arguments**:
- `<path>` - Path to codebase (required)

**Options**:
- `--fix` - Automatically fix violations where possible
- `--severity <level>` - Only show violations of this severity (error|warning|info)
- `--rule <id>` - Check specific rule only
- `--format <format>` - Output format (text|json|junit) (default: text)
- `-o, --output <file>` - Save report to file

**Example**:
```bash
# Check all rules
c3 check .

# Check and auto-fix
c3 check . --fix

# Check only errors
c3 check . --severity error

# Output to JSON
c3 check . --format json --output report.json

# Check specific rule
c3 check . --rule no-circular-dependencies
```

**Output**:
```
📊 Compliance Report
  Total Violations: 3
  Errors: 1
  Warnings: 2
  Info: 0

❌ Compliance issues found

src/domain/User.ts:15
  [error] no-circular-dependencies: Circular dependency detected
  User → Order → User

src/utils/helper.ts:42
  [warning] consistent-naming: File should use kebab-case
  helper.ts → rename to: user-helper.ts
```

**Exit Codes**:
- `0` - No violations
- `1` - Violations found
- `2` - Error during check

---

### `c3 discover`

Discover patterns and infer rules using AI.

**Usage**:
```bash
c3 discover <path> [options]
```

**Arguments**:
- `<path>` - Path to codebase (required)

**Options**:
- `--accept` - Automatically accept high-confidence rules (>0.8)
- `--confidence <threshold>` - Minimum confidence threshold (0.0-1.0) (default: 0.7)
- `--types <list>` - Pattern types to detect (naming|structural|architectural)
- `-o, --output <file>` - Save discovered patterns to file

**Example**:
```bash
# Discover all patterns
c3 discover .

# Auto-accept high-confidence rules
c3 discover . --accept

# Only detect naming patterns
c3 discover . --types naming

# Custom confidence threshold
c3 discover . --confidence 0.85
```

**Output**:
```
🔍 Discovery Results
  Patterns Found: 12
  Candidate Rules: 5

📋 Suggested Rules:
  - Use kebab-case for filenames (confidence: 0.92)
  - Colocate tests with source (confidence: 0.87)
  - No direct database access from domain (confidence: 0.78)
  - Use dependency injection (confidence: 0.85)
  - Group by feature not layer (confidence: 0.73)

? Accept rule: Use kebab-case for filenames? (Y/n)
```

---

### `c3 fix`

Apply automated fixes for violations.

**Usage**:
```bash
c3 fix <path> [options]
```

**Arguments**:
- `<path>` - Path to codebase (required)

**Options**:
- `--dry-run` - Show what would be fixed without applying
- `--rule <id>` - Fix violations of specific rule only
- `--interactive` - Prompt for each fix
- `--backup` - Create backup before applying fixes

**Example**:
```bash
# Dry run to preview fixes
c3 fix . --dry-run

# Apply all fixes
c3 fix .

# Interactive mode
c3 fix . --interactive

# Fix specific rule violations
c3 fix . --rule consistent-naming
```

**Output**:
```
🔧 Fix Mode
  Path: /path/to/project
  Dry Run: No

Applying fixes...
  ✅ Renamed helper.ts → user-helper.ts
  ✅ Moved UserService.ts → domain/services/
  ⏭️  Skipped: Manual fix required for circular dependency

Applied 2 of 3 fixes
```

---

### `c3 visualize`

Generate visualizations of your codebase.

**Usage**:
```bash
c3 visualize <path> [options]
```

**Arguments**:
- `<path>` - Path to codebase (required)

**Options**:
- `-t, --type <type>` - Projection type (default: module)
  - `module` - Module dependencies
  - `layer` - Architectural layers
  - `tree` - Directory tree
  - `component` - Component relationships
  - `matrix` - Dependency matrix
- `-o, --output <file>` - Output file (format detected from extension)
- `--format <format>` - Export format (svg|png|json|dot|mermaid)
- `--level <level>` - Aggregation level (file|module|package|system)

**Example**:
```bash
# Generate module view
c3 visualize . --type module

# Export to SVG
c3 visualize . --type layer --output layers.svg

# Dependency matrix as JSON
c3 visualize . --type matrix --format json --output matrix.json

# Component graph at module level
c3 visualize . --type component --level module
```

**Output**:
```
📊 Visualization Generated
  Type: module
  Summary: {
    moduleCount: 15,
    totalDependencies: 42,
    averageDependencies: 2.8
  }

Saved to: visualization.svg
```

---

## Configuration File

C3 can be configured via `architecture.config.ts` in your project root.

See [Configuration Guide](configuration.md) for complete reference.

**Minimal Example**:
```typescript
export default {
  version: '1.0',
  rules: {
    'no-circular-dependencies': 'error'
  }
}
```

## Exit Codes

- `0` - Success
- `1` - Violations or issues found
- `2` - Error during execution

## Environment Variables

- `ANTHROPIC_API_KEY` - Claude API key (required for discovery)
- `LOG_LEVEL` - Logging level (debug|info|warn|error)
- `CACHE_ENABLED` - Enable caching (true|false)
- `CACHE_TTL` - Cache time-to-live in seconds

## Examples

### Basic Workflow

```bash
# 1. Initialize
c3 init

# 2. Discover patterns
c3 discover .

# 3. Check compliance
c3 check .

# 4. Fix issues
c3 fix .

# 5. Generate report
c3 visualize . --output report.svg
```

### CI/CD Integration

```bash
# In CI pipeline
c3 check . --format junit --output test-results/c3-report.xml
exit_code=$?

if [ $exit_code -eq 1 ]; then
  echo "Compliance violations found"
  exit 1
fi
```

### Selective Analysis

```bash
# Only check specific directory
c3 check ./src

# Only discover structural patterns
c3 discover . --types structural

# Only generate layer view
c3 visualize ./src --type layer
```

## Troubleshooting

### Command not found

```bash
# Ensure CLI is linked
cd apps/cli && npm link

# Or use npx
npx c3 --help
```

### Parse errors

```bash
# Increase file size limit
c3 parse . --max-size 5242880  # 5MB

# Add ignore patterns
c3 parse . --ignore "large-file.ts"
```

### Discovery requires API key

```bash
# Set API key in .env
echo "ANTHROPIC_API_KEY=your-key" >> .env

# Or pass via environment
ANTHROPIC_API_KEY=your-key c3 discover .
```

## See Also

- [Configuration Guide](configuration.md) - Detailed configuration reference
- [API Reference](../api/rest-api.md) - REST API documentation
- [Architecture](../architecture/overview.md) - System design
- [Examples](../examples/) - Code examples and tutorials

---

**Need help?** Check the [FAQ](faq.md) or ask in [Discussions](https://github.com/your-org/c3/discussions)
