import { SITE } from "@/lib/config";
import { SubmitForm } from "@/components/SubmitForm";

export const metadata = { title: `Submit Adoption Proof — ${SITE.name}` };

export default function SubmitPage() {
  return (
    <div className="section py-10 max-w-3xl">
      <header className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-warm-orange/10 text-warm-orange text-xs px-3 py-1 ring-1 ring-warm-orange/30">
          Submission · Manual review
        </div>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl">Submit your adoption proof</h1>
        <p className="text-ink-soft mt-2">
          Post public proof on X and tag <a href={SITE.xUrl} className="underline">@{SITE.xHandle}</a>, then fill this out.
        </p>
      </header>
      <div className="mt-8">
        <SubmitForm />
      </div>
    </div>
  );
}
