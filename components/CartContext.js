"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bellum-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // fallback
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem("bellum-cart", JSON.stringify(items));
      } catch {
        // storage quota fallback
      }
    }
  }, [items, loaded]);

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === product.slug ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...product, qty }];
    });

    setNotification(`Added "${product.name || product.title}" to cart`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  function removeItem(slug) {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }

  function updateQty(slug, qty) {
    if (qty <= 0) {
      removeItem(slug);
      return;
    }
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty } : i)));
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((sum, item) => sum + (item.qty || 1), 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const shipping = subtotal > 0 ? (subtotal >= 2000 ? 0 : 50) : 0;
  const total = subtotal + tax + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        tax,
        shipping,
        total,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        notification,
      }}
    >
      {children}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-ivory px-6 py-4 border border-stone/30 shadow-2xl flex items-center gap-3 transition-all duration-300">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span className="font-sans text-xs uppercase tracking-widest">{notification}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    return {
      items: [],
      itemCount: 0,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      addItem: () => {},
      removeItem: () => {},
      updateQty: () => {},
      clearCart: () => {},
      notification: null,
    };
  }
  return ctx;
}