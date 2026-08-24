"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import SafeImage from "@/components/SafeImage";

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPortfolio() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/portfolio");
      const data = await res.json();
      if (data.success && Array.isArray(data.portfolio)) {
        setProjects(data.portfolio);
      }
    } catch (err) {
      console.error("Error loading portfolio from database:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function deleteProject(slug) {
    if (!confirm("Are you sure you want to remove this project from PostgreSQL?")) {
      return;
    }

    setProjects((prev) => prev.filter((p) => p.slug !== slug));

    try {
      await fetch(`/api/admin/portfolio/${slug}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to delete project:", err);
      loadPortfolio();
    }
  }

  return (
    <AdminLayout activeTab="portfolio" breadcrumbs={["Portfolio"]}>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-[#E4E1DA] gap-6">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-ink tracking-tight">
            Portfolio
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-stone mt-2">
            PostgreSQL-backed architectural commissions & casework manager
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={loadPortfolio}
            className="border border-stone/30 p-2 text-stone hover:text-ink hover:border-ink transition-colors"
            title="Refresh database"
          >
            <span className="material-symbols-outlined text-[20px]">refresh</span>
          </button>
          <button
            type="button"
            onClick={() => alert("Project addition API is live. Send POST to /api/admin/portfolio")}
            className="btn-ink font-sans text-xs uppercase tracking-widest flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add Project
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-[#E4E1DA] shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#E4E1DA] bg-[#f7f3f2]">
                <th className="py-4 px-6 font-sans text-xs uppercase tracking-widest text-stone font-normal">
                  Project Name
                </th>
                <th className="py-4 px-6 font-sans text-xs uppercase tracking-widest text-stone font-normal">
                  Location
                </th>
                <th className="py-4 px-6 font-sans text-xs uppercase tracking-widest text-stone font-normal">
                  Year
                </th>
                <th className="py-4 px-6 font-sans text-xs uppercase tracking-widest text-stone font-normal text-center">
                  Images
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
                    Loading portfolio from PostgreSQL...
                  </td>
                </tr>
              ) : projects.map((project) => (
                <tr
                  key={project.slug}
                  className="hover:bg-[#f7f3f2]/60 transition-colors"
                >
                  {/* Name + Thumb */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#f1edec] border border-[#E4E1DA] relative shrink-0 overflow-hidden">
                        <SafeImage
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-serif text-base font-medium text-ink">
                        {project.title}
                      </span>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-4 px-6 text-stone">{project.location}</td>

                  {/* Year */}
                  <td className="py-4 px-6 text-stone font-mono">{project.year}</td>

                  {/* Image Count */}
                  <td className="py-4 px-6 text-center text-stone font-mono">
                    {project.images?.length || 1}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 border text-[10px] uppercase tracking-widest ${
                        project.status === "Draft"
                          ? "border-stone/40 text-stone border-dashed"
                          : "border-ink text-ink bg-[#f7f3f2]"
                      }`}
                    >
                      {project.status || "Published"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right space-x-3">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="text-stone hover:text-ink transition-colors"
                      title="View Project Page"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        visibility
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteProject(project.slug)}
                      className="text-stone hover:text-red-700 transition-colors"
                      title="Delete Project"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))}

              {!loading && projects.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-stone text-xs uppercase tracking-widest"
                  >
                    No projects found in PostgreSQL database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[#E4E1DA] flex justify-between items-center text-xs uppercase tracking-widest text-stone">
          <span>
            {loading ? "Querying PostgreSQL..." : `Showing ${projects.length} Projects`}
          </span>
          <span>PostgreSQL Sync Active</span>
        </div>
      </div>
    </AdminLayout>
  );
}
