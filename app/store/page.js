import { getProducts } from "@/lib/data";
import SafeImage from "@/components/SafeImage";

export const metadata = {
  title: "Store | Bellum",
  description: "Bellum furniture collection.",
};

export default function StorePage() {
  const products = getProducts();

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <section className="max-w-2xl mb-16">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-5">
          Bellum Furniture
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight">
          The Store
        </h1>
        <p className="font-sans text-lg leading-8 text-stone mt-8">
          Considered pieces made with enduring materials, quiet detail, and
          everyday comfort in mind.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {products.map((product) => (
          <article key={product.slug} className="group">
            <div className="relative aspect-[4/5] overflow-hidden bg-hairline">
              <SafeImage
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="pt-5 border-b border-hairline pb-5">
              <p className="font-sans text-xs uppercase tracking-[0.15em] text-stone">
                {product.category}
              </p>
              <div className="flex items-baseline justify-between gap-4 mt-2">
                <h2 className="font-serif text-2xl">{product.name}</h2>
                <p className="font-sans text-sm text-stone">${product.price}</p>
              </div>
              <p className="font-sans text-sm leading-6 text-stone mt-3">
                {product.description}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
