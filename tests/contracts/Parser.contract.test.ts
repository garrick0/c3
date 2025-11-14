/**
 * Contract test for Parser interface
 */

import { describe, it, expect } from 'vitest';
import { FilesystemParser } from '../../contexts/parsing/infrastructure/adapters/FilesystemParser.js';
import { TypeScriptParser } from '../../contexts/parsing/infrastructure/adapters/TypeScriptParser.js';
import { PythonParser } from '../../contexts/parsing/infrastructure/adapters/PythonParser.js';

describe.each([
  ['FilesystemParser', new FilesystemParser()],
  ['TypeScriptParser', new TypeScriptParser()],
  ['PythonParser', new PythonParser()]
])('%s Contract', (name, parser) => {
  it('should implement Parser interface', () => {
    expect(parser.parse).toBeDefined();
    expect(parser.supports).toBeDefined();
    expect(parser.getName).toBeDefined();
    expect(parser.getSupportedExtensions).toBeDefined();
  });

  it('should return name', () => {
    expect(parser.getName()).toBe(name);
  });

  it('should return supported extensions', () => {
    const extensions = parser.getSupportedExtensions();
    expect(Array.isArray(extensions)).toBe(true);
    expect(extensions.length).toBeGreaterThan(0);
  });
});
