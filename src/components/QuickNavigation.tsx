
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search, Users, Building, BookOpen, MessageSquare } from 'lucide-react';

interface QuickNavigationProps {
  className?: string;
  variant?: 'default' | 'compact';
}

const QuickNavigation: React.FC<QuickNavigationProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Início', path: '/', icon: Home },
    { label: 'Buscar Instituições', path: '/search', icon: Search },
    { label: 'Feed Educacional', path: '/feed', icon: MessageSquare },
    { label: 'Registrar Instituição', path: '/register/institution', icon: Building },
    { label: 'Sobre', path: '/about', icon: BookOpen },
  ];

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {navigationItems.slice(0, 3).map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.path}
              variant="outline"
              size="sm"
              onClick={() => navigate(item.path)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ${className}`}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.path}
            variant="outline"
            onClick={() => navigate(item.path)}
            className="flex items-center gap-2 p-4 h-auto"
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default QuickNavigation;
