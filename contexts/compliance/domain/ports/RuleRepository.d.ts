import { RuleSet } from '../aggregates/RuleSet/RuleSet.js';
export interface RuleRepository {
    saveRuleSet(ruleSet: RuleSet): Promise<void>;
    findRuleSetById(id: string): Promise<RuleSet | undefined>;
    listRuleSets(): Promise<RuleSet[]>;
    deleteRuleSet(id: string): Promise<void>;
}
//# sourceMappingURL=RuleRepository.d.ts.map