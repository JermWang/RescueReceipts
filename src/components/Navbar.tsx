"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/config";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40">
      <div className="glass">
        <div className="section flex items-center justify-between py-2.5">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/redesign/uploads/RR-logo.png"
              alt={SITE.name}
              width={150}
              height={44}
              priority
              className="h-10 w-auto transition-transform group-hover:-rotate-1 group-hover:scale-[1.03]"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const active = l.href !== "/" && pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3.5 py-2 rounded-full text-sm font-bold transition ${
                    active
                      ? "bg-soft-greenPale text-soft-greenDark ring-1 ring-soft-green/60"
                      : "text-ink-soft hover:text-ink hover:bg-ink/5"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link href="/submit" className="ml-2 btn-gold text-sm !py-2">
              Submit Proof
            </Link>
          </nav>
          <button
            className="md:hidden btn-ghost px-3 text-2xl leading-none"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            ≡
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-ink/10">
            <div className="section py-3 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="py-2 font-bold text-ink-soft hover:text-ink"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/submit" className="btn-gold mt-2 self-start" onClick={() => setOpen(false)}>
                Submit Proof
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
