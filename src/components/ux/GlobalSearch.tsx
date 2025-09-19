import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, ArrowRight, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'institution' | 'course' | 'page' | 'user';
  url: string;
  category?: string;
}

interface GlobalSearchProps {
  className?: string;
  placeholder?: string;
  showShortcut?: boolean;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  className,
  placeholder = "Pesquisar instituições, cursos...",
  showShortcut = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Mock search results - replace with real API call
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Universidade Agostinho Neto',
      description: 'Principal universidade pública de Angola',
      type: 'institution',
      url: '/institution/1',
      category: 'Ensino Superior'
    },
    {
      id: '2', 
      title: 'Curso de Engenharia Informática',
      description: 'Bacharelado em Engenharia Informática - UAN',
      type: 'course',
      url: '/courses/2',
      category: 'Tecnologia'
    },
    {
      id: '3',
      title: 'Colégio Sagrada Família',
      description: 'Ensino primário e secundário em Luanda',
      type: 'institution', 
      url: '/institution/3',
      category: 'Ensino Secundário'
    }
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
        setSelectedIndex(-1);
      }

      // Arrow navigation
      if (isOpen && results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, -1));
        }
        if (e.key === 'Enter' && selectedIndex >= 0) {
          e.preventDefault();
          navigate(results[selectedIndex].url);
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate]);

  // Search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Filter mock results
    const filtered = mockResults.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setResults(filtered);
    setIsLoading(false);
    setSelectedIndex(-1);
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => performSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'institution': return '🏫';
      case 'course': return '📚';
      case 'page': return '📄';
      case 'user': return '👤';
      default: return '🔍';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'institution': return 'bg-blue-100 text-blue-800';
      case 'course': return 'bg-green-100 text-green-800';
      case 'page': return 'bg-gray-100 text-gray-800';
      case 'user': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) {
    return (
      <div className={cn("relative", className)}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!isOpen && e.target.value) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="pl-10 pr-16 bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary transition-all"
          />
          {showShortcut && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden md:flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 text-xs bg-muted border border-border rounded">
                <Command className="h-3 w-3 inline mr-1" />K
              </kbd>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative z-50", className)}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Search Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-auto px-4">
        <Card className="shadow-2xl border-border/50">
          <CardContent className="p-0">
            {/* Search Input */}
            <div className="relative border-b border-border/50">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="pl-12 pr-12 py-4 text-lg border-0 focus:ring-0 bg-transparent"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Results */}
            <div ref={resultsRef} className="max-h-80 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-muted-foreground">
                  Pesquisando...
                </div>
              ) : results.length > 0 ? (
                <div className="py-2">
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => {
                        navigate(result.url);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors flex items-center justify-between group focus:outline-none focus:bg-muted/50",
                        selectedIndex === index && "bg-muted/50"
                      )}
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <span className="text-xl">{getTypeIcon(result.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-foreground truncate">{result.title}</p>
                            <Badge variant="secondary" className={cn("text-xs", getTypeBadgeColor(result.type))}>
                              {result.category || result.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{result.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
                </div>
              ) : query ? (
                <div className="p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Nenhum resultado encontrado</p>
                  <p className="text-sm text-muted-foreground">Tente pesquisar por nome da instituição ou curso</p>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Digite para pesquisar</p>
                  <p className="text-sm text-muted-foreground">Instituições, cursos, páginas...</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border/50 px-4 py-3 text-xs text-muted-foreground flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span>↑↓ para navegar</span>
                <span>↵ para selecionar</span>
                <span>esc para fechar</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Pesquisa por</span>
                <Badge variant="outline" className="text-xs">Angola Education Hub</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};