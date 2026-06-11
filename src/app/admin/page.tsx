import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { ADMIN_COOKIE_NAME, isAdminCookieValid } from "@/lib/admin-auth";
import { fetchAllSubmissions } from "@/lib/queries";
import { listAllVariants, PET_COLOR_PRESETS } from "@/lib/petModelConfig";
import { STATUS_LABELS } from "@/lib/config";
import { logout, quickStatus, updateSubmission } from "./actions";
import { explorerTxUrl } from "@/lib/solana";

export const metadata = { title: "Admin · RescueReceipts" };
export const dynamic = "force-dynamic";

type SearchParams = { q?: string; status?: string };

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminCookieValid(raw)) redirect("/admin/login");

  const all = await fetchAllSubmissions();
  const q = (searchParams.q || "").toLowerCase().trim();
  const statusFilter = searchParams.status || "all";
  const filtered = all.filter((s) => {
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    if (!q) return true;
    return (
      s.x_handle.toLowerCase().includes(q) ||
      s.wallet_address.toLowerCase().includes(q) ||
      s.pet_name.toLowerCase().includes(q) ||
      s.x_post_url.toLowerCase().includes(q)
    );
  });
  const variants = listAllVariants();

  const counts = all.reduce<Record<string, number>>((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="section py-8">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-display text-2xl">Admin dashboard</h1>
          <p className="text-ink-soft text-sm">Review submissions, approve, deny, mark paid.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/models" className="btn-ghost text-sm">Model preview</Link>
          <form action={logout}><button className="btn-ghost text-sm">Log out</button></form>
        </div>
      </header>

      <form className="mt-6 grid sm:grid-cols-[1fr,auto,auto] gap-2 items-end">
        <div>
          <label className="label">Search</label>
          <input name="q" defaultValue={searchParams.q} placeholder="handle, wallet, pet, URL" className="input" />
        </div>
        <div>
          <label className="label">Status</label>
          <select name="status" defaultValue={statusFilter} className="input">
            <option value="all">All ({all.length})</option>
            <option value="pending">Pending ({counts.pending || 0})</option>
            <option value="approved">Approved ({counts.approved || 0})</option>
            <option value="denied">Denied ({counts.denied || 0})</option>
            <option value="paid">Paid ({counts.paid || 0})</option>
          </select>
        </div>
        <button className="btn-secondary">Filter</button>
      </form>

      <div className="mt-6 grid gap-4">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-ink/15 p-8 text-center text-ink-soft">
            No submissions.
          </div>
        )}
        {filtered.map((s) => {
          const statusInfo = STATUS_LABELS[s.status] ?? { label: s.status, color: "" };
          return (
            <details key={s.id} className="rounded-2xl border border-ink/10 bg-white/80 p-4" open={s.status === "pending"}>
              <summary className="cursor-pointer list-none flex flex-wrap items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full border ${statusInfo.color}`}>{statusInfo.label}</span>
                  <span className="font-semibold">{s.pet_name}</span>
                  <span className="text-ink-soft text-sm capitalize">· {s.pet_type}</span>
                  <span className="text-ink-soft text-sm">· @{s.x_handle}</span>
                  {s.featured && <span className="text-xs text-warm-orange">★ featured</span>}
                </div>
                <div className="text-xs text-ink-soft">{new Date(s.created_at).toLocaleString()}</div>
              </summary>

              <div className="mt-4 grid lg:grid-cols-2 gap-6">
                <div className="text-sm space-y-2">
                  <Info label="Wallet" value={<code className="break-all">{s.wallet_address}</code>} />
                  <Info label="Adoption date" value={s.adoption_date} />
                  {s.shelter_name && <Info label="Shelter" value={s.shelter_name} />}
                  {s.location && <Info label="Location" value={s.location} />}
                  {s.story && <Info label="Story" value={<span className="whitespace-pre-wrap">{s.story}</span>} />}
                  <Info
                    label="Proof"
                    value={<a className="underline break-all" href={s.x_post_url} target="_blank" rel="noreferrer">{s.x_post_url}</a>}
                  />
                  {s.transaction_signature && (
                    <Info
                      label="Tx"
                      value={<a className="underline break-all" href={explorerTxUrl(s.transaction_signature)} target="_blank" rel="noreferrer">{s.transaction_signature}</a>}
                    />
                  )}
                  <div className="flex gap-2 pt-2">
                    {(["approved", "denied", "paid", "pending"] as const).map((st) => (
                      <form key={st} action={quickStatus}>
                        <input type="hidden" name="id" value={s.id} />
                        <input type="hidden" name="status" value={st} />
                        <button className="btn-ghost text-xs border border-ink/10">Mark {st}</button>
                      </form>
                    ))}
                  </div>
                </div>

                <form action={updateSubmission} className="space-y-3">
                  <input type="hidden" name="id" value={s.id} />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label">Status</label>
                      <select name="status" defaultValue={s.status} className="input">
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="denied">Denied</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Approved amount (SOL)</label>
                      <input name="approved_amount_sol" type="number" step="0.01" min="0" defaultValue={s.approved_amount_sol ?? ""} className="input" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="label">Model variant</label>
                      <select name="model_variant" defaultValue={s.model_variant ?? ""} className="input">
                        <option value="">— auto —</option>
                        {variants.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="label">Model color</label>
                      <select name="model_color" defaultValue={s.model_color ?? ""} className="input">
                        <option value="">— default —</option>
                        {PET_COLOR_PRESETS.map((c) => <option key={c.id} value={c.hex}>{c.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label">Transaction signature (paid)</label>
                    <input name="transaction_signature" defaultValue={s.transaction_signature ?? ""} className="input" placeholder="Paste Solana tx signature after paying" />
                  </div>

                  <div>
                    <label className="label">Public notes (shown on receipt)</label>
                    <textarea name="public_notes" rows={2} defaultValue={s.public_notes ?? ""} className="input" />
                  </div>

                  <div>
                    <label className="label">Admin notes (private)</label>
                    <textarea name="admin_notes" rows={2} defaultValue={s.admin_notes ?? ""} className="input" />
                  </div>

                  <label className="inline-flex items-center gap-2 text-sm">
                    <input type="checkbox" name="featured" defaultChecked={s.featured} className="accent-warm-orange" />
                    Featured in Adoption Park
                  </label>

                  <div>
                    <button className="btn-primary">Save changes</button>
                  </div>
                </form>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-ink-soft">{label}</div>
      <div>{value}</div>
    </div>
  );
}
