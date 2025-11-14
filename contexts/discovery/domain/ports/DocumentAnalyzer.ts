export interface DocumentInsight {
  type: string;
  content: string;
  confidence: number;
}

export interface DocumentAnalyzer {
  analyze(content: string): Promise<DocumentInsight[]>;
  supports(documentType: string): boolean;
}
