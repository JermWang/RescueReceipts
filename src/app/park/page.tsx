import { AdoptionPark } from "@/components/AdoptionPark";
import { fetchPublicReceipts } from "@/lib/queries";
import { SITE } from "@/lib/config";

export const revalidate = 30;
export const metadata = { title: `Adoption Park — ${SITE.name}` };

export default async function ParkPage() {
  const receipts = await fetchPublicReceipts(40);
  return (
    <div className="section py-10">
      <header className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-soft-green/15 text-soft-greenDark text-xs px-3 py-1 ring-1 ring-soft-green/40">
          A spot for every verified adoption
        </div>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl">Adoption Park</h1>
        <p className="text-ink-soft mt-2">
          Approved and paid adoption receipts get a small grass platform here. Hover or tap a pet to view the receipt.
        </p>
      </header>
      <div className="mt-8">
        <AdoptionPark receipts={receipts} />
      </div>
    </div>
  );
}
