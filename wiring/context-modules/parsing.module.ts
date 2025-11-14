/**
 * Parsing context module - Wires all parsing dependencies
 */

import { Container } from '../Container.js';
import { TOKENS } from '../dependencies.js';
import { createLogger } from '@c3/shared';

// Domain
import { ParsingService } from '../../contexts/parsing/domain/services/ParsingService.js';
import { GraphBuilder } from '../../contexts/parsing/domain/services/GraphBuilder.js';
import { NodeFactory } from '../../contexts/parsing/domain/services/NodeFactory.js';
import { EdgeDetector } from '../../contexts/parsing/domain/services/EdgeDetector.js';

// Infrastructure
import { FilesystemParser } from '../../contexts/parsing/infrastructure/adapters/FilesystemParser.js';
import { TypeScriptParser } from '../../contexts/parsing/infrastructure/adapters/TypeScriptParser.js';
import { PythonParser } from '../../contexts/parsing/infrastructure/adapters/PythonParser.js';
import { NodeFileSystem } from '../../contexts/parsing/infrastructure/adapters/NodeFileSystem.js';
import { InMemoryGraphRepository } from '../../contexts/parsing/infrastructure/persistence/InMemoryGraphRepository.js';

// Application
import { ParseCodebaseUseCase } from '../../contexts/parsing/application/use-cases/ParseCodebase.js';
import { ParseFileUseCase } from '../../contexts/parsing/application/use-cases/ParseFile.js';
import { GetPropertyGraphUseCase } from '../../contexts/parsing/application/use-cases/GetPropertyGraph.js';

export function registerParsingContext(container: Container): void {
  const logger = createLogger('Parsing');

  // Register parsers
  container.registerSingleton(TOKENS.FILESYSTEM_PARSER, () => new FilesystemParser());
  container.registerSingleton(TOKENS.TYPESCRIPT_PARSER, () => new TypeScriptParser());
  container.registerSingleton(TOKENS.PYTHON_PARSER, () => new PythonParser());

  // Register infrastructure
  container.registerSingleton(TOKENS.FILE_SYSTEM, () => new NodeFileSystem());
  container.registerSingleton(TOKENS.GRAPH_REPOSITORY, () => new InMemoryGraphRepository());

  // Register domain services
  container.registerSingleton(TOKENS.GRAPH_BUILDER, () => new GraphBuilder());

  container.registerSingleton(TOKENS.PARSING_SERVICE, () => {
    const parsers = [
      container.get<TypeScriptParser>(TOKENS.TYPESCRIPT_PARSER),
      container.get<PythonParser>(TOKENS.PYTHON_PARSER),
      container.get<FilesystemParser>(TOKENS.FILESYSTEM_PARSER)
    ];

    return new ParsingService(
      parsers,
      container.get(TOKENS.GRAPH_REPOSITORY),
      container.get(TOKENS.FILE_SYSTEM),
      logger
    );
  });
}
