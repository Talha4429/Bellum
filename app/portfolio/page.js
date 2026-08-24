import Link from "next/link";
import { getPortfolio } from "@/lib/data";
import SafeImage from "@/components/SafeImage";

export const metadata = {
  title: "Portfolio | Bellum Architectural Studio",
  description: "A selection of interiors and architectural spaces designed and built by Bellum.",
};

export default function PortfolioPage() {
  const projects = getPortfolio();

  return (
    <main className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-16 pb-24">
      {/* Header Section */}
      <section className="mb-16">
        <h1 className="font-serif text-5xl md:text-7xl font-light text-ink mb-3 tracking-tight">
          Portfolio
        </h1>
        <p className="font-sans text-base md:text-lg text-stone max-w-2xl">
          A selection of interiors and architectural spaces we&apos;ve designed and built across Lahore, Dubai, and beyond.
        </p>
      </section>

      {/* Projects List */}
      <section className="flex flex-col gap-16 md:gap-20">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className="flex flex-col md:flex-row gap-6 md:gap-10 border-b border-[#E4E1DA] pb-16 group"
          >
            {/* Number Index */}
            <div className="w-full md:w-20 shrink-0">
              <span className="font-sans text-xs uppercase tracking-widest text-stone block pt-1">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Project Card Body */}
            <div className="w-full flex-1">
              <Link href={`/portfolio/${project.slug}`} className="block">
                <div className="relative aspect-[16/9] w-full mb-6 overflow-hidden bg-[#f1edec] border border-[#E4E1DA]">
                  <SafeImage
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-2 mb-3">
                  <h2 className="font-serif text-2xl md:text-3xl text-ink group-hover:text-stone transition-colors">
                    {project.title}
                  </h2>
                  <span className="font-sans text-xs uppercase tracking-widest text-stone">
                    {project.location} · {project.year}
                  </span>
                </div>

                <p className="font-sans text-sm md:text-base leading-relaxed text-stone max-w-3xl mb-6">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-[11px] uppercase tracking-widest border border-stone/30 px-3 py-1 text-stone"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
