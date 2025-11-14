# Parsing Context

Responsible for transforming source code into analyzable property graph representations.

## Domain Entities

- **PropertyGraph** - Core graph representation of codebase
- **Node** - Graph node representing code elements
- **Edge** - Graph edge representing relationships
- **FileInfo** - File metadata

## Services

- **ParsingService** - Main orchestration service
- **GraphBuilder** - Constructs property graphs
- **NodeFactory** - Creates graph nodes
- **EdgeDetector** - Detects dependencies/relationships

## Ports (Interfaces)

- **Parser** - Interface for language parsers
- **GraphRepository** - Storage for graphs
- **FileSystem** - File system access
- **Cache** - Caching interface
