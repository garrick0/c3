export class CheckComplianceUseCase {
    evaluationEngine;
    ruleManagement;
    logger;
    constructor(evaluationEngine, ruleManagement, logger) {
        this.evaluationEngine = evaluationEngine;
        this.ruleManagement = ruleManagement;
        this.logger = logger;
    }
    async execute(graph) {
        this.logger.info('Checking compliance');
        const ruleSets = await this.ruleManagement.getAllRuleSets();
        return this.evaluationEngine.evaluate(graph, ruleSets);
    }
}
//# sourceMappingURL=CheckCompliance.js.map