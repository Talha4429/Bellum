import Link from "next/link";

export const metadata = {
  title: "Order Confirmation | Bellum",
  description: "Your Bellum order has been successfully placed and confirmed.",
};

export default function OrderConfirmedPage() {
  const orderNumber = "BEL-89241";

  return (
    <main className="w-full max-w-[1440px] mx-auto px-6 md:px-16 py-20 flex-grow flex flex-col items-center justify-center">
      {/* Header Badge & Title */}
      <header className="text-center mb-12 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-ink mb-6">
          <span className="material-symbols-outlined text-3xl text-ink">
            check
          </span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-light text-ink mb-3 tracking-tight">
          Thank you for your purchase
        </h1>
        <p className="font-sans text-base md:text-lg text-stone mb-2">
          Your order <span className="font-semibold text-ink">#{orderNumber}</span> has been confirmed.
        </p>
        <p className="font-sans text-xs uppercase tracking-widest text-stone">
          A receipt and project schedule has been dispatched to your email.
        </p>
      </header>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-4xl mx-auto mb-14">
        {/* Customer / Dispatch Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 border border-[#E4E1DA] bg-white/40">
            <h2 className="font-sans text-xs uppercase tracking-widest text-stone mb-3">
              Delivery Address
            </h2>
            <p className="font-sans text-sm leading-relaxed text-ink">
              Farhan Ali<br />
              89-B Hali Road, Gulberg 2<br />
              Lahore, 54000<br />
              Pakistan
            </p>
          </div>

          <div className="p-6 border border-[#E4E1DA] bg-white/40">
            <h2 className="font-sans text-xs uppercase tracking-widest text-stone mb-3">
              Payment Method
            </h2>
            <p className="font-sans text-sm text-ink flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">credit_card</span>
              Visa ending in •••• 4242
            </p>
          </div>
        </div>

        {/* Itemized Summary */}
        <div className="lg:col-span-7 border border-[#E4E1DA] p-6 md:p-8 bg-white/60">
          <h2 className="font-serif text-2xl text-ink border-b border-[#E4E1DA] pb-4 mb-6">
            Order Breakdown
          </h2>

          <div className="space-y-4 mb-6 border-b border-[#E4E1DA] pb-6 font-sans text-sm">
            <div className="flex justify-between items-center text-ink">
              <div>
                <p className="font-medium">Aurelia Armchair</p>
                <p className="text-xs text-stone">Ink / Boucle · Qty: 1</p>
              </div>
              <span className="font-medium">PKR 1,850.00</span>
            </div>

            <div className="flex justify-between items-center text-ink">
              <div>
                <p className="font-medium">Monolith Console</p>
                <p className="text-xs text-stone">Textured Stone · Qty: 1</p>
              </div>
              <span className="font-medium">PKR 2,400.00</span>
            </div>
          </div>

          <div className="space-y-2 font-sans text-sm">
            <div className="flex justify-between text-stone">
              <span>Subtotal</span>
              <span className="text-ink">PKR 4,250.00</span>
            </div>
            <div className="flex justify-between text-stone">
              <span>Shipping</span>
              <span className="text-ink">Complimentary</span>
            </div>
            <div className="flex justify-between text-stone">
              <span>Taxes</span>
              <span className="text-ink">PKR 340.00</span>
            </div>
            <div className="flex justify-between pt-4 mt-2 border-t border-[#E4E1DA] font-serif text-xl text-ink font-semibold">
              <span>Total Paid</span>
              <span>PKR 4,590.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
        <Link
          href="/store"
          className="flex-1 btn-ink font-sans text-xs uppercase tracking-widest text-center"
        >
          Continue Shopping
        </Link>
        <Link
          href="/portfolio"
          className="flex-1 border border-stone/30 text-ink hover:border-ink font-sans text-xs uppercase tracking-widest py-3 px-6 text-center transition-colors"
        >
          View Portfolio
        </Link>
      </div>
    </main>
  );
}
