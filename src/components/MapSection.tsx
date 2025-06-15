import React from 'react';
import { MapPin, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GoogleMap from "./GoogleMap";
import MapControls from "./MapControls";
import MapStats from "./MapStats";

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
          <MapControls />
          <div className="relative">
            <GoogleMap height="384px" />
          </div>
          <MapStats />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
