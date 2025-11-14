/**
 * Represents a codebase being analyzed
 * Core domain abstraction that ties together all analysis operations
 */

export interface CodebaseMetadata {
  languages: string[];
  totalFiles: number;
  totalLines: number;
  createdAt: Date;
  lastModified: Date;
}

export interface FileInfo {
  path: string;
  extension: string;
  size: number;
}

export class Codebase {
  constructor(
    public readonly id: string,
    public readonly rootPath: string,
    public readonly name: string,
    public readonly metadata: CodebaseMetadata
  ) {}

  /**
   * Get all files in the codebase
   * Stub: Returns mock file list
   */
  getFiles(): FileInfo[] {
    return [
      { path: `${this.rootPath}/src/index.ts`, extension: '.ts', size: 1024 },
      { path: `${this.rootPath}/src/domain/User.ts`, extension: '.ts', size: 2048 }
    ];
  }

  /**
   * Get total size of codebase
   * Stub: Returns mock size
   */
  getSize(): number {
    return this.metadata.totalLines;
  }

  /**
   * Get languages used in codebase
   * Stub: Returns metadata languages
   */
  getLanguages(): string[] {
    return this.metadata.languages;
  }

  /**
   * Check if file should be analyzed
   * Stub: Excludes node_modules and dist
   */
  shouldAnalyze(filePath: string): boolean {
    const excludePatterns = ['node_modules', 'dist', 'coverage', '.git'];
    return !excludePatterns.some(pattern => filePath.includes(pattern));
  }
}
