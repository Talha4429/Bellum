import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "bellum_admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours in seconds

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET env var is not set");
  return secret;
}

// Sign a payload into a token string: base64(payload).base64(hmac)
export function signToken(payload) {
  const secret = getSecret();
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${sig}`;
}

// Verify and decode a token. Returns payload or null.
export function verifyToken(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const secret = getSecret();
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;

    const expectedSig = createHmac("sha256", secret).update(data).digest("base64url");

    // Timing-safe comparison
    const sigBuf = Buffer.from(sig, "base64url");
    const expectedBuf = Buffer.from(expectedSig, "base64url");
    if (sigBuf.length !== expectedBuf.length) return null;
    if (!timingSafeEqual(sigBuf, expectedBuf)) return null;

    const payload = JSON.parse(Buffer.from(data, "base64url").toString());

    // Check expiry
    if (payload.exp && Date.now() > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}

// Read session from a Request object's cookies
export function getAdminSessionFromRequest(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=");
      return [k, v.join("=")];
    })
  );
  return verifyToken(cookies[COOKIE_NAME] || "");
}

// Build Set-Cookie header string for setting the session
export function buildSessionCookieHeader(payload) {
  const token = signToken({ ...payload, exp: Date.now() + MAX_AGE * 1000 });
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`;
}

// Build a cookie header that clears the session
export function buildClearCookieHeader() {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`;
}

export { COOKIE_NAME };
