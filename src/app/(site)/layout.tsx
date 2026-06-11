import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="pointer-events-none fixed inset-0 bg-grain opacity-[0.16] mix-blend-multiply" aria-hidden />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
