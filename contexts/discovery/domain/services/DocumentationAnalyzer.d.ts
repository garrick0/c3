import { Logger } from '@c3/shared';
export interface DocumentationInsight {
    type: 'architecture' | 'standard' | 'decision';
    content: string;
    source: string;
    confidence: number;
}
export declare class DocumentationAnalyzer {
    private logger;
    constructor(logger: Logger);
    analyzeReadme(readmeContent: string): Promise<DocumentationInsight[]>;
    analyzeComments(codeFiles: string[]): Promise<DocumentationInsight[]>;
    analyzeCommitMessages(commits: string[]): Promise<DocumentationInsight[]>;
    extractArchitecturalDecisions(docs: string[]): Promise<DocumentationInsight[]>;
}
//# sourceMappingURL=DocumentationAnalyzer.d.ts.map