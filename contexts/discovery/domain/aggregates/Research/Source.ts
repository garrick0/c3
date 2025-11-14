import { ValueObject } from '@c3/shared';

interface SourceProps {
  type: 'readme' | 'config' | 'code' | 'comment' | 'documentation';
  location: string;
  content: string;
}

export class Source extends ValueObject<SourceProps> {
  private constructor(props: SourceProps) {
    super(props);
  }

  static create(props: SourceProps): Source {
    return new Source(props);
  }

  get type(): string {
    return this.props.type;
  }

  get location(): string {
    return this.props.location;
  }

  get content(): string {
    return this.props.content;
  }
}
