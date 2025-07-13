
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const DashboardRedirect = () => {
  const { user, userProfile, session, isLoading } = useAuth();

  useEffect(() => {
    console.log('DashboardRedirect - user:', user?.id);
    console.log('DashboardRedirect - userProfile:', userProfile);
    console.log('DashboardRedirect - session:', !!session);
    console.log('DashboardRedirect - isLoading:', isLoading);

    if (userProfile && userProfile.role) {
      const redirectMap: Record<string, string> = {
        visitor: '/dashboard/visitor',
        student: '/dashboard/student',
        institution_admin: '/dashboard/institution',
        director: '/dashboard/institution',
        course_coordinator: '/dashboard/institution',
        professor: '/dashboard/institution',
        secretary: '/dashboard/institution',
        cleaning_staff: '/dashboard/institution',
        platform_admin: '/admin',
      };

      const redirectPath = redirectMap[userProfile.role] || '/dashboard/visitor';
      console.log('Redirecting to:', redirectPath);
      
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 500);
    }
  }, [userProfile, user, session, isLoading]);

  // Se não há sessão, redireciona para login
  if (!session && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  // Se ainda está carregando
  if (isLoading || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center">Carregando...</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">Redirecionando...</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </CardContent>
      </Card>
    </div>
  );
};
