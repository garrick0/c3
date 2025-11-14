/**
 * Graph Viewer Widget
 */

export function GraphViewer() {
  return (
    <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '8px', minHeight: '400px' }}>
      <h3>Graph View</h3>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
        <p style={{ color: '#666' }}>Graph visualization will appear here</p>
      </div>
    </div>
  );
}
