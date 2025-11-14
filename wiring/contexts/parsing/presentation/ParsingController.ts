import { Request, Response } from 'express';
import { ParsingService } from '../domain/services/ParsingService.js';

export class ParsingController {
  constructor(private parsingService: ParsingService) {}

  async parseCodebase(req: Request, res: Response): Promise<void> {
    const { rootPath } = req.body;
    const graph = await this.parsingService.parseCodebase(rootPath);
    res.json({ graphId: graph.id, nodeCount: graph.getNodeCount() });
  }
}
