import { ValueObject } from '@c3/shared';

interface PatternFrequencyProps {
  occurrences: number;
  totalFiles: number;
}

export class PatternFrequency extends ValueObject<PatternFrequencyProps> {
  private constructor(props: PatternFrequencyProps) {
    super(props);
  }

  static create(occurrences: number, totalFiles: number): PatternFrequency {
    return new PatternFrequency({ occurrences, totalFiles });
  }

  getPercentage(): number {
    return this.props.totalFiles > 0
      ? (this.props.occurrences / this.props.totalFiles) * 100
      : 0;
  }

  isCommon(): boolean {
    return this.getPercentage() > 75;
  }

  isRare(): boolean {
    return this.getPercentage() < 25;
  }
}
