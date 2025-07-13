
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/user';
import LayoutHeader from './LayoutHeader';
import LayoutFooter from './LayoutFooter';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, userProfile } = useAuth();

  const getSidebarItems = (role: string) => {
    switch (role) {
      case 'student':
        return [
          { title: 'Dashboard', href: '/dashboard/student', icon: 'home' },
          { title: 'Meus Cursos', href: '/dashboard/student/courses', icon: 'book' },
          { title: 'Inscrições', href: '/dashboard/student/applications', icon: 'file-text' },
          { title: 'Mensagens', href: '/dashboard/student/messages', icon: 'message-circle' },
          { title: 'Feed Social', href: '/feed', icon: 'users' },
          { title: 'Perfil', href: '/dashboard/student/profile', icon: 'user' },
        ];
      
      case 'visitor':
        return [
          { title: 'Dashboard', href: '/dashboard/visitor', icon: 'home' },
          { title: 'Instituições', href: '/search', icon: 'building' },
          { title: 'Cursos', href: '/courses', icon: 'book' },
          { title: 'Feed Social', href: '/feed', icon: 'users' },
          { title: 'Perfil', href: '/dashboard/visitor/profile', icon: 'user' },
        ];

      case 'institution_admin':
      case 'director':
        return [
          { title: 'Dashboard', href: '/dashboard/institution', icon: 'home' },
          { title: 'Cursos', href: '/courses', icon: 'book' },
          { title: 'Estudantes', href: '/dashboard/institution/students', icon: 'users' },
          { title: 'Inscrições', href: '/dashboard/institution/applications', icon: 'file-text' },
          { title: 'Convites', href: '/invites', icon: 'mail' },
          { title: 'Mensagens', href: '/messages', icon: 'message-circle' },
          { title: 'Relatórios', href: '/dashboard/institution/reports', icon: 'bar-chart' },
          { title: 'Configurações', href: '/dashboard/institution/settings', icon: 'settings' },
        ];

      case 'course_coordinator':
      case 'professor':
        return [
          { title: 'Dashboard', href: '/dashboard/institution', icon: 'home' },
          { title: 'Meus Cursos', href: '/courses', icon: 'book' },
          { title: 'Estudantes', href: '/dashboard/institution/students', icon: 'users' },
          { title: 'Mensagens', href: '/messages', icon: 'message-circle' },
          { title: 'Perfil', href: '/dashboard/institution/profile', icon: 'user' },
        ];

      case 'secretary':
        return [
          { title: 'Dashboard', href: '/dashboard/institution', icon: 'home' },
          { title: 'Inscrições', href: '/dashboard/institution/applications', icon: 'file-text' },
          { title: 'Documentos', href: '/documents', icon: 'folder' },
          { title: 'Mensagens', href: '/messages', icon: 'message-circle' },
          { title: 'Perfil', href: '/dashboard/institution/profile', icon: 'user' },
        ];

      case 'platform_admin':
        return [
          { title: 'Dashboard', href: '/admin', icon: 'home' },
          { title: 'Instituições', href: '/admin/institutions', icon: 'building' },
          { title: 'Usuários', href: '/admin/users', icon: 'users' },
          { title: 'Relatórios', href: '/admin/reports', icon: 'bar-chart' },
          { title: 'Configurações', href: '/admin/settings', icon: 'settings' },
        ];

      default:
        return [
          { title: 'Dashboard', href: '/dashboard/visitor', icon: 'home' },
          { title: 'Instituições', href: '/search', icon: 'building' },
          { title: 'Feed Social', href: '/feed', icon: 'users' },
        ];
    }
  };

  const sidebarItems = userProfile?.role ? getSidebarItems(userProfile.role) : getSidebarItems('visitor');

  return (
    <div className="min-h-screen bg-gray-50">
      <LayoutHeader />
      <div className="flex">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <LayoutFooter />
    </div>
  );
};
