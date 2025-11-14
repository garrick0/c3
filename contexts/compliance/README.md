# Compliance Context

Manages rules, evaluates code against them, and provides remediation strategies.

## Aggregates

### RuleSet
- **RuleSet** - Collection of related rules
- **Rule** - Individual compliance rule
- **Condition** - Rule condition definition
- **RuleSource** - Where rule originated

### Evaluation
- **ComplianceReport** - Results of evaluation
- **Violation** - Rule violation instance
- **ViolationContext** - Detailed violation information
- **Severity** - Violation severity level

### Remediation
- **FixPlan** - Set of fixes to apply
- **Fix** - Individual fix action
- **FixStrategy** - How to apply fix
- **Whitelist** - Accepted violations

## Services

- **RuleManagementService** - CRUD for rules
- **EvaluationEngine** - Core evaluation logic
- **RemediationService** - Fix generation/application
- **ConfigurationParser** - Parse architecture.config.ts
- **WhitelistService** - Manage whitelisted violations
