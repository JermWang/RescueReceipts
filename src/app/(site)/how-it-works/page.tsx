import Link from "next/link";
import { SITE } from "@/lib/config";

export const metadata = { title: `How it works — ${SITE.name}` };

export default function HowItWorksPage() {
  return (
    <div className="section py-10 max-w-3xl">
      <header>
        <div className="chip-green">Six steps · Human reviewed</div>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold">How it works</h1>
        <p className="text-ink-soft mt-2 text-lg">
          A simple human-reviewed process. No bots, no auto-payouts, no surprises.
        </p>
      </header>

      <ol className="mt-8 space-y-5">
        {[
          { t: "Adopt responsibly", d: "Adopt from a shelter or rescue. Be ready for years of care — food, vet visits, time, patience." },
          { t: "Post video proof", d: `Make a public X/Twitter post with a short video of your new pet, tagging @${SITE.xHandle}. Include the pet's name, optionally the shelter, and why you adopted. Photos alone don't count.` },
          { t: "Submit your proof", d: "Paste the post URL, your Solana wallet, and the basic details on the submission page." },
          { t: "Manual review", d: "A human reviews every submission. We check the post is public, the proof looks real, and there are no duplicates or red flags." },
          { t: "Approved receipt", d: "If approved, your receipt becomes public and your pet may appear in the Adoption Park." },
          { t: "SOL bounty if available", d: "A small SOL bounty is sent manually if funds are available. Transaction signatures are linked publicly." },
        ].map((s, i) => (
          <li key={i} className="card-tile flex gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold font-display text-xl font-bold text-ink shadow-popSm">{i + 1}</div>
            <div>
              <div className="font-display font-bold text-lg">{s.t}</div>
              <p className="text-sm text-ink-soft mt-1">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-soft-green/40 bg-soft-green/10 p-5">
          <div className="font-semibold text-soft-greenDark">Good proof</div>
          <ul className="mt-2 text-sm text-ink-soft list-disc pl-5 space-y-1">
            <li>Short video introducing your adopted pet (required)</li>
            <li>Public X post tagging @{SITE.xHandle}</li>
            <li>Mention the pet's name</li>
            <li>Mention the shelter/rescue if comfortable</li>
            <li>Adoption paperwork only if comfortable — blur private info</li>
            <li>Share why you adopted</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-rose-300 bg-rose-50 p-5">
          <div className="font-semibold text-rose-800">Bad proof</div>
          <ul className="mt-2 text-sm text-ink-soft list-disc pl-5 space-y-1">
            <li>Private or deleted posts</li>
            <li>Photo-only posts with no video</li>
            <li>No clear pet or adoption proof</li>
            <li>Reused or stolen videos</li>
            <li>Wallet-farming patterns</li>
            <li>Buying from breeders instead of adopting</li>
            <li>Encouraging irresponsible adoption</li>
            <li>Exposing private documents without redaction</li>
          </ul>
        </div>
      </section>

      <div className="mt-10 rounded-2xl border border-ink/10 bg-cream-50 p-5 text-sm text-ink-soft">
        <strong className="text-ink">Important.</strong> We support responsible adoption. Please do not adopt an animal unless you are fully prepared to care for it. Bounties are small support rewards, not compensation for the responsibility of pet ownership.
      </div>

      <div className="mt-8">
        <Link href="/submit" className="btn-primary">Ready? Submit adoption proof →</Link>
      </div>
    </div>
  );
}
