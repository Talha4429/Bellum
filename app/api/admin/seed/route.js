import { NextResponse } from "next/server";
import { seedStudioCatalog, getAdminStatsFromDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    let force = false;
    try {
      const body = await request.json();
      force = Boolean(body?.force);
    } catch {
      // body empty is fine
    }

    const result = await seedStudioCatalog(force);
    const stats = await getAdminStatsFromDb();

    return NextResponse.json({
      success: true,
      message: "Studio catalog successfully seeded into PostgreSQL database.",
      result,
      stats,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
