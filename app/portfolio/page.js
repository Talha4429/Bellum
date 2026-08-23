import Link from "next/link";
import { getPortfolio } from "@/lib/data";
import SafeImage from "@/components/SafeImage";

export default function PortfolioPage() {
  const projects = getPortfolio();

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="font-serif text-5xl font-light mb-4">Portfolio</h1>
      <p className="font-sans text-stone max-w-xl mb-16">
        A selection of interiors and spaces we've designed and built.
      </p>

      <div className="flex flex-col gap-16">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className="group grid md:grid-cols-[80px_1fr] gap-6 items-start border-t border-hairline pt-8"
          >
            <span className="font-serif text-2xl text-stone">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="relative aspect-[16/9] overflow-hidden mb-4">
                <SafeImage
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h2 className="font-serif text-2xl">{project.title}</h2>
              <p className="font-sans text-sm text-stone mt-1">
                {project.location} · {project.year}
              </p>
              <p className="font-sans text-sm text-stone mt-2 max-w-xl">
                {project.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}