import React, { useEffect, useState, createContext, useContext } from 'react';
import { Eye, Type, Contrast, Volume2, VolumeX, Focus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  focusVisible: boolean;
  colorBlindFriendly: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: (key: keyof AccessibilitySettings, value: any) => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 16,
  highContrast: false,
  reducedMotion: false,
  screenReader: false,
  focusVisible: true,
  colorBlindFriendly: false
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  // Load settings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('accessibility-settings');
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse accessibility settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const applySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Font size
    root.style.setProperty('--base-font-size', `${settings.fontSize}px`);
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    // Focus visible
    if (settings.focusVisible) {
      root.classList.add('focus-visible');
    } else {
      root.classList.remove('focus-visible');
    }
    
    // Color blind friendly
    if (settings.colorBlindFriendly) {
      root.classList.add('color-blind-friendly');
    } else {
      root.classList.remove('color-blind-friendly');
    }
  };

  const value: AccessibilityContextType = {
    settings,
    updateSetting,
    resetSettings
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Accessibility settings panel
interface AccessibilityPanelProps {
  className?: string;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ className }) => {
  const { settings, updateSetting, resetSettings } = useAccessibility();

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="h-5 w-5" />
          <span>Acessibilidade</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Font Size */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center space-x-2">
            <Type className="h-4 w-4" />
            <span>Tamanho da Fonte: {settings.fontSize}px</span>
          </label>
          <Slider
            value={[settings.fontSize]}
            onValueChange={(value) => updateSetting('fontSize', value[0])}
            min={12}
            max={24}
            step={1}
            className="w-full"
          />
        </div>

        {/* High Contrast */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center space-x-2">
            <Contrast className="h-4 w-4" />
            <span>Alto Contraste</span>
          </label>
          <Switch
            checked={settings.highContrast}
            onCheckedChange={(checked) => updateSetting('highContrast', checked)}
          />
        </div>

        {/* Reduced Motion */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center space-x-2">
            <Focus className="h-4 w-4" />
            <span>Reduzir Animações</span>
          </label>
          <Switch
            checked={settings.reducedMotion}
            onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
          />
        </div>

        {/* Focus Visible */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Indicador de Foco</span>
          </label>
          <Switch
            checked={settings.focusVisible}
            onCheckedChange={(checked) => updateSetting('focusVisible', checked)}
          />
        </div>

        {/* Color Blind Friendly */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Cores Amigáveis</label>
          <Switch
            checked={settings.colorBlindFriendly}
            onCheckedChange={(checked) => updateSetting('colorBlindFriendly', checked)}
          />
        </div>

        {/* Screen Reader Support */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center space-x-2">
            {settings.screenReader ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
            <span>Leitor de Tela</span>
          </label>
          <Switch
            checked={settings.screenReader}
            onCheckedChange={(checked) => updateSetting('screenReader', checked)}
          />
        </div>

        {/* Reset Button */}
        <Button onClick={resetSettings} variant="outline" className="w-full">
          Restaurar Padrões
        </Button>
      </CardContent>
    </Card>
  );
};

// Screen Reader Component
export const ScreenReader: React.FC = () => {
  const { settings } = useAccessibility();
  const [isReading, setIsReading] = useState(false);

  const readText = (text: string) => {
    if (!settings.screenReader || !window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-PT';
    utterance.rate = 0.8;
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  // Auto-read page content when enabled
  useEffect(() => {
    if (settings.screenReader) {
      // Add click listeners to read content
      const handleClick = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.textContent) {
          readText(target.textContent);
        }
      };

      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [settings.screenReader]);

  if (!settings.screenReader) return null;

  return (
    <Button
      className="fixed bottom-20 right-6 z-40 shadow-lg"
      size="icon"
      onClick={isReading ? stopReading : () => readText(document.title)}
      aria-label={isReading ? "Parar leitura" : "Iniciar leitura"}
    >
      {isReading ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </Button>
  );
};

// Skip Links Component
export const SkipLinks: React.FC = () => {
  return (
    <div className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50">
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Ir para conteúdo principal
      </a>
    </div>
  );
};

// Keyboard Navigation Hook
export const useKeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab navigation enhancement
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
      
      // Arrow key navigation for cards/lists
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const focusedElement = document.activeElement as HTMLElement;
        const focusableElements = document.querySelectorAll('[tabindex="0"], button, input, select, textarea, a[href]');
        const currentIndex = Array.from(focusableElements).indexOf(focusedElement);
        
        if (currentIndex !== -1) {
          let nextIndex = currentIndex;
          
          switch (e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
              nextIndex = (currentIndex + 1) % focusableElements.length;
              break;
            case 'ArrowUp':
            case 'ArrowLeft':
              nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
              break;
          }
          
          (focusableElements[nextIndex] as HTMLElement)?.focus();
          e.preventDefault();
        }
      }
      
      // Escape key to close modals/menus
      if (e.key === 'Escape') {
        const modal = document.querySelector('[role="dialog"]:not([hidden])');
        if (modal) {
          const closeButton = modal.querySelector('[aria-label*="fechar"], [aria-label*="close"]') as HTMLElement;
          closeButton?.click();
        }
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
};