"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import SafeImage from "@/components/SafeImage";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch live products from PostgreSQL API
  async function loadProducts() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Error loading products from database:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory =
      !categoryFilter ||
      p.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  async function toggleFeatured(slug, currentVal) {
    // Optimistic UI update
    setProducts((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, featured: !currentVal } : p))
    );

    try {
      await fetch(`/api/admin/products/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentVal }),
      });
    } catch (err) {
      console.error("Failed to update featured flag:", err);
      loadProducts();
    }
  }

  async function deleteProduct(slug) {
    if (!confirm("Are you sure you want to remove this product from PostgreSQL?")) {
      return;
    }

    setProducts((prev) => prev.filter((p) => p.slug !== slug));

    try {
      const res = await fetch(`/api/admin/products/${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        alert("Failed to delete product from database.");
        loadProducts();
      }
    } catch (err) {
      console.error("Failed to delete product:", err);
      loadProducts();
    }
  }

  return (
    <AdminLayout activeTab="products" breadcrumbs={["Products"]}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E4E1DA] gap-6">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-ink tracking-tight">
            Products
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-stone mt-2">
            PostgreSQL-backed inventory manager & live store synchronization
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={loadProducts}
            className="border border-stone/30 p-2 text-stone hover:text-ink hover:border-ink transition-colors"
            title="Refresh database"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
          </button>
          <Link
            href="/admin/products/new"
            className="btn-ink font-sans text-xs uppercase tracking-widest flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Product
          </Link>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-0 bottom-2 text-stone text-[20px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name or SKU..."
            className="minimal-input w-full pl-8 pb-2 text-sm font-sans"
          />
        </div>

        <div className="relative min-w-[200px]">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="minimal-input w-full pb-2 text-sm font-sans bg-transparent cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="Seating">Seating</option>
            <option value="Tables">Tables</option>
            <option value="Lighting">Lighting</option>
            <option value="Storage">Storage</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#E4E1DA] shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-[#E4E1DA] bg-[#f7f3f2]">
                <th className="py-4 px-6 font-sans text-xs uppercase tracking-widest text-stone font-normal">
                  Product Name
                </th>
                <th className="py-4 px-6 font-sans text-xs uppercase tracking-widest text-stone font-normal">
                  Category
                </th>
                <th className="py-4 px-6 font-sans text-xs uppercase tracking-widest text-stone font-normal text-right">
                  Price
                </th>
                <th className="py-4 px-6 font-sans text-xs uppercase tracking-widest text-stone font-normal text-center">
                  Featured
                </th>
                <th className="py-4 px-6 font-sans text-xs uppercase tracking-widest text-stone font-normal text-center">
                  Status
                </th>
                <th className="py-4 px-6 font-sans text-xs uppercase tracking-widest text-stone font-normal text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm divide-y divide-[#E4E1DA]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone text-xs uppercase tracking-widest">
                    Loading products from PostgreSQL...
                  </td>
                </tr>
              ) : filtered.map((product) => (
                <tr
                  key={product.slug}
                  className="hover:bg-[#f7f3f2]/60 transition-colors"
                >
                  {/* Name + Thumb */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#f1edec] border border-[#E4E1DA] relative shrink-0 overflow-hidden">
                        <SafeImage
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {Array.isArray(product.images) && product.images.length > 1 && (
                          <span className="absolute bottom-0 right-0 bg-ink text-ivory text-[9px] font-sans px-1 font-semibold">
                            {product.images.length}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-ink font-serif text-base">
                          {product.name}
                        </div>
                        <div className="text-xs text-stone font-mono">
                          SKU: {product.sku || "PROD-001"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6 text-stone">{product.category}</td>

                  {/* Price */}
                  <td className="py-4 px-6 text-right font-medium text-ink">
                    PKR {Number(product.price).toLocaleString()}
                  </td>

                  {/* Featured Toggle */}
                  <td className="py-4 px-6 text-center">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(product.slug, product.featured)}
                      className="p-1 hover:scale-110 transition-transform"
                      title={product.featured ? "Featured on Home" : "Not Featured"}
                    >
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          product.featured ? "text-ink fill" : "text-[#E4E1DA]"
                        }`}
                      >
                        star
                      </span>
                    </button>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 border text-[10px] uppercase tracking-widest ${
                        product.status === "Draft"
                          ? "border-stone/40 text-stone"
                          : "border-ink text-ink bg-[#f7f3f2]"
                      }`}
                    >
                      {product.status || "Active"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right space-x-3">
                    <Link
                      href="/store"
                      className="text-stone hover:text-ink transition-colors"
                      title="View on Store"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        visibility
                      </span>
                    </Link>
                    <Link
                      href={`/admin/products/${product.slug}/edit`}
                      className="text-stone hover:text-ink transition-colors"
                      title="Edit Product"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        edit
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteProduct(product.slug)}
                      className="text-stone hover:text-red-700 transition-colors"
                      title="Delete Product"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-stone text-xs uppercase tracking-widest"
                  >
                    No products found in PostgreSQL database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[#E4E1DA] flex justify-between items-center text-xs uppercase tracking-widest text-stone">
          <span>
            {loading ? "Querying PostgreSQL..." : `Showing ${filtered.length} of ${products.length} Products`}
          </span>
          <span>PostgreSQL Live Sync</span>
        </div>
      </div>
    </AdminLayout>
  );
}
