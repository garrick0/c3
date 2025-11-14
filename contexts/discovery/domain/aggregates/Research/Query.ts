import { Entity } from '@c3/shared';

export class Query extends Entity<string> {
  constructor(
    id: string,
    public question: string,
    public context: Record<string, any>,
    public createdAt: Date = new Date()
  ) {
    super(id);
  }
}
