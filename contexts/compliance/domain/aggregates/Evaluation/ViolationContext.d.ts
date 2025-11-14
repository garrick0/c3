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
export declare class ViolationContext extends ValueObject<ViolationContextProps> {
    private constructor();
    static create(props: ViolationContextProps): ViolationContext;
    get filePath(): string;
    get lineNumber(): number | undefined;
    get columnNumber(): number | undefined;
    get codeSnippet(): string | undefined;
    get nodeId(): string | undefined;
    /**
     * Get location string
     */
    getLocation(): string;
    /**
     * Get additional info
     */
    getAdditionalInfo<T = any>(key: string): T | undefined;
}
//# sourceMappingURL=ViolationContext.d.ts.map