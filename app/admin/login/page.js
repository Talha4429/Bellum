"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@bellum.com.pk");
  const [password, setPassword] = useState("••••••••");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (email && password) {
        router.push("/admin/dashboard");
      } else {
        setError(true);
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div className="bg-[#F7F5F1] text-ink min-h-screen flex items-center justify-center p-6 md:p-16">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="mb-10 flex flex-col items-center">
          <Link href="/" className="relative h-10 w-44 block hover:opacity-85 transition-opacity">
            <Image
              src="/images/logo/bellum-logo.png"
              alt="Bellum - The Finest"
              fill
              className="object-contain"
              priority
            />
          </Link>
          <div className="w-8 h-px bg-[#E4E1DA] mt-4 mb-2" />
        </div>

        {/* Login Box */}
        <div className="bg-white border border-[#E4E1DA] p-8 md:p-10 shadow-sm">
          <div className="mb-8 text-center">
            <span className="font-sans text-xs uppercase tracking-widest text-stone block mb-1">
              Admin Portal
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-ink font-light">
              Admin Access
            </h1>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-[#ffdad6] border-l-2 border-[#ba1a1a] text-[#93000a] text-xs font-sans flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              Invalid credentials provided.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="admin-email"
                className="block font-sans text-xs uppercase tracking-widest text-ink mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="admin-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bellum.com.pk"
                className="minimal-input w-full py-2 font-sans text-sm text-ink"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block font-sans text-xs uppercase tracking-widest text-ink mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="admin-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="minimal-input w-full py-2 font-sans text-sm text-ink"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-ink font-sans text-xs uppercase tracking-widest text-center py-3.5 flex items-center justify-center gap-2 group"
              >
                {loading ? "Authenticating..." : "Sign In"}
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="font-sans text-xs text-stone hover:text-ink transition-colors uppercase tracking-widest"
            >
              ← Return to Main Site
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="font-sans text-[11px] text-stone tracking-widest uppercase">
            © {new Date().getFullYear()} BELLUM ARCHITECTURE & ATELIER
          </p>
        </div>
      </div>
    </div>
  );
}
