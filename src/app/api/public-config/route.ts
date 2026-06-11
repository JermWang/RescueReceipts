import { NextResponse } from "next/server";
import { fetchPoolStats } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await fetchPoolStats();
  return NextResponse.json({
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "",
    // null until Supabase is configured; the park keeps its demo numbers then
    stats: stats.configured
      ? {
          poolSol: stats.totalSol,
          adopted: stats.paidCount + stats.approvedCount,
          paid: stats.paidCount,
          inReview: stats.pendingCount,
        }
      : null,
  });
}
