
import React from 'react';
import LayoutHeader from './layout/LayoutHeader';
import LayoutFooter from './layout/LayoutFooter';
import NotificationCenter from './NotificationCenter';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="relative">
        <LayoutHeader />
        {/* Adicionar centro de notificações no header */}
        <div className="absolute top-4 right-4 z-50">
          <NotificationCenter />
        </div>
      </div>
      <main className="flex-1">
        {children}
      </main>
      <LayoutFooter />
    </div>
  );
};

export default Layout;
