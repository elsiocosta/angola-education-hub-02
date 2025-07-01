
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import GoogleMap from "./GoogleMap";
import MapFilters, { FilterState } from "./MapFilters";
import { useInstitutionStats } from '@/hooks/useInstitutions';

const MapSection = () => {
  const [mapFilters, setMapFilters] = useState<FilterState>({
    province: '',
    institutionType: '',
    tuitionRange: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { data: stats } = useInstitutionStats();

  const handleFilterChange = (filters: FilterState) => {
    setMapFilters(filters);
    console.log('Filtros aplicados:', filters);
    // Aqui você implementaria a lógica para filtrar as instituições no mapa
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log('Pesquisar por:', term);
    // Aqui você implementaria a lógica de pesquisa no mapa
  };

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Mapa Interativo das Instituições
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore geograficamente todas as escolas, institutos e universidades registradas na plataforma
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Map Controls and Filters */}
          <div className="p-4 md:p-6 border-b border-gray-100">
            <MapFilters 
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
            />
          </div>

          {/* Google Map integração com satélite e instituições */}
          <div className="relative">
            <GoogleMap 
              height="400px" 
              showInstitutions={true}
              showFilters={true}
            />
          </div>

          {/* Map Stats */}
          <div className="p-4 md:p-6 bg-gray-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-blue-600">
                  {stats?.byType?.primary || 0}
                </div>
                <div className="text-sm text-gray-600">Ensino Primário</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-green-600">
                  {stats?.byType?.secondary || 0}
                </div>
                <div className="text-sm text-gray-600">Ensino Secundário</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-purple-600">
                  {stats?.byType?.high_school || 0}
                </div>
                <div className="text-sm text-gray-600">Ensino Médio</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-orange-600">
                  {stats?.byType?.university || 0}
                </div>
                <div className="text-sm text-gray-600">Ensino Superior</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
