/**
 * Compliance Page
 */

import { ViolationList } from '../../features/compliance/ui/ViolationList';

export function CompliancePage() {
  return (
    <div className="container">
      <h1>Compliance</h1>
      <p>View and manage code standard violations</p>

      <div style={{ marginTop: '2rem' }}>
        <ViolationList />
      </div>
    </div>
  );
}
