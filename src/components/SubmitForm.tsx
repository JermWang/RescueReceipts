"use client";
import { useState } from "react";
import { PET_TYPES, REQUIRED_CONFIRMATIONS, SITE } from "@/lib/config";

type FieldErrors = Partial<Record<string, string>>;

export function SubmitForm() {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [confirmations, setConfirmations] = useState<boolean[]>(REQUIRED_CONFIRMATIONS.map(() => false));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setFormError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      x_handle: String(fd.get("x_handle") || ""),
      x_post_url: String(fd.get("x_post_url") || ""),
      wallet_address: String(fd.get("wallet_address") || ""),
      pet_name: String(fd.get("pet_name") || ""),
      pet_type: String(fd.get("pet_type") || ""),
      adoption_date: String(fd.get("adoption_date") || ""),
      shelter_name: String(fd.get("shelter_name") || ""),
      location: String(fd.get("location") || ""),
      story: String(fd.get("story") || ""),
      confirmations,
    };
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.fieldErrors) setErrors(data.fieldErrors);
        setFormError(data?.error || "Submission failed.");
      } else {
        setDone(true);
      }
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="receipt-card receipt-edge p-8 text-center">
        <div className="mx-auto stamp text-soft-greenDark animate-stamp w-fit">Submitted</div>
        <h2 className="mt-4 font-display text-2xl">Your adoption proof was submitted.</h2>
        <p className="text-ink-soft mt-2 max-w-md mx-auto">
          Our team will review it manually. If approved, your pet may appear in the Adoption Park and your adoption receipt will become public.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="/park" className="btn-secondary">Visit Adoption Park</a>
          <a href={SITE.xUrl} target="_blank" rel="noreferrer" className="btn-primary">Follow @{SITE.xHandle}</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="receipt-card p-6 sm:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="x_handle" label="X / Twitter handle" placeholder="@username" error={errors.x_handle} />
        <Field name="x_post_url" label="X / Twitter proof post URL" placeholder="https://x.com/you/status/123…" error={errors.x_post_url} />
      </div>
      <Field name="wallet_address" label="Solana wallet address" placeholder="Solana public key" error={errors.wallet_address} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="pet_name" label="Pet name" placeholder="Beans" error={errors.pet_name} />
        <div>
          <label className="label">Pet type</label>
          <select name="pet_type" defaultValue="dog" className="input">
            {PET_TYPES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
          {errors.pet_type && <p className="text-xs text-rose-600 mt-1">{errors.pet_type}</p>}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="adoption_date" label="Adoption date" type="date" error={errors.adoption_date} />
        <Field name="shelter_name" label="Shelter / rescue (optional)" placeholder="Happy Tails Rescue" />
      </div>
      <Field name="location" label="City / state (optional)" placeholder="Austin, TX" />
      <div>
        <label className="label">Short adoption story (optional)</label>
        <textarea name="story" rows={4} className="input" placeholder="Tell us about your new family member…" maxLength={800} />
      </div>

      <fieldset className="rounded-2xl border-[1.5px] border-soft-green/40 bg-cream-100/70 p-4">
        <legend className="px-2 text-sm font-display font-bold">Required confirmations</legend>
        <div className="grid gap-2">
          {REQUIRED_CONFIRMATIONS.map((c, i) => (
            <label key={i} className="flex items-start gap-2 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={confirmations[i]}
                onChange={(e) => {
                  const next = [...confirmations];
                  next[i] = e.target.checked;
                  setConfirmations(next);
                }}
                className="mt-1 accent-soft-greenDark"
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
        {errors.confirmations && <p className="text-xs text-rose-600 mt-2">{errors.confirmations}</p>}
      </fieldset>

      {formError && (
        <div className="rounded-xl border border-rose-300 bg-rose-50 text-rose-800 text-sm p-3">{formError}</div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
          {submitting ? "Submitting…" : "Submit adoption proof"}
        </button>
        <p className="text-xs text-ink-soft">
          By submitting you agree to our{" "}
          <a href="/terms" className="underline">responsible adoption terms</a>.
        </p>
      </div>
    </form>
  );
}

function Field({
  name, label, placeholder, type = "text", error,
}: { name: string; label: string; placeholder?: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="label" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} className="input" />
      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
    </div>
  );
}
