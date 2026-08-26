import { NextResponse } from "next/server";
import { buildClearClientCookieHeader } from "@/lib/auth";

export async function POST() {
  const cookieHeader = buildClearClientCookieHeader();
  return new Response(
    JSON.stringify({ success: true, message: "Logged out successfully" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookieHeader,
      },
    }
  );
}
