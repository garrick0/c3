import { AggregateRoot } from '@c3/shared';
import { Evidence } from './Evidence.js';
import { PatternType } from './PatternType.js';

export class Pattern extends AggregateRoot<string> {
  private evidence: Evidence[] = [];

  constructor(
    id: string,
    public name: string,
    public type: PatternType,
    public description: string,
    public frequency: number
  ) {
    super(id);
  }

  addEvidence(evidence: Evidence): void {
    this.evidence.push(evidence);
  }

  getEvidence(): Evidence[] {
    return [...this.evidence];
  }

  getConfidence(): number {
    if (this.evidence.length === 0) return 0;
    return this.evidence.reduce((sum, e) => sum + e.strength, 0) / this.evidence.length;
  }
}
