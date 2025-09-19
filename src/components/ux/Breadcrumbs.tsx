import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  path: string;
  disabled?: boolean;
}

interface BreadcrumbsProps {
  className?: string;
  customItems?: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className, customItems }) => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Início', path: '/' }
    ];

    const pathMap: Record<string, string> = {
      'about': 'Sobre',
      'discover': 'Descobrir',
      'search': 'Pesquisar',
      'contact': 'Contato',
      'faq': 'FAQ',
      'pricing': 'Preços',
      'login': 'Entrar',
      'register': 'Registrar',
      'dashboard': 'Painel',
      'profile': 'Perfil',
      'settings': 'Configurações',
      'institution': 'Instituição',
      'student': 'Estudante',
      'visitor': 'Visitante',
      'admin': 'Administração',
      'applications': 'Candidaturas',
      'courses': 'Cursos',
      'messages': 'Mensagens',
      'notifications': 'Notificações',
      'feed': 'Feed',
      'privacy': 'Privacidade',
      'terms': 'Termos'
    };

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = pathMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({
        label,
        path: currentPath,
        disabled: index === pathSegments.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav 
      className={cn("flex items-center space-x-1 text-sm text-muted-foreground py-2", className)}
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.path}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
          )}
          
          {item.disabled || index === breadcrumbs.length - 1 ? (
            <span 
              className="text-foreground font-medium"
              aria-current="page"
            >
              {index === 0 ? (
                <Home className="h-4 w-4" aria-label="Início" />
              ) : (
                item.label
              )}
            </span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-1"
              tabIndex={0}
            >
              {index === 0 ? (
                <Home className="h-4 w-4" aria-label="Início" />
              ) : (
                item.label
              )}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};