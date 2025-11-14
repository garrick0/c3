/**
 * Condition - Rule condition definition
 */

import { ValueObject } from '@c3/shared';

export interface ConditionProps {
  type: string;
  parameters: Record<string, any>;
}

export class Condition extends ValueObject<ConditionProps> {
  private constructor(props: ConditionProps) {
    super(props);
  }

  static create(type: string, parameters: Record<string, any> = {}): Condition {
    return new Condition({ type, parameters });
  }

  /**
   * Get condition type
   */
  getType(): string {
    return this.props.type;
  }

  /**
   * Get parameters
   */
  getParameters(): Record<string, any> {
    return { ...this.props.parameters };
  }

  /**
   * Get specific parameter
   */
  getParameter<T = any>(key: string, defaultValue?: T): T | undefined {
    return this.props.parameters[key] ?? defaultValue;
  }

  /**
   * Check if parameter exists
   */
  hasParameter(key: string): boolean {
    return key in this.props.parameters;
  }

  /**
   * Serialize to JSON
   */
  toJSON(): ConditionProps {
    return {
      type: this.props.type,
      parameters: { ...this.props.parameters }
    };
  }
}
