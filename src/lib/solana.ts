import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { SITE } from "./config";

export function isValidSolanaAddress(addr: string): boolean {
  try {
    const k = new PublicKey(addr.trim());
    return PublicKey.isOnCurve(k.toBytes()) || true; // accept any valid base58 pubkey
  } catch {
    return false;
  }
}

export function explorerTxUrl(signature: string): string {
  const cluster = SITE.solanaCluster;
  const q = cluster === "mainnet-beta" ? "" : `?cluster=${cluster}`;
  return `https://explorer.solana.com/tx/${signature}${q}`;
}

export function explorerAddressUrl(address: string): string {
  const cluster = SITE.solanaCluster;
  const q = cluster === "mainnet-beta" ? "" : `?cluster=${cluster}`;
  return `https://explorer.solana.com/address/${address}${q}`;
}

export function shortAddress(addr: string, len = 4): string {
  if (!addr) return "";
  if (addr.length <= len * 2 + 2) return addr;
  return `${addr.slice(0, len)}...${addr.slice(-len)}`;
}

export async function getWalletSolBalance(address: string): Promise<number | null> {
  if (!address || !isValidSolanaAddress(address)) return null;

  const endpoint = process.env.SOLANA_RPC_URL || clusterApiUrl(SITE.solanaCluster);
  try {
    const connection = new Connection(endpoint, "confirmed");
    const lamports = await connection.getBalance(new PublicKey(address));
    return lamports / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error("creator fee wallet balance lookup failed", error);
    return null;
  }
}
