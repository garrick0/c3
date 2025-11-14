import { ValueObject } from '@c3/shared';
interface SourceProps {
    type: 'readme' | 'config' | 'code' | 'comment' | 'documentation';
    location: string;
    content: string;
}
export declare class Source extends ValueObject<SourceProps> {
    private constructor();
    static create(props: SourceProps): Source;
    get type(): string;
    get location(): string;
    get content(): string;
}
export {};
//# sourceMappingURL=Source.d.ts.map