import React from 'react';
import SidebarPage from './pages/SidebarPage/SidebarPage';
import "./app.scss";
import AppRoutes from './Routes/AppRoutes';

const App = () => {
  return (
    <div className='app'>
      <div className="sidebar">
        <SidebarPage />
      </div>
      <div className="main-content">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
