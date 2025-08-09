
import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import mapImage from '@/assets/map-interactive.jpg';

interface GoogleMapProps {
  institutions?: Array<{
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    institution_type: string;
    province: string;
  }>;
  onMarkerClick?: (institution: any) => void;
  className?: string;
  height?: string;
  showInstitutions?: boolean;
  showFilters?: boolean;
  zoom?: number;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ 
  institutions = [], 
  onMarkerClick,
  className = "w-full h-96",
  height,
  showInstitutions = true,
  showFilters = false,
  zoom = 6
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Apply height style if provided
  const finalClassName = height ? `${className.replace('h-96', '')} ${height}` : className;
  const style = height ? { height } : undefined;

  useEffect(() => {
    const initializeMap = async () => {
      console.log('[GoogleMap] Starting initialization');
      
      try {
        // Check if Google Maps is loaded
        if (typeof window === 'undefined' || !(window as any).google || !(window as any).google.maps) {
          console.log('[GoogleMap] Google Maps not available');
          setError('Google Maps não foi carregado corretamente');
          setIsLoading(false);
          return;
        }

        console.log('[GoogleMap] Google Maps already available, creating map');

        if (!mapRef.current) return;

        // Map configuration
        const mapOptions = {
          center: { lat: -11.2027, lng: 17.8739 }, // Centro de Angola
          zoom: zoom,
          mapTypeId: (window as any).google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        };

        // Create map
        mapInstance.current = new (window as any).google.maps.Map(mapRef.current, mapOptions);

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Add markers for institutions if showInstitutions is true
        if (showInstitutions && institutions.length > 0) {
          institutions.forEach((institution) => {
            if (institution.latitude && institution.longitude) {
              const marker = new (window as any).google.maps.Marker({
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
                  scaledSize: new (window as any).google.maps.Size(30, 30)
                }
              });

              // Add click event
              marker.addListener('click', () => {
                if (onMarkerClick) {
                  onMarkerClick(institution);
                }
              });

              markersRef.current.push(marker);
            }
          });
        }

        setIsLoading(false);
        setError(null);
        console.log('[GoogleMap] Map initialized successfully');
      } catch (err) {
        console.error('Erro ao inicializar mapa:', err);
        setError('Erro ao carregar o mapa');
        setIsLoading(false);
      }
    };

    initializeMap();

    // Cleanup on unmount
    return () => {
      console.log('[GoogleMap] Component unmounting');
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [institutions, onMarkerClick, showInstitutions, zoom]);

  if (isLoading) {
    return (
      <div className={`${finalClassName} flex items-center justify-center bg-muted rounded-lg`} style={style}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-muted-foreground">Carregando mapa...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${finalClassName} flex items-center justify-center bg-muted rounded-lg`} style={style}>
        <div className="text-center p-4">
          <img src={mapImage} alt="Mapa interativo de Angola (imagem estática)" className="w-full h-48 object-cover rounded-md mb-3" loading="lazy" />
          <p className="text-destructive mb-1">Erro ao carregar mapa</p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className={finalClassName} style={style} />;
};

export default GoogleMap;
