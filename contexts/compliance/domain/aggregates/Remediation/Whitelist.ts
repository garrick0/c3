/**
 * Whitelist - Accepted violations that should be ignored
 */

import { Entity } from '@c3/shared';

export interface WhitelistReason {
  reason: string;
  createdBy: string;
  createdAt: Date;
  expiresAt?: Date;
}

export class Whitelist extends Entity<string> {
  private entries: Map<string, WhitelistReason> = new Map();

  constructor(id: string) {
    super(id);
  }

  /**
   * Add violation to whitelist
   */
  add(
    violationPattern: string,
    reason: string,
    createdBy: string,
    expiresAt?: Date
  ): void {
    this.entries.set(violationPattern, {
      reason,
      createdBy,
      createdAt: new Date(),
      expiresAt
    });
  }

  /**
   * Remove from whitelist
   */
  remove(violationPattern: string): void {
    this.entries.delete(violationPattern);
  }

  /**
   * Check if violation is whitelisted
   */
  isWhitelisted(violationPattern: string): boolean {
    const entry = this.entries.get(violationPattern);

    if (!entry) return false;

    // Check if expired
    if (entry.expiresAt && entry.expiresAt < new Date()) {
      this.entries.delete(violationPattern);
      return false;
    }

    return true;
  }

  /**
   * Get whitelist reason
   */
  getReason(violationPattern: string): WhitelistReason | undefined {
    return this.entries.get(violationPattern);
  }

  /**
   * Get all entries
   */
  getEntries(): Array<{ pattern: string; reason: WhitelistReason }> {
    return Array.from(this.entries.entries()).map(([pattern, reason]) => ({
      pattern,
      reason
    }));
  }

  /**
   * Clean expired entries
   */
  cleanExpired(): void {
    const now = new Date();
    for (const [pattern, entry] of this.entries) {
      if (entry.expiresAt && entry.expiresAt < now) {
        this.entries.delete(pattern);
      }
    }
  }
}
