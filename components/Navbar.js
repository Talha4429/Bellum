"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { items } = useCart();
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
          <Link href="/store" className="hover:text-stone transition-colors">
            Store
          </Link>
          <Link href="/about" className="hover:text-stone transition-colors">
            About
          </Link>
          <Link href="/cart" className="hover:text-stone transition-colors">
            Cart ({count})
          </Link>
        </div>
      </nav>
    </header>
  );
}