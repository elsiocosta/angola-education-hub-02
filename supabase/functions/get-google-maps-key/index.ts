
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (_req: Request) => {
  const key = Deno.env.get("GOOGLE_MAPS_API_KEY");
  return new Response(
    JSON.stringify({ key }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
});
