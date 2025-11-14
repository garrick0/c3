/**
 * Watch configuration files for changes
 * Stub implementation
 */

import type { Config } from './ConfigSchema.js';

export type ConfigChangeCallback = (config: Config) => void;

export class ConfigWatcher {
  private callbacks: ConfigChangeCallback[] = [];
  private watching = false;

  /**
   * Start watching configuration file
   * Stub: No-op for now
   */
  watch(configPath: string, callback: ConfigChangeCallback): () => void {
    this.callbacks.push(callback);
    this.watching = true;

    // Stub: Return cleanup function
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
      if (this.callbacks.length === 0) {
        this.watching = false;
      }
    };
  }

  /**
   * Manually trigger config change
   * Stub: For testing purposes
   */
  trigger(config: Config): void {
    for (const callback of this.callbacks) {
      callback(config);
    }
  }

  /**
   * Check if currently watching
   */
  isWatching(): boolean {
    return this.watching;
  }

  /**
   * Stop all watchers
   */
  stopAll(): void {
    this.callbacks = [];
    this.watching = false;
  }
}

/**
 * Create config watcher instance
 */
export function createConfigWatcher(): ConfigWatcher {
  return new ConfigWatcher();
}
