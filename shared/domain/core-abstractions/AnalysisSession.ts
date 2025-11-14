/**
 * AnalysisSession - Represents a single analysis run
 * Tracks the lifecycle and results of an analysis operation
 */

import { Project } from './Project.js';

export type SessionStatus =
  | 'pending'
  | 'parsing'
  | 'evaluating'
  | 'completed'
  | 'failed'
  | 'aborted';

export interface SessionMetadata {
  startedBy?: string;
  triggeredBy: 'cli' | 'api' | 'scheduled';
  environment: string;
}

export class AnalysisSession {
  private violations: any[] = [];
  private _completedAt?: Date;
  private _failureReason?: string;

  constructor(
    public readonly id: string,
    public readonly project: Project,
    public readonly startedAt: Date,
    public status: SessionStatus,
    public readonly metadata: SessionMetadata
  ) {}

  /**
   * Record a violation found during analysis
   * Stub: Adds to in-memory array
   */
  recordViolation(violation: any): void {
    this.violations.push(violation);
  }

  /**
   * Get all recorded violations
   * Stub: Returns array copy
   */
  getViolations(): any[] {
    return [...this.violations];
  }

  /**
   * Mark session as completed
   * Stub: Updates status and timestamp
   */
  complete(report: any): void {
    this.status = 'completed';
    this._completedAt = new Date();
  }

  /**
   * Abort the session with reason
   * Stub: Updates status and records reason
   */
  abort(reason: string): void {
    this.status = 'aborted';
    this._failureReason = reason;
    this._completedAt = new Date();
  }

  /**
   * Mark session as failed
   * Stub: Updates status
   */
  fail(reason: string): void {
    this.status = 'failed';
    this._failureReason = reason;
    this._completedAt = new Date();
  }

  /**
   * Get session duration in milliseconds
   * Stub: Calculates time difference
   */
  getDuration(): number | undefined {
    if (!this._completedAt) return undefined;
    return this._completedAt.getTime() - this.startedAt.getTime();
  }

  /**
   * Get failure reason if session failed/aborted
   */
  getFailureReason(): string | undefined {
    return this._failureReason;
  }

  /**
   * Check if session is complete
   */
  isComplete(): boolean {
    return this.status === 'completed' || this.status === 'failed' || this.status === 'aborted';
  }
}
