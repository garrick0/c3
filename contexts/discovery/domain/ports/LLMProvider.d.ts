export interface LLMResponse {
    content: string;
    tokensUsed: number;
    model: string;
}
export interface LLMProvider {
    analyze(prompt: string, context: Record<string, any>): Promise<LLMResponse>;
    complete(prompt: string): Promise<string>;
    embed(text: string): Promise<number[]>;
    getModelName(): string;
}
//# sourceMappingURL=LLMProvider.d.ts.map