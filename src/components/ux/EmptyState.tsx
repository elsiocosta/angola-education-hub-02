import React from 'react';
import { LucideIcon, Search, FileX, Users, AlertCircle, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'secondary';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'search' | 'error' | 'empty' | 'loading' | 'permission';
}

const defaultIcons = {
  search: Search,
  error: AlertCircle,
  empty: FileX,
  loading: RefreshCw,
  permission: Users
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  size = 'md',
  type = 'empty'
}) => {
  const DefaultIcon = Icon || defaultIcons[type];
  
  const sizeClasses = {
    sm: {
      container: 'py-8',
      icon: 'h-8 w-8',
      title: 'text-lg',
      description: 'text-sm'
    },
    md: {
      container: 'py-12',
      icon: 'h-12 w-12',
      title: 'text-xl',
      description: 'text-base'
    },
    lg: {
      container: 'py-16',
      icon: 'h-16 w-16',
      title: 'text-2xl',
      description: 'text-lg'
    }
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center",
      sizeClasses[size].container,
      className
    )}>
      <div className={cn(
        "mx-auto mb-4 text-muted-foreground/60",
        sizeClasses[size].icon,
        type === 'loading' && "animate-spin"
      )}>
        <DefaultIcon className="h-full w-full" />
      </div>
      
      <h3 className={cn(
        "font-semibold text-foreground mb-2",
        sizeClasses[size].title
      )}>
        {title}
      </h3>
      
      <p className={cn(
        "text-muted-foreground max-w-sm mx-auto mb-6",
        sizeClasses[size].description
      )}>
        {description}
      </p>

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {action && (
            <Button
              onClick={action.onClick}
              variant={action.variant || 'default'}
              className="min-w-[120px]"
            >
              {action.label}
            </Button>
          )}
          
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="outline"
              className="min-w-[120px]"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

// Predefined empty states for common scenarios
export const SearchEmptyState: React.FC<{
  query?: string;
  onClear?: () => void;
  onTryAgain?: () => void;
}> = ({ query, onClear, onTryAgain }) => (
  <EmptyState
    type="search"
    title="Nenhum resultado encontrado"
    description={query 
      ? `Não encontramos resultados para "${query}". Tente outros termos de pesquisa.`
      : "Tente pesquisar com palavras-chave diferentes."
    }
    action={onTryAgain ? { label: "Tentar Novamente", onClick: onTryAgain } : undefined}
    secondaryAction={onClear ? { label: "Limpar Pesquisa", onClick: onClear } : undefined}
  />
);

export const ErrorEmptyState: React.FC<{
  onRetry?: () => void;
  onGoHome?: () => void;
}> = ({ onRetry, onGoHome }) => (
  <EmptyState
    type="error"
    title="Algo deu errado"
    description="Ocorreu um erro ao carregar o conteúdo. Tente novamente ou volte à página inicial."
    action={onRetry ? { label: "Tentar Novamente", onClick: onRetry } : undefined}
    secondaryAction={onGoHome ? { label: "Ir para Início", onClick: onGoHome } : undefined}
  />
);

export const LoadingEmptyState: React.FC<{
  message?: string;
}> = ({ message = "Carregando conteúdo..." }) => (
  <EmptyState
    type="loading"
    title="Carregando"
    description={message}
  />
);

export const NoDataEmptyState: React.FC<{
  onCreate?: () => void;
  entityName?: string;
}> = ({ onCreate, entityName = "item" }) => (
  <EmptyState
    icon={Plus}
    title={`Nenhum ${entityName} encontrado`}
    description={`Você ainda não tem nenhum ${entityName}. Comece criando o primeiro.`}
    action={onCreate ? { 
      label: `Criar ${entityName}`, 
      onClick: onCreate,
      variant: 'default'
    } : undefined}
  />
);

export const PermissionEmptyState: React.FC<{
  onRequestAccess?: () => void;
  onGoBack?: () => void;
}> = ({ onRequestAccess, onGoBack }) => (
  <EmptyState
    type="permission"
    title="Acesso Restrito"
    description="Você não tem permissão para visualizar este conteúdo. Entre em contato com o administrador."
    action={onRequestAccess ? { 
      label: "Solicitar Acesso", 
      onClick: onRequestAccess 
    } : undefined}
    secondaryAction={onGoBack ? { 
      label: "Voltar", 
      onClick: onGoBack 
    } : undefined}
  />
);