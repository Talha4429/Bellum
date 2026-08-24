"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("Signing in...");
    setTimeout(() => {
      router.push("/store");
    }, 800);
  }

  return (
    <main className="flex-grow flex items-center justify-center relative px-6 md:px-16 py-20 min-h-[80vh]">
      {/* Subtle Blueprint Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      {/* Centered Login Card */}
      <div className="w-full max-w-[460px] bg-white border border-[#E4E1DA] p-8 md:p-12 relative z-10 shadow-sm">
        <div className="text-center mb-8 flex flex-col items-center">
          <Link
            href="/"
            className="relative h-10 w-44 block mb-3 hover:opacity-85 transition-opacity"
          >
            <Image
              src="/images/logo/bellum-logo.png"
              alt="Bellum - The Finest"
              fill
              className="object-contain"
              priority
            />
          </Link>
          <h1 className="font-serif text-3xl font-light text-ink mt-2">
            Client Sign In
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-stone mt-2">
            Access your curated portfolio & orders
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block font-sans text-xs uppercase tracking-widest text-stone mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@studio.com"
              className="minimal-input w-full py-2 font-sans text-sm text-ink"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="password"
                className="block font-sans text-xs uppercase tracking-widest text-stone"
              >
                Password
              </label>
              <a
                href="#"
                className="font-sans text-xs text-stone hover:text-ink transition-colors"
              >
                Forgot?
              </a>
            </div>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="minimal-input w-full py-2 font-sans text-sm text-ink"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full btn-ink font-sans text-xs uppercase tracking-widest text-center py-3.5"
            >
              {status || "Sign In"}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E4E1DA] text-center font-sans text-xs text-stone space-y-2">
          <p>
            Looking for administration?{" "}
            <Link
              href="/admin/login"
              className="text-ink font-semibold hover:underline"
            >
              Admin Portal
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
