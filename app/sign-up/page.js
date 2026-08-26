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
    <main className="w-full min-h-[85vh] flex items-center justify-center py-16 px-6 md:px-16 relative">
      {/* Subtle Blueprint Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="w-full max-w-[440px] mx-auto flex flex-col items-center relative z-10 bg-white/70 backdrop-blur-sm border border-[#E4E1DA] p-8 md:p-10 shadow-sm">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
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
        </div>

        {/* Header */}
        <div className="text-center mb-8 w-full">
          <h1 className="font-serif text-3xl text-ink mb-2 font-light">
            Create an Account
          </h1>
          <p className="font-sans text-xs text-stone leading-relaxed">
            Join Bellum for exclusive access, order tracking, and bespoke client services.
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

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label
              className="font-sans text-[11px] font-semibold text-stone uppercase tracking-wider"
              htmlFor="fullName"
            >
              FULL NAME *
            </label>
            <input
              className="minimal-input w-full py-2 font-sans text-sm text-ink placeholder:text-stone/50"
              id="fullName"
              placeholder="John Doe"
              required
              type="text"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              className="font-sans text-[11px] font-semibold text-stone uppercase tracking-wider"
              htmlFor="email"
            >
              EMAIL ADDRESS *
            </label>
            <input
              className="minimal-input w-full py-2 font-sans text-sm text-ink placeholder:text-stone/50"
              id="email"
              placeholder="you@example.com"
              required
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label
              className="font-sans text-[11px] font-semibold text-stone uppercase tracking-wider"
              htmlFor="phone"
            >
              PHONE NUMBER (OPTIONAL)
            </label>
            <input
              className="minimal-input w-full py-2 font-sans text-sm text-ink placeholder:text-stone/50"
              id="phone"
              placeholder="+92 321 8235586"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5 relative">
            <label
              className="font-sans text-[11px] font-semibold text-stone uppercase tracking-wider"
              htmlFor="password"
            >
              PASSWORD *
            </label>
            <div className="relative">
              <input
                className="minimal-input w-full py-2 pr-10 font-sans text-sm text-ink"
                id="password"
                required
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
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

            {/* Password Strength Checklist */}
            <div className="mt-2 flex flex-col gap-1.5 bg-[#f7f5f1]/60 p-3 border border-[#E4E1DA]">
              <div
                className={`flex items-center gap-2 text-[11px] transition-colors ${
                  isLenValid ? "text-ink font-medium" : "text-stone"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[14px] ${
                    isLenValid ? "text-emerald-700 font-bold" : "text-stone"
                  }`}
                >
                  {isLenValid ? "check_circle" : "radio_button_unchecked"}
                </span>
                <span>At least 8 characters</span>
              </div>
              <div
                className={`flex items-center gap-2 text-[11px] transition-colors ${
                  hasUpper ? "text-ink font-medium" : "text-stone"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[14px] ${
                    hasUpper ? "text-emerald-700 font-bold" : "text-stone"
                  }`}
                >
                  {hasUpper ? "check_circle" : "radio_button_unchecked"}
                </span>
                <span>Contains uppercase letter (A-Z)</span>
              </div>
              <div
                className={`flex items-center gap-2 text-[11px] transition-colors ${
                  hasLower ? "text-ink font-medium" : "text-stone"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[14px] ${
                    hasLower ? "text-emerald-700 font-bold" : "text-stone"
                  }`}
                >
                  {hasLower ? "check_circle" : "radio_button_unchecked"}
                </span>
                <span>Contains lowercase letter (a-z)</span>
              </div>
              <div
                className={`flex items-center gap-2 text-[11px] transition-colors ${
                  hasNumOrSym ? "text-ink font-medium" : "text-stone"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[14px] ${
                    hasNumOrSym ? "text-emerald-700 font-bold" : "text-stone"
                  }`}
                >
                  {hasNumOrSym ? "check_circle" : "radio_button_unchecked"}
                </span>
                <span>Contains number or symbol</span>
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="flex justify-between items-center">
              <label
                className="font-sans text-[11px] font-semibold text-stone uppercase tracking-wider"
                htmlFor="confirmPassword"
              >
                CONFIRM PASSWORD *
              </label>
              {formData.confirmPassword && (
                <span
                  className={`text-[10px] uppercase font-sans tracking-wider ${
                    isMatch ? "text-emerald-700 font-medium" : "text-red-600"
                  }`}
                >
                  {isMatch ? "Passwords match" : "Does not match"}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                className="minimal-input w-full py-2 pr-10 font-sans text-sm text-ink"
                id="confirmPassword"
                required
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <button
                aria-label="Toggle confirm password visibility"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-stone hover:text-ink transition-colors p-1 focus:outline-none"
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
          <div className="flex flex-col gap-3 mt-3 mb-2">
            <label className="flex items-start gap-3 cursor-pointer group select-none">
              <div className="relative flex items-center justify-center w-4 h-4 mt-0.5 shrink-0">
                <input
                  className="peer appearance-none w-4 h-4 border border-[#747878] checked:bg-ink checked:border-ink transition-colors focus:ring-0 cursor-pointer"
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
                <Link
                  className="underline underline-offset-4 hover:text-ink text-ink font-medium"
                  href="/about"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  className="underline underline-offset-4 hover:text-ink text-ink font-medium"
                  href="/about"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group select-none">
              <div className="relative flex items-center justify-center w-4 h-4 mt-0.5 shrink-0">
                <input
                  className="peer appearance-none w-4 h-4 border border-[#747878] checked:bg-ink checked:border-ink transition-colors focus:ring-0 cursor-pointer"
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
                Send me updates about new design collections and exclusive architectural previews
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            disabled={submitting}
            className="w-full border border-ink py-3.5 px-8 flex justify-center items-center font-sans text-xs uppercase tracking-[0.15em] font-semibold text-ink hover:bg-ink hover:text-ivory transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            type="submit"
          >
            {submitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 w-full text-center border-t border-[#E4E1DA]">
          <p className="font-sans text-xs text-stone">
            Already have an account?{" "}
            <Link
              className="text-ink font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity ml-1"
              href={`/sign-in${redirectUrl !== "/store" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
            >
              Sign In
            </Link>
          </p>
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
