import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (supabaseUrl == null || supabaseAnonKey == null) {
  throw Error(
    `[Supabase] Failed initialize client -> supabaseUrl: ${supabaseUrl} / supabaseAnonKey: ${supabaseAnonKey}`
  );
}

export const api = createClient(supabaseUrl, supabaseAnonKey);
