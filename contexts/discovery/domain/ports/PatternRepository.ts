import { Pattern } from '../aggregates/PatternAnalysis/Pattern.js';

export interface PatternRepository {
  save(pattern: Pattern): Promise<void>;
  findById(id: string): Promise<Pattern | undefined>;
  findByCodebaseId(codebaseId: string): Promise<Pattern[]>;
  delete(id: string): Promise<void>;
  list(): Promise<Pattern[]>;
}
