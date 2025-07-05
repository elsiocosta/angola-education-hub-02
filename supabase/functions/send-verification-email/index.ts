
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log(`${req.method} ${req.url}`)

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found')
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      )
    }

    const requestBody = await req.json()
    console.log('Request body:', requestBody)
    
    const { email, code, userType } = requestBody

    if (!email || !code || !userType) {
      console.error('Missing required fields:', { email: !!email, code: !!code, userType: !!userType })
      return new Response(
        JSON.stringify({ error: 'Missing required fields: email, code, userType' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    console.log('Sending email to:', email)

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Plataforma Educativa <noreply@resend.dev>',
        to: [email],
        subject: 'Código de Verificação - Plataforma Educativa',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin-bottom: 10px;">Plataforma Educativa</h1>
              <h2 style="color: #374151; font-weight: normal;">Verificação de Email</h2>
            </div>
            
            <div style="background: #f8fafc; padding: 25px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0 0 15px 0; color: #374151;">
                Olá! Seu código de verificação para criar conta como <strong>${userType === 'visitor' ? 'Visitante' : 'Instituição'}</strong> é:
              </p>
              <div style="background: #ffffff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 2px dashed #e5e7eb;">
                <span style="font-size: 36px; font-weight: bold; color: #1f2937; letter-spacing: 8px; font-family: 'Courier New', monospace;">${code}</span>
              </div>
              <p style="margin: 15px 0 0 0; color: #6b7280; font-size: 14px;">
                ⏰ Este código expira em 10 minutos
              </p>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Se você não solicitou este código, pode ignorar este email com segurança.
              </p>
              <p style="color: #6b7280; font-size: 12px; margin: 10px 0 0 0;">
                © 2025 Plataforma Educativa - Conectando estudantes às melhores instituições de Angola
              </p>
            </div>
          </div>
        `,
      }),
    })

    console.log('Resend API response status:', res.status)
    
    if (!res.ok) {
      const errorText = await res.text()
      console.error('Resend API error:', errorText)
      throw new Error(`Resend API error: ${res.status} - ${errorText}`)
    }

    const responseData = await res.json()
    console.log('Email sent successfully:', responseData)

    return new Response(
      JSON.stringify({ success: true, id: responseData.id }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        details: error.toString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
