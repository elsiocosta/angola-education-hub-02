import React from 'react';
import LayoutHeader from './layout/LayoutHeader';
import LayoutFooter from './layout/LayoutFooter';
import NavigationArrows from './NavigationArrows';

// It was: interface LayoutProps {
//   children: React.ReactNode;
// }

const navigationItems = [
  {
    name: 'Instituições',
    href: '/search',
    description: 'Pesquisar escolas e universidades'
  },
  {
    name: 'Feed Educacional',
    href: '/feed',
    description: 'Publicações das instituições'
  },
  {
    name: 'Níveis de Ensino',
    href: '#',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Universidades', href: '/search?level=university', description: 'Ensino Superior e Universitário' },
      { name: 'Ensino Médio', href: '/search?level=high-school', description: 'Ensino Médio e Técnico' },
      { name: 'Ensino Secundário', href: '/search?level=secondary', description: 'Ensino Secundário (9ª-12ª classe)' },
      { name: 'Ensino Primário', href: '/search?level=primary', description: 'Ensino Primário (1ª-6ª classe)' }
    ]
  },
  {
    name: 'Recursos',
    href: '#',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Sobre a Plataforma', href: '/about', description: 'Conheça nossa missão' },
      { name: 'Blog Educacional', href: '/blog', description: 'Artigos sobre educação' },
      { name: 'Central de Ajuda', href: '/support', description: 'Suporte e tutoriais' },
      { name: 'Relatórios', href: '/report', description: 'Estatísticas da plataforma' }
    ]
  },
  {
    name: 'Gestão',
    href: '#',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Painel do Estudante', href: '/dashboard/student', description: 'Dashboard do estudante' },
      { name: 'Painel Institucional', href: '/dashboard/institution', description: 'Dashboard da instituição' },
      { name: 'Gestão de Convites', href: '/invites', description: 'Convidar membros' },
      { name: 'Gestão de Cursos', href: '/courses', description: 'Gerir cursos e turmas' },
      { name: 'Mensagens Internas', href: '/messages', description: 'Comunicação interna' }
    ]
  },
  {
    name: 'Preços',
    href: '/pricing',
    description: 'Planos para instituições'
  }
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <LayoutHeader navigationItems={navigationItems} />
      <NavigationArrows />
      <main>{children}</main>
      <LayoutFooter />
    </div>
  );
};

export default Layout;
