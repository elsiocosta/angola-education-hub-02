
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Debug para variáveis ausentes
if (!supabaseUrl || !supabaseAnonKey) {
  // Isto NÃO quebra o build, mas alerta pelo console e com throw para debug em dev
  console.error(
    '❌ Supabase URL ou Anon Key não definidos!\nConfira se VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão configuradas.'
  );
  throw new Error('Supabase environment variables are missing!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
