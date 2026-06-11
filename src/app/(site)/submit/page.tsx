import { SITE } from "@/lib/config";
import { SubmitForm } from "@/components/SubmitForm";

export const metadata = { title: `Submit Adoption Proof — ${SITE.name}` };

export default function SubmitPage() {
  return (
    <div>
      <div className="page-hero">
        <div className="section py-10 max-w-3xl">
          <header className="text-center">
            <div className="chip-coral">Submission · Manual review</div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Submit your adoption proof</h1>
            <p className="text-ink-soft mt-2 text-lg">
              Post public proof on X and tag{" "}
              <a href={SITE.xUrl} className="underline decoration-gold decoration-2 underline-offset-2">@{SITE.xHandle}</a>, then fill this out.
            </p>
          </header>
        </div>
      </div>
      <div className="section max-w-3xl mt-10">
        <SubmitForm />
      </div>
    </div>
  );
}
