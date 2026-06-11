import { NextRequest, NextResponse } from "next/server";
import { submissionSchema } from "@/lib/validation";
import { getAdminSupabase, getServerSupabase } from "@/lib/supabase/server";

export const runtime = "nodejs";

// Very small in-memory rate limit (per IP, per minute). Best-effort for MVP.
const buckets = new Map<string, { count: number; resetAt: number }>();
function rateLimit(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (b.count >= 6) return false;
  b.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many submissions. Please slow down." }, { status: 429 });
  }

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? "_";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ error: "Please correct the highlighted fields.", fieldErrors }, { status: 422 });
  }

  const v = parsed.data;
  const sb = getAdminSupabase() ?? getServerSupabase();
  if (!sb) {
    return NextResponse.json({ error: "Server not configured. Try again later." }, { status: 503 });
  }

  // Duplicate check on x_post_url
  {
    const { data: existing } = await sb
      .from("adoption_submissions")
      .select("id")
      .eq("x_post_url", v.x_post_url)
      .maybeSingle();
    if (existing) {
      return NextResponse.json(
        { error: "This X post has already been submitted.", fieldErrors: { x_post_url: "Already submitted." } },
        { status: 409 }
      );
    }
  }

  const insert = {
    x_handle: v.x_handle,
    x_post_url: v.x_post_url,
    wallet_address: v.wallet_address,
    pet_name: v.pet_name,
    pet_type: v.pet_type,
    adoption_date: v.adoption_date,
    shelter_name: v.shelter_name || null,
    location: v.location || null,
    story: v.story || null,
    status: "pending" as const,
  };

  const { error } = await sb.from("adoption_submissions").insert(insert);
  if (error) {
    if ((error as any)?.code === "23505") {
      return NextResponse.json({ error: "Duplicate submission.", fieldErrors: { x_post_url: "Already submitted." } }, { status: 409 });
    }
    console.error("submit insert error", error);
    return NextResponse.json({ error: "Could not save submission." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
