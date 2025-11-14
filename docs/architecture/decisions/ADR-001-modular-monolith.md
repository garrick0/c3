# ADR-001: Modular Monolith Architecture

## Status
Accepted

## Context
Need to build a code standards system that is:
- Easy to develop and deploy initially
- Maintainable with clear boundaries
- Extensible for future growth
- Testable at multiple levels

## Decision
Use a modular monolith architecture with bounded contexts, rather than microservices or a big ball of mud.

## Rationale

### Why Modular Monolith
1. **Simpler deployment** - Single deployment unit for MVP
2. **Easier development** - No distributed system complexity
3. **Clear boundaries** - Bounded contexts enforce separation
4. **Migration path** - Can extract to microservices later if needed
5. **Type safety** - Share types across contexts
6. **Performance** - No network overhead between contexts

### Why NOT Microservices
- Over-engineering for MVP
- Added complexity (deployment, networking, consistency)
- Premature optimization

### Why NOT Monolith
- Becomes unmaintainable without boundaries
- Hard to test and reason about
- Coupling increases over time

## Consequences

### Positive
- Fast initial development
- Easy to refactor and move code
- Single codebase to understand
- Integrated testing

### Negative
- Must maintain discipline around boundaries
- Could become coupled if not careful
- Single deployment means all-or-nothing releases

## Mitigations
- Use separate packages per context (`contexts/*/`)
- Define clear public APIs (`index.ts`)
- Enforce dependency rules via TypeScript
- Regular architecture reviews
