import Link from "next/link";
import SafeImage from "@/components/SafeImage";

export const metadata = {
  title: "Brand History | Bellum Architectural Studio",
  description: "The decade-long evolution, philosophy, and recognition behind Bellum — The Finest.",
};

export default function BrandHistoryPage() {
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
        <span className="text-ink">Brand History</span>
      </div>

      {/* Header Section */}
      <header className="mb-14 max-w-3xl">
        <h1 className="font-serif text-5xl md:text-8xl font-light tracking-tight text-ink mb-4">
          Our Story
        </h1>
        <p className="font-sans text-lg md:text-xl text-stone">
          The history, evolution, and architectural philosophy behind Bellum
        </p>
      </header>

      {/* Intro Section */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-10">
          <p className="font-sans text-lg md:text-xl leading-relaxed text-stone">
            Founded amidst the rich cultural backdrop of Lahore, Bellum began
            with a shared vision between two partners who believed furniture and
            built spaces should not merely fill a room—they should define it.
            Starting from a single atelier in Gulberg, Lahore under the name GYO
            Lifestyle, the studio evolved into Bellum — The Finest, representing
            an uncompromising commitment to structural honesty, spatial
            restraint, and time-tested craft.
          </p>
        </div>
      </section>

      {/* Studio Image */}
      <section className="mb-24">
        <div className="w-full aspect-[16/9] border border-[#E4E1DA] overflow-hidden bg-[#f1edec] relative">
          <SafeImage
            src="/images/portfolio/hampstead-cover.jpg"
            alt="Bellum Architecture Studio Lahore"
            fill
            priority
            className="object-cover"
          />
        </div>
        <p className="font-sans text-xs uppercase tracking-widest text-stone mt-3 text-right">
          Bellum Studio & Atelier, Lahore
        </p>
      </section>

      {/* Timeline Section */}
      <section className="mb-24">
        <h2 className="font-serif text-3xl md:text-4xl text-ink border-b border-[#E4E1DA] pb-4 mb-14">
          Evolution
        </h2>

        <div className="relative border-l border-[#E4E1DA] ml-3 md:ml-0 md:border-l-0 md:grid md:grid-cols-12 gap-8 space-y-12 md:space-y-0">
          {/* 2015 */}
          <div className="relative pl-8 md:pl-0 md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:text-right md:pr-12">
              <span className="font-serif text-3xl text-ink">2015</span>
            </div>
            <div className="md:pl-12 pt-1 border-t md:border-t-0 border-[#E4E1DA]">
              <h3 className="font-sans text-xs uppercase tracking-widest font-semibold text-ink mb-2">
                Foundation in Lahore
              </h3>
              <p className="font-sans text-sm md:text-base leading-relaxed text-stone">
                Established with a focus on bespoke furniture and residential
                interventions. The studio philosophy of &apos;silence in design&apos;
                and material truth is formalized.
              </p>
            </div>
          </div>

          {/* 2018 */}
          <div className="relative pl-8 md:pl-0 md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:mt-12">
            <div className="md:text-right md:pr-12 order-1 md:order-2">
              <span className="font-serif text-3xl text-ink">2018</span>
            </div>
            <div className="md:pl-12 md:text-right order-2 md:order-1 pt-1 md:pr-12 border-t md:border-t-0 border-[#E4E1DA]">
              <h3 className="font-sans text-xs uppercase tracking-widest font-semibold text-ink mb-2">
                Turnkey & Architectural Practice
              </h3>
              <p className="font-sans text-sm md:text-base leading-relaxed text-stone">
                Expanded into complete turnkey solutions, offering architectural
                consultation, full interior design, and bespoke joinery for luxury
                residences.
              </p>
            </div>
          </div>

          {/* 2024 */}
          <div className="relative pl-8 md:pl-0 md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:mt-12">
            <div className="md:text-right md:pr-12">
              <span className="font-serif text-3xl text-ink">2024</span>
            </div>
            <div className="md:pl-12 pt-1 border-t md:border-t-0 border-[#E4E1DA]">
              <h3 className="font-sans text-xs uppercase tracking-widest font-semibold text-ink mb-2">
                Digital Presence & Global Projects
              </h3>
              <p className="font-sans text-sm md:text-base leading-relaxed text-stone">
                Launch of the comprehensive digital studio and furniture
                collection, serving discerning clients across Pakistan, the Middle
                East, and Europe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Bento Grid */}
      <section className="mb-24">
        <h2 className="font-serif text-3xl md:text-4xl text-ink mb-8">
          Our Philosophy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 p-10 border border-[#E4E1DA] bg-white/40 flex flex-col justify-between hover:bg-white transition-colors duration-300">
            <span className="font-sans text-xs uppercase tracking-widest border border-stone/30 px-3 py-1 text-stone self-start mb-8">
              01
            </span>
            <div className="max-w-xl">
              <h3 className="font-serif text-3xl text-ink mb-3">Craftsmanship</h3>
              <p className="font-sans text-base leading-relaxed text-stone">
                A rigorous dedication to material honesty. We source regional
                stone, seasoned timber, and patinated steel, treating each with
                reverence that reveals its inherent tactile character.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="p-8 border border-[#E4E1DA] bg-white/40 flex flex-col justify-between hover:bg-white transition-colors duration-300">
              <span className="font-sans text-xs uppercase tracking-widest text-stone mb-4">
                02
              </span>
              <div>
                <h3 className="font-serif text-2xl text-ink mb-2">Restraint</h3>
                <p className="font-sans text-sm leading-relaxed text-stone">
                  Designing through deduction. Stripping away the ornamental until
                  only absolute structural and functional necessity remains.
                </p>
              </div>
            </div>

            <div className="p-8 border border-[#E4E1DA] bg-white/40 flex flex-col justify-between hover:bg-white transition-colors duration-300">
              <span className="font-sans text-xs uppercase tracking-widest text-stone mb-4">
                03
              </span>
              <div>
                <h3 className="font-serif text-2xl text-ink mb-2">
                  Studio Culture
                </h3>
                <p className="font-sans text-sm leading-relaxed text-stone">
                  A collaborative atelier where architects, master woodworkers, and
                  clients engage in continuous spatial dialogue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Recognition */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[#E4E1DA] pt-16 mb-24">
        {/* Values */}
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-ink border-b border-[#E4E1DA] pb-4 mb-6">
            Our Values
          </h2>
          <ul className="divide-y divide-[#E4E1DA]">
            {["Precision", "Contextual Relevance", "Material Honesty", "Timelessness"].map(
              (val) => (
                <li
                  key={val}
                  className="py-4 flex justify-between items-center font-serif text-xl text-ink"
                >
                  <span>{val}</span>
                  <span className="material-symbols-outlined text-stone text-sm">
                    arrow_forward
                  </span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Recognition */}
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-ink border-b border-[#E4E1DA] pb-4 mb-6">
            Recognition & Honors
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-[#E4E1DA]">
              <span className="col-span-3 font-sans text-xs uppercase tracking-widest text-stone pt-1">
                2023
              </span>
              <div className="col-span-9">
                <h4 className="font-sans text-base font-semibold text-ink">
                  AIA International Design Award
                </h4>
                <p className="font-sans text-xs uppercase tracking-wider text-stone mt-1">
                  Residential Architecture
                </p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-[#E4E1DA]">
              <span className="col-span-3 font-sans text-xs uppercase tracking-widest text-stone pt-1">
                2021
              </span>
              <div className="col-span-9">
                <h4 className="font-sans text-base font-semibold text-ink">
                  ArchDaily Building of the Year
                </h4>
                <p className="font-sans text-xs uppercase tracking-wider text-stone mt-1">
                  Commercial & Studio Spaces
                </p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <span className="col-span-3 font-sans text-xs uppercase tracking-widest text-stone pt-1">
                2019
              </span>
              <div className="col-span-9">
                <h4 className="font-sans text-base font-semibold text-ink">
                  Dezeen Awards Shortlist
                </h4>
                <p className="font-sans text-xs uppercase tracking-wider text-stone mt-1">
                  Emerging Architecture Studio
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width CTA */}
      <section className="bg-ink text-ivory p-12 md:p-20 text-center">
        <h2 className="font-serif text-3xl md:text-5xl mb-6">
          Ready to Transform Your Space?
        </h2>
        <p className="font-sans text-stone max-w-lg mx-auto mb-8 text-sm md:text-base">
          Let&apos;s discuss your upcoming architectural or interior project.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="mailto:info@bellum.com.pk"
            className="px-8 py-3 bg-ivory text-ink hover:bg-white font-sans text-xs uppercase tracking-widest transition-colors duration-300"
          >
            Start a Project
          </a>
          <Link
            href="/portfolio"
            className="px-8 py-3 border border-ivory/40 text-ivory hover:border-ivory font-sans text-xs uppercase tracking-widest transition-colors duration-300"
          >
            Explore Portfolio
          </Link>
        </div>
      </section>
    </main>
  );
}
