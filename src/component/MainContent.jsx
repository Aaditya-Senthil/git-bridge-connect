import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Router from '../Router';
import '../Styles/main.css';
import Breadcrumb from './Breadcrum';
import { useResponsive } from './Hooks/useResponsive';
import { useUser } from '../UserContext';


const MainContent = ({ onToggleSidebar, sidebarOpen }) => {
  const location = useLocation();
  const { isMobile } = useResponsive();
  const userCtx = (typeof useUser === 'function') ? useUser() : null;
  const documentHistory = userCtx?.documentHistory || [];
  
  const hasSidebar = documentHistory.length > 0;
  
  return (
    <div className={`main-content ${hasSidebar ? 'main-content--with-sidebar' : ''}`}>
      {isMobile && hasSidebar && (
        <button 
          className="main-content__mobile-menu"
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      )}
      <div className="main-content__breadcrumb">
        <Breadcrumb />
      </div>
      <div className="main-content__router">
        <Router />
      </div>
    </div>
  );

};

export default MainContent;