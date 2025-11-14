export class ClaudeLLMProvider {
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async analyze(prompt, context) {
        // Stub: Would call Claude API
        return {
            content: 'Mock analysis result',
            tokensUsed: 100,
            model: 'claude-3-sonnet'
        };
    }
    async complete(prompt) {
        return 'Mock completion';
    }
    async embed(text) {
        return [0.1, 0.2, 0.3];
    }
    getModelName() {
        return 'claude-3-sonnet-20240229';
    }
}
//# sourceMappingURL=ClaudeLLMProvider.js.map