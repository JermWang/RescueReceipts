import { getServerSupabase, getAdminSupabase } from "./supabase/server";
import { DEFAULT_POOL } from "./config";
import type { AdoptionSubmission, PublicReceipt } from "@/types/db";
import { PUBLIC_RECEIPT_COLUMNS } from "@/types/db";

export type PoolStats = {
  totalSol: number;
  pendingCount: number;
  approvedCount: number;
  paidCount: number;
  featuredCount: number;
  configured: boolean;
};

export async function fetchPoolStats(): Promise<PoolStats> {
  const sb = getAdminSupabase() ?? getServerSupabase();
  if (!sb) return { ...DEFAULT_POOL, totalSol: DEFAULT_POOL.totalSol, configured: false };
  const { data, error } = await sb.from("bounty_pool_stats").select("*").maybeSingle();
  if (error || !data) return { ...DEFAULT_POOL, totalSol: DEFAULT_POOL.totalSol, configured: false };
  return {
    totalSol: Number(data.total_approved_sol ?? 0) + Number(data.total_paid_sol ?? 0),
    pendingCount: Number(data.pending_count ?? 0),
    approvedCount: Number(data.approved_count ?? 0),
    paidCount: Number(data.paid_count ?? 0),
    featuredCount: Number(data.featured_count ?? 0),
    configured: true,
  };
}

export async function fetchPublicReceipts(limit = 24, onlyFeatured = false): Promise<PublicReceipt[]> {
  const sb = getServerSupabase();
  if (!sb) return [];
  let q = sb.from("public_receipts").select(PUBLIC_RECEIPT_COLUMNS).order("featured", { ascending: false }).order("created_at", { ascending: false }).limit(limit);
  if (onlyFeatured) q = q.eq("featured", true);
  const { data, error } = await q;
  if (error || !data) return [];
  return data as PublicReceipt[];
}

export async function fetchAllSubmissions(): Promise<AdoptionSubmission[]> {
  const sb = getAdminSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from("adoption_submissions").select("*").order("created_at", { ascending: false }).limit(500);
  if (error || !data) return [];
  return data as AdoptionSubmission[];
}
