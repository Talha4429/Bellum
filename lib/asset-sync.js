import fs from "fs";
import path from "path";

let assetsSynced = false;

export function ensureAssetsSynced() {
  if (assetsSynced) return;

  try {
    const rootDir = process.cwd();
    const publicDir = path.join(rootDir, "public", "images");

    const subDirs = ["hero", "products", "portfolio", "story", "misc", "team", "uploads", "Bedroom", "Dining", "Gifting", "Living"];
    for (const dir of subDirs) {
      const target = path.join(publicDir, dir);
      if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
      }
    }

    // Remove collections directory from public/images
    const collectionsDir = path.join(publicDir, "collections");
    if (fs.existsSync(collectionsDir)) {
      try {
        fs.rmSync(collectionsDir, { recursive: true, force: true });
      } catch (e) {}
    }

    // Candidate search directories where hero image might be located
    const candidateDirs = [
      path.join(rootDir, "public", "images", "hero"),
      path.join(rootDir, "public", "images"),
      path.join(rootDir, "images", "hero"),
      path.join(rootDir, "images"),
      rootDir,
    ];

    function findCandidateFile(patterns) {
      for (const dir of candidateDirs) {
        if (!fs.existsSync(dir)) continue;
        try {
          const files = fs.readdirSync(dir);
          for (const pattern of patterns) {
            for (const file of files) {
              if (file.toLowerCase() === pattern.toLowerCase()) {
                const fullPath = path.join(dir, file);
                const stat = fs.statSync(fullPath);
                if (stat.isFile() && stat.size > 0) {
                  return fullPath;
                }
              }
            }
          }
        } catch (e) {}
      }
      return null;
    }

    // 1. Sync & normalize Hero Image: home-web.png
    const heroDir = path.join(publicDir, "hero");
    const heroStandard = path.join(heroDir, "home-web.png");
    if (!fs.existsSync(heroStandard)) {
      const heroFound = findCandidateFile([
        "home-web.png", "home - web.png", "web.png", "hero.png", "hero.jpg", "home-web.jpg"
      ]);
      if (heroFound && heroFound !== heroStandard) {
        try { fs.copyFileSync(heroFound, heroStandard); } catch (e) {}
      }
    }

    // 2. Remove obsolete folders and temporary/scratch files
    const obsoletePaths = [
      path.join(publicDir, "catalog"),
      path.join(rootDir, "sample pictures"),
      path.join(rootDir, "scratch"),
      path.join(rootDir, "test-api.js"),
      path.join(rootDir, "app", "fonts"),
      path.join(rootDir, "images", "collections")
    ];

    for (const itemPath of obsoletePaths) {
      if (fs.existsSync(itemPath)) {
        try {
          const stat = fs.statSync(itemPath);
          if (stat.isDirectory()) {
            fs.rmSync(itemPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(itemPath);
          }
        } catch (e) {}
      }
    }

    // Clean obsolete hero images
    const obsoleteHeroFiles = [
      "hero-grand-salon.jpg",
      "hero-minimalist-lounge.jpg",
      "hero-marble-bench.jpg",
      "hero-lacquer-salon.jpg"
    ];
    for (const file of obsoleteHeroFiles) {
      const p = path.join(heroDir, file);
      if (fs.existsSync(p)) {
        try { fs.unlinkSync(p); } catch (e) {}
      }
    }

    assetsSynced = true;
  } catch (err) {
    console.error("Asset sync error:", err);
  }
}
