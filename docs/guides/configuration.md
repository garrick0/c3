# Configuration Guide

Complete reference for configuring C3 via `architecture.config.ts`.

## Overview

C3 is configured through an `architecture.config.ts` file in your project root. This file defines:
- Architecture style and structure
- Rules and their severity
- Whitelisted violations
- Discovery hints for AI

## Quick Start

### Initialize Configuration

```bash
c3 init
```

This creates a basic `architecture.config.ts` with recommended settings.

### Minimal Configuration

```typescript
export default {
  version: '1.0',
  rules: {
    'no-circular-dependencies': 'error'
  }
}
```

## Complete Configuration Schema

```typescript
export default {
  // Configuration version (required)
  version: string;

  // Extend preset configurations (optional)
  extends?: string[];

  // Architecture definition (optional)
  architecture?: {
    style: 'clean' | 'layered' | 'modular' | 'microservices' | 'hexagonal';
    layers?: Array<{
      name: string;
      path: string;
    }>;
  };

  // Rules configuration (optional)
  rules?: {
    // Built-in rules
    [ruleName: string]: Severity | [Severity, Config];

    // Custom rules
    custom?: Array<{
      name: string;
      severity: Severity;
      condition: Condition;
    }>;
  };

  // Whitelisted violations (optional)
  whitelist?: Array<{
    rule: string;
    path: string;
    reason?: string;
  }>;

  // Discovery configuration (optional)
  discovery?: {
    ignore?: string[];
    hints?: Record<string, boolean>;
  };
}
```

## Configuration Sections

### Version

Specifies the configuration format version.

```typescript
{
  version: '1.0'
}
```

Current version: `1.0`

### Extends

Inherit from preset configurations.

```typescript
{
  extends: ['@c3/recommended']
}
```

**Available Presets**:
- `@c3/recommended` - Balanced rules for most projects
- `@c3/strict` - Strict enforcement
- `@c3/minimal` - Minimal set of critical rules

**Multiple Presets**:
```typescript
{
  extends: ['@c3/recommended', '@c3/typescript']
}
```

Later presets override earlier ones.

### Architecture

Define your architecture style and structure.

#### Architecture Style

```typescript
{
  architecture: {
    style: 'clean'  // or 'layered' | 'modular' | 'microservices' | 'hexagonal'
  }
}
```

Helps C3 understand your architectural approach for better rule inference.

#### Layer Definitions

```typescript
{
  architecture: {
    style: 'clean',
    layers: [
      { name: 'domain', path: 'src/domain' },
      { name: 'application', path: 'src/application' },
      { name: 'infrastructure', path: 'src/infrastructure' },
      { name: 'presentation', path: 'src/presentation' }
    ]
  }
}
```

Used for:
- Layer dependency validation
- Architecture violation detection
- Better AI pattern detection

### Rules

Configure which rules to enforce and their severity.

#### Built-in Rules

**Severity Levels**:
- `'error'` - Fails checks, must be fixed
- `'warning'` - Shows warning, doesn't fail
- `'info'` - Informational only

**Simple Configuration**:
```typescript
{
  rules: {
    'no-circular-dependencies': 'error',
    'consistent-naming': 'warning',
    'no-dead-code': 'info'
  }
}
```

**With Options**:
```typescript
{
  rules: {
    'consistent-naming': ['error', { style: 'kebab-case' }],
    'layer-dependencies': ['error', { flow: 'inward' }],
    'max-file-size': ['warning', { maxLines: 500 }]
  }
}
```

#### Available Built-in Rules

**Dependency Rules**:
- `no-circular-dependencies` - Prevent circular dependencies
- `layer-dependencies` - Enforce layer dependency direction
- `no-cross-layer` - Prevent skipping layers

**Naming Rules**:
- `consistent-naming` - Enforce naming conventions
  - Options: `style` ('kebab-case'|'camelCase'|'PascalCase'|'snake_case')
- `file-naming` - File naming patterns
- `directory-naming` - Directory naming patterns

**Structure Rules**:
- `colocate-tests` - Tests next to source files
- `max-file-size` - Maximum file size
  - Options: `maxLines` (number)
- `consistent-structure` - Consistent folder structure

**Complexity Rules**:
- `max-complexity` - Maximum cyclomatic complexity
- `max-depth` - Maximum nesting depth
- `max-parameters` - Maximum function parameters

#### Custom Rules

Define your own rules:

```typescript
{
  rules: {
    custom: [
      {
        name: 'no-direct-db-access-from-domain',
        severity: 'error',
        condition: {
          type: 'dependency',
          from: { layer: 'domain' },
          to: { matches: '**/database/**' },
          forbidden: true
        }
      },
      {
        name: 'use-service-suffix',
        severity: 'warning',
        condition: {
          type: 'naming',
          pattern: '*Service.ts',
          required: { in: 'src/services/**' }
        }
      }
    ]
  }
}
```

**Condition Types**:
- `dependency` - Dependency relationships
- `naming` - Naming patterns
- `structure` - File/folder structure
- `complexity` - Code complexity metrics

### Whitelist

Accept specific violations that are intentional.

