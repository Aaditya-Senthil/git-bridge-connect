import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Sidebar from './component/SideBar';
import MainContent from './component/MainContent';
import { UserProvider } from './UserContext';
import { useResponsive } from './component/Hooks/useResponsive';

import Documentation from './component/Documentation';

import './App.css';

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add('theme-dark');
  }, []);

  // Isolated documentation route with no app sidebar/breadcrumb
  if (location.pathname.startsWith('/documentation')) {
    return <Documentation />;
  }

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <div className="app-container">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleCloseSidebar}
      />
      <MainContent 
        onToggleSidebar={handleToggleSidebar}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;

