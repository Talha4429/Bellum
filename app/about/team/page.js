import Link from "next/link";
import TeamGrid from "@/components/TeamGrid";

export const metadata = {
  title: "Our Team | Bellum Architectural Studio",
  description:
    "Meet the dedicated architects, executives, and leaders behind Bellum. A collective united by a shared devotion to spatial harmony and disciplined craft.",
};

export default function TeamPage() {
  return (
    <main className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-16 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-stone mb-8">
        <Link href="/" className="hover:text-ink transition-colors">
          Home
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link href="/about" className="hover:text-ink transition-colors">
          About
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-ink">Our Team</span>
      </div>

      {/* Header Section */}
      <header className="mb-16 max-w-2xl">
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-ink mb-4">
          Our Team
        </h1>
        <p className="font-sans text-base md:text-lg leading-relaxed text-stone">
          Meet the dedicated architects, executives, and leaders behind Bellum.
          A collective united by a shared devotion to spatial harmony and
          disciplined craft.
        </p>
      </header>

      {/* Team Grid Component */}
      <TeamGrid />
    </main>
  );
}
