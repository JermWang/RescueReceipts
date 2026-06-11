import { ReceiptCard } from "@/components/ReceiptCard";
import { fetchPublicReceipts } from "@/lib/queries";
import { SITE } from "@/lib/config";

export const revalidate = 30;
export const metadata = { title: `Adoption Receipts — ${SITE.name}` };

export default async function ReceiptsPage() {
  const receipts = await fetchPublicReceipts(60);
  return (
    <div className="section py-10">
      <header className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-warm-orange/10 text-warm-orange text-xs px-3 py-1 ring-1 ring-warm-orange/30">
          Public ledger
        </div>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl">Adoption receipts</h1>
        <p className="text-ink-soft mt-2">
          Every approved or paid adoption. Manual review. Transparent receipts.
        </p>
      </header>
      {receipts.length ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {receipts.map((r) => <ReceiptCard key={r.id} r={r} />)}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-ink/15 p-10 text-center text-ink-soft">
          No public receipts yet. Once submissions are approved, they’ll appear here.
        </div>
      )}
    </div>
  );
}
