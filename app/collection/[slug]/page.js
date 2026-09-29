import Link from "next/link";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import { collections, getCollectionBySlug } from "@/lib/collections";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }) {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: `${collection.title} Collection — Craftsmanship & Design | Bellum`,
    description: collection.description,
  };
}

export default function CollectionPage({ params }) {
  const collection = getCollectionBySlug(params.slug);

  if (!collection) notFound();

  const otherCollections = collections.filter((c) => c.slug !== collection.slug);

  return (
    <main className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-12 md:pt-16 pb-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-stone mb-8">
        <Link href="/" className="hover:text-ink transition-colors">
          Home
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-stone">Collection</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-ink font-medium">{collection.title}</span>
      </div>

      {/* Header Section */}
      <section className="mb-12 max-w-4xl">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-stone mb-3 block font-medium">
          Bellum Atelier Series
        </span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-ink mb-4">
          {collection.title}
        </h1>
        <p className="font-serif text-xl md:text-2xl text-stone italic mb-4 font-light">
          {collection.subtitle}
        </p>
        <p className="font-sans text-base md:text-lg text-stone max-w-2xl leading-relaxed">
          {collection.description}
        </p>
      </section>

      {/* Hero Visual Banner */}
      <section className="mb-20">
        <div className="relative w-full aspect-[16/9] overflow-hidden border border-[#E4E1DA] bg-[#111111] shadow-sm">
          {collection.heroVideo ? (
            <iframe
              src={collection.heroVideo}
              className="w-full h-full object-cover"
              title={collection.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <SafeImage
              src={collection.heroImage}
              alt={collection.title}
              fill
              priority
              className="object-cover object-center"
            />
          )}
        </div>
      </section>

      {/* Craftsmanship Narrative */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 pb-20 border-b border-[#E4E1DA]">
        <div className="lg:col-span-5">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-3 block">
            The Philosophy of Form
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-ink leading-snug">
            Precision engineering, honest materials, and quiet permanence.
          </h2>
        </div>
        <div className="lg:col-span-7 flex flex-col justify-between">
          <p className="font-sans text-base md:text-lg leading-relaxed text-stone mb-8">
            {collection.craftsmanshipStory}
          </p>
        </div>
      </section>

      {/* Craftsmanship Pillars */}
      {collection.pillars && (
        <section className="mb-20">
          <div className="mb-12">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-2 block">
              Execution Standards
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink">
              Craftsmanship Pillars
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collection.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 border border-[#E4E1DA] bg-white flex flex-col justify-between"
              >
                <div>
                  <span className="font-sans text-xs uppercase tracking-widest text-stone mb-4 block">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-2xl text-ink mb-3">
                    {pillar.title}
                  </h3>
                </div>
                <p className="font-sans text-sm leading-relaxed text-stone">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Materiality Breakdown */}
      {collection.materials && (
        <section className="mb-20 pb-20 border-b border-[#E4E1DA]">
          <div className="mb-12">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-2 block">
              Material Specification
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink">
              Materials & Tactility
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collection.materials.map((mat, idx) => (
              <div
                key={idx}
                className="p-6 border border-[#E4E1DA] bg-[#F7F5F1]/50"
              >
                <div className="w-2 h-2 rounded-full bg-ink mb-4" />
                <h4 className="font-sans text-sm font-semibold text-ink uppercase tracking-wider mb-2">
                  {mat.name}
                </h4>
                <p className="font-sans text-xs leading-relaxed text-stone">
                  {mat.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Visual Gallery Grid */}
      {collection.gallery && (
        <section className="mb-24">
          <div className="mb-12">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-2 block">
              Visual Narrative
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink">
              In Situ & Workshop Details
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collection.gallery.map((imgSrc, idx) => (
              <div
                key={idx}
                className="relative aspect-[4/5] border border-[#E4E1DA] overflow-hidden bg-[#f1edec] group"
              >
                <SafeImage
                  src={imgSrc}
                  alt={`${collection.title} Detail ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Explore Other Collections */}
      <section className="pt-12 border-t border-[#E4E1DA]">
        <div className="flex justify-between items-end mb-8">
          <h3 className="font-serif text-2xl md:text-3xl text-ink">
            Other Collections
          </h3>
          <Link
            href="/store"
            className="font-sans text-xs uppercase tracking-widest text-stone hover:text-ink underline-offset-4 hover:underline"
          >
            All Store Pieces →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {otherCollections.map((other) => (
            <Link
              key={other.slug}
              href={`/collection/${other.slug}`}
              className="p-6 border border-[#E4E1DA] hover:border-ink transition-all group bg-white block"
            >
              <span className="font-sans text-xs uppercase tracking-widest text-stone group-hover:text-ink mb-1 block">
                Explore Series
              </span>
              <h4 className="font-serif text-xl text-ink mb-2">
                {other.title}
              </h4>
              <p className="font-sans text-xs text-stone line-clamp-2">
                {other.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

