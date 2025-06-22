
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { useInstitutions } from '@/hooks/useInstitutions';
import InstitutionCard from '@/components/InstitutionCard';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedType, setSelectedType] = useState('');
  
  const { data: institutions = [], isLoading } = useInstitutions();

  const provinces = [
    'Luanda', 'Benguela', 'Huambo', 'Lobito', 'Malanje', 'Cabinda', 
    'Kwanza Norte', 'Kwanza Sul', 'Moxico', 'Namibe', 'Uíge', 
    'Zaire', 'Lunda Norte', 'Lunda Sul', 'Cuanza Norte', 'Cuanza Sul',
    'Bié', 'Cuando Cubango', 'Cunene', 'Huíla'
  ];

  const institutionTypes = [
    { value: 'primary', label: 'Ensino Primário' },
    { value: 'secondary', label: 'Ensino Secundário' },
    { value: 'high_school', label: 'Ensino Médio' },
    { value: 'university', label: 'Universitário' },
    { value: 'technical', label: 'Técnico' }
  ];

  const filteredInstitutions = institutions.filter(institution => {
    const matchesSearch = !searchTerm || 
      institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProvince = !selectedProvince || selectedProvince === 'all' || institution.province === selectedProvince;
    const matchesType = !selectedType || selectedType === 'all' || institution.institution_type === selectedType;

    return matchesSearch && matchesProvince && matchesType;
  });

  return (
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Pesquisar Instituições
            </h1>
            <p className="text-gray-600 mb-6">
              Encontre a instituição de ensino perfeita para si em Angola
            </p>

            {/* Filtros de Pesquisa */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Pesquisar por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar província" />
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

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de ensino" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  {institutionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedProvince('');
                  setSelectedType('');
                }}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Limpar</span>
              </Button>
            </div>
          </div>

          {/* Resultados */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando instituições...</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  {filteredInstitutions.length} instituição(ões) encontrada(s)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInstitutions.map((institution) => (
                  <InstitutionCard 
                    key={institution.id} 
                    institution={institution}
                    onViewDetails={() => {
                      window.location.href = `/institution/${institution.id}`;
                    }}
                  />
                ))}
              </div>

              {filteredInstitutions.length === 0 && (
                <div className="text-center py-12">
                  <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhuma instituição encontrada
                  </h3>
                  <p className="text-gray-600">
                    Tente ajustar os filtros de pesquisa para encontrar mais resultados.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
