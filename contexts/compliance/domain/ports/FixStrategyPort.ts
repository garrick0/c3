import { Fix } from '../aggregates/Remediation/Fix.js';

export interface FixStrategyPort {
  generateFix(violation: any): Promise<Fix | null>;
  applyFix(fix: Fix): Promise<boolean>;
}
