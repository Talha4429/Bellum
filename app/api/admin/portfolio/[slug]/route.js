import { NextResponse } from "next/server";
import { deleteProjectFromDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function DELETE(request, { params }) {
  try {
    const { slug } = params;
    const deleted = await deleteProjectFromDb(slug);
    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
