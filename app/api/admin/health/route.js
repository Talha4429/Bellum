import { NextResponse } from "next/server";
import { testDbConnection } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await testDbConnection();
  return NextResponse.json(result, { status: result.connected ? 200 : 503 });
}
