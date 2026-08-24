import { NextResponse } from "next/server";
import { buildSessionCookieHeader } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { success: false, error: "Admin credentials not configured on server." },
        { status: 500 }
      );
    }

    if (
      email?.trim().toLowerCase() !== adminEmail.toLowerCase() ||
      password !== adminPassword
    ) {
      // Small delay to discourage brute-force
      await new Promise((r) => setTimeout(r, 400));
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const cookieHeader = buildSessionCookieHeader({ role: "admin", email: adminEmail });

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: { "Set-Cookie": cookieHeader },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error during login." },
      { status: 500 }
    );
  }
}
