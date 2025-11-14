/**
 * Parser factory for creating parser instances
 * Stub implementation
 */

export interface Parser {
  parse(source: string): any;
  supports(fileExtension: string): boolean;
}

export class ParserFactory {
  private parsers: Map<string, Parser> = new Map();

  /**
   * Register a parser for file extensions
   */
  register(extensions: string[], parser: Parser): void {
    for (const ext of extensions) {
      this.parsers.set(ext, parser);
    }
  }

  /**
   * Get parser for file extension
   * Stub: Returns from map or undefined
   */
  getParser(fileExtension: string): Parser | undefined {
    return this.parsers.get(fileExtension);
  }

  /**
   * Check if parser exists for extension
   */
  hasParser(fileExtension: string): boolean {
    return this.parsers.has(fileExtension);
  }

  /**
   * Get all supported extensions
   */
  getSupportedExtensions(): string[] {
    return Array.from(this.parsers.keys());
  }
}

/**
 * Create parser factory
 */
export function createParserFactory(): ParserFactory {
  return new ParserFactory();
}
