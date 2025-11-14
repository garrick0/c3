import { Entity } from '@c3/shared';
export class Example extends Entity {
    filePath;
    codeSnippet;
    explanation;
    constructor(id, filePath, codeSnippet, explanation) {
        super(id);
        this.filePath = filePath;
        this.codeSnippet = codeSnippet;
        this.explanation = explanation;
    }
}
//# sourceMappingURL=Example.js.map