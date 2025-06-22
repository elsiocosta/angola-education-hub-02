
import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, GraduationCap, MapPin, Building, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatItem {
  label: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'stable';
}

const LiveStats: React.FC = () => {
  const [stats, setStats] = useState<StatItem[]>([
    {
      label: 'Instituições Ativas',
      value: 1547,
      change: 12,
      icon: <Building className="h-5 w-5" />,
      trend: 'up'
    },
    {
      label: 'Estudantes Conectados',
      value: 98420,
      change: 324,
      icon: <Users className="h-5 w-5" />,
      trend: 'up'
    },
    {
      label: 'Candidaturas Hoje',
      value: 145,
      change: -8,
      icon: <GraduationCap className="h-5 w-5" />,
      trend: 'down'
    },
    {
      label: 'Novas Publicações',
      value: 67,
      change: 15,
      icon: <Calendar className="h-5 w-5" />,
      trend: 'up'
    }
  ]);

  // Simular atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.value + Math.floor(Math.random() * 5) - 2,
          change: Math.floor(Math.random() * 40) - 20
        }))
      );
    }, 30000); // Atualiza a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendBadge = (change: number) => {
    if (change > 0) {
      return (
        <Badge variant="outline" className="text-green-600 border-green-200">
          +{change}
        </Badge>
      );
    } else if (change < 0) {
      return (
        <Badge variant="outline" className="text-red-600 border-red-200">
          {change}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-gray-600 border-gray-200">
        {change}
      </Badge>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.label}
            </CardTitle>
            <div className="text-blue-600">
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {stat.value.toLocaleString('pt-BR')}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <TrendingUp className={`h-3 w-3 ${getTrendColor(stat.trend)}`} />
                  {getTrendBadge(stat.change)}
                  <span className="text-xs text-gray-500">últimas 24h</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          {/* Barra de progresso animada */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000"
              style={{ width: `${Math.min(100, (stat.value % 100))}%` }}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default LiveStats;
