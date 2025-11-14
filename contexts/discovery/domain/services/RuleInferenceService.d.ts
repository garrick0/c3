import { CandidateRule } from '../aggregates/RuleInference/CandidateRule.js';
import { Pattern } from '../aggregates/PatternAnalysis/Pattern.js';
import { LLMProvider } from '../ports/LLMProvider.js';
import { Logger } from '@c3/shared';
export declare class RuleInferenceService {
    private llmProvider;
    private logger;
    constructor(llmProvider: LLMProvider, logger: Logger);
    inferRules(patterns: Pattern[]): Promise<CandidateRule[]>;
    private inferFromPattern;
    generateRuleConditions(pattern: Pattern): Promise<any>;
    calculateConfidence(pattern: Pattern): number;
}
//# sourceMappingURL=RuleInferenceService.d.ts.map