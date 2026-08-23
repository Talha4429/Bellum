import SafeImage from "@/components/SafeImage";

export const metadata = {
  title: "Brand History | Bellum",
  description: "The story behind Bellum — The Finest.",
};

export default function BrandHistoryPage() {
  return (
    <main>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-5">
          Bellum — The Finest
        </p>
        <div className="max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl font-light leading-[1.05] tracking-tight">
            About Us
          </h1>
          <p className="font-serif text-2xl md:text-3xl leading-relaxed mt-8 text-stone">
            A decade of considered craft, thoughtful spaces, and furniture made
            to define the places we call home.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative aspect-[16/8] overflow-hidden">
          <SafeImage
            src="/images/portfolio/hampstead-cover.jpg"
            alt="A warmly detailed Bellum interior"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-[minmax(0,1fr)_20rem] gap-12 lg:gap-24">
        <div className="max-w-2xl font-sans text-lg leading-8 text-stone space-y-8">
          <p>
            Bellum began nearly a decade ago as a shared vision between two
            partners who believed furniture should not just fill a space—it
            should define it. Starting from a single location in Gulberg,
            Lahore under the name GYO Lifestyle, the focus was simple: craft
            high-quality bespoke furniture with honest materials, refined
            detailing, and personal attention to every client.
          </p>
          <p>
            The response was immediate. As trust grew and projects expanded,
            the brand evolved into Bellum — The Finest, a name that reflects
            both craftsmanship and intent. What started as custom furniture
            gradually developed into a complete design solution, offering
            architectural consultation, interior design, and turnkey project
            execution.
          </p>
          <p>
            Today, Bellum is recognized for creating thoughtfully designed
            spaces rather than just individual products. Each project is
            approached with balance: aesthetics, function, and longevity
            working together, whether it is a single custom piece or a fully
            curated interior.
          </p>
          <p>
            While the scale has grown, the philosophy remains unchanged:
            deliver quality that lasts and spaces that feel personal. Bellum
            continues to refine its craft with the same commitment that
            started the journey—with attention to detail, respect for
            materials, and trust built through every completed project.
          </p>
        </div>

        <aside className="lg:pt-2">
          <div className="relative aspect-[3/4] overflow-hidden">
            <SafeImage
              src="/images/misc/materials-board.jpg"
              alt="Bellum material selection board"
              fill
              className="object-cover"
            />
          </div>
          <p className="font-sans text-xs uppercase tracking-[0.15em] text-stone mt-4">
            Crafted with intent
          </p>
        </aside>
      </section>
    </main>
  );
}
