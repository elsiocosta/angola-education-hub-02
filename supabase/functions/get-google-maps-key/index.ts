
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    // Preflight CORS support
    return new Response(null, { headers: corsHeaders });
  }

  const key = Deno.env.get("GOOGLE_MAPS_API_KEY") ?? "";
  console.log("[get-google-maps-key] key encontrada:", key);

  return new Response(
    JSON.stringify({ key }),
    {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      },
    }
  );
});
