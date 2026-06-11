import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { ADMIN_COOKIE_NAME, isAdminCookieValid } from "@/lib/admin-auth";
import { PET_MODELS } from "@/lib/petModelConfig";
import { ModelPreviewClient, type ModelPreviewEntry } from "@/components/ModelPreviewClient";

export const metadata = { title: "Model Preview - RescueReceipts" };
export const dynamic = "force-dynamic";

export default function AdminModelPreviewPage() {
  const raw = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminCookieValid(raw)) redirect("/admin/login");

  const entries: ModelPreviewEntry[] = Object.entries(PET_MODELS).flatMap(([type, models]) =>
    models.map((model) => ({
      type,
      id: model.id,
      label: model.label,
      path: model.path,
      scale: model.scale,
      idleAnimation: model.idleAnimation,
    })),
  );

  return (
    <div className="section py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl">Model preview</h1>
          <p className="text-sm text-ink-soft">Inspect registered pets, animation clips, scale, and model assignment.</p>
        </div>
        <Link href="/admin" className="btn-ghost text-sm">Back to dashboard</Link>
      </header>
      <ModelPreviewClient entries={entries} />
    </div>
  );
}
