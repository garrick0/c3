import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { CompliancePage } from '../pages/compliance/CompliancePage';
import { DiscoveryPage } from '../pages/discovery/DiscoveryPage';
import { ProjectionPage } from '../pages/projection/ProjectionPage';
import { Layout } from '../shared/ui/Layout/Layout';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          <Route path="/discovery" element={<DiscoveryPage />} />
          <Route path="/projection" element={<ProjectionPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
