import Link from "next/link";
import { SITE } from "@/lib/config";

export const metadata = { title: `How it works - ${SITE.name}` };

const flowSteps = [
  {
    title: "Adopt responsibly",
    detail:
      "Start with a real shelter or rescue adoption. Be ready for food, vet care, training, time, and long-term responsibility.",
  },
  {
    title: "Post public video proof",
    detail:
      "Share a short public video on X that clearly shows your new pet, tags @RescueReceipts, and names the pet.",
  },
  {
    title: "Submit the receipt request",
    detail:
      "Paste your post URL, wallet address, pet details, and optional shelter context into the submission form.",
  },
  {
    title: "Human review checks it",
    detail:
      "A reviewer checks that the post is public, the adoption appears real, the proof is not duplicated, and the wallet pattern is not abusive.",
  },
  {
    title: "A public receipt appears",
    detail:
      "Approved submissions become transparent adoption receipts and can be shown in the Adoption Park.",
  },
  {
    title: "A bounty may be sent",
    detail:
      "If the active pool has funds, a small SOL starter bounty can be sent manually and linked to the public receipt.",
  },
];

const essentials = [
  ["Public X post", `Tag @${SITE.xHandle} so reviewers can find and verify the story.`],
  ["Short video", "Photos are useful, but a video is required for the core proof."],
  ["Solana wallet", "Use a wallet you control. Approved bounty payments are sent manually."],
];

const goodProof = [
  "A short video introducing the adopted pet",
  `A public X post tagging @${SITE.xHandle}`,
  "The pet's name in the post or submission",
  "Shelter or rescue context when you are comfortable sharing it",
  "Optional paperwork with private information redacted",
  "A real note about why you adopted",
];

const badProof = [
  "Private, deleted, or inaccessible posts",
  "Photo-only posts with no video",
  "Unclear pet footage or no adoption context",
  "Reused, stolen, or AI-generated pet content",
  "Buying from breeders instead of adopting",
  "Wallet-farming or duplicate submission patterns",
  "Unredacted personal documents",
  "Posts that encourage irresponsible adoption",
];

const approvalDetails = [
  {
    title: "Receipts are public",
    detail:
      "Approved entries show the pet story, review status, bounty status, and transaction link when paid.",
  },
  {
    title: "Bounties are limited",
    detail:
      "The pool changes over time. Approval does not guarantee a fixed amount or any payment.",
  },
  {
    title: "Payments are manual",
    detail:
      "There are no auto-payouts. Manual review protects the pool and keeps the receipts credible.",
  },
];

const faqs = [
  {
    q: "Do I need adoption paperwork?",
    a: "No. Paperwork can help, but do not expose private information. A public video post is the required proof signal.",
  },
  {
    q: "Can I submit a pet I already adopted?",
    a: "Yes, if you can make a fresh public video post and explain the adoption clearly.",
  },
  {
    q: "How long does review take?",
    a: "Reviews are manual, so timing depends on queue size and proof quality. Clear public posts are fastest to check.",
  },
  {
    q: "Is RescueReceipts a shelter?",
    a: "No. RescueReceipts is a public proof and starter-bounty project, not a shelter, rescue, veterinary provider, or adoption agency.",
  },
];

