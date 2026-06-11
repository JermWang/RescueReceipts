import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function hasSupabaseServerEnv(): boolean {
  return Boolean(url && anon);
}

function isPlausibleJwt(v?: string): boolean {
  if (!v) return false;
  if (v.startsWith("PASTE_")) return false;
  return v.startsWith("eyJ") || v.startsWith("sb_");
}

export function hasSupabaseAdminEnv(): boolean {
  return Boolean(url && isPlausibleJwt(service));
}

export function getServerSupabase(): SupabaseClient | null {
  if (!url || !anon) return null;
  return createClient(url, anon, { auth: { persistSession: false } });
}

export function getAdminSupabase(): SupabaseClient | null {
  if (!url || !isPlausibleJwt(service)) return null;
  return createClient(url, service!, { auth: { persistSession: false, autoRefreshToken: false } });
}
