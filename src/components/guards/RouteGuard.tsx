
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/user';
import { ROLE_PERMISSIONS } from '@/types/user';

interface RouteGuardProps {
  children: ReactNode;
  requiredRoles?: string[];
  requiredPermissions?: string[];
  redirectTo?: string;
}

export const RouteGuard = ({ 
  children, 
  requiredRoles = [], 
  requiredPermissions = [], 
  redirectTo = '/login' 
}: RouteGuardProps) => {
  const { user, userProfile, session, isLoading } = useAuth();
  const location = useLocation();

  // Se ainda está carregando, não redireciona
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Se não há sessão, redireciona para login
  if (!session || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Se não tem perfil ainda, aguarda
  if (!userProfile) {
    return <div>Carregando perfil...</div>;
  }

  // Verifica se o usuário tem o papel necessário
  if (requiredRoles.length > 0 && !requiredRoles.includes(userProfile.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Verifica se o usuário tem as permissões necessárias
  if (requiredPermissions.length > 0) {
    const userPermissions = ROLE_PERMISSIONS[userProfile.role as UserRole] || [];
    const hasAllPermissions = requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    );
    
    if (!hasAllPermissions) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

// Guards específicos para cada tipo de usuário
export const VisitorGuard = ({ children }: { children: ReactNode }) => (
  <RouteGuard requiredRoles={['visitor']}>{children}</RouteGuard>
);

export const StudentGuard = ({ children }: { children: ReactNode }) => (
  <RouteGuard requiredRoles={['student']}>{children}</RouteGuard>
);

export const InstitutionStaffGuard = ({ children }: { children: ReactNode }) => (
  <RouteGuard 
    requiredRoles={[
      'institution_admin', 
      'director', 
      'course_coordinator', 
      'professor', 
      'secretary'
    ]}
  >
    {children}
  </RouteGuard>
);

export const InstitutionAdminGuard = ({ children }: { children: ReactNode }) => (
  <RouteGuard requiredRoles={['institution_admin']}>{children}</RouteGuard>
);

export const PlatformAdminGuard = ({ children }: { children: ReactNode }) => (
  <RouteGuard requiredRoles={['platform_admin']}>{children}</RouteGuard>
);

// Guard para páginas públicas que redirecionam usuários logados
export const PublicOnlyGuard = ({ children }: { children: ReactNode }) => {
  const { session, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  
  if (session) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};
