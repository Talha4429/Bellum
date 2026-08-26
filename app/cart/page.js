"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import { useCart } from "@/components/CartContext";
import { useAuth } from "@/components/AuthContext";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQty, subtotal, tax, shipping, total } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  function handleProceedToCheckout() {
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      setAuthModalOpen(true);
    }
  }

  return (
    <main className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-16 pb-24 flex-grow">
      <h1 className="font-serif text-4xl md:text-6xl font-light text-ink mb-10 tracking-tight">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <div className="py-20 text-center border border-[#E4E1DA] p-12 bg-white/40 max-w-xl mx-auto">
          <span className="material-symbols-outlined text-5xl text-stone mb-4">
            shopping_bag
          </span>
          <h2 className="font-serif text-2xl text-ink mb-2">
            Your shopping bag is currently empty
          </h2>
          <p className="font-sans text-sm text-stone mb-8 leading-relaxed">
            Discover our bespoke furniture and architectural pieces.
          </p>
          <Link
            href="/store"
            className="btn-ink font-sans text-xs uppercase tracking-widest"
          >
            Explore the Store
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Cart Items (Left Column) */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <div
                key={item.slug}
                className="flex items-start md:items-center py-6 border-b border-[#E4E1DA] gap-6"
              >
                <div className="w-20 h-20 bg-[#f1edec] border border-[#E4E1DA] shrink-0 relative overflow-hidden">
                  <SafeImage
                    src={item.image}
                    alt={item.name || item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-xl text-ink mb-1">
                      {item.name || item.title}
                    </h2>
                    <p className="font-sans text-xs text-stone uppercase tracking-wider mb-1">
                      {item.finish || item.category || "Standard Edition"}
                    </p>
                    <p className="font-sans text-sm font-medium text-ink">
                      PKR {item.price?.toLocaleString() || item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Stepper */}
                    <div className="flex items-center border border-ink h-10">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQty(item.slug, item.qty - 1)}
                        className="w-10 h-full flex items-center justify-center hover:bg-ink hover:text-ivory transition-colors text-ink"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          remove
                        </span>
                      </button>
                      <span className="font-sans text-sm text-ink w-10 text-center">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQty(item.slug, item.qty + 1)}
                        className="w-10 h-full flex items-center justify-center hover:bg-ink hover:text-ivory transition-colors text-ink"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          add
                        </span>
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      className="font-sans text-xs text-stone hover:text-red-700 transition-colors uppercase tracking-wider underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary (Right Column) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="border border-[#E4E1DA] p-6 md:p-8 bg-white/60">
              <h2 className="font-serif text-2xl text-ink border-b border-[#E4E1DA] pb-4 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 border-b border-[#E4E1DA] pb-6 font-sans text-sm">
                <div className="flex justify-between items-center text-stone">
                  <span>Subtotal</span>
                  <span className="text-ink font-medium">PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-stone">
                  <span>Shipping</span>
                  <span className="text-ink">
                    {shipping === 0 ? "Complimentary" : `PKR ${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-stone">
                  <span>Estimated Tax</span>
                  <span className="text-ink">PKR {tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8 font-serif text-2xl text-ink font-light">
                <span>Total</span>
                <span className="font-bold">PKR {total.toLocaleString()}</span>
              </div>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full btn-ink font-sans text-xs uppercase tracking-widest text-center block mb-4 cursor-pointer"
              >
                Proceed to Checkout
              </button>

              <div className="text-center">
                <Link
                  href="/store"
                  className="font-sans text-xs text-stone hover:text-ink transition-colors uppercase tracking-wider underline underline-offset-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign In / Sign Up Checkout Prompt Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-[460px] bg-[#F7F5F1] border border-[#E4E1DA] p-8 md:p-10 shadow-2xl">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone hover:text-ink transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="text-center mb-6">
              <span className="font-sans text-[11px] uppercase tracking-widest text-stone font-semibold block mb-2">
                Checkout Authentication
              </span>
              <h3 className="font-serif text-3xl font-light text-ink mb-3">
                Sign In or Sign Up
              </h3>
              <p className="font-sans text-xs text-stone leading-relaxed">
                Please sign in with your Bellum client account or create a new account to proceed with your order and payment.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/sign-up?redirect=/checkout"
                className="w-full bg-ink text-ivory border border-ink py-3.5 px-6 font-sans text-xs uppercase tracking-[0.15em] font-semibold text-center block hover:bg-neutral-800 transition-colors"
              >
                Create an Account (Sign Up)
              </Link>

              <Link
                href="/sign-in?redirect=/checkout"
                className="w-full bg-transparent text-ink border border-ink py-3.5 px-6 font-sans text-xs uppercase tracking-[0.15em] font-semibold text-center block hover:bg-ink hover:text-ivory transition-colors"
              >
                Sign In to Existing Account
              </Link>

              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => router.push("/checkout")}
                  className="font-sans text-xs text-stone hover:text-ink transition-colors underline underline-offset-4"
                >
                  Continue as Guest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
