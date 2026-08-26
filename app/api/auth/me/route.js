import { NextResponse } from "next/server";
import { getClientSessionFromRequest } from "@/lib/auth";

export async function GET(request) {
  try {
    const session = getClientSessionFromRequest(request);

    if (!session || !session.email) {
      return NextResponse.json({
        authenticated: false,
        user: null,
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.id,
        name: session.name,
        email: session.email,
        phone: session.phone || "",
      },
    });
  } catch (error) {
    return NextResponse.json({
      authenticated: false,
      user: null,
    });
  }
}
