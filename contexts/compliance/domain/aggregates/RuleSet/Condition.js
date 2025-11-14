/**
 * Condition - Rule condition definition
 */
import { ValueObject } from '@c3/shared';
export class Condition extends ValueObject {
    constructor(props) {
        super(props);
    }
    static create(type, parameters = {}) {
        return new Condition({ type, parameters });
    }
    /**
     * Get condition type
     */
    getType() {
        return this.props.type;
    }
    /**
     * Get parameters
     */
    getParameters() {
        return { ...this.props.parameters };
    }
    /**
     * Get specific parameter
     */
    getParameter(key, defaultValue) {
        return this.props.parameters[key] ?? defaultValue;
    }
    /**
     * Check if parameter exists
     */
    hasParameter(key) {
        return key in this.props.parameters;
    }
    /**
     * Serialize to JSON
     */
    toJSON() {
        return {
            type: this.props.type,
            parameters: { ...this.props.parameters }
        };
    }
}
//# sourceMappingURL=Condition.js.map