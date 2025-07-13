
import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface GoogleMapProps {
  institutions: Array<{
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    institution_type: string;
    province: string;
  }>;
  onMarkerClick?: (institution: any) => void;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ 
  institutions = [], 
  onMarkerClick,
  className = "w-full h-96"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        // Verificar se o Google Maps já está carregado
        if (!window.google || !window.google.maps) {
          setError('Google Maps não foi carregado corretamente');
          setIsLoading(false);
          return;
        }

        if (!mapRef.current) return;

        // Configurações do mapa
        const mapOptions: google.maps.MapOptions = {
          center: { lat: -11.2027, lng: 17.8739 }, // Centro de Angola
          zoom: 6,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        };

        // Criar mapa
        mapInstance.current = new google.maps.Map(mapRef.current, mapOptions);

        // Limpar marcadores existentes
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Adicionar marcadores para instituições
        institutions.forEach((institution) => {
          if (institution.latitude && institution.longitude) {
            const marker = new google.maps.Marker({
              position: { lat: institution.latitude, lng: institution.longitude },
              map: mapInstance.current,
              title: institution.name,
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="12" fill="#3B82F6" stroke="#ffffff" stroke-width="2"/>
                    <text x="15" y="19" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">📚</text>
                  </svg>
                `),
                scaledSize: new google.maps.Size(30, 30)
              }
            });

            // Adicionar evento de clique
            marker.addListener('click', () => {
              if (onMarkerClick) {
                onMarkerClick(institution);
              }
            });

            markersRef.current.push(marker);
          }
        });

        setIsLoading(false);
        setError(null);
      } catch (err) {
        console.error('Erro ao inicializar mapa:', err);
        setError('Erro ao carregar o mapa');
        setIsLoading(false);
      }
    };

    initializeMap();
  }, [institutions, onMarkerClick]);

  if (isLoading) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Carregando mapa...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
        <div className="text-center">
          <p className="text-red-600 mb-2">Erro ao carregar mapa</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className={className} />;
};

export default GoogleMap;
