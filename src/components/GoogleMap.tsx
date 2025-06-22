
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
}

const DEFAULT_CENTER = { lat: -11.2027, lng: 17.8739 };

const GoogleMap: React.FC<GoogleMapProps> = ({
  height = "400px",
  zoom = 6,
  center = DEFAULT_CENTER,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const { toast } = useToast();

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
          });
          setIsLoading(false);
          return;
        }

        // Get API key from Supabase
        console.log("[GoogleMap] Fetching API key");
        const { data, error: apiError } = await supabase.functions.invoke("get-google-maps-key");
        
        if (apiError || !data?.key) {
          throw new Error(`Failed to get API key: ${apiError?.message || 'No key received'}`);
        }

        // Check if script is already in DOM
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
          console.log("[GoogleMap] Script already exists, waiting for load");
          // Wait for Google Maps to be available
          let attempts = 0;
          while (!window.google?.maps && attempts < 50 && isMounted) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
          }
          
          if (window.google?.maps && mapRef.current && isMounted) {
            mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
              center,
              zoom,
              disableDefaultUI: false,
            });
            setIsLoading(false);
          }
          return;
        }

        // Create and load script
        console.log("[GoogleMap] Loading Google Maps script");
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.key}&language=pt`;
        script.async = true;
        script.defer = true;

        const loadPromise = new Promise<void>((resolve, reject) => {
          script.onload = () => {
            console.log("[GoogleMap] Script loaded successfully");
            resolve();
          };
          script.onerror = () => {
            console.error("[GoogleMap] Script failed to load");
            reject(new Error("Failed to load Google Maps script"));
          };
        });

        document.head.appendChild(script);
        await loadPromise;

        // Wait for Google Maps to be available and create map
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
          });
          setIsLoading(false);
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
      // Don't try to manipulate the DOM or clean up the map instance
      // Let React handle the DOM cleanup naturally
      mapInstanceRef.current = null;
    };
  }, [center.lat, center.lng, zoom, toast]);

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
