import { Evidence } from '../aggregates/PatternAnalysis/Evidence.js';
import { Pattern } from '../aggregates/PatternAnalysis/Pattern.js';

export interface EvidenceCollector {
  collect(pattern: Pattern): Promise<Evidence[]>;
  rank(evidence: Evidence[]): Evidence[];
}
