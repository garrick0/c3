import { Entity } from '@c3/shared';

export class Example extends Entity<string> {
  constructor(
    id: string,
    public filePath: string,
    public codeSnippet: string,
    public explanation: string
  ) {
    super(id);
  }
}
