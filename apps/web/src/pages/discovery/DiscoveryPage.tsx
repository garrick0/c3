/**
 * Discovery Page
 */

import { PatternList } from '../../features/discovery/ui/PatternList';

export function DiscoveryPage() {
  return (
    <div className="container">
      <h1>Pattern Discovery</h1>
      <p>AI-powered pattern detection and rule inference</p>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => console.log('Start discovery')}>
          🔍 Discover Patterns
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <PatternList />
      </div>
    </div>
  );
}
