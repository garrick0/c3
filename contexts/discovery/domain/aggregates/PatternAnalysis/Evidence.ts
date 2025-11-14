import { Entity } from '@c3/shared';

export class Evidence extends Entity<string> {
  constructor(
    id: string,
    public source: string,
    public description: string,
    public strength: number,
    public metadata: Record<string, any> = {}
  ) {
    super(id);
  }
}
