import { NextResponse } from "next/server";
import { updateProductInDb, deleteProductFromDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PUT(request, { params }) {
  try {
    const { slug } = params;
    const body = await request.json();
    const updated = await updateProductInDb(slug, body);
    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = params;
    const deleted = await deleteProductFromDb(slug);
    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
