import { Request, Response } from 'express';
import { ProjectionEngine } from '../domain/services/ProjectionEngine.js';

export class ProjectionController {
  constructor(private projectionEngine: ProjectionEngine) {}

  async generateProjection(req: Request, res: Response): Promise<void> {
    res.json({ message: 'Projection generation endpoint' });
  }
}
