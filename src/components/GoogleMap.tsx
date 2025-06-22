
// Declare the 'google' namespace for TypeScript to avoid errors when accessing Google Maps API dynamically.
declare global {
  interface Window {
    google?: any;
  }
  // This type avoids errors when referencing 'google.maps'
  // Add only what is needed, you may expand as needed.
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

const DEFAULT_CENTER = { lat: -11.2027, lng: 17.8739 }; // Centro aproximado de Angola

// Global promise to track Google Maps loading
let googleMapsPromise: Promise<void> | null = null;

const GoogleMap: React.FC<GoogleMapProps> = ({
  height = "400px",
  zoom = 6,
  center = DEFAULT_CENTER,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadGoogleMapsScript = async (): Promise<void> => {
    // If Google Maps is already loaded, return immediately
    if (window.google && window.google.maps) {
      return Promise.resolve();
    }

    // If we're already loading, return the existing promise
    if (googleMapsPromise) {
      return googleMapsPromise;
    }

    // Check if script already exists in the document
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve();
        } else {
          const checkGoogle = setInterval(() => {
            if (window.google && window.google.maps) {
              clearInterval(checkGoogle);
              resolve();
            }
          }, 100);
          
          // Timeout after 10 seconds
          setTimeout(() => {
            clearInterval(checkGoogle);
            reject(new Error("Timeout loading Google Maps"));
          }, 10000);
        }
      });
    }

    googleMapsPromise = new Promise<void>(async (resolve, reject) => {
      try {
        // Fetch API key
        const { data, error } = await supabase.functions.invoke("get-google-maps-key");
        console.log("[GoogleMap] Supabase invoke response:", { data, error });

        if (error || !data?.key) {
          const errorMsg = `Erro: ${error?.message ?? "Sem erro. Resposta recebida:"} ${JSON.stringify(data)}`;
          reject(new Error(errorMsg));
          return;
        }

        const apiKey = data.key;
        console.log("[GoogleMap] Google Maps API Key utilizada:", apiKey);

        // Create and load script
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=pt&callback=initGoogleMaps`;
        script.async = true;
        script.defer = true;

        // Create global callback
        (window as any).initGoogleMaps = () => {
          resolve();
          delete (window as any).initGoogleMaps;
        };

        script.onerror = () => {
          reject(new Error(`Falha ao carregar script da API com a chave: ${apiKey}`));
          delete (window as any).initGoogleMaps;
        };

        document.head.appendChild(script);
      } catch (err) {
        reject(err);
      }
    });

    return googleMapsPromise;
  };

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      try {
        setLoading(true);
        setError(null);

        await loadGoogleMapsScript();

        if (!isMounted) return;

        if (mapRef.current && window.google && window.google.maps) {
          // Clean up existing map instance
          if (mapInstanceRef.current) {
            mapInstanceRef.current = null;
          }

          mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
            disableDefaultUI: false,
          });

          if (isMounted) {
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("[GoogleMap] Erro ao inicializar mapa:", err);
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
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

    initializeMap();

    return () => {
      isMounted = false;
      // Just null out the map reference, don't try to manipulate DOM
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
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
