
import React, { useState } from 'react';
import { MapPin, Satellite, Navigation } from 'lucide-react';
import GoogleMap from "./GoogleMap";
import MapFilters, { FilterState } from "./MapFilters";
import { useInstitutionStats } from '@/hooks/useInstitutions';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import mapImage from '@/assets/map-interactive.jpg';

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
    <section className="py-16 md:py-24 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <img src={mapImage} alt="" className="w-full h-full object-cover" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Satellite className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-semibold text-primary">Vista Satélite Disponível</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Mapa Interativo das 
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Instituições
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Explore geograficamente todas as escolas, institutos e universidades registradas em Angola.
            Use filtros avançados, busca por localização e visualize em tempo real.
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
          {/* Enhanced Map Controls */}
          <div className="p-6 md:p-8 border-b border-border/30 bg-card/50">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Navigation className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Controles do Mapa</h3>
                  <p className="text-sm text-muted-foreground">Filtros avançados e pesquisa inteligente</p>
                </div>
              </div>
              
              <EnhancedButton 
                variant="outline" 
                size="sm"
                leftIcon={<MapPin className="h-4 w-4" />}
                onClick={() => window.open('/search', '_blank')}
              >
                Ver Lista Completa
              </EnhancedButton>
            </div>
            
            <MapFilters 
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
            />
          </div>

          {/* Enhanced Google Map with satellite view */}
          <div className="relative">
            <GoogleMap 
              className="w-full"
              height="600px"
              showInstitutions={true}
              showFilters={true}
              zoom={6}
            />
            
            {/* Map overlay info */}
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-foreground">
                  {stats?.total || 0} Instituições Mapeadas
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Statistics Grid */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-muted/30 to-card border-t border-border/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-primary/10 rounded-2xl p-6 mb-3 group-hover:bg-primary/20 transition-colors">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stats?.byType?.primary || 0}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">Ensino Primário</div>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: `${(stats?.byType?.primary || 0) / (stats?.total || 1) * 100}%`}}></div>
                </div>
              </div>
              
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-secondary/10 rounded-2xl p-6 mb-3 group-hover:bg-secondary/20 transition-colors">
                  <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">
                    {stats?.byType?.secondary || 0}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">Ensino Secundário</div>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{width: `${(stats?.byType?.secondary || 0) / (stats?.total || 1) * 100}%`}}></div>
                </div>
              </div>
              
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-accent/10 rounded-2xl p-6 mb-3 group-hover:bg-accent/20 transition-colors">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-1">
                    {stats?.byType?.high_school || 0}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">Ensino Médio</div>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{width: `${(stats?.byType?.high_school || 0) / (stats?.total || 1) * 100}%`}}></div>
                </div>
              </div>
              
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-success/10 rounded-2xl p-6 mb-3 group-hover:bg-success/20 transition-colors">
                  <div className="text-2xl md:text-3xl font-bold text-success mb-1">
                    {stats?.byType?.university || 0}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">Ensino Superior</div>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{width: `${(stats?.byType?.university || 0) / (stats?.total || 1) * 100}%`}}></div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <EnhancedButton 
                variant="gradient" 
                size="sm"
                leftIcon={<MapPin className="h-4 w-4" />}
                onClick={() => window.location.href = '/search'}
              >
                Busca Avançada
              </EnhancedButton>
              
              <EnhancedButton 
                variant="outline" 
                size="sm"
                leftIcon={<Satellite className="h-4 w-4" />}
                onClick={() => {
                  // Toggle satellite view functionality
                  console.log('Toggle satellite view');
                }}
              >
                Vista Satélite
              </EnhancedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
