import { ResearchSession } from '../aggregates/Research/ResearchSession.js';
import { PropertyGraph } from '@c3/parsing';
import { LLMProvider } from '../ports/LLMProvider.js';
import { Logger } from '@c3/shared';

export class CodebaseResearcher {
  constructor(
    private llmProvider: LLMProvider,
    private logger: Logger
  ) {}

  async researchArchitecture(graph: PropertyGraph): Promise<ResearchSession> {
    this.logger.info('Researching codebase architecture');

    const session = new ResearchSession(
      `session-${Date.now()}`,
      graph.id
    );

    return session;
  }

  async findImplicitStandards(graph: PropertyGraph): Promise<string[]> {
    return [];
  }

  async gatherEvidence(pattern: string): Promise<any[]> {
    return [];
  }
}
