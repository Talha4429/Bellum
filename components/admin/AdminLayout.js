"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children, activeTab = "dashboard", breadcrumbs = [] }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch { /* ignore */ }
    router.push("/admin/login");
  }

  const isDashboard = pathname === "/admin/dashboard" || activeTab === "dashboard";
  const isProducts = pathname.startsWith("/admin/products") || activeTab === "products";
  const isPortfolio = pathname.startsWith("/admin/portfolio") || activeTab === "portfolio";

  return (
    <div className="bg-[#F7F5F1] text-ink min-h-screen flex">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-[#E4E1DA] bg-white hidden md:flex md:flex-col z-50">
        {/* Brand / Header */}
        <div className="p-6 border-b border-[#E4E1DA]">
          <Link href="/" className="relative h-8 w-36 block hover:opacity-85 transition-opacity">
            <Image
              src="/images/logo/bellum-logo.png"
              alt="Bellum - The Finest"
              fill
              className="object-contain object-left"
            />
          </Link>
          <p className="font-sans text-[10px] uppercase tracking-widest text-stone mt-2">
            ADMINISTRATION
          </p>
        </div>

        {/* Nav Tabs */}
        <nav className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto">
          <Link
            href="/admin/dashboard"
            className={`px-6 py-3 flex items-center gap-3 font-sans text-xs uppercase tracking-widest transition-colors ${
              isDashboard
                ? "text-ink font-bold border-r-2 border-ink bg-[#f7f3f2]"
                : "text-stone hover:text-ink hover:bg-[#f7f3f2]"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/products"
            className={`px-6 py-3 flex items-center gap-3 font-sans text-xs uppercase tracking-widest transition-colors ${
              isProducts
                ? "text-ink font-bold border-r-2 border-ink bg-[#f7f3f2]"
                : "text-stone hover:text-ink hover:bg-[#f7f3f2]"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            <span>Products</span>
          </Link>

          <Link
            href="/admin/portfolio"
            className={`px-6 py-3 flex items-center gap-3 font-sans text-xs uppercase tracking-widest transition-colors ${
              isPortfolio
                ? "text-ink font-bold border-r-2 border-ink bg-[#f7f3f2]"
                : "text-stone hover:text-ink hover:bg-[#f7f3f2]"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">architecture</span>
            <span>Portfolio</span>
          </Link>
        </nav>

        {/* Footer / Logout */}
        <div className="p-6 border-t border-[#E4E1DA] space-y-3 font-sans text-xs uppercase tracking-widest">
          <Link
            href="/"
            className="flex items-center gap-2 text-stone hover:text-ink transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">public</span>
            <span>Live Site</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 text-stone hover:text-red-700 transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* TopAppBar */}
        <header className="sticky top-0 w-full bg-[#F7F5F1]/80 backdrop-blur-xl border-b border-[#E4E1DA] z-40 h-20 flex items-center justify-between px-6 md:px-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-stone">
            <span>Admin</span>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className={idx === breadcrumbs.length - 1 ? "text-ink font-semibold" : "text-stone"}>
                  {crumb}
                </span>
              </span>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-6 font-sans text-xs uppercase tracking-widest text-stone">
              <Link href="/admin/products/new" className="hover:text-ink transition-colors">
                + New Product
              </Link>
            </div>
            <div className="flex items-center gap-3 text-stone">
              <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-ink">
                notifications
              </span>
              <button
                type="button"
                onClick={handleLogout}
                title="Logout"
                className="hover:text-ink transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  account_circle
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
