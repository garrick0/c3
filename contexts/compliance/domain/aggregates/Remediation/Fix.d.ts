/**
 * Fix - Individual fix action
 */
import { Entity } from '@c3/shared';
import { FixType } from '../../value-objects/FixType.js';
export declare class Fix extends Entity<string> {
    readonly type: FixType;
    readonly description: string;
    readonly filePath: string;
    readonly canAutoApply: boolean;
    readonly metadata: Record<string, any>;
    constructor(id: string, type: FixType, description: string, filePath: string, canAutoApply: boolean, metadata?: Record<string, any>);
    /**
     * Check if this is a rename fix
     */
    isRename(): boolean;
    /**
     * Check if this is a move fix
     */
    isMove(): boolean;
    /**
     * Check if this is a refactor fix
     */
    isRefactor(): boolean;
    /**
     * Get fix summary
     */
    getSummary(): string;
}
//# sourceMappingURL=Fix.d.ts.map