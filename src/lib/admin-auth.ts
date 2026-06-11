import { cookies } from "next/headers";
import crypto from "node:crypto";

const COOKIE_NAME = "rr_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

function getSecret(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD not configured");
  return pw;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function adminCookieValue(): string {
  const stamp = Date.now().toString();
  const sig = sign(stamp);
  return `${stamp}.${sig}`;
}

export function isAdminCookieValid(raw?: string | null): boolean {
  if (!raw) return false;
  const [stamp, sig] = raw.split(".");
  if (!stamp || !sig) return false;
  let expected: string;
  try {
    expected = sign(stamp);
  } catch {
    return false;
  }
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const age = Date.now() - parseInt(stamp, 10);
  return age >= 0 && age < MAX_AGE * 1000;
}

export function isAdminRequest(): boolean {
  const c = cookies().get(COOKIE_NAME)?.value;
  try {
    return isAdminCookieValid(c);
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  try {
    const expected = getSecret();
    const a = Buffer.from(input);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE = MAX_AGE;
