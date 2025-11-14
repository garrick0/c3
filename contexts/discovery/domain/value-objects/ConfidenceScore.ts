import { ValueObject } from '@c3/shared';

interface ConfidenceScoreProps {
  value: number;
}

export class ConfidenceScore extends ValueObject<ConfidenceScoreProps> {
  private constructor(props: ConfidenceScoreProps) {
    super(props);
  }

  static create(value: number): ConfidenceScore {
    if (value < 0 || value > 1) {
      throw new Error('Confidence score must be between 0 and 1');
    }
    return new ConfidenceScore({ value });
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

  toPercentage(): number {
    return Math.round(this.value * 100);
  }
}
