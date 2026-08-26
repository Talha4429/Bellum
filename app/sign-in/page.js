"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/store";

  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const res = await signIn(email, password);

    if (res.success) {
      router.push(redirectUrl);
    } else {
      setError(res.error || "Invalid email or password");
      setSubmitting(false);
    }
  }

  return (
    <main className="flex-grow flex items-center justify-center relative px-6 md:px-16 py-20 min-h-[80vh]">
      {/* Subtle Blueprint Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      {/* Centered Login Card */}
      <div className="w-full max-w-[440px] bg-white/70 backdrop-blur-sm border border-[#E4E1DA] p-8 md:p-10 relative z-10 shadow-sm">
        <div className="text-center mb-8 flex flex-col items-center">
          <Link
            href="/"
            className="relative h-10 w-44 block mb-2 hover:opacity-85 transition-opacity"
          >
            <Image
              src="/images/logo/bellum-logo.png"
              alt="Bellum - The Finest"
              fill
              className="object-contain"
              priority
            />
          </Link>
          <span className="font-serif text-2xl tracking-tighter text-ink font-normal">
            BELLUM
          </span>
          <h1 className="font-serif text-3xl font-light text-ink mt-3">
            Client Sign In
          </h1>
          <p className="font-sans text-xs text-stone mt-1">
            Access your curated portfolio, orders & checkout
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="w-full mb-6 p-3.5 bg-[#ffdad6]/60 border border-[#ba1a1a]/30 text-[#93000a] text-xs font-sans flex items-start gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">
              error
            </span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="block font-sans text-[11px] font-semibold uppercase tracking-wider text-stone"
            >
              EMAIL ADDRESS *
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@studio.com"
              className="minimal-input w-full py-2 font-sans text-sm text-ink placeholder:text-stone/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block font-sans text-[11px] font-semibold uppercase tracking-wider text-stone"
              >
                PASSWORD *
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Please contact support@bellum.com to reset your password.");
                }}
                className="font-sans text-xs text-stone hover:text-ink transition-colors underline underline-offset-4"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="minimal-input w-full py-2 pr-10 font-sans text-sm text-ink"
              />
              <button
                aria-label="Toggle password visibility"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-stone hover:text-ink transition-colors p-1 focus:outline-none"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full border border-ink py-3.5 px-8 flex justify-center items-center font-sans text-xs uppercase tracking-[0.15em] font-semibold text-ink hover:bg-ink hover:text-ivory transition-all duration-300 disabled:opacity-50"
            >
              {submitting ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E4E1DA] text-center font-sans text-xs text-stone">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href={`/sign-up${redirectUrl !== "/store" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
              className="text-ink font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity ml-1"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center font-sans text-xs text-stone uppercase tracking-widest">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
