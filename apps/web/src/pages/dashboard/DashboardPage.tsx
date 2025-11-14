/**
 * Dashboard Page
 */

import { ComplianceSummary } from '../../widgets/compliance-summary/ComplianceSummary';

export function DashboardPage() {
  return (
    <div className="container">
      <h1>C3 Dashboard</h1>
      <p>Code Standards Management System</p>

      <div style={{ marginTop: '2rem' }}>
        <ComplianceSummary />
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '8px' }}>
          <h3>Recent Activity</h3>
          <p>No recent activity</p>
        </div>

        <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '8px' }}>
          <h3>Quick Actions</h3>
          <ul>
            <li>Parse codebase</li>
            <li>Check compliance</li>
            <li>Discover patterns</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
