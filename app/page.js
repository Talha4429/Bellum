import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { collections } from "@/lib/collections";

const services = [
  {
    title: "Architecture",
    description: "Thoughtful planning and architectural solutions shaped around how you live.",
    icon: "M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6",
  },
  {
    title: "Interior Design",
    description: "Refined interior spaces that balance material, light, and daily rituals.",
    icon: "M8 21v-7a4 4 0 0 1 8 0v7M12 3v7M7 10h10M5 21h14",
  },
  {
    title: "Custom Furniture",
    description: "Bespoke furniture crafted from honest materials and made to endure.",
    icon: "M5 11h14v6H5zM7 17v4M17 17v4M8 11V7h8v4",
  },
  {
    title: "Turnkey Projects",
    description: "A complete design-to-execution service, managed under one process.",
    icon: "M14 8a4 4 0 1 0-4 4l-8 8v3h3l8-8a4 4 0 0 0 5-3zM7 18l2 2",
  },
];

export default function Home() {
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

      <section id="services" className="max-w-7xl mx-auto px-6 py-24 border-t border-hairline">
        <div className="text-center mb-12">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-3">
            What We Do
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">Services</h2>
          <div className="w-px h-8 bg-stone/40 mx-auto mt-5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group min-h-72 rounded-sm border border-hairline bg-white/40 p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-stone/40 hover:bg-white hover:shadow-xl hover:shadow-ink/5"
            >
              <div className="w-14 h-14 rounded-full bg-hairline/70 text-ink flex items-center justify-center transition-colors duration-300 group-hover:bg-ink group-hover:text-ivory">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                  aria-hidden="true"
                >
                  <path d={service.icon} />
                </svg>
              </div>
              <span className="font-sans text-xs tracking-[0.15em] text-stone mt-auto mb-4">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-2xl mb-3">{service.title}</h3>
              <p className="font-sans text-sm leading-6 text-stone">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-hairline">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-3">
              Explore Bellum
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">Collections</h2>
          </div>
          <Link
            href="/store"
            className="font-sans text-xs uppercase tracking-[0.16em] hover:text-stone transition-colors"
          >
            View the store →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collection/${collection.slug}`}
              className="group relative min-h-80 overflow-hidden bg-ink"
            >
              <SafeImage
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                <p className="font-sans text-xs uppercase tracking-[0.16em] text-ivory/70 mb-2">
                  Collection
                </p>
                <h3 className="font-serif text-2xl">{collection.title}</h3>
                <p className="font-sans text-sm leading-5 text-ivory/80 mt-2">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
