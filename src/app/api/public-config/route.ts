import { NextResponse } from "next/server";
import { fetchPoolStats } from "@/lib/queries";
import { getWalletSolBalance } from "@/lib/solana";

export const dynamic = "force-dynamic";

export async function GET() {
  const [stats, creatorFeeSol] = await Promise.all([
    fetchPoolStats(),
    getWalletSolBalance(process.env.CREATOR_FEE_WALLET_ADDRESS ?? ""),
  ]);

  return NextResponse.json({
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "",
    stats: {
      poolSol: creatorFeeSol ?? stats.totalSol,
      adopted: stats.configured ? stats.paidCount + stats.approvedCount : 0,
      paid: stats.configured ? stats.paidCount : 0,
      inReview: stats.configured ? stats.pendingCount : 0,
    },
  });
}
