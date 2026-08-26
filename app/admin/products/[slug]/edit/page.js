"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductSlideshow from "@/components/ProductSlideshow";

const INPUT_BASE =
  "w-full border border-[#E4E1DA] bg-[#FDFCFB] px-4 py-3 font-sans text-sm text-ink placeholder:text-[#B0ACA6] focus:outline-none focus:border-ink transition-colors duration-200";
const LABEL_BASE =
  "block font-sans text-xs uppercase tracking-widest text-stone mb-2";

export default function EditProductPage() {
  const router = useRouter();
  const { slug } = useParams();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(null);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [loadError, setLoadError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [previewSlideshow, setPreviewSlideshow] = useState(false);

  // Load existing product
  useEffect(() => {
    if (!slug) return;
    fetch(`/api/admin/products/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const productImages =
            Array.isArray(data.product.images) && data.product.images.length > 0
              ? data.product.images
              : data.product.image
              ? [data.product.image]
              : [];

          setFormData({
            name: data.product.name || "",
            category: data.product.category || "Seating",
            price: data.product.price ?? "",
            sku: data.product.sku || "",
            featured: Boolean(data.product.featured),
            status: data.product.status || "Active",
            description: data.product.description || "",
            finish: data.product.finish || "",
            images: productImages,
          });
        } else {
          setLoadError(data.error || "Product not found");
        }
      })
      .catch(() => setLoadError("Failed to load product data."));
  }, [slug]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleImageUpload(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const uploadedPaths = [];

      for (const file of files) {
        const uploadData = new FormData();
        uploadData.append("file", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: uploadData,
        });
        const data = await res.json();

        if (!data.success) throw new Error(data.error || "Upload failed");
        uploadedPaths.push(data.path);
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedPaths],
      }));
    } catch (err) {
      setError("Image upload failed: " + err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleAddUrlImage(e) {
    e.preventDefault();
    if (!customImageUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, customImageUrl.trim()],
    }));
    setCustomImageUrl("");
  }

  function handleRemoveImage(indexToRemove) {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  }

  function handleSetAsCover(index) {
    if (index === 0) return;
    setFormData((prev) => {
      const newImages = [...prev.images];
      const [item] = newImages.splice(index, 1);
      newImages.unshift(item);
      return { ...prev, images: newImages };
    });
  }

  function handleMoveImage(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= formData.images.length) return;
    setFormData((prev) => {
      const newImages = [...prev.images];
      const temp = newImages[index];
      newImages[index] = newImages[targetIndex];
      newImages[targetIndex] = temp;
      return { ...prev, images: newImages };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!formData.images || formData.images.length === 0) {
      setError("Please add at least one product picture before saving.");
      setSaving(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        image: formData.images[0] || "",
        images: formData.images,
      };

      const res = await fetch(`/api/admin/products/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to update product");
      setSuccess(true);
      setTimeout(() => router.push("/admin/products"), 1200);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  if (loadError) {
    return (
      <AdminLayout activeTab="products">
        <div className="max-w-[900px] mx-auto py-12 text-center">
          <p className="text-red-700 font-sans text-sm mb-4">{loadError}</p>
          <Link
            href="/admin/products"
            className="btn-ink font-sans text-xs uppercase tracking-widest"
          >
            Back to Products
          </Link>
        </div>
      </AdminLayout>
    );
  }

  if (!formData) {
    return (
      <AdminLayout activeTab="products">
        <div className="max-w-[900px] mx-auto py-24 text-center">
          <span className="inline-block w-6 h-6 border-2 border-stone/30 border-t-stone rounded-full animate-spin mb-3" />
          <p className="font-sans text-xs uppercase tracking-widest text-stone">
            Loading product data…
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeTab="products" breadcrumbs={["Products", "Edit", formData.name]}>
      <div className="max-w-[900px] mx-auto">
        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-sans text-xs uppercase tracking-widest text-stone block mb-1">
              Editing Product
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-ink tracking-tight">
              {formData.name}
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
          <div className="mb-6 p-4 bg-[#ffdad6] border-l-4 border-[#ba1a1a] text-[#93000a] text-sm font-sans flex items-start gap-3 animate-fade-in">
            <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">error</span>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-[#d7f3de] border-l-4 border-[#1a6b33] text-[#0a4620] text-sm font-sans flex items-center gap-3 animate-fade-in">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            Product updated successfully! Redirecting…
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ── Section 1: Basic Information ── */}
          <div className="bg-white border border-[#E4E1DA] shadow-sm">
            <div className="px-8 py-5 border-b border-[#E4E1DA] bg-[#f7f3f2]">
              <h2 className="font-sans text-xs uppercase tracking-widest text-ink font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">inventory_2</span>
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
                  className={INPUT_BASE}
                />
              </div>

              {/* Finish */}
              <div className="md:col-span-2">
                <label htmlFor="product-finish" className={LABEL_BASE}>
                  Material / Finish
                </label>
                <input
                  type="text"
                  id="product-finish"
                  name="finish"
                  value={formData.finish}
                  onChange={handleChange}
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
                </label>
              </div>
            </div>
          </div>

          {/* ── Section 2: Product Pictures & Slideshow ── */}
          <div className="bg-white border border-[#E4E1DA] shadow-sm">
            <div className="px-8 py-5 border-b border-[#E4E1DA] bg-[#f7f3f2] flex items-center justify-between">
              <h2 className="font-sans text-xs uppercase tracking-widest text-ink font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">collections</span>
                Product Pictures & Slideshow ({formData.images.length})
              </h2>
              {formData.images.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPreviewSlideshow(!previewSlideshow)}
                  className="font-sans text-xs uppercase tracking-wider text-ink font-semibold flex items-center gap-1 hover:underline"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {previewSlideshow ? "grid_view" : "slideshow"}
                  </span>
                  {previewSlideshow ? "Show Grid" : "Live Slideshow Preview"}
                </button>
              )}
            </div>
            <div className="p-8 space-y-6">
              {/* Hidden multi-file input */}
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageUpload}
                className="hidden"
                id="product-multiple-images-input-edit"
              />

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8 border-2 border-dashed border-[#C8C4BC] bg-[#FDFCFB] hover:border-ink hover:bg-[#f7f3f2] flex flex-col items-center justify-center cursor-pointer transition-all duration-200"
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-3 text-stone">
                    <span className="inline-block w-8 h-8 border-3 border-stone/30 border-t-stone rounded-full animate-spin" />
                    <span className="font-sans text-xs uppercase tracking-widest">
                      Uploading product pictures…
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-stone px-4 text-center">
                    <span className="material-symbols-outlined text-4xl text-ink">
                      add_photo_alternate
                    </span>
                    <span className="font-sans text-xs uppercase tracking-widest text-ink font-semibold">
                      Click to upload additional pictures
                    </span>
                    <span className="font-sans text-xs text-stone">
                      Select multiple files (JPEG, PNG, WebP) to expand the slideshow
                    </span>
                  </div>
                )}
              </div>

              {/* Add image by URL */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="Or paste an image URL (e.g. /images/products/chair.jpg)..."
                  className={INPUT_BASE + " text-xs"}
                />
                <button
                  type="button"
                  onClick={handleAddUrlImage}
                  className="px-5 border border-ink text-ink font-sans text-xs uppercase tracking-widest font-semibold hover:bg-ink hover:text-ivory transition-colors shrink-0"
                >
                  Add Picture
                </button>
              </div>

              {/* Slideshow Live Preview Mode */}
              {previewSlideshow && formData.images.length > 0 && (
                <div className="border border-[#E4E1DA] p-6 bg-[#f7f5f1]">
                  <div className="max-w-[360px] mx-auto">
                    <span className="font-sans text-[11px] uppercase tracking-widest text-stone block text-center mb-2">
                      Storefront Slideshow Preview
                    </span>
                    <ProductSlideshow
                      images={formData.images}
                      alt={formData.name || "Product Preview"}
                      aspectRatio="aspect-[4/5]"
                    />
                  </div>
                </div>
              )}

              {/* Picture Gallery Management Grid */}
              {formData.images.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-sans text-stone uppercase tracking-wider">
                    <span>Uploaded Pictures ({formData.images.length})</span>
                    <span>First picture is the Primary Cover</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.images.map((imgUrl, idx) => (
                      <div
                        key={imgUrl + idx}
                        className={`group relative border ${
                          idx === 0
                            ? "border-ink ring-2 ring-ink/20"
                            : "border-[#E4E1DA]"
                        } bg-[#f1edec] p-2 flex flex-col`}
                      >
                        {/* Cover Badge */}
                        {idx === 0 && (
                          <span className="absolute top-3 left-3 z-10 bg-ink text-ivory text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 shadow">
                            Cover Image
                          </span>
                        )}

                        {/* Image Thumbnail */}
                        <div className="aspect-[4/5] w-full relative overflow-hidden bg-white/60 mb-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imgUrl}
                            alt={`Product pic ${idx + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        {/* Reorder and Action Toolbar */}
                        <div className="flex items-center justify-between pt-1 border-t border-[#E4E1DA]/60">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMoveImage(idx, -1)}
                              disabled={idx === 0}
                              title="Move picture earlier in slideshow"
                              className="p-1 text-stone hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                arrow_back
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveImage(idx, 1)}
                              disabled={idx === formData.images.length - 1}
                              title="Move picture later in slideshow"
                              className="p-1 text-stone hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                arrow_forward
                              </span>
                            </button>
                          </div>

                          <div className="flex items-center gap-1">
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => handleSetAsCover(idx)}
                                title="Set as primary cover image"
                                className="text-[10px] font-sans uppercase tracking-wider text-stone hover:text-ink underline"
                              >
                                Set Cover
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              title="Remove picture from product"
                              className="p-1 text-red-600 hover:text-red-800"
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                delete
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-stone text-xs font-sans border border-dashed border-[#E4E1DA]">
                  No pictures added yet. Upload files above to create the product slideshow.
                </div>
              )}
            </div>
          </div>

          {/* ── Section 3: Narrative / Description ── */}
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
                {formData.description?.length || 0} characters
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E4E1DA]">
            <Link
              href="/admin/products"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#E4E1DA] font-sans text-xs uppercase tracking-widest text-stone hover:text-ink text-center"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving || uploading}
              className="w-full sm:w-auto px-10 py-3.5 bg-ink text-ivory font-sans text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating Product…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  Update Product & Slideshow
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
