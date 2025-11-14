import { RuleRepository } from '../../domain/ports/RuleRepository.js';
import { RuleSet } from '../../domain/aggregates/RuleSet/RuleSet.js';
export declare class InMemoryRuleRepository implements RuleRepository {
    private ruleSets;
    saveRuleSet(ruleSet: RuleSet): Promise<void>;
    findRuleSetById(id: string): Promise<RuleSet | undefined>;
    listRuleSets(): Promise<RuleSet[]>;
    deleteRuleSet(id: string): Promise<void>;
}
//# sourceMappingURL=InMemoryRuleRepository.d.ts.map