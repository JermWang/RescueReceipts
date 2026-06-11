import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "",
  });
}
