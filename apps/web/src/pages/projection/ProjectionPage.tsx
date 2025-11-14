/**
 * Projection Page
 */

import { GraphViewer } from '../../widgets/graph-viewer/GraphViewer';

export function ProjectionPage() {
  return (
    <div className="container">
      <h1>Visualizations</h1>
      <p>Graph projections and analytical views</p>

      <div style={{ marginTop: '2rem' }}>
        <GraphViewer />
      </div>
    </div>
  );
}
