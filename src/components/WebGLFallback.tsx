import type { PublicReceipt } from "@/types/db";
import { PetIcon } from "./PetIcon";

export function WebGLFallback({ receipts }: { receipts: PublicReceipt[] }) {
  if (!receipts.length) {
    return (
      <div className="rounded-3xl border border-ink/10 bg-cream-50 p-8 text-center text-ink-soft">
        The Adoption Park is waiting for its first verified residents.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {receipts.map((r) => (
        <div key={r.id} className="rounded-2xl border border-ink/10 bg-white/80 p-4 text-center shadow-soft">
          <div className="mx-auto h-16 w-16 rounded-full bg-soft-green/20 flex items-center justify-center">
            <PetIcon petType={r.pet_type} className="h-9 w-9 text-soft-greenDark" />
          </div>
          <div className="mt-3 font-semibold">{r.pet_name}</div>
          <div className="text-xs text-ink-soft">@{r.x_handle}</div>
          <div className="mt-1 text-[10px] text-ink-soft">3D model coming soon</div>
        </div>
      ))}
    </div>
  );
}
