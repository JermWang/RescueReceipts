"use client";
import { motion, AnimatePresence } from "framer-motion";
import { explorerTxUrl } from "@/lib/solana";
import type { PublicReceipt } from "@/types/db";

export function PetReceiptOverlay({ open, receipt, onClose }: { open: boolean; receipt: PublicReceipt | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && receipt && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="receipt-card receipt-edge w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-ink-soft">Adoption Receipt</div>
                <h3 className="font-display text-2xl mt-1">{receipt.pet_name}</h3>
                <div className="text-sm text-ink-soft mt-0.5 capitalize">{receipt.pet_type}</div>
              </div>
              <span className="stamp text-soft-greenDark animate-stamp">Verified</span>
            </div>

            <div className="my-4 divider-paw" />

            <dl className="grid grid-cols-2 gap-3 text-sm">
              <Row label="Adopter" value={`@${receipt.x_handle}`} />
              <Row label="Adopted" value={receipt.adoption_date} />
              {receipt.shelter_name && <Row label="Shelter" value={receipt.shelter_name} />}
              {receipt.location && <Row label="Location" value={receipt.location} />}
              <Row label="Bounty" value={receipt.approved_amount_sol != null ? `${receipt.approved_amount_sol} SOL` : "—"} />
              <Row label="Status" value={receipt.status === "paid" ? "Paid" : "Approved"} />
            </dl>

            <div className="mt-5 flex flex-wrap gap-2">
              <a href={receipt.x_post_url} target="_blank" rel="noreferrer" className="btn-secondary text-sm">
                View proof post ↗
              </a>
              {receipt.transaction_signature && (
                <a
                  href={explorerTxUrl(receipt.transaction_signature)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-sm"
                >
                  View on Solana ↗
                </a>
              )}
              <button onClick={onClose} className="btn-ghost text-sm ml-auto">Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-ink-soft">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
