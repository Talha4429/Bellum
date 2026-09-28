import fs from "fs";
import path from "path";

let assetsSynced = false;

export function ensureAssetsSynced() {
  if (assetsSynced) return;

  try {
    const rootDir = process.cwd();
    const sampleDir = path.join(rootDir, "sample pictures");
    const publicDir = path.join(rootDir, "public", "images");

    const subDirs = ["hero", "products", "portfolio", "collections", "story", "catalog", "misc", "team"];
    for (const dir of subDirs) {
      const target = path.join(publicDir, dir);
      if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
      }
    }

    // Copy team placeholder images from user uploaded directory if present
    const brainDir = "C:\\Users\\talha\\.gemini\\antigravity-ide\\brain\\bb84bb41-9ec3-494d-bbbe-b9d55b9bbe64\\.user_uploaded";
    const maleSrc = path.join(brainDir, "media_1787857109684.jpg");
    const femaleSrc = path.join(brainDir, "media_1787857122345.jpg");
    const maleDest = path.join(publicDir, "team", "placeholder-male.jpg");
    const femaleDest = path.join(publicDir, "team", "placeholder-female.jpg");

    if (fs.existsSync(maleSrc)) {
      try { fs.copyFileSync(maleSrc, maleDest); } catch (e) {}
    }
    if (fs.existsSync(femaleSrc)) {
      try { fs.copyFileSync(femaleSrc, femaleDest); } catch (e) {}
    }

    if (!fs.existsSync(sampleDir)) {
      assetsSynced = true;
      return;
    }

    const files = fs.readdirSync(sampleDir);

    // 1. Copy all original sample files to /public/images/catalog/ with safe names for admin picker
    files.forEach((file, index) => {
      const src = path.join(sampleDir, file);
      const safeName = `sample-${String(index + 1).padStart(2, "0")}.jpg`;
      const dest = path.join(publicDir, "catalog", safeName);
      try {
        if (!fs.existsSync(dest) || fs.statSync(dest).size === 0) {
          fs.copyFileSync(src, dest);
        }
      } catch (e) {
        // ignore individual copy error
      }
    });

    // Cleanup obsolete hero images so only home - web.png is used
    const obsoleteHeroFiles = [
      "hero-grand-salon.jpg",
      "hero-minimalist-lounge.jpg",
      "hero-marble-bench.jpg",
      "hero-lacquer-salon.jpg"
    ];
    for (const file of obsoleteHeroFiles) {
      const p = path.join(publicDir, "hero", file);
      if (fs.existsSync(p)) {
        try { fs.unlinkSync(p); } catch (e) {}
      }
    }

    // 2. Semantic Mappings for high-impact studio visuals
    const semanticMappings = [
      { src: "WhatsApp Image 2026-08-27 at 6.31.03 PM.jpeg", dest: "misc/hero-architecture.jpg" },

      // Product images
      { src: "WhatsApp Image 2026-08-27 at 6.39.18 PM.jpeg", dest: "products/cane-leather-armchair.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.27.28 PM.jpeg", dest: "products/brass-leather-table-lamp.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.27.30 PM.jpeg", dest: "products/ceramic-shade-lamp.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.29.32 PM (2).jpeg", dest: "products/circular-lacquer-coffee-table.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.39.49 PM.jpeg", dest: "products/fluted-marble-bench-table.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.31.19 PM.jpeg", dest: "products/bolster-daybed-bench.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.34.47 PM.jpeg", dest: "products/cabriole-lacquer-console.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.37.25 PM.jpeg", dest: "products/tailored-linen-sofa.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.31.03 PM.jpeg", dest: "products/curved-velvet-bergere-chairs.jpg" },

      // Portfolio images
      { src: "WhatsApp Image 2026-08-27 at 6.31.03 PM.jpeg", dest: "portfolio/gulberg-penthouse-salon.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.39.18 PM.jpeg", dest: "portfolio/gulberg-penthouse-study.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.34.47 PM.jpeg", dest: "portfolio/gulberg-penthouse-entry.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.37.25 PM.jpeg", dest: "portfolio/dha-contemporary-residence.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.31.19 PM.jpeg", dest: "portfolio/dha-calligraphy-gallery.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.39.49 PM.jpeg", dest: "portfolio/dha-marble-pavilion.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.29.32 PM (2).jpeg", dest: "portfolio/hampstead-cover.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.39.18 PM.jpeg", dest: "portfolio/hampstead-1.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.37.25 PM.jpeg", dest: "portfolio/hampstead-2.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.31.19 PM.jpeg", dest: "portfolio/hampstead-3.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.34.47 PM.jpeg", dest: "portfolio/hampstead-4.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.39.49 PM.jpeg", dest: "portfolio/hampstead-5.jpg" },

      // Collections & Story
      { src: "WhatsApp Image 2026-08-27 at 6.37.25 PM.jpeg", dest: "collections/living-hero.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.29.32 PM (2).jpeg", dest: "collections/dining-hero.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.39.18 PM.jpeg", dest: "collections/bedroom-hero.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.27.28 PM.jpeg", dest: "collections/gifting-hero.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.31.03 PM.jpeg", dest: "story/studio-overview.jpg" },
      { src: "WhatsApp Image 2026-08-27 at 6.34.47 PM.jpeg", dest: "story/atelier-craft.jpg" },
    ];

    for (const mapping of semanticMappings) {
      const srcPath = path.join(sampleDir, mapping.src);
      const destPath = path.join(publicDir, mapping.dest);
      if (fs.existsSync(srcPath)) {
        try {
          fs.copyFileSync(srcPath, destPath);
        } catch (e) {
          // ignore
        }
      }
    }

    assetsSynced = true;
  } catch (err) {
    console.error("Asset sync error:", err);
  }
}
