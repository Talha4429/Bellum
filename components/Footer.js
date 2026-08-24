"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Suppress footer on admin routes and transactional checkout
  if (pathname.startsWith("/admin") || pathname === "/checkout") {
    return null;
  }

  return (
    <footer className="w-full bg-[#f1edec] border-t border-[#E4E1DA] mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column: Brand & Copyright */}
        <div className="flex flex-col justify-between">
          <div>
            <Link href="/" className="relative h-10 w-44 block mb-4 hover:opacity-85 transition-opacity">
              <Image
                src="/images/logo/bellum-logo.png"
                alt="Bellum - The Finest"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="font-sans text-xs uppercase tracking-widest text-stone">
              Architecture · Interiors · Custom Furniture · Turnkey
            </p>
            <p className="font-sans text-xs text-stone mt-2">
              89-B Hali Rd, Gulberg 2, Lahore, 54000
            </p>
          </div>
          <p className="font-sans text-xs uppercase tracking-widest text-stone mt-10 md:mt-0">
            © {new Date().getFullYear()} BELLUM ARCHITECTURE & DESIGN. LAHORE.
          </p>
        </div>

        {/* Right Column: Links */}
        <div className="flex flex-col md:flex-row gap-8 md:justify-end">
          <div className="flex flex-col gap-3 font-sans text-xs uppercase tracking-widest">
            <Link href="/about" className="text-stone hover:text-ink transition-colors">
              Our Studio
            </Link>
            <Link href="/about/brand-history" className="text-stone hover:text-ink transition-colors">
              Brand History
            </Link>
            <Link href="/about/team" className="text-stone hover:text-ink transition-colors">
              Our Team
            </Link>
            <Link href="/portfolio" className="text-stone hover:text-ink transition-colors">
              Portfolio
            </Link>
            <Link href="/store" className="text-stone hover:text-ink transition-colors">
              Store
            </Link>
          </div>

          <div className="flex flex-col gap-3 font-sans text-xs uppercase tracking-widest">
            <a
              href="mailto:info@bellum.com.pk"
              className="text-stone hover:text-ink transition-colors"
            >
              info@bellum.com.pk
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-stone hover:text-ink transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-stone hover:text-ink transition-colors"
            >
              LinkedIn
            </a>
            <Link
              href="/admin/login"
              className="text-stone/60 hover:text-ink transition-colors pt-2"
            >
              Admin Access →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}