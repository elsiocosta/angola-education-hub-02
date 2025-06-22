
declare global {
  interface Window {
    google?: any;
  }
  var google: any;
}

import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    
    const initMap = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if Google Maps is already available
        if (window.google && window.google.maps) {
          if (mounted && mapRef.current) {
            new window.google.maps.Map(mapRef.current, {
              center,
              zoom,
              disableDefaultUI: false,
            });
            setLoading(false);
          }
          return;
        }

        // Get API key
        const { data, error } = await supabase.functions.invoke("get-google-maps-key");
        console.log("[GoogleMap] API response:", { data, error });

        if (error || !data?.key) {
          throw new Error(`API Key error: ${error?.message || 'No key received'}`);
        }

        // Load script if not already loaded
        if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${data.key}&language=pt`;
            script.async = true;
            
            script.onload = () => {
              console.log("[GoogleMap] Script loaded successfully");
              resolve();
            };
            
            script.onerror = () => {
              reject(new Error("Failed to load Google Maps script"));
            };
            
            document.head.appendChild(script);
          });
        }

        // Wait for Google Maps to be available
        let attempts = 0;
        while (!window.google?.maps && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }

        if (!window.google?.maps) {
          throw new Error("Google Maps failed to initialize");
        }

        // Initialize map if component is still mounted
        if (mounted && mapRef.current) {
          new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
            disableDefaultUI: false,
          });
          setLoading(false);
        }

      } catch (err) {
        console.error("[GoogleMap] Error:", err);
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : "Unknown error";
          setError(errorMessage);
          setLoading(false);
          toast({
            title: "Erro ao carregar Google Maps",
            description: errorMessage,
            variant: "destructive",
          });
        }
      }
    };

    initMap();

    return () => {
      mounted = false;
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
    <div
      ref={mapRef}
      className="w-full rounded-lg border border-gray-200 shadow"
      style={{ height, minHeight: "300px", background: "#e5f4ff", position: "relative" }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <div className="text-blue-600 font-bold">Carregando mapa...</div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
