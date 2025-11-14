import { ValueObject } from '@c3/shared';
export class Confidence extends ValueObject {
    constructor(props) {
        super(props);
        if (props.value < 0 || props.value > 1) {
            throw new Error('Confidence must be between 0 and 1');
        }
    }
    static create(value) {
        return new Confidence({ value });
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
}
//# sourceMappingURL=Confidence.js.map