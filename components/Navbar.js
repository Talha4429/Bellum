"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  // Don't render default front-of-house navbar inside admin routes or dedicated checkout
  if (pathname.startsWith("/admin") || pathname === "/checkout") {
    return null;
  }

  const isHome = pathname === "/";
  const isPortfolio = pathname.startsWith("/portfolio");
  const isStore = pathname.startsWith("/store");
  const isAbout = pathname.startsWith("/about");
  const isCart = pathname === "/cart";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F5F1]/80 backdrop-blur-xl border-b border-[#E4E1DA] transition-all duration-300">
      <nav className="max-w-[1440px] mx-auto flex items-center justify-between h-20 px-6 md:px-16">
        {/* Brand */}
        <Link
          href="/"
          className="relative h-9 w-36 block hover:opacity-85 transition-opacity"
        >
          <Image
            src="/images/logo/bellum-logo.png"
            alt="Bellum - The Finest"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 h-full">
          <Link
            href="/"
            className={`font-sans text-xs uppercase tracking-[0.15em] transition-colors duration-300 h-full flex items-center ${
              isHome
                ? "text-ink font-semibold border-b-2 border-ink pt-[2px]"
                : "text-stone hover:text-ink"
            }`}
          >
            Home
          </Link>

          <Link
            href="/portfolio"
            className={`font-sans text-xs uppercase tracking-[0.15em] transition-colors duration-300 h-full flex items-center ${
              isPortfolio
                ? "text-ink font-semibold border-b-2 border-ink pt-[2px]"
                : "text-stone hover:text-ink"
            }`}
          >
            Portfolio
          </Link>

          <Link
            href="/store"
            className={`font-sans text-xs uppercase tracking-[0.15em] transition-colors duration-300 h-full flex items-center ${
              isStore
                ? "text-ink font-semibold border-b-2 border-ink pt-[2px]"
                : "text-stone hover:text-ink"
            }`}
          >
            Store
          </Link>

          {/* About Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <Link
              href="/about"
              className={`font-sans text-xs uppercase tracking-[0.15em] transition-colors duration-300 flex items-center gap-1 ${
                isAbout
                  ? "text-ink font-semibold border-b-2 border-ink pt-[2px]"
                  : "text-stone hover:text-ink"
              }`}
            >
              About
              <span className="material-symbols-outlined text-[16px]">
                arrow_drop_down
              </span>
            </Link>

            {aboutOpen && (
              <div className="absolute top-full left-0 w-48 bg-[#F7F5F1] border border-[#E4E1DA] shadow-lg py-2 z-50">
                <Link
                  href="/about"
                  className="block px-4 py-2.5 font-sans text-xs uppercase tracking-widest text-stone hover:text-ink hover:bg-[#ebe7e6] transition-colors"
                >
                  Our Studio
                </Link>
                <Link
                  href="/about/team"
                  className="block px-4 py-2.5 font-sans text-xs uppercase tracking-widest text-stone hover:text-ink hover:bg-[#ebe7e6] transition-colors"
                >
                  Our Team
                </Link>
                <Link
                  href="/about/brand-history"
                  className="block px-4 py-2.5 font-sans text-xs uppercase tracking-widest text-stone hover:text-ink hover:bg-[#ebe7e6] transition-colors"
                >
                  Brand History
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Trailing Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative p-2 text-ink hover:text-stone transition-colors"
            aria-label="Shopping Cart"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 bg-ink text-ivory text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-semibold">
                {itemCount}
              </span>
            )}
          </Link>

          <Link
            href="/sign-in"
            className="p-2 text-ink hover:text-stone transition-colors hidden sm:inline-block"
            aria-label="Account Login"
          >
            <span className="material-symbols-outlined text-[22px]">person</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F5F1] border-b border-[#E4E1DA] px-6 py-6 space-y-4">
          <Link
            href="/"
            className="block font-sans text-xs uppercase tracking-widest text-ink py-2 border-b border-[#E4E1DA]"
          >
            Home
          </Link>
          <Link
            href="/portfolio"
            className="block font-sans text-xs uppercase tracking-widest text-ink py-2 border-b border-[#E4E1DA]"
          >
            Portfolio
          </Link>
          <Link
            href="/store"
            className="block font-sans text-xs uppercase tracking-widest text-ink py-2 border-b border-[#E4E1DA]"
          >
            Store
          </Link>
          <div className="py-2 border-b border-[#E4E1DA] space-y-2">
            <span className="block font-sans text-xs uppercase tracking-widest text-stone">
              About
            </span>
            <div className="pl-4 space-y-2">
              <Link
                href="/about"
                className="block font-sans text-xs uppercase tracking-wider text-ink"
              >
                Our Studio
              </Link>
              <Link
                href="/about/team"
                className="block font-sans text-xs uppercase tracking-wider text-ink"
              >
                Our Team
              </Link>
              <Link
                href="/about/brand-history"
                className="block font-sans text-xs uppercase tracking-wider text-ink"
              >
                Brand History
              </Link>
            </div>
          </div>
          <Link
            href="/cart"
            className="block font-sans text-xs uppercase tracking-widest text-ink py-2 border-b border-[#E4E1DA] flex justify-between items-center"
          >
            <span>Cart</span>
            <span className="bg-ink text-ivory text-xs px-2 py-0.5">{itemCount}</span>
          </Link>
          <Link
            href="/sign-in"
            className="block font-sans text-xs uppercase tracking-widest text-ink py-2"
          >
            Sign In / Account
          </Link>
          <Link
            href="/admin/login"
            className="block font-sans text-[11px] uppercase tracking-widest text-stone pt-2"
          >
            Admin Portal →
          </Link>
        </div>
      )}
    </header>
  );
}
