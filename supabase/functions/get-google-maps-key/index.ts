
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const key = Deno.env.get("GOOGLE_MAPS_API_KEY");
  console.log("[get-google-maps-key] key encontrada:", key); // Log para depuração
  
  return new Response(
    JSON.stringify({ key }),
    {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    }
  );
});
