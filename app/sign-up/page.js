"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/store";

  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    newsletter: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const pwd = formData.password;
  const isLenValid = pwd.length >= 8;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasNumOrSym = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);
  const isPasswordValid = isLenValid && hasUpper && hasLower && hasNumOrSym;
  const isMatch = pwd && formData.confirmPassword && pwd === formData.confirmPassword;

  function handleChange(e) {
    const { id, value, type, checked } = e.target;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isPasswordValid) {
      setError("Password must fulfill all security criteria below");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    setSubmitting(true);

    const res = await signUp({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    if (res.success) {
      router.push(redirectUrl);
    } else {
      setError(res.error || "Failed to create account. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="w-full min-h-screen lg:h-screen lg:grid lg:grid-cols-2 relative bg-[#161514] font-sans lg:overflow-hidden">
      {/* Left Pane: Visual Hero (Visible on lg screens) */}
      <div className="hidden lg:relative lg:flex lg:flex-col lg:justify-between lg:p-16 lg:h-full text-[#F7F5F1] overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/misc/hero-architecture.jpg"
            alt="Luxury Architecture"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161514] via-transparent to-black/50" />
        </div>

        {/* Logo overlay */}
        <div className="relative z-10">
          <Link href="/" className="inline-block relative h-10 w-44 hover:opacity-85 transition-opacity">
            <Image
              src="/images/logo/bellum-logo.png"
              alt="Bellum"
              fill
              className="object-contain filter invert brightness-0"
            />
          </Link>
        </div>

        {/* Headline / Copy overlay */}
        <div className="relative z-10 max-w-lg mb-8">
          <h2 className="font-serif text-5xl font-light tracking-wide leading-tight mb-4 uppercase text-[#F7F5F1]">
            Join <span className="text-white font-bold">Bellum</span>
          </h2>
          <p className="text-sm md:text-base text-[#E4E1DA] font-light leading-relaxed tracking-wide">
            Enter the world of bespoke design. Exclusive furniture collections, curated design consultations, and early access to architectural drops await.
          </p>
        </div>
      </div>

      {/* Right Pane: Registration Form */}
      <div className="w-full min-h-screen lg:h-full flex flex-col justify-center items-center py-8 lg:py-12 px-6 sm:px-12 md:px-20 relative z-10 bg-[#F7F5F1] text-ink lg:overflow-y-auto">
        <div className="w-full max-w-[440px] flex flex-col">
          {/* Top Logo for mobile only */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Link href="/" className="relative h-10 w-44 block hover:opacity-85 transition-opacity">
              <Image
                src="/images/logo/bellum-logo.png"
                alt="Bellum"
                fill
                className="object-contain"
              />
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="font-sans text-3xl font-extrabold uppercase tracking-wide text-ink">
              Create Account
            </h1>
            <p className="font-sans text-sm text-stone mt-2">
              Already have an account?{" "}
              <Link
                href={`/sign-in${redirectUrl !== "/store" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
                className="text-ink hover:opacity-85 font-semibold underline underline-offset-4 transition-colors"
              >
                Sign in
              </Link>
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
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[11px] font-bold text-stone uppercase tracking-widest" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone text-[18px]">
                  person
                </span>
                <input
                  className="w-full bg-white border border-[#E4E1DA] focus:border-ink text-sm text-ink placeholder:text-stone/50 py-3 pl-10 pr-4 outline-none transition-colors"
                  id="fullName"
                  placeholder="John Doe"
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

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
                  placeholder="john@example.com"
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[11px] font-bold text-stone uppercase tracking-widest" htmlFor="phone">
                Phone Number
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone text-[18px]">
                  call
                </span>
                <input
                  className="w-full bg-white border border-[#E4E1DA] focus:border-ink text-sm text-ink placeholder:text-stone/50 py-3 pl-10 pr-4 outline-none transition-colors"
                  id="phone"
                  placeholder="+92 321 8235586"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[11px] font-bold text-stone uppercase tracking-widest" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone text-[18px]">
                  lock
                </span>
                <input
                  className="w-full bg-white border border-[#E4E1DA] focus:border-ink text-sm text-ink py-3 pl-10 pr-12 outline-none transition-colors"
                  id="password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="font-sans text-[11px] font-bold text-stone uppercase tracking-widest" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                {formData.confirmPassword && (
                  <span className={`text-[10px] uppercase font-sans tracking-wider ${isMatch ? "text-emerald-700 font-semibold" : "text-red-600"}`}>
                    {isMatch ? "Match" : "No Match"}
                  </span>
                )}
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone text-[18px]">
                  lock
                </span>
                <input
                  className="w-full bg-white border border-[#E4E1DA] focus:border-ink text-sm text-ink py-3 pl-10 pr-12 outline-none transition-colors"
                  id="confirmPassword"
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                <button
                  aria-label="Toggle confirm password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-ink transition-colors p-1 focus:outline-none"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showConfirmPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-3 mt-1">
              <label className="flex items-start gap-3 cursor-pointer group select-none">
                <div className="relative flex items-center justify-center w-4 h-4 mt-0.5 shrink-0">
                  <input
                    className="peer appearance-none w-4 h-4 border border-[#E4E1DA] checked:bg-ink checked:border-ink transition-colors focus:ring-0 cursor-pointer"
                    id="agreeTerms"
                    required
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <span className="material-symbols-outlined text-[14px] text-ivory absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                    check
                  </span>
                </div>
                <span className="font-sans text-xs text-stone group-hover:text-ink transition-colors leading-relaxed">
                  I agree to the{" "}
                  <Link className="underline underline-offset-4 hover:text-ink text-ink" href="/about">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link className="underline underline-offset-4 hover:text-ink text-ink" href="/about">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group select-none">
                <div className="relative flex items-center justify-center w-4 h-4 mt-0.5 shrink-0">
                  <input
                    className="peer appearance-none w-4 h-4 border border-[#E4E1DA] checked:bg-ink checked:border-ink transition-colors focus:ring-0 cursor-pointer"
                    id="newsletter"
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={handleChange}
                  />
                  <span className="material-symbols-outlined text-[14px] text-ivory absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                    check
                  </span>
                </div>
                <span className="font-sans text-xs text-stone group-hover:text-ink transition-colors leading-relaxed">
                  Send me updates about design collections and exclusive architectural previews
                </span>
              </label>
            </div>

            {/* Action Button */}
            <button
              disabled={submitting}
              className="w-full bg-ink hover:bg-stone py-3.5 px-8 flex justify-center items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] font-bold text-ivory transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
              type="submit"
            >
              {submitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              <span className="material-symbols-outlined text-[16px] font-bold">arrow_forward</span>
            </button>
          </form>



          {/* Footer Back Link */}
          <div className="mt-8 text-center">
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

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center font-sans text-xs text-stone uppercase tracking-widest">Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
