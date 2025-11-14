import { ValueObject } from '@c3/shared';
interface ConfidenceScoreProps {
    value: number;
}
export declare class ConfidenceScore extends ValueObject<ConfidenceScoreProps> {
    private constructor();
    static create(value: number): ConfidenceScore;
    get value(): number;
    isHigh(): boolean;
    isMedium(): boolean;
    isLow(): boolean;
    toPercentage(): number;
}
export {};
//# sourceMappingURL=ConfidenceScore.d.ts.map