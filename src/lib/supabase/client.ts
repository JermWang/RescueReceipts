import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getBrowserSupabase() {
  if (!url || !anonKey) throw new Error("Supabase env vars are missing");
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

export function hasSupabasePublicEnv(): boolean {
  return Boolean(url && anonKey);
}