```typescript
{
  whitelist: [
    {
      rule: 'consistent-naming',
      path: 'legacy/**',
      reason: 'Legacy code, will refactor in Q2 2024'
    },
    {
      rule: 'no-circular-dependencies',
      path: 'src/domain/User.ts',
      reason: 'Accepted circular dependency - documented in ADR-005'
    }
  ]
}
```

**Fields**:
- `rule` - Rule ID to whitelist
- `path` - File or glob pattern
- `reason` - Why this is accepted (optional but recommended)

### Discovery

Configure AI-powered pattern discovery.

```typescript
{
  discovery: {
    // Paths to ignore during discovery
    ignore: [
      'node_modules',
      'dist',
      'coverage',
      '*.test.ts'
    ],

    // Hints to guide AI analysis
    hints: {
      'This is a DDD project': true,
      'We use ports and adapters': true,
      'Tests are colocated with source': true,
      'We follow clean architecture': true
    }
  }
}
```

**Hints** help the AI understand your codebase context for better pattern detection.

## Complete Example

```typescript
export default {
  version: '1.0',

  // Extend recommended preset
  extends: ['@c3/recommended'],

  // Define architecture
  architecture: {
    style: 'clean',
    layers: [
      { name: 'domain', path: 'src/domain' },
      { name: 'application', path: 'src/application' },
      { name: 'infrastructure', path: 'src/infrastructure' },
      { name: 'presentation', path: 'src/presentation' }
    ]
  },

  // Configure rules
  rules: {
    // Built-in rules
    'no-circular-dependencies': 'error',
    'consistent-naming': ['error', { style: 'kebab-case' }],
    'layer-dependencies': ['error', { flow: 'inward' }],
    'colocate-tests': 'warning',
    'max-file-size': ['warning', { maxLines: 500 }],

    // Custom rules
    custom: [
      {
        name: 'domain-has-no-infrastructure-deps',
        severity: 'error',
        condition: {
          type: 'dependency',
          from: { layer: 'domain' },
          to: { layer: 'infrastructure' },
          forbidden: true
        }
      },
      {
        name: 'services-use-suffix',
        severity: 'warning',
        condition: {
          type: 'naming',
          pattern: '*Service.ts',
          required: { in: 'src/**/services/**' }
        }
      }
    ]
  },

  // Whitelist known violations
  whitelist: [
    {
      rule: 'consistent-naming',
      path: 'legacy/**',
      reason: 'Legacy code - scheduled for Q2 refactor'
    }
  ],

  // Discovery configuration
  discovery: {
    ignore: [
      'node_modules',
      'dist',
      'build',
      '*.test.ts',
      '*.spec.ts'
    ],
    hints: {
      'DDD with clean architecture': true,
      'Feature-based folder structure': true,
      'Tests colocated with source': true
    }
  }
}
```

## Rule Configuration Patterns

### Incremental Adoption

Start with minimal rules, add more over time:

```typescript
// Week 1: Critical only
{
  rules: {
    'no-circular-dependencies': 'error'
  }
}

// Week 2: Add naming
{
  rules: {
    'no-circular-dependencies': 'error',
    'consistent-naming': 'warning'
  }
}

// Week 3: Enforce
{
  rules: {
    'no-circular-dependencies': 'error',
    'consistent-naming': 'error',
    'layer-dependencies': 'error'
  }
}
```

### Team Standards

```typescript
{
  rules: {
    // Critical - must fix
    'no-circular-dependencies': 'error',
    'layer-dependencies': 'error',

    // Important - fix soon
    'consistent-naming': 'warning',
    'colocate-tests': 'warning',

    // Nice to have - informational
    'max-file-size': 'info'
  }
}
```

### Migration Mode

```typescript
{
  rules: {
    // New code must comply
    'consistent-naming': 'error'
  },

  // Old code is whitelisted
  whitelist: [
    {
      rule: 'consistent-naming',
      path: 'src/legacy/**',
      reason: 'Legacy modules - migrate incrementally'
    }
  ]
}
```

## Validation

C3 validates your configuration using Zod schemas. Validation errors show:
- Which field is invalid
- Expected format
- Current value

**Example Error**:
```
❌ Invalid configuration
  rules.consistent-naming.style: Expected 'kebab-case' | 'camelCase' | 'PascalCase'
  Got: 'kebabCase'
```

## Best Practices

1. **Start Small** - Begin with critical rules, add more over time
2. **Use Warnings** - Use warnings during adoption, errors when ready
3. **Document Whitelist** - Always provide reason for whitelisted violations
4. **Leverage Discovery** - Let AI suggest rules based on your code
5. **Version Control** - Commit architecture.config.ts
6. **Team Agreement** - Get team buy-in on rules
7. **Incremental Migration** - Use whitelist for legacy code

## Troubleshooting

### Configuration not found

Ensure `architecture.config.ts` is in:
- Project root, or
- Specified with `--config` flag

### Rule not found

Check rule name spelling. List available rules:
```bash
c3 check . --list-rules
```

### Syntax errors

Configuration must be valid TypeScript that exports a default object.

## See Also

- [CLI Reference](cli-reference.md) - Command-line documentation
- [Rules Guide](rules-guide.md) - Detailed rule documentation
- [Examples](../examples/architecture-configs/) - Example configurations

---

**Need help?** See [Troubleshooting Guide](troubleshooting.md)
