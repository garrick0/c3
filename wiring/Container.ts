/**
 * Manual Dependency Injection Container
 * Simple container for registering and resolving dependencies
 */

export type Factory<T> = () => T;
export type AsyncFactory<T> = () => Promise<T>;

interface ServiceDefinition<T> {
  factory: Factory<T> | AsyncFactory<T>;
  singleton: boolean;
  instance?: T;
}

export class Container {
  private services: Map<string, ServiceDefinition<any>> = new Map();

  /**
   * Register a transient service (new instance each time)
   */
  register<T>(token: string, factory: Factory<T>): void {
    this.services.set(token, {
      factory,
      singleton: false
    });
  }

  /**
   * Register an async transient service
   */
  registerAsync<T>(token: string, factory: AsyncFactory<T>): void {
    this.services.set(token, {
      factory,
      singleton: false
    });
  }

  /**
   * Register a singleton service (same instance always)
   */
  registerSingleton<T>(token: string, factory: Factory<T>): void {
    this.services.set(token, {
      factory,
      singleton: true
    });
  }

  /**
   * Register an async singleton service
   */
  registerAsyncSingleton<T>(token: string, factory: AsyncFactory<T>): void {
    this.services.set(token, {
      factory,
      singleton: true
    });
  }

  /**
   * Register an existing instance as a singleton
   */
  registerInstance<T>(token: string, instance: T): void {
    this.services.set(token, {
      factory: () => instance,
      singleton: true,
      instance
    });
  }

  /**
   * Resolve a service by token
   */
  get<T>(token: string): T {
    const definition = this.services.get(token);

    if (!definition) {
      throw new Error(`Service not found: ${token}`);
    }

    // Return existing singleton instance
    if (definition.singleton && definition.instance) {
      return definition.instance;
    }

    // Create new instance
    const instance = definition.factory() as T;

    // Store singleton instance
    if (definition.singleton) {
      definition.instance = instance;
    }

    return instance;
  }

  /**
   * Resolve an async service by token
   */
  async getAsync<T>(token: string): Promise<T> {
    const definition = this.services.get(token);

    if (!definition) {
      throw new Error(`Service not found: ${token}`);
    }

    // Return existing singleton instance
    if (definition.singleton && definition.instance) {
      return definition.instance;
    }

    // Create new instance
    const instance = await definition.factory();

    // Store singleton instance
    if (definition.singleton) {
      definition.instance = instance;
    }

    return instance;
  }

  /**
   * Check if a service is registered
   */
  has(token: string): boolean {
    return this.services.has(token);
  }

  /**
   * Clear all registrations
   */
  clear(): void {
    this.services.clear();
  }

  /**
   * Get all registered service tokens
   */
  getTokens(): string[] {
    return Array.from(this.services.keys());
  }

  /**
   * Create a child container that inherits from this one
   */
  createChild(): Container {
    const child = new Container();
    // Copy parent services
    for (const [token, definition] of this.services.entries()) {
      child.services.set(token, { ...definition });
    }
    return child;
  }
}

/**
 * Create a new container instance
 */
export function createContainer(): Container {
  return new Container();
}
