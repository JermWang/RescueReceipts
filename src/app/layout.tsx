import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.subtagline,
  openGraph: {
    title: SITE.name,
    description: SITE.subtagline,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.subtagline },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
