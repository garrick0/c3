import { ValueObject } from '@c3/shared';
export class ConfidenceScore extends ValueObject {
    constructor(props) {
        super(props);
    }
    static create(value) {
        if (value < 0 || value > 1) {
            throw new Error('Confidence score must be between 0 and 1');
        }
        return new ConfidenceScore({ value });
    }
    get value() {
        return this.props.value;
    }
    isHigh() {
        return this.value > 0.8;
    }
    isMedium() {
        return this.value >= 0.5 && this.value <= 0.8;
    }
    isLow() {
        return this.value < 0.5;
    }
    toPercentage() {
        return Math.round(this.value * 100);
    }
}
//# sourceMappingURL=ConfidenceScore.js.map