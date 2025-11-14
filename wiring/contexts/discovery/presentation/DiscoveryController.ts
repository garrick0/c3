import { Request, Response } from 'express';
import { PatternDetectionService } from '../domain/services/PatternDetectionService.js';

export class DiscoveryController {
  constructor(private patternDetection: PatternDetectionService) {}

  async discoverPatterns(req: Request, res: Response): Promise<void> {
    res.json({ message: 'Pattern discovery endpoint' });
  }
}
