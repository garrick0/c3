/**
 * Preset manager for loading and merging preset rule sets
 */

import type { Config } from './ConfigSchema.js';

export interface Preset {
  name: string;
  config: Partial<Config>;
}

export class PresetManager {
  private presets: Map<string, Preset> = new Map();

  constructor() {
    this.registerDefaultPresets();
  }

  /**
   * Register default presets
   * Stub: Adds recommended preset
   */
  private registerDefaultPresets(): void {
    this.register({
      name: '@c3/recommended',
      config: {
        rules: {
          'no-circular-dependencies': 'error',
          'consistent-naming': 'warn',
          'no-dead-code': 'warn'
        }
      }
    });

    this.register({
      name: '@c3/strict',
      config: {
        rules: {
          'no-circular-dependencies': 'error',
          'consistent-naming': 'error',
          'no-dead-code': 'error',
          'layer-dependencies': 'error'
        }
      }
    });
  }

  /**
   * Register a preset
   */
  register(preset: Preset): void {
    this.presets.set(preset.name, preset);
  }

  /**
   * Load a preset by name
   * Stub: Returns from Map
   */
  load(name: string): Preset | undefined {
    return this.presets.get(name);
  }

  /**
   * Merge multiple presets into a single configuration
   * Stub: Simple object merging
   */
  merge(presetNames: string[]): Partial<Config> {
    const merged: Partial<Config> = {
      rules: {}
    };

    for (const name of presetNames) {
      const preset = this.load(name);
      if (preset) {
        if (preset.config.rules) {
          merged.rules = { ...merged.rules, ...preset.config.rules };
        }
      }
    }

    return merged;
  }

  /**
   * Get all available preset names
   */
  list(): string[] {
    return Array.from(this.presets.keys());
  }
}

/**
 * Create preset manager instance
 */
export function createPresetManager(): PresetManager {
  return new PresetManager();
}
