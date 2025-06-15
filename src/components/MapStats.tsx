
import React from "react";

const MapStats: React.FC = () => (
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
);

export default MapStats;
