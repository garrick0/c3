/**
 * Base ValueObject class
 * Value objects are immutable and compared by value, not identity
 */

export abstract class ValueObject<T> {
  protected readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  /**
   * Equality based on value comparison
   */
  equals(vo?: ValueObject<T>): boolean {
    if (!vo) return false;
    if (this === vo) return true;
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }

  /**
   * Get props (read-only)
   */
  getValue(): T {
    return this.props;
  }
}
