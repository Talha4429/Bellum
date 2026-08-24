import Link from "next/link";
import SafeImage from "@/components/SafeImage";

export const metadata = {
  title: "About | Bellum Architectural Studio",
  description:
    "We are a multidisciplinary architecture and design studio based in Lahore, dedicated to crafting spaces that evoke a sense of calm and enduring elegance.",
};

export default function AboutStudioPage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full px-6 md:px-16 py-20 md:py-28 flex flex-col items-center justify-center text-center border-b border-[#E4E1DA]">
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-4 block">
          About Bellum
        </span>
        <h1 className="font-serif text-5xl md:text-8xl font-light text-ink mb-6 max-w-4xl tracking-tight leading-[1.05]">
          Spatial Silence, <br className="hidden md:block" /> Enduring Craft
        </h1>
        <p className="font-sans text-base md:text-lg text-stone max-w-2xl leading-relaxed">
          We are a multidisciplinary architecture and design studio based in
          Lahore, dedicated to crafting spaces that evoke a sense of calm and
          enduring elegance.
        </p>
      </section>

      {/* Story Section */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 py-20 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-b border-[#E4E1DA]">
        <div className="col-span-1 md:col-span-4">
          <h2 className="font-serif text-3xl md:text-4xl text-ink sticky top-28">
            Our Studio
          </h2>
          <div className="mt-4 flex flex-col gap-2 font-sans text-xs uppercase tracking-widest text-stone">
            <Link href="/about/brand-history" className="hover:text-ink transition-colors underline-offset-4 hover:underline">
              Read Brand History →
            </Link>
            <Link href="/about/team" className="hover:text-ink transition-colors underline-offset-4 hover:underline">
              Meet the Team →
            </Link>
          </div>
        </div>

        <div className="col-span-1 md:col-span-8 flex flex-col gap-6">
          <div className="aspect-[16/9] w-full mb-6 overflow-hidden bg-[#f1edec] border border-[#E4E1DA] relative">
            <SafeImage
              src="/images/portfolio/hampstead-cover.jpg"
              alt="Bellum Architecture Studio"
              fill
              className="object-cover"
            />
          </div>

          <p className="font-sans text-base md:text-lg text-stone leading-relaxed">
            Founded on the principles of spatial clarity and material honesty,
            Bellum approaches every project as a unique narrative. We believe
            that architecture should not merely provide shelter, but actively
            shape the human experience through thoughtful proportions, nuanced
            light, and tactile surfaces.
          </p>

          <p className="font-sans text-base md:text-lg text-stone leading-relaxed">
            Our Lahore roots infuse our work with a deep respect for context and
            climate, while our global outlook ensures our designs remain
            contemporary and relevant. We strip away the superfluous to reveal
            the essence of a space, creating environments that are both highly
            functional and deeply poetic.
          </p>

          <p className="font-sans text-base md:text-lg text-stone leading-relaxed">
            The studio operates at the intersection of architecture, interior
            design, and bespoke furniture, allowing us to maintain rigorous
            control over every detail of the built environment, ensuring a
            cohesive vision from concept to completion.
          </p>
        </div>
      </section>

      {/* Approach Bento Grid */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-16 py-20 md:py-24 border-b border-[#E4E1DA]">
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-2 block">
            Design Philosophy
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-ink">
            Our Approach
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 border border-[#E4E1DA] bg-white/40 flex flex-col hover:bg-ink hover:text-ivory transition-colors duration-300 group">
            <span className="material-symbols-outlined text-4xl mb-6 text-ink group-hover:text-ivory">
              straighten
            </span>
            <h3 className="font-serif text-2xl mb-3 text-ink group-hover:text-ivory">
              Contextual Rigor
            </h3>
            <p className="font-sans text-sm md:text-base leading-relaxed text-stone group-hover:text-ivory/80 flex-grow">
              We begin by listening—to the site, the climate, and the client. Our
              designs are deeply rooted in their environment, ensuring relevance,
              longevity, and sustainability.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 border border-[#E4E1DA] bg-white/40 flex flex-col hover:bg-ink hover:text-ivory transition-colors duration-300 group">
            <span className="material-symbols-outlined text-4xl mb-6 text-ink group-hover:text-ivory">
              layers
            </span>
            <h3 className="font-serif text-2xl mb-3 text-ink group-hover:text-ivory">
              Material Honesty
            </h3>
            <p className="font-sans text-sm md:text-base leading-relaxed text-stone group-hover:text-ivory/80 flex-grow">
              We favor natural materials that age gracefully. Concrete, timber,
              and stone are expressed truthfully, celebrating their inherent
              textures and quiet imperfections.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 border border-[#E4E1DA] bg-white/40 flex flex-col hover:bg-ink hover:text-ivory transition-colors duration-300 group">
            <span className="material-symbols-outlined text-4xl mb-6 text-ink group-hover:text-ivory">
              light_mode
            </span>
            <h3 className="font-serif text-2xl mb-3 text-ink group-hover:text-ivory">
              Sculpting Light
            </h3>
            <p className="font-sans text-sm md:text-base leading-relaxed text-stone group-hover:text-ivory/80 flex-grow">
              Light is treated as a primary building material. We orchestrate the
              interplay of natural and artificial illumination to define volumes,
              depth, and daily comfort.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-6 md:px-16 py-24 flex flex-col items-center justify-center text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-ink mb-6">
          Ready to create something considered?
        </h2>
        <p className="font-sans text-stone max-w-lg mb-8 leading-relaxed">
          From full architectural commissions to bespoke furniture pieces, we
          work with clients across the globe.
        </p>
        <a
          href="mailto:info@bellum.com.pk"
          className="btn-ink font-sans text-xs uppercase tracking-widest"
        >
          Get in Touch
        </a>
      </section>
    </main>
  );
}
