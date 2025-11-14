/**
 * Zod schema for architecture.config.ts validation
 */

import { z } from 'zod';

/**
 * Rule severity levels
 */
export const RuleSeveritySchema = z.enum(['error', 'warn', 'info']);

/**
 * Architecture style
 */
export const ArchitectureStyleSchema = z.enum([
  'clean',
  'layered',
  'modular',
  'microservices',
  'hexagonal'
]);

/**
 * Layer definition
 */
export const LayerSchema = z.object({
  name: z.string(),
  path: z.string()
});

/**
 * Architecture configuration
 */
export const ArchitectureConfigSchema = z.object({
  style: ArchitectureStyleSchema,
  layers: z.array(LayerSchema).optional()
});

/**
 * Custom rule condition
 */
export const RuleConditionSchema = z.object({
  type: z.string(),
  from: z.record(z.any()).optional(),
  to: z.record(z.any()).optional(),
  forbidden: z.boolean().optional()
});

/**
 * Custom rule definition
 */
export const CustomRuleSchema = z.object({
  name: z.string(),
  severity: RuleSeveritySchema,
  condition: RuleConditionSchema
});

/**
 * Whitelist entry
 */
export const WhitelistEntrySchema = z.object({
  rule: z.string(),
  path: z.string(),
  reason: z.string().optional()
});

/**
 * Discovery configuration
 */
export const DiscoveryConfigSchema = z.object({
  ignore: z.array(z.string()).optional(),
  hints: z.record(z.boolean()).optional()
});

/**
 * Main configuration schema
 */
export const ConfigSchema = z.object({
  version: z.string(),
  extends: z.array(z.string()).optional(),
  architecture: ArchitectureConfigSchema.optional(),
  rules: z.record(z.union([
    z.string(),
    z.array(z.union([z.string(), z.record(z.any())]))
  ])).optional(),
  whitelist: z.array(WhitelistEntrySchema).optional(),
  discovery: DiscoveryConfigSchema.optional()
});

/**
 * Inferred type from schema
 */
export type Config = z.infer<typeof ConfigSchema>;
export type RuleSeverity = z.infer<typeof RuleSeveritySchema>;
export type ArchitectureStyle = z.infer<typeof ArchitectureStyleSchema>;
export type Layer = z.infer<typeof LayerSchema>;
export type CustomRule = z.infer<typeof CustomRuleSchema>;
export type WhitelistEntry = z.infer<typeof WhitelistEntrySchema>;
export type DiscoveryConfig = z.infer<typeof DiscoveryConfigSchema>;
