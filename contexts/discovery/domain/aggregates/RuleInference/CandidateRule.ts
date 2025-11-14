import { AggregateRoot } from '@c3/shared';
import { Confidence } from './Confidence.js';
import { Rationale } from './Rationale.js';
import { Example } from './Example.js';

export class CandidateRule extends AggregateRoot<string> {
  private rationales: Rationale[] = [];
  private examples: Example[] = [];

  constructor(
    id: string,
    public name: string,
    public description: string,
    public confidence: Confidence,
    public suggestedSeverity: 'error' | 'warning' | 'info'
  ) {
    super(id);
  }

  addRationale(rationale: Rationale): void {
    this.rationales.push(rationale);
  }

  addExample(example: Example): void {
    this.examples.push(example);
  }

  getRationales(): Rationale[] {
    return [...this.rationales];
  }

  getExamples(): Example[] {
    return [...this.examples];
  }

  isHighConfidence(): boolean {
    return this.confidence.value > 0.8;
  }
}
