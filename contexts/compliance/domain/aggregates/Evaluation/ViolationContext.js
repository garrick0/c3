/**
 * ViolationContext - Detailed context about where violation occurred
 */
import { ValueObject } from '@c3/shared';
export class ViolationContext extends ValueObject {
    constructor(props) {
        super(props);
    }
    static create(props) {
        return new ViolationContext(props);
    }
    get filePath() {
        return this.props.filePath;
    }
    get lineNumber() {
        return this.props.lineNumber;
    }
    get columnNumber() {
        return this.props.columnNumber;
    }
    get codeSnippet() {
        return this.props.codeSnippet;
    }
    get nodeId() {
        return this.props.nodeId;
    }
    /**
     * Get location string
     */
    getLocation() {
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
    getAdditionalInfo(key) {
        return this.props.additionalInfo?.[key];
    }
}
//# sourceMappingURL=ViolationContext.js.map