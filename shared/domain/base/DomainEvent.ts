/**
 * Base DomainEvent class
 * All domain events should implement this interface
 */

export interface DomainEvent {
  readonly occurredAt: Date;
  readonly eventType: string;
  readonly aggregateId: string;
  readonly payload: Record<string, any>;
}

export abstract class BaseDomainEvent implements DomainEvent {
  public readonly occurredAt: Date;

  constructor(
    public readonly eventType: string,
    public readonly aggregateId: string,
    public readonly payload: Record<string, any>
  ) {
    this.occurredAt = new Date();
  }
}
