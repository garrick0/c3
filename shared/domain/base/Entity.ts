/**
 * Base Entity class
 * All domain entities should extend this class
 */

export abstract class Entity<T> {
  protected readonly _id: T;

  constructor(id: T) {
    this._id = id;
  }

  get id(): T {
    return this._id;
  }

  /**
   * Equality based on ID
   */
  equals(entity?: Entity<T>): boolean {
    if (!entity) return false;
    if (this === entity) return true;
    return this._id === entity._id;
  }

  /**
   * String representation
   */
  toString(): string {
    return `${this.constructor.name}(${this._id})`;
  }
}
