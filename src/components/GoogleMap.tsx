
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useInstitutions } from "@/hooks/useInstitutions";

declare global {
  interface Window {
    google?: any;
    initGoogleMap?: () => void;
  }
  var google: any;
}

interface GoogleMapProps {
  height?: string;
  zoom?: number;
  center?: { lat: number; lng: number };
  showFilters?: boolean;
  showInstitutions?: boolean;
}

const DEFAULT_CENTER = { lat: -11.2027, lng: 17.8739 };

const GoogleMap: React.FC<GoogleMapProps> = ({
  height = "400px",
  zoom = 6,
  center = DEFAULT_CENTER,
  showFilters = false,
  showInstitutions = false,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const { toast } = useToast();
  const { data: institutions } = useInstitutions();

  // Adicionar marcadores de instituições no mapa
  const addInstitutionMarkers = () => {
    if (!mapInstanceRef.current || !institutions || !window.google) return;

    // Limpar marcadores existentes
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    institutions.forEach(institution => {
      if (institution.latitude && institution.longitude) {
        const marker = new window.google.maps.Marker({
          position: { lat: institution.latitude, lng: institution.longitude },
          map: mapInstanceRef.current,
          title: institution.name,
          icon: {
            url: getMarkerIcon(institution.institution_type),
            scaledSize: new window.google.maps.Size(32, 32),
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-3 max-w-xs">
              <h3 class="font-bold text-lg mb-2">${institution.name}</h3>
              <p class="text-sm text-gray-600 mb-1">${getInstitutionTypeLabel(institution.institution_type)}</p>
              ${institution.address ? `<p class="text-sm mb-2">${institution.address}</p>` : ''}
              ${institution.phone ? `<p class="text-sm mb-1">📞 ${institution.phone}</p>` : ''}
              ${institution.email ? `<p class="text-sm mb-2">✉️ ${institution.email}</p>` : ''}
              <button 
                onclick="window.location.href='/institution/${institution.id}'" 
                class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Ver Detalhes
              </button>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });

        markersRef.current.push(marker);
      }
    });
  };

  const getMarkerIcon = (type: string) => {
    const colors = {
      primary: '#3B82F6',      // Azul
      secondary: '#10B981',    // Verde  
      high_school: '#8B5CF6',  // Roxo
      university: '#F59E0B',   // Laranja
      technical: '#EF4444'     // Vermelho
    };
    
    const color = colors[type as keyof typeof colors] || '#6B7280';
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="${color}" stroke="white" stroke-width="2"/>
        <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">🎓</text>
      </svg>
    `)}`;
  };

  const getInstitutionTypeLabel = (type: string) => {
    const labels = {
      primary: 'Ensino Primário',
      secondary: 'Ensino Secundário', 
      high_school: 'Ensino Médio',
      university: 'Ensino Superior',
      technical: 'Ensino Técnico'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const loadGoogleMapsScript = async (apiKey: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=pt&loading=async`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log("[GoogleMap] Script loaded successfully");
        resolve();
      };
      
      script.onerror = () => {
        console.error("[GoogleMap] Script failed to load");
        reject(new Error("Failed to load Google Maps script"));
      };

      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      try {
        console.log("[GoogleMap] Starting initialization");
        
        // If Google Maps is already loaded, just create the map
        if (window.google?.maps && mapRef.current && isMounted) {
          console.log("[GoogleMap] Google Maps already available, creating map");
          mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
            disableDefaultUI: false,
            mapTypeId: 'satellite',
            mapTypeControl: true,
            mapTypeControlOptions: {
              style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: window.google.maps.ControlPosition.TOP_RIGHT,
              mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
            }
          });
          setIsLoading(false);
          
          if (showInstitutions) {
            addInstitutionMarkers();
          }
          return;
        }

        // Get API key from Supabase
        console.log("[GoogleMap] Fetching API key");
        const { data, error: apiError } = await supabase.functions.invoke("get-google-maps-key");
        
        if (apiError || !data?.key) {
          throw new Error(`Failed to get API key: ${apiError?.message || 'No key received'}`);
        }

        // Load script with proper async loading
        console.log("[GoogleMap] Loading Google Maps script");
        await loadGoogleMapsScript(data.key);

        // Wait for Google Maps to be available
        let attempts = 0;
        while (!window.google?.maps && attempts < 50 && isMounted) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }

        if (!window.google?.maps) {
          throw new Error("Google Maps failed to initialize after loading");
        }

        if (mapRef.current && isMounted) {
          console.log("[GoogleMap] Creating map instance");
          mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
            disableDefaultUI: false,
            mapTypeId: 'satellite',
            mapTypeControl: true,
            mapTypeControlOptions: {
              style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: window.google.maps.ControlPosition.TOP_RIGHT,
              mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
            }
          });
          setIsLoading(false);
          
          if (showInstitutions) {
            addInstitutionMarkers();
          }
        }

      } catch (err) {
        console.error("[GoogleMap] Error during initialization:", err);
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
          setError(errorMessage);  
          setIsLoading(false);
          toast({
            title: "Erro ao carregar Google Maps",
            description: errorMessage,
            variant: "destructive",
          });
        }
      }
    };

    initializeMap();

    // Cleanup function
    return () => {
      console.log("[GoogleMap] Component unmounting");
      isMounted = false;
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      mapInstanceRef.current = null;
    };
  }, [center.lat, center.lng, zoom, toast, showInstitutions]);

  // Efeito para atualizar marcadores quando as instituições mudarem
  useEffect(() => {
    if (showInstitutions && institutions && mapInstanceRef.current) {
      addInstitutionMarkers();
    }
  }, [institutions, showInstitutions]);

  if (error) {
    return (
      <div
        className="w-full rounded-lg border border-red-200 shadow bg-red-50 flex items-center justify-center"
        style={{ height, minHeight: "300px" }}
      >
        <div className="text-red-600 font-bold text-center p-4">
          <div>Erro ao carregar mapa</div>
          <div className="text-sm mt-2 text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height, minHeight: "300px" }}>
      <div
        ref={mapRef}
        className="w-full h-full rounded-lg border border-gray-200 shadow"
        style={{ background: "#e5f4ff" }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-lg">
          <div className="text-blue-600 font-bold">Carregando mapa...</div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
