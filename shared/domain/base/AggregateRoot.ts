/**
 * Base AggregateRoot class
 * Aggregate roots are entities that control access to their aggregates
 */

import { Entity } from './Entity.js';
import { DomainEvent } from './DomainEvent.js';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = [];

  /**
   * Get all domain events
   */
  getDomainEvents(): DomainEvent[] {
    return [...this._domainEvents];
  }

  /**
   * Add a domain event
   */
  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  /**
   * Clear all domain events
   */
  clearEvents(): void {
    this._domainEvents = [];
  }
}
