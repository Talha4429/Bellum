import { NextResponse } from "next/server";
import { getPortfolioFromDb, insertProjectToDb, initDatabase } from "@/lib/db";
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

export async function POST(request) {
  try {
    ensureAssetsSynced();
    await initDatabase();
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json(
        { success: false, error: "Missing project title" },
        { status: 400 }
      );
    }
    const created = await insertProjectToDb(body);
    return NextResponse.json({ success: true, project: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
