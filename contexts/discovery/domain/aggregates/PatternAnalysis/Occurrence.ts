import { ValueObject } from '@c3/shared';

interface OccurrenceProps {
  filePath: string;
  lineNumber?: number;
  context?: string;
}

export class Occurrence extends ValueObject<OccurrenceProps> {
  private constructor(props: OccurrenceProps) {
    super(props);
  }

  static create(props: OccurrenceProps): Occurrence {
    return new Occurrence(props);
  }

  get filePath(): string {
    return this.props.filePath;
  }

  get lineNumber(): number | undefined {
    return this.props.lineNumber;
  }
}
