"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";

const INPUT_BASE =
  "w-full border border-[#E4E1DA] bg-[#FDFCFB] px-4 py-3 font-sans text-sm text-ink placeholder:text-[#B0ACA6] focus:outline-none focus:border-ink transition-colors duration-200";
const LABEL_BASE =
  "block font-sans text-xs uppercase tracking-widest text-stone mb-2";

export default function AdminNewProductPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Seating",
    price: "",
    sku: "",
    featured: false,
    status: "Active",
    description: "",
    finish: "",
    image: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);

    setUploading(true);
    setError(null);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.error || "Upload failed");

      setFormData((prev) => ({ ...prev, image: data.path }));
    } catch (err) {
      setError("Image upload failed: " + err.message);
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!formData.image) {
      setError("Please upload a product image before saving.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to create product");
      setSuccess(true);
      setTimeout(() => router.push("/admin/products"), 1200);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <AdminLayout activeTab="products" breadcrumbs={["Products", "Add New"]}>
      <div className="max-w-[900px] mx-auto">
        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-sans text-xs uppercase tracking-widest text-stone block mb-1">
              Products
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-ink tracking-tight">
              Add New Product
            </h1>
          </div>
          <Link
            href="/admin/products"
            className="font-sans text-xs uppercase tracking-widest text-stone hover:text-ink transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Products
          </Link>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-[#ffdad6] border-l-4 border-[#ba1a1a] text-[#93000a] text-sm font-sans flex items-start gap-3">
            <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">error</span>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-[#d7f3de] border-l-4 border-[#1a6b33] text-[#0a4620] text-sm font-sans flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            Product saved successfully! Redirecting…
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ── Section 1: Basic Information ── */}
          <div className="bg-white border border-[#E4E1DA] shadow-sm">
            <div className="px-8 py-5 border-b border-[#E4E1DA] bg-[#f7f3f2]">
              <h2 className="font-sans text-xs uppercase tracking-widest text-ink font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">info</span>
                Basic Information
              </h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label htmlFor="product-name" className={LABEL_BASE}>
                  Product Name <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  type="text"
                  id="product-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aurelia Lounge Chair"
                  className={INPUT_BASE}
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="product-category" className={LABEL_BASE}>
                  Category <span className="text-[#ba1a1a]">*</span>
                </label>
                <select
                  id="product-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={INPUT_BASE + " cursor-pointer"}
                >
                  <option value="Seating">Seating</option>
                  <option value="Tables">Tables</option>
                  <option value="Lighting">Lighting</option>
                  <option value="Storage">Storage</option>
                  <option value="Textiles">Textiles</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="product-status" className={LABEL_BASE}>
                  Status
                </label>
                <select
                  id="product-status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={INPUT_BASE + " cursor-pointer"}
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label htmlFor="product-price" className={LABEL_BASE}>
                  Price (PKR) <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-stone font-medium pointer-events-none">
                    PKR
                  </span>
                  <input
                    type="number"
                    id="product-price"
                    name="price"
                    required
                    min="0"
                    step="100"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="150000"
                    className={INPUT_BASE + " pl-14"}
                  />
                </div>
              </div>

              {/* SKU */}
              <div>
                <label htmlFor="product-sku" className={LABEL_BASE}>
                  SKU / Product Code
                </label>
                <input
                  type="text"
                  id="product-sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="e.g. BEL-SEAT-001"
                  className={INPUT_BASE}
                />
              </div>

              {/* Finish */}
              <div>
                <label htmlFor="product-finish" className={LABEL_BASE}>
                  Material / Finish
                </label>
                <input
                  type="text"
                  id="product-finish"
                  name="finish"
                  value={formData.finish}
                  onChange={handleChange}
                  placeholder="e.g. Solid Walnut / Boucle"
                  className={INPUT_BASE}
                />
              </div>

              {/* Featured toggle */}
              <div className="md:col-span-2">
                <label className="inline-flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="featured"
                      id="product-featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-11 h-6 rounded-full border-2 transition-all duration-200 ${
                        formData.featured
                          ? "bg-ink border-ink"
                          : "bg-white border-[#E4E1DA] group-hover:border-ink"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                          formData.featured ? "translate-x-5 bg-white" : "translate-x-0 bg-[#6B6862]"
                        }`}
                      />
                    </div>
                  </div>
                  <span className="font-sans text-sm text-ink">
                    Feature this piece on the Home Showcase
                  </span>
                  <span className="font-sans text-xs text-stone">
                    (Shown in homepage spotlight)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* ── Section 2: Description ── */}
          <div className="bg-white border border-[#E4E1DA] shadow-sm">
            <div className="px-8 py-5 border-b border-[#E4E1DA] bg-[#f7f3f2]">
              <h2 className="font-sans text-xs uppercase tracking-widest text-ink font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">description</span>
                Design Narrative
              </h2>
            </div>
            <div className="p-8">
              <label htmlFor="product-desc" className={LABEL_BASE}>
                Description
              </label>
              <textarea
                id="product-desc"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details on architectural geometry, joinery techniques, material provenance, and tactile experience..."
                className={INPUT_BASE + " resize-none leading-relaxed"}
              />
              <p className="mt-2 text-xs text-stone font-sans">
                {formData.description.length} characters
              </p>
            </div>
          </div>

          {/* ── Section 3: Product Image Upload ── */}
          <div className="bg-white border border-[#E4E1DA] shadow-sm">
            <div className="px-8 py-5 border-b border-[#E4E1DA] bg-[#f7f3f2]">
              <h2 className="font-sans text-xs uppercase tracking-widest text-ink font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">image</span>
                Product Image <span className="text-[#ba1a1a]">*</span>
              </h2>
            </div>
            <div className="p-8">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageUpload}
                className="hidden"
                id="product-image-input"
              />

              {/* Upload zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`w-full aspect-video border-2 border-dashed flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-200 ${
                  imagePreview || formData.image
                    ? "border-[#E4E1DA] bg-[#f1edec]"
                    : "border-[#C8C4BC] bg-[#FDFCFB] hover:border-ink hover:bg-[#f7f3f2]"
                }`}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-3 text-stone">
                    <span className="inline-block w-8 h-8 border-3 border-stone/30 border-t-stone rounded-full animate-spin" />
                    <span className="font-sans text-xs uppercase tracking-widest">
                      Uploading image…
                    </span>
                  </div>
                ) : imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-stone p-8">
                    <span className="material-symbols-outlined text-5xl">cloud_upload</span>
                    <span className="font-sans text-xs uppercase tracking-widest text-center">
                      Click to upload product image
                    </span>
                    <span className="font-sans text-xs text-stone/60">
                      JPEG, PNG, WebP, GIF — max 10MB
                    </span>
                  </div>
                )}
              </div>

              {/* Show saved path */}
              {formData.image && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-green-700">check_circle</span>
                  <span className="font-sans text-xs text-stone">
                    Saved: <code className="font-mono bg-[#f1edec] px-1.5 py-0.5">{formData.image}</code>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, image: "" }));
                      setImagePreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="ml-auto font-sans text-xs text-stone hover:text-red-700 transition-colors uppercase tracking-widest"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="flex items-center gap-6 pb-12">
            <button
              type="submit"
              id="save-product-btn"
              disabled={saving || success || uploading}
              className="btn-ink font-sans text-xs uppercase tracking-widest px-8 py-3.5 flex items-center gap-2 disabled:opacity-60"
            >
              {saving ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-ivory/40 border-t-ivory rounded-full animate-spin" />
                  Saving to Database…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  Save Product
                </>
              )}
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
    </AdminLayout>
  );
}
