import { NextResponse } from "next/server";
import { getProductsFromDb } from "@/lib/db";

export const dynamic = "force-dynamic";

import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const srcImg = "C:/Users/talha/.gemini/antigravity-ide/brain/8c73fc2f-997d-4838-882d-3a9993cb3af0/hero_bellum_architecture_1787590728632.jpg";
    const destDir = path.join(process.cwd(), "public", "images", "misc");
    const destImg = path.join(destDir, "hero-architecture.jpg");
    if (!fs.existsSync(destImg) && fs.existsSync(srcImg)) {
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(srcImg, destImg);
    }
  } catch (e) {
    // ignore copy errors
  }

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
