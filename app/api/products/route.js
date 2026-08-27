import { NextResponse } from "next/server";
import { getProductsFromDb, initDatabase } from "@/lib/db";
import { ensureAssetsSynced } from "@/lib/asset-sync";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    ensureAssetsSynced();
    await initDatabase();
    const products = await getProductsFromDb();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
