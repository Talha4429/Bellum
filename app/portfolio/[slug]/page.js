import { getProjectBySlug, getPortfolio } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

export function generateStaticParams() {
  return getPortfolio().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Bellum Portfolio`,
    description: project.summary,
  };
}

export default function ProjectDetailPage({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <main className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-16 pb-24">
      {/* Breadcrumb & Meta */}
      <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-stone mb-6">
        <Link href="/portfolio" className="hover:text-ink transition-colors">
          Portfolio
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-ink">{project.title}</span>
      </div>

      <header className="mb-12 max-w-3xl">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="font-sans text-[11px] uppercase tracking-widest border border-stone/30 px-3 py-1 text-stone"
            >
              {tag}
            </span>
          ))}
          <span className="font-sans text-[11px] uppercase tracking-widest text-stone py-1 pl-2">
            {project.location} · {project.year}
          </span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-light text-ink mb-6">
          {project.title}
        </h1>
        <p className="font-sans text-base md:text-lg leading-relaxed text-stone">
          {project.summary}
        </p>
      </header>

      {/* Main Cover Visual */}
      <div className="relative aspect-[16/9] overflow-hidden mb-12 border border-[#E4E1DA]">
        <SafeImage
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Detailed Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {project.images?.map((img, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] overflow-hidden border border-[#E4E1DA] bg-[#f1edec]"
          >
            <SafeImage
              src={img}
              alt={`${project.title} view ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-[#E4E1DA] flex justify-between items-center">
        <Link
          href="/portfolio"
          className="font-sans text-xs uppercase tracking-widest text-stone hover:text-ink transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Portfolio
        </Link>
        <Link
          href="/about"
          className="btn-ink font-sans text-xs uppercase tracking-widest"
        >
          Commission a Project
        </Link>
      </div>
    </main>
  );
}