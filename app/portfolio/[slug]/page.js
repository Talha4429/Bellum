import { getProjectBySlug, getPortfolio } from "@/lib/data";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";

export function generateStaticParams() {
  return getPortfolio().map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <p className="font-sans text-xs uppercase tracking-[0.15em] text-stone mb-4">
        {project.location} · {project.year}
      </p>
      <h1 className="font-serif text-5xl font-light mb-8">{project.title}</h1>
      <p className="font-sans text-stone max-w-2xl mb-12">{project.summary}</p>

      <div className="relative aspect-[16/9] overflow-hidden mb-8">
        <SafeImage
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {project.images.map((img, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden">
            <SafeImage src={img} alt={`${project.title} ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </main>
  );
}