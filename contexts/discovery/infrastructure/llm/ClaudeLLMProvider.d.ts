import { LLMProvider, LLMResponse } from '../../domain/ports/LLMProvider.js';
export declare class ClaudeLLMProvider implements LLMProvider {
    private apiKey;
    constructor(apiKey: string);
    analyze(prompt: string, context: Record<string, any>): Promise<LLMResponse>;
    complete(prompt: string): Promise<string>;
    embed(text: string): Promise<number[]>;
    getModelName(): string;
}
//# sourceMappingURL=ClaudeLLMProvider.d.ts.map