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
    title: `${collection.title} Collection | Bellum`,
    description: collection.description,
  };
}

export default function CollectionPage({ params }) {
  const collection = getCollectionBySlug(params.slug);

  if (!collection) notFound();

  return (
    <main className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-16 pb-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-stone mb-6">
        <Link href="/" className="hover:text-ink transition-colors">
          Home
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link href="/store" className="hover:text-ink transition-colors">
          Store
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-ink">{collection.title}</span>
      </div>

      <section className="mb-12 max-w-3xl">
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-2 block">
          Bellum Collection
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-ink mb-4">
          {collection.title}
        </h1>
        <p className="font-sans text-base md:text-lg text-stone">
          {collection.description}
        </p>
      </section>

      <section className="mb-16">
        <div className="relative aspect-[16/8] overflow-hidden border border-[#E4E1DA] bg-[#f1edec]">
          <SafeImage
            src={collection.image}
            alt={collection.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      <section className="max-w-xl border-t border-[#E4E1DA] pt-8">
        <p className="font-sans text-sm md:text-base leading-relaxed text-stone mb-8">
          Our {collection.title.toLowerCase()} pieces are engineered with raw
          material honesty, minimal detailing, and proportion suited for
          calm, enduring living spaces.
        </p>
        <Link
          href="/store"
          className="btn-ink font-sans text-xs uppercase tracking-widest"
        >
          Explore All Store Pieces
        </Link>
      </section>
    </main>
  );
}
