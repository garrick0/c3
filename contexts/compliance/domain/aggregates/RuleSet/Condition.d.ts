/**
 * Condition - Rule condition definition
 */
import { ValueObject } from '@c3/shared';
export interface ConditionProps {
    type: string;
    parameters: Record<string, any>;
}
export declare class Condition extends ValueObject<ConditionProps> {
    private constructor();
    static create(type: string, parameters?: Record<string, any>): Condition;
    /**
     * Get condition type
     */
    getType(): string;
    /**
     * Get parameters
     */
    getParameters(): Record<string, any>;
    /**
     * Get specific parameter
     */
    getParameter<T = any>(key: string, defaultValue?: T): T | undefined;
    /**
     * Check if parameter exists
     */
    hasParameter(key: string): boolean;
    /**
     * Serialize to JSON
     */
    toJSON(): ConditionProps;
}
//# sourceMappingURL=Condition.d.ts.map