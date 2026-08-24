"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Invalid credentials.");
        setLoading(false);
        return;
      }

      router.push(redirectTo);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
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
            <p className="font-sans text-xs text-stone mt-2">
              Bellum Architecture &amp; Atelier — Internal CMS
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-[#ffdad6] border-l-2 border-[#ba1a1a] text-[#93000a] text-xs font-sans flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
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
                autoComplete="username"
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="admin-password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="minimal-input w-full py-2 pr-10 font-sans text-sm text-ink"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-0 bottom-2 text-stone hover:text-ink transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                id="admin-login-btn"
                disabled={loading}
                className="w-full btn-ink font-sans text-xs uppercase tracking-widest text-center py-3.5 flex items-center justify-center gap-2 group disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span
                      className="inline-block w-4 h-4 border-2 border-ivory/40 border-t-ivory rounded-full animate-spin"
                    />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Credential hint */}
          <div className="mt-6 p-3 bg-[#f7f3f2] border border-[#E4E1DA] text-xs font-sans text-stone text-center">
            <span className="material-symbols-outlined text-[14px] align-middle mr-1">info</span>
            Use credentials configured in <code className="font-mono">.env.local</code>
          </div>

          <div className="mt-6 text-center">
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
            © {new Date().getFullYear()} BELLUM ARCHITECTURE &amp; ATELIER
          </p>
        </div>
      </div>
    </div>
  );
}
