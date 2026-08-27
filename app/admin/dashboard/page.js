"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 8,
    totalProjects: 4,
    inquiriesCount: 38,
    totalRevenue: 58400,
    connected: false,
  });
  const [dbHealth, setDbHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [statsRes, healthRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/health"),
        ]);
        const statsData = await statsRes.json();
        const healthData = await healthRes.json();

        if (statsData.success && statsData.stats) {
          setStats(statsData.stats);
        }
        setDbHealth(healthData);
      } catch (err) {
        console.warn("Failed to fetch live admin stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const recentUpdates = [
    { name: "Aurelia Armchair", type: "Product", status: "Updated", date: "Today", href: "/admin/products" },
    { name: "The Courtyard Residence", type: "Project", status: "Published", date: "Yesterday", href: "/admin/portfolio" },
    { name: "Order #BEL-89241", type: "Order", status: "Processing", date: "Aug 24", href: "/order-confirmed" },
    { name: "Studio Alpha Workspace", type: "Project", status: "Published", date: "Aug 22", href: "/admin/portfolio" },
    { name: "Monolith Console", type: "Product", status: "Active", date: "Aug 20", href: "/admin/products" },
  ];

  return (
    <AdminLayout activeTab="dashboard" breadcrumbs={["Dashboard"]}>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-serif text-4xl md:text-5xl font-light text-ink tracking-tight">
              Dashboard
            </h1>

            {/* PostgreSQL Connection Badge */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-sans uppercase tracking-widest border ${
                dbHealth?.connected
                  ? "border-green-800 text-green-900 bg-green-50"
                  : "border-amber-700 text-amber-900 bg-amber-50"
              }`}
              title={
                dbHealth?.connected
                  ? `PostgreSQL Connected: ${dbHealth.version || "Active"}`
                  : "PostgreSQL: Connect via DATABASE_URL in .env.local"
              }
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  dbHealth?.connected ? "bg-green-600 animate-pulse" : "bg-amber-600"
                }`}
              />
              <span>{dbHealth?.connected ? "PostgreSQL Connected" : "PostgreSQL Ready (Local Sync)"}</span>
            </div>
          </div>
          <p className="font-sans text-xs uppercase tracking-widest text-stone">
            Overview of store inventory, client commissions & activity
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-4 items-center">
          <button
            type="button"
            onClick={async () => {
              try {
                setLoading(true);
                const res = await fetch("/api/admin/seed", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ force: false }),
                });
                const data = await res.json();
                if (data.success) {
                  alert("Studio catalog & sample photos synchronized to PostgreSQL!");
                  window.location.reload();
                } else {
                  alert("Sync error: " + data.error);
                }
              } catch (err) {
                alert("Sync failed: " + err.message);
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            className="border border-[#111111] px-5 py-3 font-sans text-xs uppercase tracking-widest text-ink hover:bg-stone/10 transition-colors flex items-center gap-2"
            title="Populate or refresh PostgreSQL database with studio photos and catalog"
          >
            <span className="material-symbols-outlined text-[16px]">sync</span>
            Sync Studio Catalog
          </button>
          <Link
            href="/admin/products/new"
            className="btn-ink font-sans text-xs uppercase tracking-widest flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add Product
          </Link>
          <Link
            href="/admin/portfolio"
            className="border border-[#111111] px-6 py-3 font-sans text-xs uppercase tracking-widest text-ink hover:bg-ink hover:text-ivory transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Manage Portfolio
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="border border-[#E4E1DA] bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm">
          <p className="font-sans text-xs uppercase tracking-widest text-stone mb-6">
            Total Products
          </p>
          <p className="font-serif text-4xl text-ink font-light">
            {loading ? "..." : stats.totalProducts}
          </p>
        </div>

        <div className="border border-[#E4E1DA] bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm">
          <p className="font-sans text-xs uppercase tracking-widest text-stone mb-6">
            Total Projects
          </p>
          <p className="font-serif text-4xl text-ink font-light">
            {loading ? "..." : stats.totalProjects}
          </p>
        </div>

        <div className="border border-[#E4E1DA] bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm">
          <p className="font-sans text-xs uppercase tracking-widest text-stone mb-6">
            Client Inquiries
          </p>
          <p className="font-serif text-4xl text-ink font-light">
            {loading ? "..." : stats.inquiriesCount}
          </p>
        </div>

        <div className="border border-[#E4E1DA] bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm">
          <p className="font-sans text-xs uppercase tracking-widest text-stone mb-6">
            Total Revenue
          </p>
          <p className="font-serif text-4xl text-ink font-light">
            PKR {stats.totalRevenue.toLocaleString()}
          </p>
        </div>
      </section>

      {/* Recent Updates Table */}
      <section className="border border-[#E4E1DA] bg-white p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E4E1DA] pb-4 mb-6">
          <h2 className="font-serif text-2xl text-ink">Recent Updates</h2>
          <span className="font-sans text-xs uppercase tracking-widest text-stone">
            Database Log
          </span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[#E4E1DA]">
                <th className="py-3 pr-4 font-sans text-xs uppercase tracking-widest text-stone font-normal">
                  Item Name
                </th>
                <th className="py-3 px-4 font-sans text-xs uppercase tracking-widest text-stone font-normal">
                  Type
                </th>
                <th className="py-3 px-4 font-sans text-xs uppercase tracking-widest text-stone font-normal">
                  Status
                </th>
                <th className="py-3 pl-4 font-sans text-xs uppercase tracking-widest text-stone font-normal text-right">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="font-sans text-sm divide-y divide-[#E4E1DA]">
              {recentUpdates.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#f7f3f2] transition-colors">
                  <td className="py-4 pr-4 font-medium text-ink">
                    <Link href={item.href} className="hover:underline">
                      {item.name}
                    </Link>
                  </td>
                  <td className="py-4 px-4">
                    <span className="border border-[#E4E1DA] text-[10px] uppercase px-2 py-0.5 tracking-wider text-stone">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-stone">{item.status}</td>
                  <td className="py-4 pl-4 text-right text-stone font-mono text-xs">
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
}
