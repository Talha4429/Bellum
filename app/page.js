import Link from "next/link";
import { getFeaturedProducts, getFeaturedProject } from "@/lib/data";
import SafeImage from "@/components/SafeImage";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const featuredProject = getFeaturedProject();

  return (
    <main>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
        <h1 className="font-serif text-6xl md:text-7xl font-light tracking-tight leading-tight">
          Furniture, made
          <br />
          to be lived with.
        </h1>
        <p className="font-sans text-stone mt-6 max-w-xl mx-auto">
          Bellum designs and builds furniture and interiors with restraint,
          material honesty, and time-tested craft.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/store"
            className="font-sans text-sm uppercase tracking-[0.15em] border border-ink px-6 py-3 hover:bg-ink hover:text-ivory transition-colors"
          >
            Shop the Store
          </Link>
          <Link
            href="/portfolio"
            className="font-sans text-sm uppercase tracking-[0.15em] px-6 py-3 hover:text-stone transition-colors"
          >
            View Portfolio
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-hairline">
        <h2 className="font-serif text-3xl mb-10">Featured Pieces</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredProducts.map((p) => (
            <Link key={p.slug} href={`/store/${p.slug}`} className="group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <SafeImage
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="font-sans text-xs uppercase tracking-[0.15em] text-stone mt-4">
                {p.category}
              </p>
              <h3 className="font-serif text-xl mt-1">{p.name}</h3>
              <p className="font-sans text-sm text-stone mt-1">${p.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured project */}
      {featuredProject && (
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-hairline">
          <h2 className="font-serif text-3xl mb-10">From the Portfolio</h2>
          <Link href={`/portfolio/${featuredProject.slug}`} className="group block">
            <div className="relative aspect-[16/9] overflow-hidden">
              <SafeImage
                src={featuredProject.coverImage}
                alt={featuredProject.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="font-sans text-xs uppercase tracking-[0.15em] text-stone mt-4">
              {featuredProject.location} · {featuredProject.year}
            </p>
            <h3 className="font-serif text-2xl mt-1">{featuredProject.title}</h3>
            <p className="font-sans text-sm text-stone mt-2 max-w-xl">
              {featuredProject.summary}
            </p>
          </Link>
        </section>
      )}
    </main>
  );
}