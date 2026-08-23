import Link from "next/link";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import { collections, getCollectionBySlug } from "@/lib/collections";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export default function CollectionPage({ params }) {
  const collection = getCollectionBySlug(params.slug);

  if (!collection) notFound();

  return (
    <main>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-5">
          Bellum Collection
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight">
          {collection.title}
        </h1>
        <p className="font-sans text-lg leading-8 text-stone max-w-xl mt-7">
          {collection.description}
        </p>
      </section>
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative aspect-[16/7] overflow-hidden">
          <SafeImage
            src={collection.image}
            alt={collection.title}
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="max-w-xl mt-10">
          <p className="font-sans leading-7 text-stone">
            Our {collection.title.toLowerCase()} collection is being curated
            with the same care we bring to every Bellum piece.
          </p>
          <Link
            href="/store"
            className="inline-block mt-7 font-sans text-xs uppercase tracking-[0.16em] border-b border-ink pb-1 hover:text-stone hover:border-stone transition-colors"
          >
            Explore the store
          </Link>
        </div>
      </section>
    </main>
  );
}
