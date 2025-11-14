/**
 * Cache abstraction for caching parsed graphs and analysis results
 * Stub implementation using in-memory Map
 */

export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
}

export interface CacheEntry<T> {
  value: T;
  expiresAt?: number;
}

export class Cache {
  private store: Map<string, CacheEntry<any>> = new Map();
  private defaultTTL: number;

  constructor(defaultTTL: number = 3600000) { // Default 1 hour
    this.defaultTTL = defaultTTL;
  }

  /**
   * Get value from cache
   * Stub: Returns from Map if not expired
   */
  get<T>(key: string): T | undefined {
    const entry = this.store.get(key);

    if (!entry) return undefined;

    // Check expiration
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Set value in cache
   * Stub: Stores in Map with expiration
   */
  set<T>(key: string, value: T, options?: CacheOptions): void {
    const ttl = options?.ttl ?? this.defaultTTL;
    const expiresAt = ttl > 0 ? Date.now() + ttl : undefined;

    this.store.set(key, {
      value,
      expiresAt
    });
  }

  /**
   * Delete value from cache
   * Stub: Removes from Map
   */
  delete(key: string): void {
    this.store.delete(key);
  }

  /**
   * Clear entire cache
   * Stub: Clears Map
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Check if key exists and is not expired
   * Stub: Checks Map and expiration
   */
  has(key: string): boolean {
    const entry = this.store.get(key);

    if (!entry) return false;

    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Get cache statistics
   * Stub: Returns Map size
   */
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.store.size,
      keys: Array.from(this.store.keys())
    };
  }
}

/**
 * Create a cache instance
 */
export function createCache(defaultTTL?: number): Cache {
  return new Cache(defaultTTL);
}
