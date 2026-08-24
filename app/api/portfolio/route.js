import { NextResponse } from "next/server";
import { getPortfolioFromDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const portfolio = await getPortfolioFromDb();
    return NextResponse.json({ success: true, portfolio });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
