export interface PatternReportDto {
  patterns: Array<{
    id: string;
    name: string;
    type: string;
    confidence: number;
    frequency: number;
  }>;
  summary: {
    totalPatterns: number;
    highConfidenceCount: number;
  };
}
