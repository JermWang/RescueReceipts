import Link from "next/link";
import { ReceiptCard } from "@/components/ReceiptCard";
import { StatsGrid } from "@/components/StatsGrid";
import { fetchPoolStats, fetchPublicReceipts } from "@/lib/queries";
import { BOUNTY_TIERS, SITE } from "@/lib/config";

export const revalidate = 30;
export const metadata = { title: `Live Bounties — ${SITE.name}` };

const TIER_ACCENTS: Record<string, string> = {
  starter: "text-soft-greenDark",
  featured: "text-gold-deep",
  sponsored: "text-sol-purple",
};

export default async function BountiesPage() {
  const [stats, paid] = await Promise.all([fetchPoolStats(), fetchPublicReceipts(12)]);
  const paidReceipts = paid.filter((r) => r.status === "paid").slice(0, 6);

  return (
    <div>
      <div className="page-hero">
        <div className="section py-10">
          <header className="max-w-2xl">
            <div className="chip-purple">
              <span className="h-1.5 w-1.5 rounded-full bg-sol-purple" aria-hidden />
              Live pool · Solana mainnet
            </div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Live bounties</h1>
            <p className="text-ink-soft mt-2 text-lg">
              Each approved adoption claim may receive a starter bounty depending on the active pool, quality of proof, and available funds.
            </p>
          </header>
        </div>
      </div>

      <div className="section">
        <div className="mt-10">
          <StatsGrid stats={stats} />
        </div>

        <section className="mt-14">
          <h2 className="font-display text-3xl font-bold">Bounty types</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {BOUNTY_TIERS.map((t) => (
              <div key={t.id} className="card-tile">
                <div className={`text-xs font-black uppercase tracking-widest ${TIER_ACCENTS[t.id] ?? "text-ink-soft"}`}>{t.id}</div>
                <div className="mt-1 font-display font-bold text-lg">{t.name}</div>
                <p className="text-sm text-ink-soft mt-2">{t.description}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-soft mt-4 max-w-2xl">
            We don’t promise fixed amounts. Bounties scale with the active pool and proof quality. Bounties are not compensation for ownership — adopt only if you are ready.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-3xl font-bold">Recently paid bounties</h2>
          {paidReceipts.length ? (
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paidReceipts.map((r) => <ReceiptCard key={r.id} r={r} />)}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border-2 border-dashed border-ink/15 p-8 text-center text-ink-soft">
              No paid bounties yet — be the first verified adoption.
            </div>
          )}
          <div className="mt-8">
            <Link href="/submit" className="btn-primary">Submit your adoption proof →</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
