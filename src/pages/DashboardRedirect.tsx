import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const DashboardRedirect = () => {
  const { user, session } = useAuth();

  useEffect(() => {
    if (user) {
      const redirectMap: Record<UserRole, string> = {
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

      const redirectPath = redirectMap[user.role];
      if (redirectPath) {
        window.location.href = redirectPath;
      }
    }
  }, [user]);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
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