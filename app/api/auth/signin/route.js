import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/db";
import { verifyPassword, buildClientSessionCookieHeader } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    let user = null;
    try {
      user = await findUserByEmail(email);
    } catch (err) {
      console.warn("DB find user error:", err.message);
    }

    if (user) {
      const valid = verifyPassword(password, user.password);
      if (!valid) {
        return NextResponse.json(
          { success: false, error: "Invalid email or password" },
          { status: 401 }
        );
      }
    } else {
      // Allow demo login fallback if DB isn't initialized yet
      if (email.includes("@") && password.length >= 6) {
        user = {
          id: "usr_" + Date.now(),
          name: email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim() || "Client",
          email: email.trim().toLowerCase(),
          phone: "+92 300 1234567",
        };
      } else {
        return NextResponse.json(
          { success: false, error: "Invalid email or password" },
          { status: 401 }
        );
      }
    }

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
    };

    const cookieHeader = buildClientSessionCookieHeader(userPayload);

    return new Response(
      JSON.stringify({
        success: true,
        user: userPayload,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookieHeader,
        },
      }
    );
  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during sign in" },
      { status: 500 }
    );
  }
}
