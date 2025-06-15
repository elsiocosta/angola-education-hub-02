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

const GoogleMap: React.FC<GoogleMapProps> = ({
  height = "400px",
  zoom = 6,
  center = DEFAULT_CENTER,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const scriptAddedByThisInstance = useRef<boolean>(false);

  useEffect(() => {
    let map: any = null;
    let isMounted = true;

    async function initializeMap() {
      // Busca a chave secreta
      const { data, error } = await supabase.functions.invoke("get-google-maps-key");
      console.log("[GoogleMap] Supabase invoke response:", { data, error }); // Adicionado log

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

      // Carrega o script dinamicamente
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=pt`;
        script.async = true;
        scriptAddedByThisInstance.current = true;
        scriptRef.current = script;
        document.body.appendChild(script);

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
      } else {
        if (mapRef.current && window.google) {
          map = new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
            disableDefaultUI: false,
          });
        }
        setLoading(false);
      }
    }

    initializeMap();

    return () => {
      isMounted = false;
      // Only remove if this instance added the script
      if (scriptAddedByThisInstance.current && scriptRef.current) {
        // Only remove if the script is still in the document
        if (document.body.contains(scriptRef.current)) {
          scriptRef.current.remove();
        }
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
