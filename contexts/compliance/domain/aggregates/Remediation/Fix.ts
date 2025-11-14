/**
 * Fix - Individual fix action
 */

import { Entity } from '@c3/shared';
import { FixType } from '../../value-objects/FixType.js';

export class Fix extends Entity<string> {
  constructor(
    id: string,
    public readonly type: FixType,
    public readonly description: string,
    public readonly filePath: string,
    public readonly canAutoApply: boolean,
    public readonly metadata: Record<string, any> = {}
  ) {
    super(id);
  }

  /**
   * Check if this is a rename fix
   */
  isRename(): boolean {
    return this.type === FixType.RENAME;
  }

  /**
   * Check if this is a move fix
   */
  isMove(): boolean {
    return this.type === FixType.MOVE;
  }

  /**
   * Check if this is a refactor fix
   */
  isRefactor(): boolean {
    return this.type === FixType.REFACTOR;
  }

  /**
   * Get fix summary
   */
  getSummary(): string {
    return `${this.type}: ${this.description} (${this.filePath})`;
  }
}
