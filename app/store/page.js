"use client";

import { useState, useEffect } from "react";
import SafeImage from "@/components/SafeImage";
import { useCart } from "@/components/CartContext";

const categories = ["All", "Seating", "Tables", "Lighting", "Storage"];

export default function StorePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addItem } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setAllProducts(data.products);
        }
      } catch (err) {
        console.warn("Failed to load products from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <main className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-16 pb-24">
      {/* Header */}
      <header className="mb-14">
        <h1 className="font-serif text-5xl md:text-7xl font-light text-ink mb-3 tracking-tight">
          Store
        </h1>
        <p className="font-sans text-base md:text-lg text-stone max-w-2xl">
          Explore our curated collection of furniture and objects crafted for
          quiet rooms and enduring daily life.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 md:gap-8 mb-12 border-b border-[#E4E1DA] pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`font-sans text-xs uppercase tracking-widest pb-1 transition-all ${
              selectedCategory === category
                ? "text-ink font-semibold border-b-2 border-ink"
                : "text-stone hover:text-ink"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <span className="inline-block w-5 h-5 border-2 border-stone/30 border-t-stone rounded-full animate-spin mb-3" />
          <p className="font-sans text-xs uppercase tracking-widest text-stone">
            Loading products…
          </p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProducts.map((product) => (
            <article
              key={product.slug}
              className="flex flex-col group border border-[#E4E1DA] p-4 bg-white/30 hover:bg-white transition-all duration-300"
            >
              <div className="aspect-[4/5] w-full overflow-hidden mb-4 bg-[#f1edec] relative">
                <SafeImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="font-sans text-xs uppercase tracking-widest text-stone mb-1 block">
                    {product.category}
                  </span>
                  <h2 className="font-serif text-xl md:text-2xl text-ink">
                    {product.name}
                  </h2>
                  {product.finish && (
                    <p className="font-sans text-xs text-stone mt-1">
                      {product.finish}
                    </p>
                  )}
                </div>
                <span className="font-sans text-base font-medium text-ink">
                  PKR {product.price?.toLocaleString() || product.price}
                </span>
              </div>

              <p className="font-sans text-xs leading-relaxed text-stone mb-6 flex-grow">
                {product.description}
              </p>

              <button
                type="button"
                onClick={() => addItem(product, 1)}
                className="mt-auto w-full border border-ink text-ink py-3 px-6 font-sans text-xs uppercase tracking-widest hover:bg-ink hover:text-ivory transition-colors duration-300 text-center flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">
                  shopping_bag
                </span>
                Add to Cart
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-stone font-sans text-sm border border-dashed border-[#E4E1DA]">
          No products found in this category.
        </div>
      )}
    </main>
  );
}
