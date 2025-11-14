/**
 * RuleId - Value object for rule identifiers
 */

import { ValueObject } from '@c3/shared';

interface RuleIdProps {
  value: string;
}

export class RuleId extends ValueObject<RuleIdProps> {
  private constructor(props: RuleIdProps) {
    super(props);
  }

  static create(value: string): RuleId {
    if (!value || value.trim().length === 0) {
      throw new Error('RuleId cannot be empty');
    }

    return new RuleId({ value: value.trim() });
  }

  get value(): string {
    return this.props.value;
  }

  toString(): string {
    return this.props.value;
  }
}
