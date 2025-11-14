export interface ConfigLoader {
  load(path: string): Promise<any>;
}
