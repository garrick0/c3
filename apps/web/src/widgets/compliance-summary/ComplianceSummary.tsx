/**
 * Compliance Summary Widget
 */

export function ComplianceSummary() {
  return (
    <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '8px' }}>
      <h2>Compliance Summary</h2>
      <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e' }}>0</div>
          <div style={{ color: '#666' }}>Errors</div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>0</div>
          <div style={{ color: '#666' }}>Warnings</div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>3</div>
          <div style={{ color: '#666' }}>Rules</div>
        </div>
      </div>
    </div>
  );
}
