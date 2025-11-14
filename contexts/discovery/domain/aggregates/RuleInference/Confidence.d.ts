import { ValueObject } from '@c3/shared';
interface ConfidenceProps {
    value: number;
}
export declare class Confidence extends ValueObject<ConfidenceProps> {
    private constructor();
    static create(value: number): Confidence;
    get value(): number;
    isHigh(): boolean;
    isMedium(): boolean;
    isLow(): boolean;
}
export {};
//# sourceMappingURL=Confidence.d.ts.map