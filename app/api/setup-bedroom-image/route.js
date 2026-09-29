import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const routeDir = path.join(process.cwd(), "app", "api", "setup-bedroom-image");
    fs.rmSync(routeDir, { recursive: true, force: true });
    return NextResponse.json({ success: true, message: "Cleaned up" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
