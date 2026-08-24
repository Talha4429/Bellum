"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    async function loadProject() {
      try {
        const res = await fetch("/api/portfolio");
        const data = await res.json();
        if (data.success && Array.isArray(data.portfolio)) {
          const found = data.portfolio.find((p) => p.slug === slug);
          if (found) {
            setProject(found);
          } else {
            setNotFound(true);
          }
        }
      } catch (err) {
        console.warn("Error loading project:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <main className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-16 pb-24">
        <div className="flex items-center gap-3 text-stone font-sans text-xs uppercase tracking-widest py-20 justify-center">
          <span className="inline-block w-4 h-4 border-2 border-stone/30 border-t-stone rounded-full animate-spin" />
          Loading project…
        </div>
      </main>
    );
  }

  if (notFound || !project) {
    return (
      <main className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-16 pb-24 text-center">
        <h1 className="font-serif text-4xl text-ink mb-4">Project Not Found</h1>
        <p className="font-sans text-sm text-stone mb-6">
          The project you&apos;re looking for does not exist or has been removed.
        </p>
        <Link
          href="/portfolio"
          className="btn-ink font-sans text-xs uppercase tracking-widest"
        >
          Back to Portfolio
        </Link>
      </main>
    );
  }

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
          className="object-cover"
        />
      </div>

      {/* Detailed Gallery Grid */}
      {project.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.images.map((img, i) => (
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
      )}

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