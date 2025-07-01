
import React from 'react';
import { TrendingUp, Users, GraduationCap, Building, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePlatformStats } from '@/hooks/usePlatformStats';

const LiveStats: React.FC = () => {
  const { data: stats, isLoading, error } = usePlatformStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Erro ao carregar estatísticas</p>
      </div>
    );
  }

  const statItems = [
    {
      label: 'Instituições Ativas',
      value: stats?.total_institutions || 0,
      icon: <Building className="h-5 w-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Estudantes Conectados',
      value: stats?.total_students || 0,
      icon: <Users className="h-5 w-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Cursos Disponíveis',
      value: stats?.total_courses || 0,
      icon: <GraduationCap className="h-5 w-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Usuários Ativos',
      value: stats?.active_users || 0,
      icon: <Calendar className="h-5 w-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getLastUpdated = () => {
    if (!stats?.updated_at) return 'Nunca';
    
    const updateTime = new Date(stats.updated_at);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - updateTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes}min atrás`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
    return updateTime.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Estatísticas da Plataforma</h2>
        <Badge variant="outline" className="text-xs">
          Atualizado: {getLastUpdated()}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.label}
              </CardTitle>
              <div className={`${stat.color} p-2 ${stat.bgColor} rounded-lg`}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatNumber(stat.value)}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-gray-500">em tempo real</span>
                  </div>
                </div>
              </div>
            </CardContent>
            
            {/* Barra de progresso animada */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
              <div 
                className={`h-full bg-gradient-to-r from-${stat.color.split('-')[1]}-500 to-${stat.color.split('-')[1]}-600 transition-all duration-1000`}
                style={{ width: `${Math.min(100, (stat.value % 100) + 20)}%` }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LiveStats;
