import { PatternRepository } from '../../domain/ports/PatternRepository.js';
import { Pattern } from '../../domain/aggregates/PatternAnalysis/Pattern.js';

export class InMemoryPatternRepository implements PatternRepository {
  private patterns = new Map<string, Pattern>();

  async save(pattern: Pattern): Promise<void> {
    this.patterns.set(pattern.id, pattern);
  }

  async findById(id: string): Promise<Pattern | undefined> {
    return this.patterns.get(id);
  }

  async findByCodebaseId(codebaseId: string): Promise<Pattern[]> {
    return Array.from(this.patterns.values());
  }

  async delete(id: string): Promise<void> {
    this.patterns.delete(id);
  }

  async list(): Promise<Pattern[]> {
    return Array.from(this.patterns.values());
  }
}
