/**
 * Compliance routes
 */

import { Router } from 'express';
import { Container } from '../../../../wiring/Container.js';
import { TOKENS } from '../../../../wiring/dependencies.js';
import { createSuccessResponse, createErrorResponse } from '@c3/shared';

export function createComplianceRoutes(container: Container): Router {
  const router = Router();

  router.post('/check', async (req, res) => {
    try {
      const { graphId } = req.body;

      const parsingService = container.get(TOKENS.PARSING_SERVICE);
      const graph = await parsingService.getCachedGraph(graphId);

      if (!graph) {
        res.status(404).json(createErrorResponse('NOT_FOUND', 'Graph not found'));
        return;
      }

      const evaluationEngine = container.get(TOKENS.EVALUATION_ENGINE);
      const ruleManagement = container.get(TOKENS.RULE_MANAGEMENT_SERVICE);
      const ruleSets = await ruleManagement.getAllRuleSets();

      const report = await evaluationEngine.evaluate(graph, ruleSets);

      res.json(createSuccessResponse({
        reportId: report.id,
        summary: report.getSummary(),
        violations: report.getViolations().map(v => ({
          id: v.id,
          ruleId: v.ruleId,
          message: v.message,
          severity: v.severity,
          filePath: v.getFilePath()
        }))
      }));
    } catch (error) {
      res.status(500).json(createErrorResponse(
        'EVALUATION_ERROR',
        (error as Error).message
      ));
    }
  });

  router.get('/rules', async (req, res) => {
    try {
      const ruleManagement = container.get(TOKENS.RULE_MANAGEMENT_SERVICE);
      const ruleSets = await ruleManagement.getAllRuleSets();

      res.json(createSuccessResponse({
        ruleSets: ruleSets.map(rs => ({
          id: rs.id,
          name: rs.name,
          description: rs.description,
          source: rs.source,
          ruleCount: rs.getRuleCount()
        }))
      }));
    } catch (error) {
      res.status(500).json(createErrorResponse(
        'INTERNAL_ERROR',
        (error as Error).message
      ));
    }
  });

  return router;
}
