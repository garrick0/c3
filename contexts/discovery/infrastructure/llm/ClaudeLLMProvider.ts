import { LLMProvider, LLMResponse } from '../../domain/ports/LLMProvider.js';

export class ClaudeLLMProvider implements LLMProvider {
  constructor(private apiKey: string) {}

  async analyze(prompt: string, context: Record<string, any>): Promise<LLMResponse> {
    // Stub: Would call Claude API
    return {
      content: 'Mock analysis result',
      tokensUsed: 100,
      model: 'claude-3-sonnet'
    };
  }

  async complete(prompt: string): Promise<string> {
    return 'Mock completion';
  }

  async embed(text: string): Promise<number[]> {
    return [0.1, 0.2, 0.3];
  }

  getModelName(): string {
    return 'claude-3-sonnet-20240229';
  }
}
