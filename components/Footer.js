import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-hairline mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row md:justify-between md:items-start gap-12">
        <div>
          <p className="font-serif text-3xl tracking-tight mb-4">BELLUM.</p>
          <p className="font-sans text-sm leading-6 text-stone max-w-sm">
            Bellum – Architecture | Interiors | Custom Furniture | Turnkey
            Solutions
          </p>
          <div className="flex items-center gap-3 mt-7">
            <a href="#" target="_blank" rel="noreferrer" aria-label="Chat with Bellum on WhatsApp" className="w-10 h-10 rounded-full bg-hairline flex items-center justify-center hover:bg-ink hover:text-ivory transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.001 2C6.478 2 2 6.478 2 12.001c0 1.98.573 3.827 1.562 5.383L2 22l4.735-1.55A9.955 9.955 0 0 0 12.001 22C17.523 22 22 17.523 22 12.001 22 6.478 17.523 2 12.001 2zm0 18.187a8.16 8.16 0 0 1-4.166-1.14l-.299-.178-2.813.92.926-2.75-.194-.283A8.147 8.147 0 0 1 3.813 12c0-4.517 3.671-8.187 8.188-8.187 4.516 0 8.187 3.67 8.187 8.187 0 4.517-3.671 8.187-8.187 8.187z" />
              </svg>
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="Follow Bellum on Instagram" className="w-10 h-10 rounded-full bg-hairline flex items-center justify-center hover:bg-ink hover:text-ivory transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
            <a href="#" target="_blank" rel="noreferrer" aria-label="Follow Bellum on LinkedIn" className="w-10 h-10 rounded-full bg-hairline flex items-center justify-center hover:bg-ink hover:text-ivory transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-lg mb-5">Contact Details</h2>
          <address className="not-italic font-sans text-sm leading-6 text-stone space-y-3">
            <p><a href="mailto:info@bellum.com.pk" className="hover:text-ink transition-colors">Email: info@bellum.com.pk</a></p>
            <p><a href="tel:+923218235586" className="hover:text-ink transition-colors">Phone: +92 321 8235586</a></p>
            <p><a href="https://www.google.com/maps/search/?api=1&query=89-B+Hali+Rd,+Block+E1,+Gulberg+2,+Lahore,+54000" target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">89-B Hali Rd, Block E1, Gulberg 2, Lahore, 54000</a></p>
          </address>
        </div>
      </div>
    </footer>
  );
}