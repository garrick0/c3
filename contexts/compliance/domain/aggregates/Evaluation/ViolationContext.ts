/**
 * ViolationContext - Detailed context about where violation occurred
 */

import { ValueObject } from '@c3/shared';

export interface ViolationContextProps {
  filePath: string;
  lineNumber?: number;
  columnNumber?: number;
  codeSnippet?: string;
  nodeId?: string;
  additionalInfo?: Record<string, any>;
}

export class ViolationContext extends ValueObject<ViolationContextProps> {
  private constructor(props: ViolationContextProps) {
    super(props);
  }

  static create(props: ViolationContextProps): ViolationContext {
    return new ViolationContext(props);
  }

  get filePath(): string {
    return this.props.filePath;
  }

  get lineNumber(): number | undefined {
    return this.props.lineNumber;
  }

  get columnNumber(): number | undefined {
    return this.props.columnNumber;
  }

  get codeSnippet(): string | undefined {
    return this.props.codeSnippet;
  }

  get nodeId(): string | undefined {
    return this.props.nodeId;
  }

  /**
   * Get location string
   */
  getLocation(): string {
    let location = this.props.filePath;

    if (this.props.lineNumber !== undefined) {
      location += `:${this.props.lineNumber}`;

      if (this.props.columnNumber !== undefined) {
        location += `:${this.props.columnNumber}`;
      }
    }

    return location;
  }

  /**
   * Get additional info
   */
  getAdditionalInfo<T = any>(key: string): T | undefined {
    return this.props.additionalInfo?.[key];
  }
}
