/**
 * Renderer factory for creating renderer instances
 * Stub implementation
 */

export interface Renderer {
  render(data: any): string | Buffer;
  supports(format: string): boolean;
}

export class RendererFactory {
  private renderers: Map<string, Renderer> = new Map();

  /**
   * Register a renderer for formats
   */
  register(formats: string[], renderer: Renderer): void {
    for (const format of formats) {
      this.renderers.set(format, renderer);
    }
  }

  /**
   * Get renderer for format
   * Stub: Returns from map or undefined
   */
  getRenderer(format: string): Renderer | undefined {
    return this.renderers.get(format);
  }

  /**
   * Check if renderer exists for format
   */
  hasRenderer(format: string): boolean {
    return this.renderers.has(format);
  }

  /**
   * Get all supported formats
   */
  getSupportedFormats(): string[] {
    return Array.from(this.renderers.keys());
  }
}

/**
 * Create renderer factory
 */
export function createRendererFactory(): RendererFactory {
  return new RendererFactory();
}
