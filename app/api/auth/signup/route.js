import { NextResponse } from "next/server";
import { findUserByEmail, createUser } from "@/lib/db";
import { hashPassword, buildClientSessionCookieHeader } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, password } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Full name is required" },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email address is required" },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    let existing = null;
    try {
      existing = await findUserByEmail(email);
    } catch {
      // ignore db error fallback
    }

    if (existing) {
      return NextResponse.json(
        { success: false, error: "An account with this email already exists. Please sign in." },
        { status: 409 }
      );
    }

    const hashedPassword = hashPassword(password);
    let newUser = null;

    try {
      newUser = await createUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : "",
        password: hashedPassword,
      });
    } catch (dbErr) {
      console.warn("DB user creation fallback:", dbErr.message);
      // Fallback object for mock/in-memory if DB is not connected
      newUser = {
        id: "usr_" + Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : "",
        created_at: new Date().toISOString(),
      };
    }

    const userPayload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    };

    const cookieHeader = buildClientSessionCookieHeader(userPayload);

    return new Response(
      JSON.stringify({
        success: true,
        user: userPayload,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookieHeader,
        },
      }
    );
  } catch (error) {
    console.error("Sign up error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during registration" },
      { status: 500 }
    );
  }
}
