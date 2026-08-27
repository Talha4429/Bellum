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
    <main className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-8 py-8 md:py-12 bg-[#F7F5F1] font-sans overflow-hidden">
      {/* Full Screen Low Opacity Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/misc/hero-architecture.jpg"
          alt="Luxury Architecture Background"
          fill
          className="object-cover opacity-55"
          priority
        />
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-[#F7F5F1]/20" />
      </div>

      {/* Centered Login Card */}
      <div className="w-full max-w-[540px] bg-white/95 backdrop-blur-md border border-[#E4E1DA] p-10 sm:p-12 md:p-14 relative z-10 shadow-xl transition-all duration-300">
        <div className="text-center mb-8 flex flex-col items-center">
          <Link
            href="/"
            className="relative h-12 w-48 block mb-2 hover:opacity-85 transition-opacity"
          >
            <Image
              src="/images/logo/bellum-logo.png"
              alt="Bellum"
              fill
              className="object-contain"
              priority
            />
          </Link>
          <h1 className="font-serif text-3xl font-light text-ink mt-4">
            Client Sign In
          </h1>
          <p className="font-sans text-xs md:text-sm text-stone mt-2">
            Access your curated portfolio, orders & checkout
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="w-full mb-6 p-3.5 bg-[#ffdad6]/60 border border-[#ba1a1a]/30 text-[#93000a] text-xs font-sans flex items-start gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">
              error
            </span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email Address */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[11px] font-bold text-stone uppercase tracking-widest" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone text-[18px]">
                mail
              </span>
              <input
                className="w-full bg-white border border-[#E4E1DA] focus:border-ink text-sm text-ink placeholder:text-stone/50 py-3 pl-10 pr-4 outline-none transition-colors"
                id="email"
                placeholder="client@studio.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="font-sans text-[11px] font-bold text-stone uppercase tracking-widest" htmlFor="password">
                Password
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
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone text-[18px]">
                lock
              </span>
              <input
                className="w-full bg-white border border-[#E4E1DA] focus:border-ink text-sm text-ink py-3 pl-10 pr-12 outline-none transition-colors"
                id="password"
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                aria-label="Toggle password visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-ink transition-colors p-1 focus:outline-none"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            disabled={submitting}
            className="w-full bg-ink hover:bg-stone py-3.5 px-8 flex justify-center items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] font-bold text-ivory transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
            type="submit"
          >
            {submitting ? "SIGNING IN..." : "SIGN IN"}
            <span className="material-symbols-outlined text-[16px] font-bold">arrow_forward</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E4E1DA] text-center font-sans text-xs md:text-sm text-stone flex flex-col gap-4">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href={`/sign-up${redirectUrl !== "/store" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
              className="text-ink font-semibold underline underline-offset-4 hover:opacity-85 transition-opacity ml-1"
            >
              Create Account
            </Link>
          </p>
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-xs text-stone hover:text-ink transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Home
            </Link>
          </div>
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
