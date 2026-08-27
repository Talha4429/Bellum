"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";

const INPUT_BASE =
  "w-full border border-[#E4E1DA] bg-[#FDFCFB] px-4 py-3 font-sans text-sm text-ink placeholder:text-[#B0ACA6] focus:outline-none focus:border-ink transition-colors duration-200";
const LABEL_BASE =
  "block font-sans text-xs uppercase tracking-widest text-stone mb-2";

export default function AdminNewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    location: "Lahore, Pakistan",
    year: new Date().getFullYear(),
    category: "Residential",
    tags: "",
    summary: "",
    coverImage: "",
    featured: false,
    status: "Published",
    images: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [coverPreviewError, setCoverPreviewError] = useState(false);

  async function handleFileUpload(e, targetField = "coverImage") {
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

      if (targetField === "coverImage") {
        setFormData((prev) => ({ ...prev, coverImage: uploadedPaths[0] }));
        setCoverPreviewError(false);
      } else {
        setFormData((prev) => {
          const current = prev.images ? prev.images.split(",").map((s) => s.trim()).filter(Boolean) : [];
          return { ...prev, images: [...current, ...uploadedPaths].join(", ") };
        });
      }
    } catch (err) {
      setError("Image upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "coverImage") setCoverPreviewError(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Parse comma-separated tags and images
    const tags = formData.tags
      .split(",")
      .map((t) => t.trim().toUpperCase())
      .filter(Boolean);
    const images = formData.images
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, tags, images }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to create project");
      setSuccess(true);
      setTimeout(() => router.push("/admin/portfolio"), 1200);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  const coverUrl = formData.coverImage?.trim();
  const showCoverPreview = coverUrl && !coverPreviewError;

  return (
    <AdminLayout activeTab="portfolio" breadcrumbs={["Portfolio", "Add New"]}>
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-sans text-xs uppercase tracking-widest text-stone block mb-1">
              Portfolio
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-ink tracking-tight">
              Add New Project
            </h1>
          </div>
          <Link
            href="/admin/portfolio"
            className="font-sans text-xs uppercase tracking-widest text-stone hover:text-ink transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Portfolio
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#ffdad6] border-l-4 border-[#ba1a1a] text-[#93000a] text-sm font-sans flex items-start gap-3">
            <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">error</span>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-[#d7f3de] border-l-4 border-[#1a6b33] text-[#0a4620] text-sm font-sans flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            Project saved successfully! Redirecting…
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ── Section 1: Project Details ── */}
          <div className="bg-white border border-[#E4E1DA] shadow-sm">
            <div className="px-8 py-5 border-b border-[#E4E1DA] bg-[#f7f3f2]">
              <h2 className="font-sans text-xs uppercase tracking-widest text-ink font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">architecture</span>
                Project Details
              </h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label htmlFor="proj-title" className={LABEL_BASE}>
                  Project Title <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  type="text"
                  id="proj-title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. The Courtyard Residence"
                  className={INPUT_BASE}
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="proj-location" className={LABEL_BASE}>Location</label>
                <input
                  type="text"
                  id="proj-location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Lahore, Pakistan"
                  className={INPUT_BASE}
                />
              </div>

              {/* Year */}
              <div>
                <label htmlFor="proj-year" className={LABEL_BASE}>Year</label>
                <input
                  type="number"
                  id="proj-year"
                  name="year"
                  min="1990"
                  max={new Date().getFullYear() + 2}
                  value={formData.year}
                  onChange={handleChange}
                  className={INPUT_BASE}
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="proj-category" className={LABEL_BASE}>Category</label>
                <select
                  id="proj-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={INPUT_BASE + " cursor-pointer"}
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Landscape">Landscape</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="proj-status" className={LABEL_BASE}>Status</label>
                <select
                  id="proj-status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={INPUT_BASE + " cursor-pointer"}
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              {/* Tags */}
              <div className="md:col-span-2">
                <label htmlFor="proj-tags" className={LABEL_BASE}>
                  Tags
                  <span className="normal-case tracking-normal font-normal ml-2 text-stone">
                    (comma-separated, e.g. RESIDENTIAL, ARCHITECTURE, LUXURY)
                  </span>
                </label>
                <input
                  type="text"
                  id="proj-tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="RESIDENTIAL, ARCHITECTURE, CONTEMPORARY"
                  className={INPUT_BASE}
                />
              </div>

              {/* Featured */}
              <div className="md:col-span-2">
                <label className="inline-flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full border-2 transition-all duration-200 ${formData.featured ? "bg-ink border-ink" : "bg-white border-[#E4E1DA] group-hover:border-ink"}`}>
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${formData.featured ? "translate-x-5" : "translate-x-0 bg-[#6B6862]"}`} />
                    </div>
                  </div>
                  <span className="font-sans text-sm text-ink">Feature this project on Home</span>
                </label>
              </div>
            </div>
          </div>

          {/* ── Section 2: Summary ── */}
          <div className="bg-white border border-[#E4E1DA] shadow-sm">
            <div className="px-8 py-5 border-b border-[#E4E1DA] bg-[#f7f3f2]">
              <h2 className="font-sans text-xs uppercase tracking-widest text-ink font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">description</span>
                Project Summary
              </h2>
            </div>
            <div className="p-8">
              <label htmlFor="proj-summary" className={LABEL_BASE}>Summary</label>
              <textarea
                id="proj-summary"
                name="summary"
                rows={5}
                value={formData.summary}
                onChange={handleChange}
                placeholder="Describe the project brief, design intent, spatial philosophy, and material palette…"
                className={INPUT_BASE + " resize-none leading-relaxed"}
              />
              <p className="mt-2 text-xs text-stone font-sans">{formData.summary.length} characters</p>
            </div>
          </div>

          {/* ── Section 3: Cover Image ── */}
          <div className="bg-white border border-[#E4E1DA] shadow-sm">
            <div className="px-8 py-5 border-b border-[#E4E1DA] bg-[#f7f3f2]">
              <h2 className="font-sans text-xs uppercase tracking-widest text-ink font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">image</span>
                Cover Image
              </h2>
            </div>
            <div className="p-8">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  id="proj-cover"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="/images/portfolio/project-cover.jpg"
                  className={INPUT_BASE}
                />
                <label className="border border-ink bg-ink text-ivory px-5 py-3 font-sans text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">upload_file</span>
                  {uploading ? "Uploading..." : "Upload File"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "coverImage")}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Quick Preset Selector */}
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="font-sans text-[11px] uppercase tracking-wider text-stone mr-1">Studio Presets:</span>
                {[
                  { name: "Grand Salon", path: "/images/portfolio/gulberg-penthouse-salon.jpg" },
                  { name: "Modern Residence", path: "/images/portfolio/dha-contemporary-residence.jpg" },
                  { name: "Study Suite", path: "/images/portfolio/gulberg-penthouse-study.jpg" },
                  { name: "Marble Pavilion", path: "/images/portfolio/dha-marble-pavilion.jpg" },
                  { name: "Heritage Villa", path: "/images/portfolio/hampstead-cover.jpg" },
                ].map((preset) => (
                  <button
                    key={preset.path}
                    type="button"
                    onClick={() => {
                      setFormData((p) => ({ ...p, coverImage: preset.path }));
                      setCoverPreviewError(false);
                    }}
                    className="px-2.5 py-1 text-[11px] font-sans border border-[#E4E1DA] hover:border-ink hover:text-ink transition-colors bg-white"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
              <div className="w-full aspect-video bg-[#f1edec] border border-dashed border-[#C8C4BC] flex items-center justify-center overflow-hidden">
                {showCoverPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={coverUrl}
                    alt="Cover preview"
                    onError={() => setCoverPreviewError(true)}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-stone">
                    <span className="material-symbols-outlined text-5xl">add_photo_alternate</span>
                    <span className="font-sans text-xs uppercase tracking-widest">
                      {coverPreviewError ? "Image not found" : "Enter an image URL to preview"}
                    </span>
                  </div>
                )}
              </div>

              {/* Additional gallery images */}
              <div className="mt-6">
                <label htmlFor="proj-images" className={LABEL_BASE}>
                  Gallery Image URLs
                  <span className="normal-case tracking-normal font-normal ml-2 text-stone">
                    (comma-separated)
                  </span>
                </label>
                <div className="flex flex-col gap-3">
                  <textarea
                    id="proj-images"
                    name="images"
                    rows={3}
                    value={formData.images}
                    onChange={handleChange}
                    placeholder="/images/portfolio/project-1.jpg, /images/portfolio/project-2.jpg"
                    className={INPUT_BASE + " resize-none"}
                  />
                  <div className="flex items-center gap-3">
                    <label className="border border-[#E4E1DA] bg-white text-ink px-4 py-2 font-sans text-xs uppercase tracking-widest hover:border-ink transition-colors flex items-center gap-2 cursor-pointer w-fit">
                      <span className="material-symbols-outlined text-[16px]">collections</span>
                      Upload Multiple Gallery Photos
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "images")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 pb-12">
            <button
              type="submit"
              id="save-project-btn"
              disabled={saving || success}
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
                  Save Project
                </>
              )}
            </button>
            <Link
              href="/admin/portfolio"
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
