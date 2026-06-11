import Link from "next/link";
import { ReceiptCard } from "@/components/ReceiptCard";
import { StatsGrid } from "@/components/StatsGrid";
import { fetchPoolStats, fetchPublicReceipts } from "@/lib/queries";
import { BOUNTY_TIERS, SITE } from "@/lib/config";

export const revalidate = 30;
export const metadata = { title: `Live Bounties — ${SITE.name}` };

export default async function BountiesPage() {
  const [stats, paid] = await Promise.all([fetchPoolStats(), fetchPublicReceipts(12)]);
  const paidReceipts = paid.filter((r) => r.status === "paid").slice(0, 6);

  return (
    <div className="section py-10">
      <header className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-sol-purple/10 text-sol-purple text-xs px-3 py-1 ring-1 ring-sol-purple/30">
          Live pool · Solana mainnet
        </div>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl">Live bounties</h1>
        <p className="text-ink-soft mt-2">
          Each approved adoption claim may receive a starter bounty depending on the active pool, quality of proof, and available funds.
        </p>
      </header>

      <div className="mt-8">
        <StatsGrid stats={stats} />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Bounty types</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {BOUNTY_TIERS.map((t) => (
            <div key={t.id} className="rounded-2xl border border-ink/10 bg-white/70 p-5">
              <div className="text-warm-orange text-xs uppercase tracking-widest">{t.id}</div>
              <div className="mt-1 font-semibold">{t.name}</div>
              <p className="text-sm text-ink-soft mt-2">{t.description}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-soft mt-4 max-w-2xl">
          We don’t promise fixed amounts. Bounties scale with the active pool and proof quality. Bounties are not compensation for ownership — adopt only if you are ready.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Recently paid bounties</h2>
        {paidReceipts.length ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paidReceipts.map((r) => <ReceiptCard key={r.id} r={r} />)}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-ink/15 p-8 text-center text-ink-soft">
            No paid bounties yet — be the first verified adoption.
          </div>
        )}
        <div className="mt-6">
          <Link href="/submit" className="btn-primary">Submit your adoption proof →</Link>
        </div>
      </section>
    </div>
  );
}
