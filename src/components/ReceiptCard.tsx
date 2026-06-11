import { explorerTxUrl, shortAddress } from "@/lib/solana";
import type { PublicReceipt } from "@/types/db";
import { PetIcon } from "./PetIcon";

export function ReceiptCard({ r }: { r: PublicReceipt }) {
  const paid = r.status === "paid";
  return (
    <article className="receipt-card receipt-edge p-5 relative">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-soft-green/20 flex items-center justify-center">
            <PetIcon petType={r.pet_type} className="h-6 w-6 text-soft-greenDark" />
          </div>
          <div>
            <div className="font-display text-xl leading-none">{r.pet_name}</div>
            <div className="text-xs text-ink-soft capitalize mt-1">{r.pet_type} · @{r.x_handle}</div>
          </div>
        </div>
        <span className={`stamp ${paid ? "text-sol-purple" : "text-warm-orange"} animate-stamp`}>
          {paid ? "Paid" : "Approved"}
        </span>
      </div>
      <div className="my-3 divider-paw" />
      <dl className="grid grid-cols-2 gap-2 text-sm">
        <Row label="Adopted" value={r.adoption_date} />
        <Row label="Bounty" value={r.approved_amount_sol != null ? `${r.approved_amount_sol} SOL` : "—"} />
        {r.shelter_name && <Row label="Shelter" value={r.shelter_name} />}
        {r.location && <Row label="Location" value={r.location} />}
      </dl>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <a href={r.x_post_url} target="_blank" rel="noreferrer" className="btn-secondary !py-1.5 !px-3 text-xs">
          Proof ↗
        </a>
        {r.transaction_signature && (
          <a
            href={explorerTxUrl(r.transaction_signature)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary !py-1.5 !px-3 text-xs"
            title={r.transaction_signature}
          >
            Tx {shortAddress(r.transaction_signature, 4)} ↗
          </a>
        )}
        {r.featured && <span className="ml-auto text-[10px] uppercase tracking-wider text-warm-orange">★ Featured</span>}
      </div>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-ink-soft">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
