import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface NavigationControlsProps {
  className?: string;
  showLabels?: boolean;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  className,
  showLabels = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
      toast({
        title: "Navegação",
        description: "Redirecionado para a página inicial"
      });
    }
  };

  const goForward = () => {
    navigate(1);
  };

  const refresh = () => {
    window.location.reload();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + Left Arrow = Back
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        goBack();
      }
      
      // Alt + Right Arrow = Forward  
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        goForward();
      }

      // Ctrl/Cmd + R = Refresh (native behavior, just for completeness)
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        // Let native refresh happen
      }

      // F5 = Refresh (native behavior)
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={goBack}
        className="text-muted-foreground hover:text-foreground"
        title="Voltar (Alt + ←)"
      >
        <ChevronLeft className="h-4 w-4" />
        {showLabels && <span className="ml-1 hidden sm:inline">Voltar</span>}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={goForward}
        className="text-muted-foreground hover:text-foreground"
        title="Avançar (Alt + →)"
      >
        <ChevronRight className="h-4 w-4" />
        {showLabels && <span className="ml-1 hidden sm:inline">Avançar</span>}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={refresh}
        className="text-muted-foreground hover:text-foreground"
        title="Atualizar (Ctrl + R)"
      >
        <RotateCcw className="h-4 w-4" />
        {showLabels && <span className="ml-1 hidden sm:inline">Atualizar</span>}
      </Button>
    </div>
  );
};

// Hook for programmatic navigation with history tracking
export const useEnhancedNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateWithTracking = (to: string, options?: { replace?: boolean; state?: any }) => {
    // Track navigation for analytics (could be integrated with analytics service)
    console.log('Navigation:', { from: location.pathname, to, timestamp: Date.now() });
    
    navigate(to, options);
  };

  const navigateBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const navigateForward = () => {
    navigate(1);
  };

  return {
    navigate: navigateWithTracking,
    goBack: navigateBack,
    goForward: navigateForward,
    currentPath: location.pathname,
    currentSearch: location.search,
    currentHash: location.hash
  };
};