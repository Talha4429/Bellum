import { NextResponse } from "next/server";

const COOKIE_NAME = "bellum_admin_session";

// Edge-compatible HMAC verification using Web Crypto API
async function verifySessionToken(token, secret) {
  if (!token || !secret) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [data, sig] = parts;

    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBytes = base64urlToBytes(sig);
    const dataBytes = enc.encode(data);
    const valid = await crypto.subtle.verify("HMAC", keyMaterial, sigBytes, dataBytes);
    if (!valid) return false;

    const payload = JSON.parse(atob(data.replace(/-/g, "+").replace(/_/g, "/")));
    if (payload.exp && Date.now() > payload.exp) return false;
    return payload.role === "admin";
  } catch {
    return false;
  }
}

function base64urlToBytes(b64url) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();
  if (pathname.startsWith("/api/admin/auth")) return NextResponse.next();

  const cookieHeader = request.headers.get("cookie") || "";
  const cookiePairs = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=");
      return [k.trim(), v.join("=")];
    })
  );

  const token = cookiePairs[COOKIE_NAME];
  const secret = process.env.SESSION_SECRET;
  const isValid = await verifySessionToken(token, secret);

  if (!isValid) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
