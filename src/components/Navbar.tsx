"use client";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/config";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40">
      <div className="glass">
        <div className="section flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo />
            <span className="font-display text-xl text-ink">{SITE.name}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 rounded-full text-sm text-ink-soft hover:text-ink hover:bg-ink/5"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/submit" className="ml-2 btn-primary text-sm">
              Submit Proof
            </Link>
          </nav>
          <button
            className="md:hidden btn-ghost px-3"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="i">≡</span>
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-ink/10">
            <div className="section py-2 flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="py-2 text-ink-soft hover:text-ink"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/submit" className="btn-primary mt-2 self-start" onClick={() => setOpen(false)}>
                Submit Proof
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-warm-orange/15 ring-1 ring-warm-orange/30">
      <svg viewBox="0 0 32 32" className="h-5 w-5 text-warm-orange" fill="currentColor" aria-hidden>
        <circle cx="9" cy="11" r="3" />
        <circle cx="23" cy="11" r="3" />
        <circle cx="5" cy="18" r="2.4" />
        <circle cx="27" cy="18" r="2.4" />
        <path d="M16 16c-5 0-9 3.5-9 8 0 2 1.7 3 3.5 3h11c1.8 0 3.5-1 3.5-3 0-4.5-4-8-9-8z" />
      </svg>
    </span>
  );
}
