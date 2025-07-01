
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Filter, Search, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
    province: '',
    institutionType: '',
    tuitionRange: ''
  });

  const provinces = [
    'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango',
    'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla',
    'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico',
    'Namibe', 'Uíge', 'Zaire', 'Icolo e Bengo', 'Moxico Leste', 'Morimbo'
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
    const clearedFilters = { province: '', institutionType: '', tuitionRange: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="relative">
      {/* Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
            {(filters.province || filters.institutionType || filters.tuitionRange) && (
              <span className="ml-2 bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {[filters.province, filters.institutionType, filters.tuitionRange].filter(Boolean).length}
              </span>
            )}
          </Button>
          
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Pesquisar instituições..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 border-gray-200"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button variant="outline" size="sm" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            Ensino Primário
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            Ensino Secundário
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            Ensino Médio
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            Ensino Superior
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            Ensino Técnico
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {isOpen && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filtros Avançados</h3>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-red-600"
                >
                  Limpar Todos
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Province Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Província
                </label>
                <Select value={filters.province} onValueChange={(value) => handleFilterChange('province', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as províncias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as províncias</SelectItem>
                    {provinces.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Institution Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível de Ensino
                </label>
                <Select value={filters.institutionType} onValueChange={(value) => handleFilterChange('institutionType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os níveis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os níveis</SelectItem>
                    {institutionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tuition Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Faixa de Propinas
                </label>
                <Select value={filters.tuitionRange} onValueChange={(value) => handleFilterChange('tuitionRange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as faixas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as faixas</SelectItem>
                    {tuitionRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapFilters;
