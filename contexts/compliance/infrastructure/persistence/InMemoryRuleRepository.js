export class InMemoryRuleRepository {
    ruleSets = new Map();
    async saveRuleSet(ruleSet) {
        this.ruleSets.set(ruleSet.id, ruleSet);
    }
    async findRuleSetById(id) {
        return this.ruleSets.get(id);
    }
    async listRuleSets() {
        return Array.from(this.ruleSets.values());
    }
    async deleteRuleSet(id) {
        this.ruleSets.delete(id);
    }
}
//# sourceMappingURL=InMemoryRuleRepository.js.map