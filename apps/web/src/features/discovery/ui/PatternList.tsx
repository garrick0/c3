/**
 * Pattern List Component
 */

export function PatternList() {
  return (
    <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '8px' }}>
      <h3>Discovered Patterns</h3>
      <div style={{ marginTop: '1rem', color: '#666' }}>
        <p>No patterns discovered yet. Run pattern discovery to begin.</p>
      </div>
    </div>
  );
}
