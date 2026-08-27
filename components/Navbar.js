"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { user, isAuthenticated, signOut } = useAuth();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutOpen(false);
    setCollectionOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  // Don't render default front-of-house navbar inside admin routes, dedicated checkout, or auth pages
  if (
    pathname.startsWith("/admin") ||
    pathname === "/checkout" ||
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/login"
  ) {
    return null;
  }

  const isHome = pathname === "/";
  const isPortfolio = pathname.startsWith("/portfolio");
  const isCollection = pathname.startsWith("/collection");
  const isStore = pathname.startsWith("/store");
  const isAbout = pathname.startsWith("/about");
  const isCart = pathname === "/cart";


  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F5F1]/90 backdrop-blur-xl border-b border-[#E4E1DA] transition-all duration-300">
      <nav className="max-w-[1440px] mx-auto flex items-center justify-between h-20 md:h-24 px-6 md:px-12 lg:px-16">
        {/* Brand */}
        <Link
          href="/"
          className="relative h-14 md:h-16 w-52 md:w-64 block hover:opacity-85 transition-opacity flex-shrink-0"
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
        <div className="hidden md:flex items-center gap-8 lg:gap-11 h-full">
          <Link
            href="/"
            className={`font-sans text-[15px] uppercase tracking-[0.08em] transition-colors duration-200 h-full flex items-center ${isHome
              ? "text-black font-bold border-b-2 border-black pt-[2px]"
              : "text-[#2a2927] hover:text-black font-semibold"
              }`}
          >
            Home
          </Link>

          <Link
            href="/portfolio"
            className={`font-sans text-[15px] uppercase tracking-[0.08em] transition-colors duration-200 h-full flex items-center ${isPortfolio
              ? "text-black font-bold border-b-2 border-black pt-[2px]"
              : "text-[#2a2927] hover:text-black font-semibold"
              }`}
          >
            Portfolio
          </Link>

          {/* Collection Dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setCollectionOpen(true)}
            onMouseLeave={() => setCollectionOpen(false)}
          >
            <button
              type="button"
              className={`font-sans text-[15px] uppercase tracking-[0.08em] transition-colors duration-200 flex items-center gap-1 h-full cursor-pointer ${isCollection
                ? "text-black font-bold border-b-2 border-black pt-[2px]"
                : "text-[#2a2927] hover:text-black font-semibold"
                }`}
            >
              Collection
              <span className="material-symbols-outlined text-[20px]">
                arrow_drop_down
              </span>
            </button>

            {collectionOpen && (
              <div className="absolute top-full left-0 w-60 bg-[#F7F5F1] border border-[#E4E1DA] shadow-xl py-2.5 z-50 animate-fade-in">
                <Link
                  href="/collection/bedroom"
                  className="block px-6 py-3 font-sans text-sm uppercase tracking-wider text-[#1a1a1a] hover:text-black hover:bg-[#ebe7e6] font-semibold transition-colors"
                >
                  Bedroom
                </Link>
                <Link
                  href="/collection/dining"
                  className="block px-6 py-3 font-sans text-sm uppercase tracking-wider text-[#1a1a1a] hover:text-black hover:bg-[#ebe7e6] font-semibold transition-colors"
                >
                  Dining
                </Link>
                <Link
                  href="/collection/living"
                  className="block px-6 py-3 font-sans text-sm uppercase tracking-wider text-[#1a1a1a] hover:text-black hover:bg-[#ebe7e6] font-semibold transition-colors"
                >
                  Living
                </Link>
                <Link
                  href="/collection/gifting"
                  className="block px-6 py-3 font-sans text-sm uppercase tracking-wider text-[#1a1a1a] hover:text-black hover:bg-[#ebe7e6] font-semibold transition-colors"
                >
                  Gifting
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/store"
            className={`font-sans text-[15px] uppercase tracking-[0.08em] transition-colors duration-200 h-full flex items-center ${isStore
              ? "text-black font-bold border-b-2 border-black pt-[2px]"
              : "text-[#2a2927] hover:text-black font-semibold"
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
              className={`font-sans text-[15px] uppercase tracking-[0.08em] transition-colors duration-200 flex items-center gap-1 ${isAbout
                ? "text-black font-bold border-b-2 border-black pt-[2px]"
                : "text-[#2a2927] hover:text-black font-semibold"
                }`}
            >
              About
              <span className="material-symbols-outlined text-[20px]">
                arrow_drop_down
              </span>
            </Link>

            {aboutOpen && (
              <div className="absolute top-full left-0 w-56 bg-[#F7F5F1] border border-[#E4E1DA] shadow-lg py-2.5 z-50 animate-fade-in">
                <Link
                  href="/about"
                  className="block px-6 py-3 font-sans text-sm uppercase tracking-wider text-[#1a1a1a] hover:text-black hover:bg-[#ebe7e6] font-semibold transition-colors"
                >
                  Our Studio
                </Link>
                <Link
                  href="/about/team"
                  className="block px-6 py-3 font-sans text-sm uppercase tracking-wider text-[#1a1a1a] hover:text-black hover:bg-[#ebe7e6] font-semibold transition-colors"
                >
                  Our Team
                </Link>
                <Link
                  href="/about/brand-history"
                  className="block px-6 py-3 font-sans text-sm uppercase tracking-wider text-[#1a1a1a] hover:text-black hover:bg-[#ebe7e6] font-semibold transition-colors"
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
            <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-ink text-ivory text-[10px] w-8 h-8 rounded-full flex items-center justify-center font-sans font-semibold">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Account Dropdown */}
          <div
            className="relative hidden sm:block"
            onMouseEnter={() => setAccountOpen(true)}
            onMouseLeave={() => setAccountOpen(false)}
          >
            <button
              type="button"
              onClick={() => setAccountOpen(!accountOpen)}
              className="p-2 text-ink hover:text-stone transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
              aria-label="Account Menu"
            >
              <span className="material-symbols-outlined text-[28px]">person</span>
              {isAuthenticated && user?.name && (
                <span className="font-sans text-xs uppercase tracking-wider font-semibold max-w-[100px] truncate">
                  {user.name.split(" ")[0]}
                </span>
              )}
            </button>

            {accountOpen && (
              <div className="absolute right-0 top-full w-56 bg-[#F7F5F1] border border-[#E4E1DA] shadow-xl py-3 z-50 animate-fade-in text-left">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-4 py-2 border-b border-[#E4E1DA] mb-1">
                      <p className="font-sans text-[11px] uppercase tracking-widest text-stone">Signed In As</p>
                      <p className="font-serif text-sm font-medium text-ink truncate mt-0.5">{user.name}</p>
                      <p className="font-sans text-xs text-stone truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/cart"
                      className="block px-4 py-2 font-sans text-xs uppercase tracking-wider text-stone hover:text-ink hover:bg-[#ebe7e6] transition-colors"
                    >
                      Shopping Cart
                    </Link>
                    <button
                      type="button"
                      onClick={async () => {
                        await signOut();
                        setAccountOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 font-sans text-xs uppercase tracking-wider text-red-700 hover:bg-[#ebe7e6] transition-colors mt-1 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className="block px-4 py-2.5 font-sans text-xs uppercase tracking-wider text-ink font-semibold hover:bg-[#ebe7e6] transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block px-4 py-2.5 font-sans text-xs uppercase tracking-wider text-stone hover:text-ink hover:bg-[#ebe7e6] transition-colors"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[30px]">
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
            className="block font-sans text-sm uppercase tracking-widest text-ink py-2.5 border-b border-[#E4E1DA] font-medium"
          >
            Home
          </Link>
          <Link
            href="/portfolio"
            className="block font-sans text-sm uppercase tracking-widest text-ink py-2.5 border-b border-[#E4E1DA] font-medium"
          >
            Portfolio
          </Link>
          <div className="py-2.5 border-b border-[#E4E1DA] space-y-2.5">
            <span className="block font-sans text-xs uppercase tracking-widest text-stone font-semibold">
              Collection
            </span>
            <div className="pl-4 space-y-2.5">
              <Link
                href="/collection/bedroom"
                className="block font-sans text-sm uppercase tracking-wider text-ink font-medium"
              >
                Bedroom
              </Link>
              <Link
                href="/collection/dining"
                className="block font-sans text-sm uppercase tracking-wider text-ink font-medium"
              >
                Dining
              </Link>
              <Link
                href="/collection/living"
                className="block font-sans text-sm uppercase tracking-wider text-ink font-medium"
              >
                Living
              </Link>
              <Link
                href="/collection/gifting"
                className="block font-sans text-sm uppercase tracking-wider text-ink font-medium"
              >
                Gifting
              </Link>
            </div>
          </div>
          <Link
            href="/store"
            className="block font-sans text-sm uppercase tracking-widest text-ink py-2.5 border-b border-[#E4E1DA] font-medium"
          >
            Store
          </Link>
          <div className="py-2.5 border-b border-[#E4E1DA] space-y-2.5">
            <span className="block font-sans text-xs uppercase tracking-widest text-stone font-semibold">
              About
            </span>
            <div className="pl-4 space-y-2.5">
              <Link
                href="/about"
                className="block font-sans text-sm uppercase tracking-wider text-ink font-medium"
              >
                Our Studio
              </Link>
              <Link
                href="/about/team"
                className="block font-sans text-sm uppercase tracking-wider text-ink font-medium"
              >
                Our Team
              </Link>
              <Link
                href="/about/brand-history"
                className="block font-sans text-sm uppercase tracking-wider text-ink font-medium"
              >
                Brand History
              </Link>
            </div>
          </div>
          <Link
            href="/cart"
            className="block font-sans text-sm uppercase tracking-widest text-ink py-2.5 border-b border-[#E4E1DA] flex justify-between items-center font-medium"
          >
            <span>Cart</span>
            <span className="bg-ink text-ivory text-xs px-2.5 py-0.5 rounded-full">{itemCount}</span>
          </Link>

          {/* Auth section in mobile menu */}
          <div className="py-2.5 border-b border-[#E4E1DA]">
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <div className="font-sans text-sm text-stone">
                  Signed in as <span className="text-ink font-semibold">{user.name}</span>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block font-sans text-xs uppercase tracking-widest text-red-700 py-1 font-semibold cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  href="/sign-in"
                  className="block font-sans text-xs uppercase tracking-widest text-ink py-1 font-semibold underline underline-offset-4"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="block font-sans text-xs uppercase tracking-widest text-stone hover:text-ink py-1 underline underline-offset-4"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/admin/login"
            className="block font-sans text-xs uppercase tracking-widest text-stone pt-2 font-medium"
          >
            Admin Portal →
          </Link>
        </div>
      )}
    </header>
  );
}

