import { CandidateRule } from '../../domain/aggregates/RuleInference/CandidateRule.js';
import { RuleInferenceService } from '../../domain/services/RuleInferenceService.js';
import { Pattern } from '../../domain/aggregates/PatternAnalysis/Pattern.js';
import { Logger } from '@c3/shared';

export class InferRulesUseCase {
  constructor(
    private ruleInference: RuleInferenceService,
    private logger: Logger
  ) {}

  async execute(patterns: Pattern[]): Promise<CandidateRule[]> {
    this.logger.info('Inferring rules from patterns');
    return this.ruleInference.inferRules(patterns);
  }
}
