
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, role, inviteUrl } = await req.json();

    const response = await resend.emails.send({
      from: "AngoEducation <onboarding@resend.dev>",
      to: [email],
      subject: "Convite para se juntar à instituição no AngoEducation",
      html: `
        <div style="font-family:sans-serif">
            <h2>Olá, ${name || "convidado"}!</h2>
            <p>Você foi convidado para o cargo de <strong>${role}</strong> em nossa instituição no AngoEducation.</p>
            <p>Para criar sua conta, clique no botão abaixo ou copie o link manualmente:</p>
            <a href="${inviteUrl}" style="display:inline-block;margin:20px 0;padding:10px 20px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none">Aceitar Convite</a>
            <p style="font-size:12px">Link: <br/>${inviteUrl}</p>
            <br/>
            <p>Esse convite é válido por 48 horas.</p>
            <p>Se não reconhece esse e-mail, por favor ignore.</p>
            <hr/>
            <small>&copy; AngoEducation</small>
        </div>
      `,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return new Response(
      JSON.stringify({ status: "ok", messageId: response.data?.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
