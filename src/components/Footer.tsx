import Link from "next/link";
import { SITE } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-cream-50/60">
      <div className="section py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div className="font-display text-lg text-ink">{SITE.name}</div>
          <p className="mt-2 text-ink-soft max-w-xs">
            Verified pet adoptions become public receipts. Approved adopters may receive a small SOL starter bounty.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-2">Project</div>
          <ul className="space-y-1 text-ink-soft">
            <li><Link href="/how-it-works" className="hover:text-ink">How it works</Link></li>
            <li><Link href="/bounties" className="hover:text-ink">Live bounties</Link></li>
            <li><Link href="/receipts" className="hover:text-ink">Adoption receipts</Link></li>
            <li><Link href="/park" className="hover:text-ink">Adoption Park</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Responsible adoption</div>
          <ul className="space-y-1 text-ink-soft">
            <li><Link href="/terms" className="hover:text-ink">Terms</Link></li>
            <li><a href={`mailto:${SITE.contactEmail}`} className="hover:text-ink">Contact</a></li>
            <li><a href={SITE.xUrl} target="_blank" rel="noreferrer" className="hover:text-ink">@{SITE.xHandle}</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Built on Solana</div>
          <p className="text-ink-soft">
            3D animal models powered by CC0 low-poly assets from{" "}
            <a href="https://quaternius.com" target="_blank" rel="noreferrer" className="underline">Quaternius</a>.
          </p>
          <p className="mt-2 text-ink-soft">
            Bounties are small support rewards. Adopt because you are ready.
          </p>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="section py-4 text-xs text-ink-soft flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} {SITE.name}. Not a shelter, rescue, or veterinary provider.</span>
          <span>Public proof. Manual review. Transparent receipts.</span>
        </div>
      </div>
    </footer>
  );
}
