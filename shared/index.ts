/**
 * Shared module public API
 * Export all shared domain and infrastructure
 */

// Core abstractions
export * from './domain/core-abstractions/Codebase.js';
export * from './domain/core-abstractions/Project.js';
export * from './domain/core-abstractions/AnalysisSession.js';
export * from './domain/core-abstractions/Workspace.js';

// Base classes
export * from './domain/base/Entity.js';
export * from './domain/base/ValueObject.js';
export * from './domain/base/AggregateRoot.js';
export * from './domain/base/DomainEvent.js';

// Common patterns
export * from './domain/common/Result.js';
export * from './domain/common/Either.js';
export * from './domain/common/Specification.js';

// Infrastructure
export * from './infrastructure/Logger.js';
export * from './infrastructure/Cache.js';
export * from './infrastructure/Metrics.js';

// Configuration
export * from './configuration/ConfigSchema.js';
export * from './configuration/ConfigurationService.js';
export * from './configuration/PresetManager.js';
export * from './configuration/ConfigTransformer.js';
export * from './configuration/ConfigWatcher.js';

// Types
export * from './types/common.types.js';
export * from './types/errors.types.js';
export * from './types/api.types.js';
