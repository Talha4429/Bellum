"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { items } = useCart();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-hairline">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <Link href="/" className="relative h-8 w-32 block">
          <Image
            src="/images/logo/bellum-logo.png"
            alt="Bellum"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>
        <div className="flex items-center gap-8 font-sans text-sm uppercase tracking-[0.15em] text-ink">
          <Link href="/portfolio" className="hover:text-stone transition-colors">
            Portfolio
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setCollectionOpen(true)}
            onMouseLeave={() => setCollectionOpen(false)}
          >
            <button
              type="button"
              aria-expanded={collectionOpen}
              aria-haspopup="menu"
              onClick={() => setCollectionOpen((isOpen) => !isOpen)}
              className="flex items-center gap-1 hover:text-stone transition-colors"
            >
              Collection
              <span aria-hidden="true" className="text-xs">
                &#9662;
              </span>
            </button>
            {collectionOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full min-w-44 border border-hairline bg-ivory py-2 shadow-sm"
              >
                {[
                  ["Bedroom", "/collection/bedroom"],
                  ["Dining", "/collection/dining"],
                  ["Living", "/collection/living"],
                  ["Gifting", "/collection/gifting"],
                  ["Offers", "/collection/offers"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    role="menuitem"
                    onClick={() => setCollectionOpen(false)}
                    className="block px-4 py-2 text-left hover:bg-hairline hover:text-ink transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/store" className="hover:text-stone transition-colors">
            Store
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              type="button"
              aria-expanded={aboutOpen}
              aria-haspopup="menu"
              onClick={() => setAboutOpen((isOpen) => !isOpen)}
              className="flex items-center gap-1 hover:text-stone transition-colors"
            >
              About
              <span aria-hidden="true" className="text-xs">
                &#9662;
              </span>
            </button>
            {aboutOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full min-w-44 border border-hairline bg-ivory py-2 shadow-sm"
              >
                <Link
                  href="/about/brand-history"
                  role="menuitem"
                  onClick={() => setAboutOpen(false)}
                  className="block px-4 py-2 text-left hover:bg-hairline hover:text-ink transition-colors"
                >
                  Brand History
                </Link>
                <Link
                  href="/about/team"
                  role="menuitem"
                  onClick={() => setAboutOpen(false)}
                  className="block px-4 py-2 text-left hover:bg-hairline hover:text-ink transition-colors"
                >
                  Team
                </Link>
              </div>
            )}
          </div>
          <Link href="/cart" className="hover:text-stone transition-colors">
            Cart ({count})
          </Link>
        </div>
      </nav>
    </header>
  );
}
