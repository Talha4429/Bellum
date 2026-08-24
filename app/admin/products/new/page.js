"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminNewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    category: "Seating",
    price: "",
    featured: false,
    description: "",
    finish: "",
    image: "/images/products/chair.jpg",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create product");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/products");
      }, 700);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <AdminLayout activeTab="products" breadcrumbs={["Products", "Create New"]}>
      <div className="max-w-[800px] mx-auto">
        {/* Page Title */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl md:text-5xl font-light text-ink tracking-tight mb-2">
            Create New Product
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-stone">
            Save a bespoke piece directly to PostgreSQL database
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 text-xs uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-ink text-ivory text-xs uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">check</span>
            Product successfully saved to PostgreSQL database!
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white border border-[#E4E1DA] p-8 md:p-12 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label
                  htmlFor="product-name"
                  className="font-sans text-xs uppercase tracking-widest text-ink mb-2"
                >
                  Product Name *
                </label>
                <input
                  type="text"
                  id="product-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aurelia Lounge Chair"
                  className="minimal-input py-2 font-sans text-sm text-ink"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="product-category"
                  className="font-sans text-xs uppercase tracking-widest text-ink mb-2"
                >
                  Category *
                </label>
                <select
                  id="product-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="minimal-input py-2 font-sans text-sm text-ink bg-transparent cursor-pointer"
                >
                  <option value="Seating">Seating</option>
                  <option value="Tables">Tables</option>
                  <option value="Lighting">Lighting</option>
                  <option value="Storage">Storage</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label
                  htmlFor="product-price"
                  className="font-sans text-xs uppercase tracking-widest text-ink mb-2"
                >
                  Price (PKR) *
                </label>
                <input
                  type="number"
                  id="product-price"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="150000"
                  className="minimal-input py-2 font-sans text-sm text-ink"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="product-finish"
                  className="font-sans text-xs uppercase tracking-widest text-ink mb-2"
                >
                  Material / Finish
                </label>
                <input
                  type="text"
                  id="product-finish"
                  name="finish"
                  value={formData.finish}
                  onChange={handleChange}
                  placeholder="e.g. Solid Walnut / Boucle"
                  className="minimal-input py-2 font-sans text-sm text-ink"
                />
              </div>
            </div>

            {/* Featured Checkbox */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-ink rounded-none border-[#6B6862] focus:ring-0"
                />
                <span className="font-sans text-xs uppercase tracking-widest text-ink">
                  Feature this piece on Home Showcase
                </span>
              </label>
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label
                htmlFor="product-desc"
                className="font-sans text-xs uppercase tracking-widest text-ink mb-2"
              >
                Design Narrative & Description
              </label>
              <textarea
                id="product-desc"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details on architectural geometry, joinery, and tactility..."
                className="minimal-input py-2 font-sans text-sm text-ink resize-none"
              />
            </div>

            {/* Imagery Dropzone */}
            <div className="flex flex-col">
              <label className="font-sans text-xs uppercase tracking-widest text-ink mb-2">
                Product Imagery Path / URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/images/products/chair.jpg"
                className="minimal-input py-2 font-sans text-sm text-ink mb-4"
              />
              <div className="w-full h-32 border border-dashed border-[#6B6862] flex flex-col items-center justify-center gap-2 p-6 text-center hover:bg-[#f7f3f2] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-3xl text-stone">
                  add_photo_alternate
                </span>
                <span className="font-sans text-xs uppercase tracking-widest text-stone">
                  Upload or link image asset
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 pt-6 border-t border-[#E4E1DA]">
              <button
                type="submit"
                disabled={saving}
                className="btn-ink font-sans text-xs uppercase tracking-widest"
              >
                {saving ? "Inserting to PostgreSQL..." : "Save Product to DB"}
              </button>
              <Link
                href="/admin/products"
                className="font-sans text-xs uppercase tracking-widest text-stone hover:text-ink transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
