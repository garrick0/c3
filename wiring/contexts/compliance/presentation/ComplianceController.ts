import { Request, Response } from 'express';
import { EvaluationEngine } from '../domain/services/EvaluationEngine.js';

export class ComplianceController {
  constructor(private evaluationEngine: EvaluationEngine) {}

  async checkCompliance(req: Request, res: Response): Promise<void> {
    res.json({ message: 'Compliance check endpoint' });
  }
}
