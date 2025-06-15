
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (_req: Request) => {
  const key = Deno.env.get("GOOGLE_MAPS_API_KEY");
  console.log("[get-google-maps-key] key encontrada:", key); // Log para depuração
  return new Response(
    JSON.stringify({ key }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
});
