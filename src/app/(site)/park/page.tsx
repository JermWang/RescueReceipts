import { AdoptionPark } from "@/components/AdoptionPark";
import { fetchPublicReceipts } from "@/lib/queries";
import { SITE } from "@/lib/config";

export const revalidate = 30;
export const metadata = { title: `Adoption Park — ${SITE.name}` };

export default async function ParkPage() {
  const receipts = await fetchPublicReceipts(40);
  return (
    <div>
      <div className="page-hero">
        <div className="section py-10">
          <header className="max-w-2xl">
            <div className="chip-green">
              <span className="h-1.5 w-1.5 rounded-full bg-soft-greenDark" aria-hidden />
              A spot for every verified adoption
            </div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Adoption Park</h1>
            <p className="text-ink-soft mt-2 text-lg">
              Approved and paid adoption receipts get a small grass platform here. Hover or tap a pet to view the receipt.
            </p>
          </header>
        </div>
      </div>
      <div className="section mt-8 pb-4">
        <AdoptionPark receipts={receipts} />
      </div>
    </div>
  );
}
