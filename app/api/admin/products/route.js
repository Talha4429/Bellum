import { NextResponse } from "next/server";
import { getProductsFromDb, insertProductToDb } from "@/lib/db";

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

export async function POST(request) {
  try {
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
