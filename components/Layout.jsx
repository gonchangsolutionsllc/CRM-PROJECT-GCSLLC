// Location: frontend/src/components/Layout.jsx

import { useState } from 'react';
// 1. Import the 'useLocation' hook from React Router
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

function Layout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  // 2. Get the current location object, which contains the URL pathname
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // 3. Helper function to determine the title based on the URL path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/customers':
        return 'Customer Management';
      case '/jobs':
        return 'Job Management';
      case '/invoices':
        return 'Invoice Management';
      default:
        return 'Cleaning Rangers'; // A fallback title
    }
  };

  return (
    <div className={`app-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <main className="main-content">
        {/* 4. Pass the dynamic title as a prop to the TopHeader */}
        <TopHeader pageTitle={getPageTitle()} />
        {children}
      </main>
    </div>
  );
}

export default Layout;