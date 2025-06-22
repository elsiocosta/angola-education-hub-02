
import React from 'react';
import LayoutHeader from './layout/LayoutHeader';
import LayoutFooter from './layout/LayoutFooter';
import NotificationCenter from './NotificationCenter';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigationItems = [
    {
      name: 'Início',
      href: '/',
      hasDropdown: false
    },
    {
      name: 'Instituições',
      href: '/search',
      hasDropdown: true,
      dropdownItems: [
        {
          name: 'Buscar Instituições',
          href: '/search',
          description: 'Encontre a instituição ideal para você'
        },
        {
          name: 'Registrar Instituição',
          href: '/register',
          description: 'Cadastre sua instituição na plataforma'
        }
      ]
    },
    {
      name: 'Feed',
      href: '/feed',
      hasDropdown: false
    },
    {
      name: 'Sobre',
      href: '/about',
      hasDropdown: false
    },
    {
      name: 'Suporte',
      href: '/support',
      hasDropdown: false
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="relative">
        <LayoutHeader navigationItems={navigationItems} />
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
