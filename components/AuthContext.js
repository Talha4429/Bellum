"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session from API and localStorage fallback
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
          localStorage.setItem("bellum-client-user", JSON.stringify(data.user));
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Auth session check error:", err);
      }

      // Check localStorage fallback
      try {
        const saved = localStorage.getItem("bellum-client-user");
        if (saved) {
          setUser(JSON.parse(saved));
        }
      } catch {
        // ignore
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  async function signUp({ name, email, phone, password }) {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create account");
      }

      setUser(data.user);
      try {
        localStorage.setItem("bellum-client-user", JSON.stringify(data.user));
      } catch {
        // ignore
      }

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async function signIn(email, password) {
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid credentials");
      }

      setUser(data.user);
      try {
        localStorage.setItem("bellum-client-user", JSON.stringify(data.user));
      } catch {
        // ignore
      }

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async function signOut() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    setUser(null);
    try {
      localStorage.removeItem("bellum-client-user");
    } catch {
      // ignore
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      user: null,
      loading: false,
      isAuthenticated: false,
      signUp: async () => ({ success: false, error: "AuthProvider missing" }),
      signIn: async () => ({ success: false, error: "AuthProvider missing" }),
      signOut: async () => {},
    };
  }
  return ctx;
}
