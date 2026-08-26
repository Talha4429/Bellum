"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import { useCart } from "@/components/CartContext";
import { useAuth } from "@/components/AuthContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "Lahore",
    zip: "54000",
    country: "Pakistan",
    sameAsShipping: true,
    cardNumber: "•••• •••• •••• 4242",
    expiry: "12/28",
    cvc: "891",
  });

  useEffect(() => {
    if (user) {
      const nameParts = (user.name || "").trim().split(" ");
      const first = nameParts[0] || "";
      const last = nameParts.slice(1).join(" ") || "";

      setFormData((prev) => ({
        ...prev,
        email: user.email || prev.email,
        firstName: first || prev.firstName,
        lastName: last || prev.lastName,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      clearCart();
      router.push("/order-confirmed");
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-[#F7F5F1] text-ink flex flex-col">
      {/* Minimal Header */}
      <header className="w-full flex justify-between items-center h-20 px-6 md:px-16 border-b border-[#E4E1DA] bg-[#F7F5F1] sticky top-0 z-50">
        <Link
          href="/"
          className="relative h-8 w-36 block hover:opacity-85 transition-opacity"
        >
          <Image
            src="/images/logo/bellum-logo.png"
            alt="Bellum - The Finest"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>
        <Link
          href="/cart"
          className="font-sans text-xs uppercase tracking-widest text-stone hover:text-ink transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>{" "}
          Cancel
        </Link>
      </header>

      {/* Main Checkout Canvas */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 md:px-16 py-12 md:py-16">
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-6xl font-light text-ink mb-2 tracking-tight">
            Checkout
          </h1>
          <p className="font-sans text-sm md:text-base text-stone">
            Complete your bespoke architectural order.
          </p>
        </div>

        {/* Auth Status Notification / Prompt */}
        {!isAuthenticated ? (
          <div className="mb-10 p-5 bg-white border border-[#E4E1DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-ink text-2xl">
                account_circle
              </span>
              <div>
                <p className="font-serif text-base text-ink font-medium">
                  Have a Bellum account?
                </p>
                <p className="font-sans text-xs text-stone">
                  Sign in or create an account for order tracking, express checkout, and bespoke client support.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/sign-in?redirect=/checkout"
                className="btn-ink font-sans text-[11px] uppercase tracking-wider py-2.5 px-4"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up?redirect=/checkout"
                className="font-sans text-[11px] uppercase tracking-wider text-ink font-semibold border border-[#E4E1DA] py-2.5 px-4 hover:border-ink transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        ) : (
          <div className="mb-10 p-4 bg-white/70 border border-[#E4E1DA] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-700 text-xl">
                verified
              </span>
              <p className="font-sans text-xs text-stone">
                Checking out as <strong className="text-ink">{user?.name}</strong> ({user?.email})
              </p>
            </div>
            <Link
              href="/sign-in?redirect=/checkout"
              className="font-sans text-[11px] uppercase tracking-wider text-stone hover:text-ink underline underline-offset-4"
            >
              Switch Account
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Form Steps */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-12">
              {/* Step 1: Contact Information */}
              <section className="border-b border-[#E4E1DA] pb-10">
                <h2 className="font-serif text-2xl text-ink mb-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-ink text-ivory flex items-center justify-center font-sans text-xs">
                    1
                  </span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="font-sans text-xs uppercase tracking-widest text-stone mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="minimal-input py-2 text-base font-sans"
                      placeholder="client@studio.com"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="phone"
                      className="font-sans text-xs uppercase tracking-widest text-stone mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="minimal-input py-2 text-base font-sans"
                      placeholder="+92 321 8235586"
                    />
                  </div>
                </div>
              </section>

              {/* Step 2: Billing Address */}
              <section className="border-b border-[#E4E1DA] pb-10">
                <h2 className="font-serif text-2xl text-ink mb-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-stone text-ink flex items-center justify-center font-sans text-xs">
                    2
                  </span>
                  Billing Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="firstName"
                      className="font-sans text-xs uppercase tracking-widest text-stone mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="minimal-input py-2 text-base font-sans"
                      placeholder="John"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="lastName"
                      className="font-sans text-xs uppercase tracking-widest text-stone mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="minimal-input py-2 text-base font-sans"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="flex flex-col md:col-span-2">
                    <label
                      htmlFor="address"
                      className="font-sans text-xs uppercase tracking-widest text-stone mb-2"
                    >
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="minimal-input py-2 text-base font-sans"
                      placeholder="89-B Hali Road, Gulberg"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="city"
                      className="font-sans text-xs uppercase tracking-widest text-stone mb-2"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="minimal-input py-2 text-base font-sans"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="zip"
                      className="font-sans text-xs uppercase tracking-widest text-stone mb-2"
                    >
                      Zip / Postal Code *
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleChange}
                      className="minimal-input py-2 text-base font-sans"
                    />
                  </div>
                  <div className="flex flex-col md:col-span-2">
                    <label
                      htmlFor="country"
                      className="font-sans text-xs uppercase tracking-widest text-stone mb-2"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="minimal-input py-2 text-base font-sans bg-transparent"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="sameAsShipping"
                      checked={formData.sameAsShipping}
                      onChange={handleChange}
                      className="h-4 w-4 text-ink rounded-none border-[#6B6862] focus:ring-0"
                    />
                    <span className="font-sans text-sm text-stone">
                      Billing address is same as shipping address
                    </span>
                  </label>
                </div>
              </section>

              {/* Step 3: Payment Method */}
              <section>
                <h2 className="font-serif text-2xl text-ink mb-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-stone text-ink flex items-center justify-center font-sans text-xs">
                    3
                  </span>
                  Payment Method
                </h2>

                <div className="border border-[#E4E1DA] p-6 md:p-8 bg-white/40 space-y-6">
                  <div className="flex justify-between items-center border-b border-[#E4E1DA] pb-4">
                    <span className="font-sans text-xs uppercase tracking-widest text-ink font-semibold">
                      Credit Card
                    </span>
                    <span className="font-sans text-xs text-stone">
                      Encrypted 256-bit SSL
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="cardNumber"
                      className="font-sans text-xs uppercase tracking-widest text-stone mb-2"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="minimal-input py-2 text-base font-sans tracking-widest"
                      placeholder="•••• •••• •••• ••••"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label
                        htmlFor="expiry"
                        className="font-sans text-xs uppercase tracking-widest text-stone mb-2"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        required
                        value={formData.expiry}
                        onChange={handleChange}
                        className="minimal-input py-2 text-base font-sans"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="cvc"
                        className="font-sans text-xs uppercase tracking-widest text-stone mb-2"
                      >
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        required
                        value={formData.cvc}
                        onChange={handleChange}
                        className="minimal-input py-2 text-base font-sans"
                        placeholder="•••"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Order Review */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
              <div className="border border-[#E4E1DA] p-6 md:p-8 bg-white/60">
                <h3 className="font-serif text-2xl text-ink mb-6 border-b border-[#E4E1DA] pb-4">
                  Order Summary
                </h3>

                {/* Items Mini List */}
                <div className="space-y-4 mb-6 border-b border-[#E4E1DA] pb-6 max-h-60 overflow-y-auto">
                  {items.length === 0 ? (
                    <p className="font-sans text-xs text-stone py-4 text-center">
                      No items in cart
                    </p>
                  ) : (
                    items.map((item) => (
                      <div key={item.slug} className="flex gap-4">
                        <div className="w-14 h-14 bg-[#f1edec] border border-[#E4E1DA] relative shrink-0">
                          <SafeImage
                            src={item.image}
                            alt={item.name || item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 flex justify-between items-start text-sm">
                          <div>
                            <p className="font-serif text-ink">{item.name || item.title}</p>
                            <p className="font-sans text-xs text-stone">
                              Qty: {item.qty}
                            </p>
                          </div>
                          <span className="font-sans font-medium text-ink">
                            PKR {(item.price * item.qty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Calculations */}
                <div className="space-y-3 mb-6 border-b border-[#E4E1DA] pb-6 font-sans text-sm">
                  <div className="flex justify-between text-stone">
                    <span>Subtotal</span>
                    <span className="text-ink">PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone">
                    <span>Shipping</span>
                    <span className="text-ink">
                      {shipping === 0 ? "Complimentary" : `PKR ${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone">
                    <span>Taxes</span>
                    <span className="text-ink">PKR {tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8 font-serif text-2xl text-ink font-light">
                  <span>Total</span>
                  <span className="font-bold">PKR {total.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting || items.length === 0}
                  className="w-full btn-ink font-sans text-xs uppercase tracking-widest text-center py-4 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    "Processing..."
                  ) : (
                    <>
                      <span>PAY PKR {total.toLocaleString()}</span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                        lock
                      </span>
                    </>
                  )}
                </button>

                <p className="font-sans text-xs text-stone text-center mt-4 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    shield
                  </span>
                  Bank-grade encrypted checkout
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
