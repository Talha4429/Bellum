import { NextResponse } from "next/server";
import { getProductsFromDb, insertProductToDb, initDatabase } from "@/lib/db";
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

export async function POST(request) {
  try {
    ensureAssetsSynced();
    await initDatabase();
    const body = await request.json();
    if (!body.name || !body.category || !body.price) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, category, price)" },
        { status: 400 }
      );
    }
    const created = await insertProductToDb(body);
    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
