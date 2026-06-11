import { SITE } from "@/lib/config";

export const metadata = { title: `Terms & Responsible Adoption — ${SITE.name}` };

export default function TermsPage() {
  return (
    <div className="section py-10 max-w-3xl prose-sm">
      <div className="chip-gold">Plain language</div>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Terms & Responsible Adoption</h1>
      <p className="text-ink-soft mt-2 text-lg">Plain language. No tricks. Last updated on first deploy.</p>

      <section className="mt-8 space-y-4 text-ink-soft text-sm">
        <Item title="Bounties are not guaranteed.">
          Every submission goes through manual review. We may approve, deny, or partially fund any submission at our discretion based on proof quality and available pool funds.
        </Item>
        <Item title="Submissions are manually reviewed.">
          Our team reads each submission, opens the X/Twitter proof post, and verifies the basics. We are not affiliated with any shelter, rescue, or veterinary provider.
        </Item>
        <Item title="We may deny suspicious submissions.">
          Duplicate, fake, abusive, or otherwise irresponsible submissions will be denied. Repeated abuse may result in a wallet/X handle ban.
        </Item>
        <Item title="Adopt only if you are ready.">
          Pets are a long-term responsibility — years of feeding, vet visits, time, and attention. Please do not adopt an animal only for a bounty.
        </Item>
        <Item title="Bounties are small support rewards.">
          The bounty is intended to help with first supplies — food, toys, bedding, vet basics. It is not compensation for the responsibility of ownership.
        </Item>
        <Item title="Not a shelter, rescue, broker, or vet.">
          {SITE.name} does not place animals, transport animals, or provide medical advice. We support adoption — we don't perform it.
        </Item>
        <Item title="Comply with local rules.">
          You are responsible for following the adoption laws and rules in your area.
        </Item>
        <Item title="Do not expose private documents.">
          When sharing proof, blur or redact sensitive personal information. We are not responsible for content you publish.
        </Item>
        <Item title="Pool rules can change.">
          Bounty sizes, eligibility criteria, and rules may change as the active pool changes.
        </Item>
      </section>
    </div>
  );
}

function Item({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-tile !p-4">
      <div className="font-display font-bold text-ink">{title}</div>
      <p className="mt-1">{children}</p>
    </div>
  );
}
