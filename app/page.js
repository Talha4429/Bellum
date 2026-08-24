import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { getFeaturedProducts, getFeaturedProject } from "@/lib/data";

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
    description: "A complete design-to-execution service, managed under one rigorous process.",
    icon: "M14 8a4 4 0 1 0-4 4l-8 8v3h3l8-8a4 4 0 0 0 5-3zM7 18l2 2",
  },
];

export default function Home() {
  const featuredProducts = getFeaturedProducts().slice(0, 3);
  const featuredProject = getFeaturedProject();

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="min-h-[75vh] flex flex-col justify-center items-center text-center px-6 md:px-16 py-20 relative">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-light tracking-tight leading-[1.05] max-w-4xl mx-auto mb-6 text-ink">
          Furniture, made <br className="hidden md:block" /> to be lived with
        </h1>
        <p className="font-sans text-base md:text-lg text-stone max-w-xl mx-auto mb-10 leading-relaxed">
          Bespoke architectural and interior solutions rooted in minimal design
          and high-end tactility. Designed in Lahore.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/store"
            className="btn-ink font-sans text-xs uppercase tracking-widest"
          >
            Shop the Store
          </Link>
          <Link
            href="/portfolio"
            className="font-sans text-xs uppercase tracking-widest text-ink py-3 px-8 hover:text-stone transition-colors underline-offset-4 hover:underline"
          >
            View Portfolio
          </Link>
        </div>
      </section>

      {/* Featured Pieces */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-20 border-t border-[#E4E1DA]">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-2 block">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink">
              Featured Pieces
            </h2>
          </div>
          <Link
            href="/store"
            className="hidden md:inline-block font-sans text-xs uppercase tracking-widest text-stone hover:text-ink transition-colors underline-offset-4 hover:underline"
          >
            View All Pieces →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.slug}
              href="/store"
              className="group block cursor-pointer"
            >
              <div className="aspect-[4/5] bg-[#f1edec] relative mb-4 border border-[#E4E1DA] overflow-hidden">
                <SafeImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-sans text-lg font-medium text-ink">
                  {product.name}
                </h3>
                <span className="font-sans text-xs uppercase tracking-wider text-stone group-hover:text-ink transition-colors">
                  PKR {product.price?.toLocaleString() || product.price}
                </span>
              </div>
              <p className="font-sans text-sm text-stone mt-1">
                {product.finish || product.category}
              </p>
            </Link>
          ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link
            href="/store"
            className="inline-block font-sans text-xs uppercase tracking-widest text-stone hover:text-ink underline-offset-4 hover:underline"
          >
            View All Pieces →
          </Link>
        </div>
      </section>

      {/* Portfolio Highlight Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-20 border-t border-[#E4E1DA]">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-2 block">
              Architectural Practice
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink">
              From the Portfolio
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden md:inline-block font-sans text-xs uppercase tracking-widest text-stone hover:text-ink transition-colors underline-offset-4 hover:underline"
          >
            All Projects →
          </Link>
        </div>

        <Link
          href={`/portfolio/${featuredProject.slug}`}
          className="group block relative aspect-[4/3] md:aspect-[16/9] overflow-hidden border border-[#E4E1DA]"
        >
          <div className="absolute inset-0 bg-[#111111]/25 group-hover:bg-[#111111]/45 transition-colors duration-500 z-10" />
          <SafeImage
            src={featuredProject.coverImage}
            alt={featuredProject.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out z-0"
          />
          <div className="absolute bottom-0 left-0 p-6 md:p-14 z-20 flex flex-col justify-end w-full h-full text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-sans text-xs uppercase tracking-widest border border-white/40 px-3 py-1 backdrop-blur-sm">
                {featuredProject.tags?.[0] || "RESIDENTIAL"}
              </span>
              <span className="font-sans text-xs uppercase tracking-widest text-white/80">
                {featuredProject.location}
              </span>
            </div>
            <h3 className="font-serif text-3xl md:text-5xl mb-3">
              {featuredProject.title}
            </h3>
            <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
              Explore Project{" "}
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Services Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-20 border-t border-[#E4E1DA]">
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-2 block">
            What We Do
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-ink">Services</h2>
          <div className="w-px h-8 bg-stone/40 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="border border-[#E4E1DA] bg-white/40 p-8 flex flex-col transition-all duration-300 hover:border-stone/50 hover:bg-white"
            >
              <div className="w-12 h-12 border border-[#E4E1DA] text-ink flex items-center justify-center mb-8">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d={service.icon} />
                </svg>
              </div>
              <span className="font-sans text-xs tracking-widest text-stone mb-3">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl mb-2 text-ink">
                {service.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-stone">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
