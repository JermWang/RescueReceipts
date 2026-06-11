import { explorerTxUrl, shortAddress } from "@/lib/solana";
import type { PublicReceipt } from "@/types/db";
import { PetIcon } from "./PetIcon";

export function ReceiptCard({ r }: { r: PublicReceipt }) {
  const paid = r.status === "paid";
  return (
    <article className="receipt-card receipt-edge p-5 relative transition hover:-translate-y-1 hover:shadow-receipt">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-soft-greenPale ring-2 ring-soft-green/50 flex items-center justify-center">
            <PetIcon petType={r.pet_type} className="h-6 w-6 text-soft-greenDark" />
          </div>
          <div>
            <div className="font-display font-bold text-xl leading-none">{r.pet_name}</div>
            <div className="text-xs text-ink-soft capitalize mt-1.5 font-bold">{r.pet_type} · @{r.x_handle}</div>
          </div>
        </div>
        <span className={`stamp ${paid ? "text-sol-purple" : "text-soft-greenDark"} animate-stamp`}>
          {paid ? "Paid" : "Approved"}
        </span>
      </div>
      <div className="my-3 divider-paw" />
      <dl className="grid grid-cols-2 gap-2 text-sm">
        <Row label="Adopted" value={r.adoption_date} />
        <Row label="Bounty" value={r.approved_amount_sol != null ? `${r.approved_amount_sol} SOL` : "—"} highlight={r.approved_amount_sol != null} />
        {r.shelter_name && <Row label="Shelter" value={r.shelter_name} />}
        {r.location && <Row label="Location" value={r.location} />}
      </dl>
      {r.public_notes && (
        <p className="mt-3 text-xs text-ink-soft italic border-l-2 border-gold pl-2">{r.public_notes}</p>
      )}
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
        {r.featured && (
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-gold-deep">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-gold" aria-hidden><path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z"/></svg>
            Featured
          </span>
        )}
      </div>
    </article>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-ink-soft font-black">{label}</dt>
      <dd className={`font-bold ${highlight ? "text-soft-greenDark" : ""}`}>{value}</dd>
    </div>
  );
}
