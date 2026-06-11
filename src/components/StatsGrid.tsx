import type { PoolStats } from "@/lib/queries";

const ACCENTS = [
  "text-sol-purple",
  "text-gold-deep",
  "text-soft-greenDark",
  "text-warm-orangeDark",
  "text-ink",
];

export function StatsGrid({ stats }: { stats: PoolStats }) {
  const items = [
    { label: "Total SOL allocated", value: `${stats.totalSol.toFixed(2)} SOL` },
    { label: "Pending submissions", value: stats.pendingCount },
    { label: "Approved adoptions", value: stats.approvedCount },
    { label: "Paid bounties", value: stats.paidCount },
    { label: "Featured in park", value: stats.featuredCount },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {items.map((it, i) => (
        <div key={it.label} className="card-tile !p-4 text-center sm:text-left">
          <div className={`text-2xl font-display font-bold ${ACCENTS[i % ACCENTS.length]}`}>{it.value}</div>
          <div className="text-xs text-ink-soft mt-1 font-bold">{it.label}</div>
        </div>
      ))}
      {!stats.configured && (
        <div className="col-span-full text-xs text-ink-soft italic">
          Stats are showing config defaults — connect Supabase to display live values.
        </div>
      )}
    </div>
  );
}
