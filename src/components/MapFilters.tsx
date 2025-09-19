
import React, { useState } from 'react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Filter, Search, X, MapPin, GraduationCap, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MapFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onSearch: (searchTerm: string) => void;
}

export interface FilterState {
  province: string;
  institutionType: string;
  tuitionRange: string;
}

const MapFilters: React.FC<MapFiltersProps> = ({ onFilterChange, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    province: 'all',
    institutionType: 'all',
    tuitionRange: 'all'
  });

  const provinces = [
    'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango',
    'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla',
    'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico',
    'Namibe', 'Uíge', 'Zaire', 'Icolo e Bengo', 'Morimbo', 'Talatona'
  ];

  const institutionTypes = [
    { value: 'primary', label: 'Ensino Primário' },
    { value: 'secondary', label: 'Ensino Secundário' },
    { value: 'high_school', label: 'Ensino Médio' },
    { value: 'university', label: 'Ensino Superior' },
    { value: 'technical', label: 'Ensino Técnico' }
  ];

  const tuitionRanges = [
    { value: '0-50000', label: 'Até 50.000 Kz' },
    { value: '50000-100000', label: '50.000 - 100.000 Kz' },
    { value: '100000-200000', label: '100.000 - 200.000 Kz' },
    { value: '200000+', label: 'Acima de 200.000 Kz' }
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { province: 'all', institutionType: 'all', tuitionRange: 'all' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="relative">
      {/* Enhanced Controls Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-6">
        {/* Filter Toggle */}
        <EnhancedButton 
          variant="outline" 
          size="sm" 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full lg:w-auto"
          leftIcon={<Filter className="h-4 w-4" />}
          rightIcon={
            (filters.province !== 'all' || filters.institutionType !== 'all' || filters.tuitionRange !== 'all') ? (
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {[filters.province, filters.institutionType, filters.tuitionRange].filter(f => f !== 'all').length}
              </span>
            ) : null
          }
        >
          Filtros Avançados
        </EnhancedButton>
        
        {/* Search Input */}
        <div className="flex-1 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Pesquisar por nome, localização ou tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50 backdrop-blur-sm border-border/50"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <EnhancedButton 
            variant="gradient" 
            size="sm" 
            onClick={handleSearch}
            leftIcon={<Search className="h-4 w-4" />}
          >
            Buscar
          </EnhancedButton>
        </div>
      </div>
        
      {/* Map Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6 text-sm">
        <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/30">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="font-medium text-foreground">Primário</span>
        </div>
        <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/30">
          <div className="w-3 h-3 bg-secondary rounded-full"></div>
          <span className="font-medium text-foreground">Secundário</span>
        </div>
        <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/30">
          <div className="w-3 h-3 bg-accent rounded-full"></div>
          <span className="font-medium text-foreground">Médio</span>
        </div>
        <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/30">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="font-medium text-foreground">Superior</span>
        </div>
        <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/30">
          <div className="w-3 h-3 bg-destructive rounded-full"></div>
          <span className="font-medium text-foreground">Técnico</span>
        </div>
      </div>

      {/* Enhanced Filters Panel */}
      {isOpen && (
        <Card className="mb-6 shadow-xl border-border/50 bg-card/80 backdrop-blur-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Filter className="h-5 w-5 text-primary" />
                </div>
                Filtros Avançados
              </CardTitle>
              <div className="flex items-center gap-2">
                <EnhancedButton 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  leftIcon={<X className="h-4 w-4" />}
                  className="text-destructive hover:text-destructive"
                >
                  Limpar
                </EnhancedButton>
                <EnhancedButton 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </EnhancedButton>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Province Filter */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  Província
                </label>
                <Select value={filters.province} onValueChange={(value) => handleFilterChange('province', value)}>
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Todas as províncias" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-md">
                    <SelectItem value="all">Todas as províncias</SelectItem>
                    {provinces.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Institution Type Filter */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <GraduationCap className="h-4 w-4 text-secondary" />
                  Nível de Ensino
                </label>
                <Select value={filters.institutionType} onValueChange={(value) => handleFilterChange('institutionType', value)}>
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Todos os níveis" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-md">
                    <SelectItem value="all">Todos os níveis</SelectItem>
                    {institutionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tuition Range Filter */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <DollarSign className="h-4 w-4 text-accent" />
                  Faixa de Propinas
                </label>
                <Select value={filters.tuitionRange} onValueChange={(value) => handleFilterChange('tuitionRange', value)}>
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Todas as faixas" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-md">
                    <SelectItem value="all">Todas as faixas</SelectItem>
                    {tuitionRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Apply Filters Button */}
            <div className="flex justify-center mt-6">
              <EnhancedButton 
                variant="gradient" 
                size="lg"
                onClick={() => setIsOpen(false)}
                leftIcon={<Filter className="h-5 w-5" />}
                className="w-full lg:w-auto"
              >
                Aplicar Filtros
              </EnhancedButton>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapFilters;
