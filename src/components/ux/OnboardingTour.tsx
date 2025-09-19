import React, { useState, useEffect, createContext, useContext } from 'react';
import { X, ArrowRight, ArrowLeft, Play, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TourStep {
  id: string;
  target: string; // CSS selector
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  offset?: { x: number; y: number };
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface OnboardingContextType {
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
  startTour: (steps: TourStep[]) => void;
  endTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  const startTour = (tourSteps: TourStep[]) => {
    setSteps(tourSteps);
    setCurrentStep(0);
    setIsActive(true);
  };

  const endTour = () => {
    setIsActive(false);
    setCurrentStep(0);
    setSteps([]);
    setTargetElement(null);
    // Remove highlights
    document.querySelectorAll('.onboarding-highlight').forEach(el => {
      el.classList.remove('onboarding-highlight');
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    endTour();
  };

  // Update target element when step changes
  useEffect(() => {
    if (isActive && steps[currentStep]) {
      const element = document.querySelector(steps[currentStep].target) as HTMLElement;
      setTargetElement(element);
      
      // Remove previous highlights
      document.querySelectorAll('.onboarding-highlight').forEach(el => {
        el.classList.remove('onboarding-highlight');
      });
      
      // Highlight current element
      if (element) {
        element.classList.add('onboarding-highlight');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isActive, currentStep, steps]);

  const value: OnboardingContextType = {
    isActive,
    currentStep,
    totalSteps: steps.length,
    startTour,
    endTour,
    nextStep,
    prevStep,
    skipTour
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
      {isActive && <OnboardingOverlay />}
    </OnboardingContext.Provider>
  );
};

const OnboardingOverlay: React.FC = () => {
  const { currentStep, totalSteps, nextStep, prevStep, endTour, skipTour } = useOnboarding();
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  // Access steps from context (you might need to modify context to expose steps)
  useEffect(() => {
    // This is a workaround - in a real implementation, steps should be accessible from context
    const step = steps[currentStep];
    if (step) {
      const element = document.querySelector(step.target) as HTMLElement;
      setTargetElement(element);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        
        setPopoverPosition({
          x: rect.left + scrollX + (step.offset?.x || 0),
          y: rect.top + scrollY + (step.offset?.y || 0)
        });
      }
    }
  }, [currentStep, steps]);

  const currentStepData = steps[currentStep];

  if (!currentStepData) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
      
      {/* Spotlight effect */}
      {targetElement && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            top: targetElement.offsetTop - 4,
            left: targetElement.offsetLeft - 4,
            width: targetElement.offsetWidth + 8,
            height: targetElement.offsetHeight + 8,
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.6), 0 0 0 9999px rgba(0, 0, 0, 0.5)',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
        />
      )}

      {/* Tour Popover */}
      <Card
        className="fixed z-50 w-80 max-w-sm shadow-2xl border-primary/20"
        style={{
          top: popoverPosition.y + (targetElement?.offsetHeight || 0) + 16,
          left: Math.max(16, Math.min(popoverPosition.x, window.innerWidth - 320 - 16))
        }}
      >
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-xs">
              {currentStep + 1} de {totalSteps}
            </Badge>
            <Button variant="ghost" size="sm" onClick={endTour}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{currentStepData.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {currentStepData.content}
            </p>

            {/* Custom Action */}
            {currentStepData.action && (
              <Button
                onClick={currentStepData.action.onClick}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Play className="h-4 w-4 mr-2" />
                {currentStepData.action.label}
              </Button>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar
              </Button>
              
              <Button variant="ghost" size="sm" onClick={skipTour}>
                <SkipForward className="h-4 w-4 mr-1" />
                Pular
              </Button>
            </div>

            <Button onClick={nextStep} size="sm">
              {currentStep === totalSteps - 1 ? 'Concluir' : 'Próximo'}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-1">
              <div
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

// Predefined tours for different pages
export const getHomeTour = (): TourStep[] => [
  {
    id: 'welcome',
    target: 'body',
    title: 'Bem-vindo ao Angola Education Hub!',
    content: 'Vamos fazer um tour rápido pelas principais funcionalidades da plataforma.',
    position: 'center'
  },
  {
    id: 'search',
    target: '[data-tour="search"]',
    title: 'Pesquisa Global',
    content: 'Use a barra de pesquisa para encontrar instituições, cursos ou qualquer conteúdo. Pressione Ctrl+K para acesso rápido.',
    position: 'bottom'
  },
  {
    id: 'navigation',
    target: '[data-tour="navigation"]',
    title: 'Menu Principal',
    content: 'Navegue pelas diferentes seções da plataforma usando o menu principal.',
    position: 'bottom'
  },
  {
    id: 'theme',
    target: '[data-tour="theme-toggle"]',
    title: 'Modo Escuro/Claro',
    content: 'Alterne entre os temas claro e escuro conforme sua preferência.',
    position: 'bottom'
  },
  {
    id: 'cta',
    target: '[data-tour="cta"]',
    title: 'Comece Agora',
    content: 'Explore instituições ou registre sua própria instituição para começar.',
    position: 'top'
  }
];

export const getDashboardTour = (): TourStep[] => [
  {
    id: 'dashboard-welcome',
    target: '[data-tour="dashboard"]',
    title: 'Seu Painel',
    content: 'Este é seu painel principal onde você pode ver todas as informações importantes.',
    position: 'center'
  },
  {
    id: 'sidebar',
    target: '[data-tour="sidebar"]',
    title: 'Menu Lateral',
    content: 'Use o menu lateral para navegar entre as diferentes seções do seu painel.',
    position: 'right'
  },
  {
    id: 'notifications',
    target: '[data-tour="notifications"]',
    title: 'Notificações',
    content: 'Fique atualizado com as últimas notificações e mensagens importantes.',
    position: 'bottom'
  }
];

// Hook for easy tour management
export const useTour = () => {
  const { startTour } = useOnboarding();
  
  const startHomeTour = () => startTour(getHomeTour());
  const startDashboardTour = () => startTour(getDashboardTour());
  
  return {
    startHomeTour,
    startDashboardTour,
    startCustomTour: startTour
  };
};