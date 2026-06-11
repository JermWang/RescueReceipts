import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-20 border-t-[1.5px] border-ink/10 bg-cream-100/80">
      <div className="divider-paw" />
      <div className="section py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <Image
            src="/redesign/uploads/RR-logo.png"
            alt={SITE.name}
            width={150}
            height={44}
            className="h-9 w-auto"
          />
          <p className="mt-3 text-ink-soft max-w-xs">
            Verified pet adoptions become public receipts. Approved adopters may receive a small SOL starter bounty.
          </p>
        </div>
        <div>
          <div className="font-display font-bold mb-2">Project</div>
          <ul className="space-y-1.5 text-ink-soft">
            <li><Link href="/how-it-works" className="hover:text-soft-greenDark transition-colors">How it works</Link></li>
            <li><Link href="/bounties" className="hover:text-soft-greenDark transition-colors">Live bounties</Link></li>
            <li><Link href="/receipts" className="hover:text-soft-greenDark transition-colors">Adoption receipts</Link></li>
            <li><Link href="/park" className="hover:text-soft-greenDark transition-colors">Adoption Park</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-display font-bold mb-2">Responsible adoption</div>
          <ul className="space-y-1.5 text-ink-soft">
            <li><Link href="/terms" className="hover:text-soft-greenDark transition-colors">Terms</Link></li>
            <li><a href={`mailto:${SITE.contactEmail}`} className="hover:text-soft-greenDark transition-colors">Contact</a></li>
            <li><a href={SITE.xUrl} target="_blank" rel="noreferrer" className="hover:text-soft-greenDark transition-colors">@{SITE.xHandle}</a></li>
          </ul>
        </div>
        <div>
          <div className="font-display font-bold mb-2 inline-flex items-center gap-1.5">
            Built on Solana
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-sol-purple to-sol-green" aria-hidden />
          </div>
          <p className="text-ink-soft">
            3D animal models powered by CC0 low-poly assets from{" "}
            <a href="https://quaternius.com" target="_blank" rel="noreferrer" className="underline decoration-gold decoration-2 underline-offset-2 hover:text-ink">Quaternius</a>.
          </p>
          <p className="mt-2 text-ink-soft">
            Bounties are small support rewards. Adopt because you are ready.
          </p>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="section py-4 text-xs text-ink-soft flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} {SITE.name}. Not a shelter, rescue, or veterinary provider.</span>
          <span className="font-bold">Public proof. Manual review. Transparent receipts.</span>
        </div>
      </div>
    </footer>
  );
}
