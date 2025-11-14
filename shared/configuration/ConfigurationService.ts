/**
 * Configuration service for loading and validating architecture.config.ts
 */

import { ConfigSchema, type Config } from './ConfigSchema.js';
import { Result } from '../domain/common/Result.js';
import { ConfigError } from '../types/errors.types.js';

export class ConfigurationService {
  private currentConfig?: Config;

  /**
   * Load configuration from file path
   * Stub: Returns mock configuration
   */
  async load(configPath: string = './architecture.config.ts'): Promise<Result<Config, ConfigError>> {
    try {
      // Stub: Return mock config instead of actually loading
      const mockConfig: Config = {
        version: '1.0',
        extends: ['@c3/recommended'],
        architecture: {
          style: 'clean',
          layers: [
            { name: 'domain', path: 'src/domain' },
            { name: 'application', path: 'src/application' },
            { name: 'infrastructure', path: 'src/infrastructure' }
          ]
        },
        rules: {
          'no-circular-dependencies': 'error',
          'consistent-naming': ['error', { style: 'kebab-case' }]
        }
      };

      const validated = this.validate(mockConfig);

      if (validated.isSuccess) {
        this.currentConfig = validated.value;
        return Result.ok(validated.value) as Result<Config, ConfigError>;
      }

      return validated;
    } catch (error) {
      const configError = new ConfigError(
        `Failed to load configuration from ${configPath}`,
        { error: error instanceof Error ? error.message : String(error) }
      );
      return Result.fail(configError) as Result<Config, ConfigError>;
    }
  }

  /**
   * Validate configuration against schema
   * Uses Zod for validation
   */
  validate(config: unknown): Result<Config, ConfigError> {
    try {
      const validated = ConfigSchema.parse(config);
      return Result.ok(validated) as Result<Config, ConfigError>;
    } catch (error: any) {
      const configError = new ConfigError('Invalid configuration', {
        validationErrors: error.errors
      });
      return Result.fail(configError) as Result<Config, ConfigError>;
    }
  }

  /**
   * Get current loaded configuration
   */
  getCurrent(): Config | undefined {
    return this.currentConfig;
  }

  /**
   * Watch configuration file for changes
   * Stub: No-op for now
   */
  watch(callback: (config: Config) => void): () => void {
    // Stub: Return empty cleanup function
    return () => {};
  }

  /**
   * Reload configuration
   */
  async reload(configPath?: string): Promise<Result<Config, ConfigError>> {
    return this.load(configPath);
  }
}

/**
 * Create configuration service instance
 */
export function createConfigurationService(): ConfigurationService {
  return new ConfigurationService();
}
