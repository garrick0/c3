import { ValueObject } from '@c3/shared';

interface ConfidenceProps {
  value: number;
}

export class Confidence extends ValueObject<ConfidenceProps> {
  private constructor(props: ConfidenceProps) {
    super(props);
    if (props.value < 0 || props.value > 1) {
      throw new Error('Confidence must be between 0 and 1');
    }
  }

  static create(value: number): Confidence {
    return new Confidence({ value });
  }

  get value(): number {
    return this.props.value;
  }

  isHigh(): boolean {
    return this.value > 0.8;
  }

  isMedium(): boolean {
    return this.value >= 0.5 && this.value <= 0.8;
  }

  isLow(): boolean {
    return this.value < 0.5;
  }
}
