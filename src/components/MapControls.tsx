
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

const MapControls: React.FC = () => {
  return (
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
  );
};

export default MapControls;
