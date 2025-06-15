
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface GoogleMapProps {
  height?: string;
  zoom?: number;
  center?: { lat: number; lng: number };
}

const DEFAULT_CENTER = { lat: -11.2027, lng: 17.8739 }; // Centro aproximado de Angola

const MAP_SCRIPT_ID = "google-maps-api-script"; // Centralize script ID

const GoogleMap: React.FC<GoogleMapProps> = ({
  height = "400px",
  zoom = 6,
  center = DEFAULT_CENTER,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Use ref to persist script owner information between renders/effect calls
  const scriptAddedByThisInstanceRef = useRef(false);

  useEffect(() => {
    let map: any = null;
    let isMounted = true;

    async function initializeMap() {
      // Busca a chave secreta
      const { data, error } = await supabase.functions.invoke("get-google-maps-key");
      console.log("[GoogleMap] Supabase invoke response:", { data, error });

      if (error || !data?.key) {
        toast({
          title: "Erro ao carregar chave do Google Maps",
          description:
            `Erro: ${error?.message ?? "Sem erro. Resposta recebida:"} ${JSON.stringify(data)}`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const apiKey = data.key;
      console.log("[GoogleMap] Google Maps API Key utilizada:", apiKey);

      let script = document.getElementById(MAP_SCRIPT_ID) as HTMLScriptElement | null;
      if (!window.google && !script) {
        script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=pt`;
        script.async = true;
        script.id = MAP_SCRIPT_ID;
        document.body.appendChild(script);
        scriptAddedByThisInstanceRef.current = true;

        script.onload = () => {
          if (isMounted && mapRef.current && window.google) {
            map = new window.google.maps.Map(mapRef.current, {
              center,
              zoom,
              disableDefaultUI: false,
            });
            setLoading(false);
          }
        };
        script.onerror = () => {
          toast({
            title: "Erro ao carregar Google Maps (script)",
            description: `Falha ao carregar script da API com a chave: ${apiKey}`,
            variant: "destructive",
          });
          setLoading(false);
        };
      } else if (mapRef.current && window.google) {
        map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          disableDefaultUI: false,
        });
        setLoading(false);
      }
    }

    initializeMap();

    return () => {
      isMounted = false;

      // Remove only if this instance added the script (avoid race conditions / double remove)
      if (scriptAddedByThisInstanceRef.current) {
        const script = document.getElementById(MAP_SCRIPT_ID) as HTMLScriptElement | null;
        if (script && script.parentNode === document.body) {
          document.body.removeChild(script);
        }
        scriptAddedByThisInstanceRef.current = false; // Reset for future mounts
      }
    };
    // eslint-disable-next-line
  }, [center.lat, center.lng, zoom]);

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
