import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './component/SideBar';
import MainContent from './component/Maincontent';
import { UserProvider } from './UserContext';
import { useResponsive } from './component/Hooks/useResponsive';

import './App.css';

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

