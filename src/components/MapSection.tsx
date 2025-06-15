import React from 'react';
import { MapPin, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GoogleMap from "./GoogleMap";

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

          {/* Google Map integração */}
          <div className="relative">
            <GoogleMap height="384px" /> {/* 384px ~ h-96 */}
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
