export interface ComplianceReportDto {
  reportId: string;
  codebaseId: string;
  summary: {
    totalViolations: number;
    errorCount: number;
    warningCount: number;
  };
  violations: Array<{
    id: string;
    ruleId: string;
    message: string;
    severity: string;
    filePath: string;
  }>;
}
