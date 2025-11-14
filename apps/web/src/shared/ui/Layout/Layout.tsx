/**
 * Layout Component
 */

import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#1e293b', color: 'white', padding: '1rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>C3</h1>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
            <Link to="/compliance" style={{ color: 'white', textDecoration: 'none' }}>Compliance</Link>
            <Link to="/discovery" style={{ color: 'white', textDecoration: 'none' }}>Discovery</Link>
            <Link to="/projection" style={{ color: 'white', textDecoration: 'none' }}>Projections</Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <footer style={{ backgroundColor: '#f1f5f9', padding: '1rem 2rem', textAlign: 'center', color: '#666' }}>
        <p>C3 - Code Standards Management System v0.1.0</p>
      </footer>
    </div>
  );
}
