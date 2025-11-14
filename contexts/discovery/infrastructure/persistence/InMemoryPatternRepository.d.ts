import { PatternRepository } from '../../domain/ports/PatternRepository.js';
import { Pattern } from '../../domain/aggregates/PatternAnalysis/Pattern.js';
export declare class InMemoryPatternRepository implements PatternRepository {
    private patterns;
    save(pattern: Pattern): Promise<void>;
    findById(id: string): Promise<Pattern | undefined>;
    findByCodebaseId(codebaseId: string): Promise<Pattern[]>;
    delete(id: string): Promise<void>;
    list(): Promise<Pattern[]>;
}
//# sourceMappingURL=InMemoryPatternRepository.d.ts.map