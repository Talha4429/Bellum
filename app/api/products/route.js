import { NextResponse } from "next/server";
import { getProductsFromDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await getProductsFromDb();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
