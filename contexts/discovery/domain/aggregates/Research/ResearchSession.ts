import { AggregateRoot } from '@c3/shared';
import { Query } from './Query.js';
import { Finding } from './Finding.js';

export class ResearchSession extends AggregateRoot<string> {
  private queries: Query[] = [];
  private findings: Finding[] = [];

  constructor(
    id: string,
    public readonly codebaseId: string,
    public readonly startedAt: Date = new Date()
  ) {
    super(id);
  }

  addQuery(query: Query): void {
    this.queries.push(query);
  }

  addFinding(finding: Finding): void {
    this.findings.push(finding);
  }

  getQueries(): Query[] {
    return [...this.queries];
  }

  getFindings(): Finding[] {
    return [...this.findings];
  }
}
