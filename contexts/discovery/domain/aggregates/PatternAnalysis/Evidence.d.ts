import { Entity } from '@c3/shared';
export declare class Evidence extends Entity<string> {
    source: string;
    description: string;
    strength: number;
    metadata: Record<string, any>;
    constructor(id: string, source: string, description: string, strength: number, metadata?: Record<string, any>);
}
//# sourceMappingURL=Evidence.d.ts.map