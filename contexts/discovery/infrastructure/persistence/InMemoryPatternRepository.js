export class InMemoryPatternRepository {
    patterns = new Map();
    async save(pattern) {
        this.patterns.set(pattern.id, pattern);
    }
    async findById(id) {
        return this.patterns.get(id);
    }
    async findByCodebaseId(codebaseId) {
        return Array.from(this.patterns.values());
    }
    async delete(id) {
        this.patterns.delete(id);
    }
    async list() {
        return Array.from(this.patterns.values());
    }
}
//# sourceMappingURL=InMemoryPatternRepository.js.map