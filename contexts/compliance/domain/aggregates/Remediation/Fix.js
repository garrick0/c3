/**
 * Fix - Individual fix action
 */
import { Entity } from '@c3/shared';
import { FixType } from '../../value-objects/FixType.js';
export class Fix extends Entity {
    type;
    description;
    filePath;
    canAutoApply;
    metadata;
    constructor(id, type, description, filePath, canAutoApply, metadata = {}) {
        super(id);
        this.type = type;
        this.description = description;
        this.filePath = filePath;
        this.canAutoApply = canAutoApply;
        this.metadata = metadata;
    }
    /**
     * Check if this is a rename fix
     */
    isRename() {
        return this.type === FixType.RENAME;
    }
    /**
     * Check if this is a move fix
     */
    isMove() {
        return this.type === FixType.MOVE;
    }
    /**
     * Check if this is a refactor fix
     */
    isRefactor() {
        return this.type === FixType.REFACTOR;
    }
    /**
     * Get fix summary
     */
    getSummary() {
        return `${this.type}: ${this.description} (${this.filePath})`;
    }
}
//# sourceMappingURL=Fix.js.map