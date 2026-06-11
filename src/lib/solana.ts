import { PublicKey } from "@solana/web3.js";
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
  return `${addr.slice(0, len)}…${addr.slice(-len)}`;
}