function CheckMark() {
  return (
    <span
      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-soft-greenPale text-soft-greenDark ring-1 ring-soft-green/70"
      aria-hidden
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current stroke-[2.5]">
        <path d="M3.5 8.2 6.6 11 12.7 4.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function XMark() {
  return (
    <span
      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-100 text-xs font-black text-rose-800 ring-1 ring-rose-300"
      aria-hidden
    >
      x
    </span>
  );
}

export default function HowItWorksPage() {
  return (
    <div>
      <div className="page-hero">
        <div className="section grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:py-16">
          <header className="max-w-3xl">
            <div className="chip-green">Human reviewed adoption receipts</div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[0.98] sm:text-6xl">
              How RescueReceipts works
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
              Adopt a pet, post public video proof, submit the link, and let a human reviewer turn the story into a transparent receipt. If bounty funds are available, approved adopters may receive a small SOL starter reward.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/submit" className="btn-primary">
                Submit adoption proof
              </Link>
              <Link href="/receipts" className="btn-secondary">
                View public receipts
              </Link>
            </div>
          </header>

          <aside className="receipt-card receipt-edge p-6">
            <div className="flex items-center justify-between gap-4 border-b border-dashed border-ink/20 pb-4">
              <div>
                <div className="font-display text-2xl font-bold">Receipt loop</div>
                <p className="mt-1 text-sm text-ink-soft">Simple, public, reviewed.</p>
              </div>
              <div className="stamp text-soft-greenDark">Verified</div>
            </div>
            <div className="mt-5 space-y-3">
              {["Adopt", "Post video", "Get reviewed", "Receipt", "Possible SOL bounty"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-xl bg-white/70 px-3 py-2 ring-1 ring-ink/10">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-gold font-display font-bold text-ink shadow-popSm">
                    {index + 1}
                  </div>
                  <span className="text-sm font-extrabold text-ink-mid">{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <main className="section">
        <section className="mt-10 grid gap-4 md:grid-cols-3" aria-label="Submission essentials">
          {essentials.map(([title, detail]) => (
            <div key={title} className="card-tile">
              <div className="font-display text-xl font-bold">{title}</div>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <div className="chip-gold">The flow</div>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              From adoption story to public receipt
            </h2>
            <p className="mt-3 text-ink-soft">
              The project works best when the proof is easy to understand at a glance. Keep the post public, make the pet visible, and give reviewers enough context to approve confidently.
            </p>
          </div>

          <ol className="relative space-y-4">
            <span className="absolute bottom-8 left-[22px] top-8 hidden w-0.5 bg-ink/10 sm:block" aria-hidden />
            {flowSteps.map((step, index) => (
              <li key={step.title} className="relative rounded-2xl border-[1.5px] border-ink/10 bg-white/75 p-5 shadow-receipt">
                <div className="flex gap-4">
                  <div className="z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold font-display text-xl font-bold text-ink shadow-popSm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-ink-soft">{step.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 rounded-3xl border-[1.5px] border-ink/10 bg-cream-50/80 p-5 shadow-soft sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <div className="chip-purple">Proof guide</div>
              <h2 className="mt-3 font-display text-3xl font-bold">Make review easy</h2>
              <p className="mt-3 text-ink-soft">
                Think of your post as the public receipt seed. It does not need to be polished, but it does need to be clear, public, and honest.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-soft-green/50 bg-soft-green/10 p-5">
                <h3 className="font-display text-xl font-bold text-soft-greenDark">Good proof</h3>
                <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                  {goodProof.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckMark />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-rose-300 bg-rose-50 p-5">
                <h3 className="font-display text-xl font-bold text-rose-800">What gets declined</h3>
                <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                  {badProof.map((item) => (
                    <li key={item} className="flex gap-2">
                      <XMark />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-2xl">
            <div className="chip-coral">After approval</div>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Transparent receipts, careful bounty handling
            </h2>
            <p className="mt-3 text-ink-soft">
              RescueReceipts is designed to reward real adoption stories without turning pets into a farming mechanic.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {approvalDetails.map((item) => (
              <article key={item.title} className="card-tile">
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border-[1.5px] border-gold/70 bg-gold-soft/70 p-5 text-sm leading-6 text-ink-soft">
            <strong className="text-ink">Important:</strong> adopt because you are ready to care for an animal. Bounties are small starter rewards, not payment for pet ownership and not a reason to adopt before you are prepared.
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div>
            <h2 className="font-display text-3xl font-bold">Quick answers</h2>
            <p className="mt-3 text-ink-soft">
              The details most people need before submitting.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {faqs.map((item) => (
              <article key={item.q} className="rounded-2xl border-[1.5px] border-ink/10 bg-white/70 p-5">
                <h3 className="font-display text-lg font-bold">{item.q}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-3xl border-[1.5px] border-ink/10 bg-ink p-6 text-white shadow-soft sm:p-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold">Ready to create a receipt?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                Make the public post first, then submit the URL and wallet. A reviewer will take it from there.
              </p>
            </div>
            <Link href="/submit" className="btn-gold whitespace-nowrap">
              Submit proof
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
