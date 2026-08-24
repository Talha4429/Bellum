import { NextResponse } from "next/server";
import { getPortfolioFromDb, insertProjectToDb } from "@/lib/db";

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

export async function POST(request) {
  try {
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
