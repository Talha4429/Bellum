import { NextResponse } from "next/server";
import { getPortfolioFromDb, initDatabase } from "@/lib/db";
import { ensureAssetsSynced } from "@/lib/asset-sync";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    ensureAssetsSynced();
    await initDatabase();
    const portfolio = await getPortfolioFromDb();
    return NextResponse.json({ success: true, portfolio });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
