
import React from 'react';
import { MapPin, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MapSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mapa Interativo das Instituições
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore geograficamente todas as escolas, institutos e universidades registradas na plataforma
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Map Controls */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="border-gray-200">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200">
                  <Search className="h-4 w-4 mr-2" />
                  Pesquisar no Mapa
                </Button>
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
                  Ensino Superior
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">Mapa Interativo</h3>
                <p className="text-gray-600 max-w-md">
                  Aqui será exibido o mapa interativo com todas as instituições de ensino 
                  espalhadas pelas 18 províncias de Angola
                </p>
                <Button className="mt-4 bg-gradient-to-r from-blue-600 to-green-600">
                  Ver Mapa Completo
                </Button>
              </div>
            </div>

            {/* Sample markers */}
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </div>

          {/* Map Stats */}
          <div className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">450</div>
                <div className="text-sm text-gray-600">Ensino Primário</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">320</div>
                <div className="text-sm text-gray-600">Ensino Secundário</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">180</div>
                <div className="text-sm text-gray-600">Ensino Médio Técnico</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">85</div>
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
