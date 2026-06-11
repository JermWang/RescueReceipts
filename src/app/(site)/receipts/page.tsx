import { ReceiptCard } from "@/components/ReceiptCard";
import { fetchPublicReceipts } from "@/lib/queries";
import { SITE } from "@/lib/config";

export const revalidate = 30;
export const metadata = { title: `Adoption Receipts — ${SITE.name}` };

export default async function ReceiptsPage() {
  const receipts = await fetchPublicReceipts(60);
  return (
    <div>
      <div className="page-hero">
        <div className="section py-10">
          <header className="max-w-2xl">
            <div className="chip-gold">Public ledger</div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Adoption receipts</h1>
            <p className="text-ink-soft mt-2 text-lg">
              Every approved or paid adoption. Manual review. Transparent receipts.
            </p>
          </header>
        </div>
      </div>
      <div className="section">
        {receipts.length ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {receipts.map((r) => <ReceiptCard key={r.id} r={r} />)}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-ink/15 p-10 text-center text-ink-soft">
            No public receipts yet. Once submissions are approved, they’ll appear here.
          </div>
        )}
      </div>
    </div>
  );
}
