import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-hairline mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <div className="relative h-7 w-28 mb-2">
            <Image
              src="/images/logo/bellum-logo.png"
              alt="Bellum"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="font-sans text-sm text-stone mt-1">
            Furniture & interiors, made to last.
          </p>
        </div>
        <div className="font-sans text-sm text-stone">
          © {new Date().getFullYear()} Bellum. All rights reserved.
        </div>
      </div>
    </footer>
  );
}