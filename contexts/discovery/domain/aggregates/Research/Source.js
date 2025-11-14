import { ValueObject } from '@c3/shared';
export class Source extends ValueObject {
    constructor(props) {
        super(props);
    }
    static create(props) {
        return new Source(props);
    }
    get type() {
        return this.props.type;
    }
    get location() {
        return this.props.location;
    }
    get content() {
        return this.props.content;
    }
}
//# sourceMappingURL=Source.js.map