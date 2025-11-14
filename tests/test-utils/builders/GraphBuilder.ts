/**
 * Test data builder for PropertyGraph
 */

import { PropertyGraph } from '../../../contexts/parsing/domain/entities/PropertyGraph.js';
import { Node } from '../../../contexts/parsing/domain/entities/Node.js';
import { Edge } from '../../../contexts/parsing/domain/entities/Edge.js';
import { NodeType } from '../../../contexts/parsing/domain/value-objects/NodeType.js';
import { EdgeType } from '../../../contexts/parsing/domain/value-objects/EdgeType.js';

export class GraphBuilder {
  private graph: PropertyGraph;

  constructor() {
    this.graph = new PropertyGraph('test-graph', {
      codebaseId: 'test-codebase',
      parsedAt: new Date(),
      language: 'typescript',
      version: '1.0.0'
    });
  }

  withNode(id: string, name: string, type: NodeType = NodeType.FILE): GraphBuilder {
    const node = new Node(id, type, name, { filePath: `/test/${name}` });
    this.graph.addNode(node);
    return this;
  }

  withEdge(fromId: string, toId: string, type: EdgeType = EdgeType.DEPENDS_ON): GraphBuilder {
    const edge = new Edge(`edge-${fromId}-${toId}`, type, fromId, toId);
    this.graph.addEdge(edge);
    return this;
  }

  build(): PropertyGraph {
    return this.graph;
  }
}
