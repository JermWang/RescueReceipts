"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminUpdateSchema } from "@/lib/validation";
import { getAdminSupabase } from "@/lib/supabase/server";
import { ADMIN_COOKIE_NAME, isAdminCookieValid } from "@/lib/admin-auth";

function ensureAdmin() {
  const raw = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminCookieValid(raw)) redirect("/admin/login");
}

export async function updateSubmission(formData: FormData) {
  ensureAdmin();
  const featuredRaw = formData.get("featured");
  const raw = {
    id: String(formData.get("id") || ""),
    status: (formData.get("status") as string) || undefined,
    approved_amount_sol: formData.get("approved_amount_sol") ? Number(formData.get("approved_amount_sol")) : null,
    transaction_signature: formData.get("transaction_signature")?.toString().trim() || null,
    admin_notes: formData.get("admin_notes")?.toString() || null,
    public_notes: formData.get("public_notes")?.toString() || null,
    model_variant: formData.get("model_variant")?.toString() || null,
    model_color: formData.get("model_color")?.toString() || null,
    featured: featuredRaw === "on" || featuredRaw === "true",
  };
  const parsed = adminUpdateSchema.safeParse(raw);
  if (!parsed.success) return;
  const sb = getAdminSupabase();
  if (!sb) return;

  const patch: Record<string, any> = { ...parsed.data };
  delete patch.id;
  if (parsed.data.status && parsed.data.status !== "pending") patch.reviewed_at = new Date().toISOString();
  if (parsed.data.status === "paid") patch.paid_at = new Date().toISOString();

  await sb.from("adoption_submissions").update(patch).eq("id", parsed.data.id);
  revalidatePath("/admin");
  revalidatePath("/receipts");
  revalidatePath("/park");
  revalidatePath("/bounties");
  revalidatePath("/");
}

export async function quickStatus(formData: FormData) {
  ensureAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !["pending", "approved", "denied", "paid"].includes(status)) return;
  const sb = getAdminSupabase();
  if (!sb) return;
  const patch: Record<string, any> = { status, reviewed_at: new Date().toISOString() };
  if (status === "paid") patch.paid_at = new Date().toISOString();
  await sb.from("adoption_submissions").update(patch).eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/receipts");
  revalidatePath("/park");
  revalidatePath("/");
}

export async function logout() {
  ensureAdmin();
  cookies().delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}
