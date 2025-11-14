import { Entity } from '@c3/shared';
export class Evidence extends Entity {
    source;
    description;
    strength;
    metadata;
    constructor(id, source, description, strength, metadata = {}) {
        super(id);
        this.source = source;
        this.description = description;
        this.strength = strength;
        this.metadata = metadata;
    }
}
//# sourceMappingURL=Evidence.js.map