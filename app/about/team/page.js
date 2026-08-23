import TeamGrid from "@/components/TeamGrid";

export const metadata = {
  title: "Team | Bellum",
  description: "The people behind Bellum — The Finest.",
};

export default function TeamPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <section className="max-w-3xl mb-16">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-5">
          The People Behind Bellum
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight">
          Our Team
        </h1>
        <p className="font-sans text-lg leading-8 text-stone max-w-2xl mt-8">
          A close-knit team of designers, makers, and project specialists
          united by a shared respect for craft and considered spaces.
        </p>
      </section>

      <TeamGrid />

      <p className="font-sans text-xs text-stone mt-12">
        Replace the portrait placeholders, names, and introductions with your
        team&apos;s details when ready.
      </p>
    </main>
  );
}
