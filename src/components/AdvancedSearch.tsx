
import React, { useState } from 'react';
import { Search, Filter, MapPin, GraduationCap, Building, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface AdvancedSearchProps {
  onSearch?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  searchTerm: string;
  province: string;
  level: string;
  institutionType: string;
  tuitionRange: string;
  hasVideo: boolean;
  hasOnlineApplication: boolean;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    province: '',
    level: '',
    institutionType: '',
    tuitionRange: '',
    hasVideo: false,
    hasOnlineApplication: false
  });

  const provinces = [
    'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 
    'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla', 
    'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico', 
    'Namibe', 'Uíge', 'Zaire'
  ];

  const educationLevels = [
    'Ensino Primário',
    'Ensino Secundário', 
    'Ensino Médio',
    'Ensino Médio Técnico',
    'Ensino Superior'
  ];

  const institutionTypes = [
    'Escola Pública',
    'Escola Privada',
    'Instituto Técnico',
    'Universidade Pública',
    'Universidade Privada'
  ];

  const tuitionRanges = [
    'Gratuito',
    'Até 10.000 KZ',
    '10.000 - 25.000 KZ',
    '25.000 - 50.000 KZ',
    'Mais de 50.000 KZ'
  ];

  const handleSearch = () => {
    onSearch?.(filters);
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      province: '',
      level: '',
      institutionType: '',
      tuitionRange: '',
      hasVideo: false,
      hasOnlineApplication: false
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Busca Avançada de Instituições
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Busca Principal */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Nome da instituição, curso ou localização..."
            value={filters.searchTerm}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Filtros Rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={filters.province} onValueChange={(value) => setFilters({ ...filters, province: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a província" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as províncias</SelectItem>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.level} onValueChange={(value) => setFilters({ ...filters, level: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Nível de ensino" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os níveis</SelectItem>
              {educationLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="w-full"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros Avançados
          </Button>
        </div>

        {/* Filtros Avançados */}
        {isAdvancedOpen && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={filters.institutionType} onValueChange={(value) => setFilters({ ...filters, institutionType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de instituição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  {institutionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.tuitionRange} onValueChange={(value) => setFilters({ ...filters, tuitionRange: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Faixa de propinas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as faixas</SelectItem>
                  {tuitionRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasVideo"
                  checked={filters.hasVideo}
                  onCheckedChange={(checked) => setFilters({ ...filters, hasVideo: checked as boolean })}
                />
                <label htmlFor="hasVideo" className="text-sm">Com vídeo institucional</label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasOnlineApplication"
                  checked={filters.hasOnlineApplication}
                  onCheckedChange={(checked) => setFilters({ ...filters, hasOnlineApplication: checked as boolean })}
                />
                <label htmlFor="hasOnlineApplication" className="text-sm">Candidatura online</label>
              </div>
            </div>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="flex gap-2">
          <Button onClick={handleSearch} className="flex-1">
            <Search className="h-4 w-4 mr-2" />
            Pesquisar
          </Button>
          <Button variant="outline" onClick={clearFilters}>
            Limpar Filtros
          </Button>
        </div>

        {/* Tags de Filtros Ativos */}
        <div className="flex flex-wrap gap-2">
          {filters.province && filters.province !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {filters.province}
            </Badge>
          )}
          {filters.level && filters.level !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <GraduationCap className="h-3 w-3" />
              {filters.level}
            </Badge>
          )}
          {filters.institutionType && filters.institutionType !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Building className="h-3 w-3" />
              {filters.institutionType}
            </Badge>
          )}
          {filters.hasVideo && (
            <Badge variant="secondary">Com vídeo</Badge>
          )}
          {filters.hasOnlineApplication && (
            <Badge variant="secondary">Candidatura online</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearch;
