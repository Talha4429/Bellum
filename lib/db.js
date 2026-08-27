// Database is the sole source of truth. No JSON fallback data.
import { Pool } from "pg";
import { ensureAssetsSynced } from "@/lib/asset-sync";

let pool = null;
let dbInitialized = false;

// Dynamically create or retrieve pg Pool
async function getPool() {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  const hasPgVars = process.env.PGHOST && process.env.PGUSER && process.env.PGDATABASE;

  if (!connectionString && !hasPgVars) {
    throw new Error("DATABASE_URL or PG* environment variables are missing");
  }

  try {
    const isRemote =
      connectionString ? (
        connectionString.includes(".neon.tech") ||
        connectionString.includes(".supabase.co") ||
        connectionString.includes(".railway.app") ||
        connectionString.includes("sslmode=require")
      ) : false;

    const poolConfig = {
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    };

    if (connectionString) {
      poolConfig.connectionString = connectionString;
      if (isRemote) poolConfig.ssl = { rejectUnauthorized: false };
    } else {
      poolConfig.host = process.env.PGHOST;
      poolConfig.port = process.env.PGPORT || 5432;
      poolConfig.user = process.env.PGUSER;
      poolConfig.password = process.env.PGPASSWORD;
      poolConfig.database = process.env.PGDATABASE;
    }

    pool = new Pool(poolConfig);
    return pool;
  } catch (error) {
    throw new Error("PostgreSQL pg driver initialization error: " + error.message);
  }
}

// Execute query with fallback handling
export async function query(text, params = []) {
  const p = await getPool();
  if (!p) {
    throw new Error("PostgreSQL connection not configured. Set DATABASE_URL in .env.local");
  }
  return await p.query(text, params);
}

// Rich Initial Studio Products Catalog using authentic sample photographs
export const initialProductsData = [
  {
    slug: "cane-saddle-leather-armchair",
    name: "The Bauhaus Cane & Saddle Leather Armchair",
    category: "Seating",
    sku: "BEL-SEAT-001",
    price: 185000,
    description: "Hand-woven cane side panels paired with supple full-grain saddle leather and natural linen cushions on an espresso-stained solid teak framework. Engineered for refined residential salons and study suites.",
    finish: "Woven Cane & Cognac Saddle Leather",
    image: "/images/products/cane-leather-armchair.jpg",
    images: [
      "/images/products/cane-leather-armchair.jpg",
      "/images/portfolio/gulberg-penthouse-study.jpg",
      "/images/portfolio/hampstead-1.jpg"
    ],
    featured: true,
    status: "Active"
  },
  {
    slug: "monolithic-fluted-marble-bench",
    name: "The Monolithic Fluted Marble Table & Bench",
    category: "Tables",
    sku: "BEL-TAB-002",
    price: 340000,
    description: "Multi-tiered architectural centerpiece sculpted from honed white Carrara marble with fluted linear profiles and solid brushed brass mechanical fastenings. Functions effortlessly as a low table or gallery bench.",
    finish: "Honed Italian Carrara Marble & Brushed Brass",
    image: "/images/products/fluted-marble-bench-table.jpg",
    images: [
      "/images/products/fluted-marble-bench-table.jpg",
      "/images/portfolio/dha-marble-pavilion.jpg",
      "/images/portfolio/hampstead-5.jpg"
    ],
    featured: true,
    status: "Active"
  },
  {
    slug: "duo-tone-lacquer-brass-table",
    name: "The Duo-Tone Lacquer & Gilded Brass Salon Table",
    category: "Tables",
    sku: "BEL-TAB-003",
    price: 265000,
    description: "Reflective dark chocolate piano lacquer circular tabletop intersecting with a brushed gold geometric crescent, supported by a monolithic cylinder plinth.",
    finish: "High-Gloss Lacquer & Gilded Brass",
    image: "/images/products/circular-lacquer-coffee-table.jpg",
    images: [
      "/images/products/circular-lacquer-coffee-table.jpg",
      "/images/portfolio/hampstead-cover.jpg"
    ],
    featured: true,
    status: "Active"
  },
  {
    slug: "antiquarian-cabriole-console",
    name: "The Antiquarian Cabriole Console Table",
    category: "Storage",
    sku: "BEL-STOR-004",
    price: 215000,
    description: "Masterfully hand-carved cabriole legs with deep gloss obsidian lacquer and a sculpted apron, designed to anchor formal gallery foyers and entryway corridors.",
    finish: "Obsidian Piano Gloss Lacquer",
    image: "/images/products/cabriole-lacquer-console.jpg",
    images: [
      "/images/products/cabriole-lacquer-console.jpg",
      "/images/portfolio/gulberg-penthouse-entry.jpg"
    ],
    featured: true,
    status: "Active"
  },
  {
    slug: "atelier-bolster-daybed-bench",
    name: "The Atelier Bolster Daybed Bench",
    category: "Seating",
    sku: "BEL-SEAT-005",
    price: 195000,
    description: "Minimalist brushed bronze structural sled base carrying an upholstered boucle seat cushion flanked by dual architectural velvet bolster rolls.",
    finish: "Brushed Bronze & Natural Boucle with Black Velvet",
    image: "/images/products/bolster-daybed-bench.jpg",
    images: [
      "/images/products/bolster-daybed-bench.jpg",
      "/images/portfolio/dha-calligraphy-gallery.jpg"
    ],
    featured: true,
    status: "Active"
  },
  {
    slug: "columnar-brass-leather-lamp",
    name: "The Columnar Brass & Leather Table Lamp",
    category: "Lighting",
    sku: "BEL-LGT-006",
    price: 78000,
    description: "Hand-stitched leather wrapped stem anchored by a solid spun brass plinth and capped with a flared architectural linen cone shade with pull chain.",
    finish: "Brushed Brass & Black Calfskin Leather",
    image: "/images/products/brass-leather-table-lamp.jpg",
    images: [
      "/images/products/brass-leather-table-lamp.jpg",
      "/images/portfolio/gulberg-penthouse-study.jpg"
    ],
    featured: true,
    status: "Active"
  },
  {
    slug: "glazed-vessel-ceramic-lamp",
    name: "The Glazed Vessel Ceramic Lamp",
    category: "Lighting",
    sku: "BEL-LGT-007",
    price: 85000,
    description: "Stoneware vessel body finished in high-fire porcelain white glaze with an oversized cylindrical linen shade, providing warm diffuse ambient lighting.",
    finish: "Porcelain White Glaze & Belgian Linen",
    image: "/images/products/ceramic-shade-lamp.jpg",
    images: [
      "/images/products/ceramic-shade-lamp.jpg"
    ],
    featured: false,
    status: "Active"
  },
  {
    slug: "bergere-velvet-accent-armchairs",
    name: "The Bergère Velvet Accent Armchairs (Pair)",
    category: "Seating",
    sku: "BEL-SEAT-008",
    price: 290000,
    description: "A symmetrical pair of fluted back armchairs in pistachio silk velvet with ebonized carved hardwood contours and neutral seat cushions.",
    finish: "Ebonized Hardwood & Pistachio Silk Velvet",
    image: "/images/products/curved-velvet-bergere-chairs.jpg",
    images: [
      "/images/products/curved-velvet-bergere-chairs.jpg",
      "/images/portfolio/gulberg-penthouse-salon.jpg"
    ],
    featured: false,
    status: "Active"
  },
  {
    slug: "horizon-tailored-linen-leather-sofa",
    name: "The Horizon Tailored Linen & Leather Sofa",
    category: "Seating",
    sku: "BEL-SEAT-009",
    price: 420000,
    description: "Deep architectural lounge sofa upholstered in natural ivory heavy-rub linen with saddle leather contrast cushions and solid walnut turned feet.",
    finish: "Belgian Ivory Linen & Cognac Leather",
    image: "/images/products/tailored-linen-sofa.jpg",
    images: [
      "/images/products/tailored-linen-sofa.jpg",
      "/images/portfolio/dha-contemporary-residence.jpg"
    ],
    featured: true,
    status: "Active"
  }
];

// Rich Initial Studio Portfolio Projects using authentic photographs
export const initialPortfolioData = [
  {
    slug: "gulberg-penthouse-salon",
    title: "The Gulberg Penthouse & Grand Salon",
    location: "Gulberg, Lahore",
    year: 2024,
    category: "Residential",
    tags: ["RESIDENTIAL", "INTERIOR ARCHITECTURE", "BESPOKE JOINERY"],
    summary: "A palatial multi-story residence in Gulberg featuring custom classical wall paneling, tiered crystal lighting, bespoke ebonized armchairs, and transitional lacquer casegoods.",
    coverImage: "/images/portfolio/gulberg-penthouse-salon.jpg",
    images: [
      "/images/portfolio/gulberg-penthouse-salon.jpg",
      "/images/portfolio/gulberg-penthouse-study.jpg",
      "/images/portfolio/gulberg-penthouse-entry.jpg"
    ],
    featured: true,
    status: "Published"
  },
  {
    slug: "dha-phase-v-residence",
    title: "DHA Phase V Modern Minimal Residence",
    location: "DHA Phase V, Lahore",
    year: 2024,
    category: "Residential",
    tags: ["RESIDENTIAL", "ARCHITECTURE", "FURNITURE DESIGN"],
    summary: "An expansive contemporary family sanctuary balancing monolithic stone elements, fluted marble installations, and warm cognac leather furnishings.",
    coverImage: "/images/portfolio/dha-contemporary-residence.jpg",
    images: [
      "/images/portfolio/dha-contemporary-residence.jpg",
      "/images/portfolio/dha-marble-pavilion.jpg",
      "/images/portfolio/dha-calligraphy-gallery.jpg"
    ],
    featured: true,
    status: "Published"
  },
  {
    slug: "the-hampstead-residence",
    title: "The Hampstead Heritage Villa",
    location: "London, UK",
    year: 2023,
    category: "Residential",
    tags: ["RESIDENTIAL", "INTERIOR"],
    summary: "A complete heritage restoration integrating bespoke lacquer tables, hand-woven cane details, and natural light wells across expansive living volumes.",
    coverImage: "/images/portfolio/hampstead-cover.jpg",
    images: [
      "/images/portfolio/hampstead-cover.jpg",
      "/images/portfolio/hampstead-1.jpg",
      "/images/portfolio/hampstead-2.jpg",
      "/images/portfolio/hampstead-3.jpg",
      "/images/portfolio/hampstead-4.jpg",
      "/images/portfolio/hampstead-5.jpg"
    ],
    featured: true,
    status: "Published"
  },
  {
    slug: "studio-alpha-workspace",
    title: "Studio Alpha Architectural Atelier",
    location: "Dubai, UAE",
    year: 2024,
    category: "Commercial",
    tags: ["COMMERCIAL", "INTERIOR"],
    summary: "A sculptural design studio and gallery showcasing bespoke daybeds, monumental calligraphy backdrops, and raw bronze joinery.",
    coverImage: "/images/portfolio/dha-calligraphy-gallery.jpg",
    images: [
      "/images/portfolio/dha-calligraphy-gallery.jpg",
      "/images/portfolio/dha-marble-pavilion.jpg"
    ],
    featured: false,
    status: "Published"
  }
];

// Auto-initialize schema & seed initial catalog
export async function initDatabase() {
  ensureAssetsSynced();

  if (dbInitialized) return true;

  try {
    const p = await getPool();
    if (!p) return false;

    // Create products table
    await p.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        sku VARCHAR(100),
        price NUMERIC(10, 2) NOT NULL DEFAULT 0,
        description TEXT,
        finish VARCHAR(255),
        image TEXT,
        images JSONB DEFAULT '[]',
        featured BOOLEAN DEFAULT false,
        status VARCHAR(50) DEFAULT 'Active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      ALTER TABLE products ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]';
    `);

    // Create portfolio table
    await p.query(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        year INT,
        category VARCHAR(100),
        tags JSONB DEFAULT '[]',
        summary TEXT,
        cover_image TEXT,
        images JSONB DEFAULT '[]',
        featured BOOLEAN DEFAULT false,
        status VARCHAR(50) DEFAULT 'Published',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create inquiries / orders table
    await p.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(100) UNIQUE NOT NULL,
        client_name VARCHAR(255),
        email VARCHAR(255),
        subtotal NUMERIC(10, 2) DEFAULT 0,
        tax NUMERIC(10, 2) DEFAULT 0,
        shipping NUMERIC(10, 2) DEFAULT 0,
        total NUMERIC(10, 2) DEFAULT 0,
        items JSONB DEFAULT '[]',
        status VARCHAR(50) DEFAULT 'Processing',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create users table
    await p.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(100),
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Upsert all initial rich studio products into PostgreSQL
    for (const prod of initialProductsData) {
      await p.query(
        `INSERT INTO products (slug, name, category, sku, price, description, finish, image, images, featured, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (slug) DO UPDATE SET
           name = EXCLUDED.name,
           category = EXCLUDED.category,
           sku = EXCLUDED.sku,
           price = EXCLUDED.price,
           description = EXCLUDED.description,
           finish = EXCLUDED.finish,
           image = EXCLUDED.image,
           images = EXCLUDED.images,
           featured = EXCLUDED.featured,
           status = EXCLUDED.status;`,
        [
          prod.slug,
          prod.name,
          prod.category,
          prod.sku,
          prod.price,
          prod.description,
          prod.finish,
          prod.image,
          JSON.stringify(prod.images),
          prod.featured,
          prod.status
        ]
      );
    }

    // Upsert all initial rich portfolio projects into PostgreSQL
    for (const item of initialPortfolioData) {
      await p.query(
        `INSERT INTO portfolio (slug, title, location, year, category, tags, summary, cover_image, images, featured, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           location = EXCLUDED.location,
           year = EXCLUDED.year,
           category = EXCLUDED.category,
           tags = EXCLUDED.tags,
           summary = EXCLUDED.summary,
           cover_image = EXCLUDED.cover_image,
           images = EXCLUDED.images,
           featured = EXCLUDED.featured,
           status = EXCLUDED.status;`,
        [
          item.slug,
          item.title,
          item.location,
          item.year,
          item.category,
          JSON.stringify(item.tags),
          item.summary,
          item.coverImage,
          JSON.stringify(item.images),
          item.featured,
          item.status
        ]
      );
    }

    // Clean up older legacy dummy products if they have old broken dummy image paths
    await p.query(`
      DELETE FROM products 
      WHERE slug NOT IN (${initialProductsData.map((_, i) => `$${i + 1}`).join(", ")})
      AND (image LIKE '%aurelia%' OR image LIKE '%monolith%' OR image LIKE '%solis%' OR image LIKE '%arc%');
    `, initialProductsData.map((p) => p.slug));

    // Clean up older legacy portfolio if they have old dummy paths
    await p.query(`
      DELETE FROM portfolio 
      WHERE slug NOT IN (${initialPortfolioData.map((_, i) => `$${i + 1}`).join(", ")})
      AND (slug = 'the-courtyard-residence' OR slug = 'villa-nova-concept');
    `, initialPortfolioData.map((p) => p.slug));

    dbInitialized = true;
    return true;
  } catch (error) {
    console.error("Database initialization error:", error.message);
    return false;
  }
}

// Health check and connection test
export async function testDbConnection() {
  try {
    const p = await getPool();
    if (!p) {
      return { connected: false, error: "DATABASE_URL not configured" };
    }
    const res = await p.query("SELECT NOW() as now, version()");
    return {
      connected: true,
      timestamp: res.rows[0].now,
      version: res.rows[0].version,
    };
  } catch (error) {
    return { connected: false, error: error.message };
  }
}

// Products CRUD
export async function getProductsFromDb() {
  try {
    const p = await getPool();
    if (!p) return [];

    await initDatabase();
    const { rows } = await p.query("SELECT * FROM products ORDER BY id ASC");

    return rows.map((r) => {
      let parsedImages = [];
      if (typeof r.images === "string") {
        try {
          parsedImages = JSON.parse(r.images);
        } catch {
          parsedImages = [];
        }
      } else if (Array.isArray(r.images)) {
        parsedImages = r.images;
      }

      if ((!parsedImages || parsedImages.length === 0) && r.image) {
        parsedImages = [r.image];
      }

      return {
        slug: r.slug,
        name: r.name,
        category: r.category,
        sku: r.sku,
        price: Number(r.price),
        description: r.description,
        finish: r.finish,
        image: r.image || (parsedImages[0] || ""),
        images: parsedImages || [],
        featured: r.featured,
        status: r.status,
      };
    });
  } catch (err) {
    console.warn("Error loading products from DB:", err.message);
    return [];
  }
}

export async function insertProductToDb(prod) {
  const p = await getPool();
  if (!p) throw new Error("No database connection available");

  await initDatabase();
  const baseSlug =
    prod.slug ||
    prod.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

  let imagesArray = [];
  if (Array.isArray(prod.images)) {
    imagesArray = prod.images.filter(Boolean);
  } else if (typeof prod.images === "string") {
    try {
      imagesArray = JSON.parse(prod.images);
    } catch {
      imagesArray = prod.images.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  const primaryImage = prod.image || imagesArray[0] || "/images/products/cane-leather-armchair.jpg";
  if (imagesArray.length === 0 && primaryImage) {
    imagesArray = [primaryImage];
  }

  const { rows } = await p.query(
    `INSERT INTO products (slug, name, category, sku, price, description, finish, image, images, featured, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING *;`,
    [
      slug,
      prod.name,
      prod.category,
      prod.sku || `BEL-${prod.category?.slice(0, 4).toUpperCase() || "PROD"}-${Date.now().toString().slice(-4)}`,
      parseFloat(prod.price) || 0,
      prod.description || "",
      prod.finish || "",
      primaryImage,
      JSON.stringify(imagesArray),
      Boolean(prod.featured),
      prod.status || "Active",
    ]
  );
  return rows[0];
}

export async function updateProductInDb(slug, prod) {
  const p = await getPool();
  if (!p) throw new Error("No database connection available");

  await initDatabase();

  let imagesArray = undefined;
  if (prod.images !== undefined) {
    if (Array.isArray(prod.images)) {
      imagesArray = prod.images.filter(Boolean);
    } else if (typeof prod.images === "string") {
      try {
        imagesArray = JSON.parse(prod.images);
      } catch {
        imagesArray = prod.images.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }
  }

  const primaryImage = prod.image || (imagesArray && imagesArray[0]) || undefined;

  const { rows } = await p.query(
    `UPDATE products 
     SET name = COALESCE($1, name),
         category = COALESCE($2, category),
         price = COALESCE($3, price),
         description = COALESCE($4, description),
         finish = COALESCE($5, finish),
         featured = COALESCE($6, featured),
         status = COALESCE($7, status),
         image = COALESCE($8, image),
         images = COALESCE($9, images),
         updated_at = CURRENT_TIMESTAMP
     WHERE slug = $10
     RETURNING *;`,
    [
      prod.name,
      prod.category,
      prod.price !== undefined ? parseFloat(prod.price) : null,
      prod.description,
      prod.finish,
      prod.featured,
      prod.status,
      primaryImage,
      imagesArray !== undefined ? JSON.stringify(imagesArray) : null,
      slug,
    ]
  );
  return rows[0];
}

export async function deleteProductFromDb(slug) {
  const p = await getPool();
  if (!p) throw new Error("No database connection available");

  await initDatabase();
  const { rows } = await p.query(
    "DELETE FROM products WHERE slug = $1 RETURNING *;",
    [slug]
  );
  return rows[0];
}

// Portfolio CRUD
export async function getPortfolioFromDb() {
  try {
    const p = await getPool();
    if (!p) return [];

    await initDatabase();
    const { rows } = await p.query("SELECT * FROM portfolio ORDER BY year DESC, id ASC");

    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      location: r.location,
      year: r.year,
      category: r.category,
      tags: typeof r.tags === "string" ? JSON.parse(r.tags) : r.tags || [],
      summary: r.summary,
      coverImage: r.cover_image,
      images: typeof r.images === "string" ? JSON.parse(r.images) : r.images || [],
      featured: r.featured,
      status: r.status,
    }));
  } catch (err) {
    console.warn("Error loading portfolio from DB:", err.message);
    return [];
  }
}

export async function insertProjectToDb(proj) {
  const p = await getPool();
  if (!p) throw new Error("No database connection available");

  await initDatabase();
  const baseSlug =
    proj.slug ||
    proj.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

  let imagesArray = [];
  if (Array.isArray(proj.images)) {
    imagesArray = proj.images.filter(Boolean);
  } else if (typeof proj.images === "string") {
    try {
      imagesArray = JSON.parse(proj.images);
    } catch {
      imagesArray = proj.images.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  const coverImage = proj.coverImage || imagesArray[0] || "/images/portfolio/gulberg-penthouse-salon.jpg";
  if (imagesArray.length === 0 && coverImage) {
    imagesArray = [coverImage];
  }

  const { rows } = await p.query(
    `INSERT INTO portfolio (slug, title, location, year, category, tags, summary, cover_image, images, featured, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING *;`,
    [
      slug,
      proj.title,
      proj.location || "Lahore, Pakistan",
      parseInt(proj.year, 10) || new Date().getFullYear(),
      proj.category || "Residential",
      JSON.stringify(proj.tags || ["RESIDENTIAL", "ARCHITECTURE"]),
      proj.summary || "",
      coverImage,
      JSON.stringify(imagesArray),
      Boolean(proj.featured),
      proj.status || "Published",
    ]
  );
  return rows[0];
}

export async function updateProjectInDb(slug, proj) {
  const p = await getPool();
  if (!p) throw new Error("No database connection available");

  await initDatabase();

  let imagesArray = undefined;
  if (proj.images !== undefined) {
    if (Array.isArray(proj.images)) {
      imagesArray = proj.images.filter(Boolean);
    } else if (typeof proj.images === "string") {
      try {
        imagesArray = JSON.parse(proj.images);
      } catch {
        imagesArray = proj.images.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }
  }

  const coverImage = proj.coverImage || (imagesArray && imagesArray[0]) || undefined;

  const { rows } = await p.query(
    `UPDATE portfolio 
     SET title = COALESCE($1, title),
         location = COALESCE($2, location),
         year = COALESCE($3, year),
         category = COALESCE($4, category),
         tags = COALESCE($5, tags),
         summary = COALESCE($6, summary),
         cover_image = COALESCE($7, cover_image),
         images = COALESCE($8, images),
         featured = COALESCE($9, featured),
         status = COALESCE($10, status),
         updated_at = CURRENT_TIMESTAMP
     WHERE slug = $11
     RETURNING *;`,
    [
      proj.title,
      proj.location,
      proj.year ? parseInt(proj.year, 10) : null,
      proj.category,
      proj.tags ? JSON.stringify(proj.tags) : null,
      proj.summary,
      coverImage,
      imagesArray !== undefined ? JSON.stringify(imagesArray) : null,
      proj.featured,
      proj.status,
      slug,
    ]
  );
  return rows[0];
}

export async function deleteProjectFromDb(slug) {
  const p = await getPool();
  if (!p) throw new Error("No database connection available");

  await initDatabase();
  const { rows } = await p.query(
    "DELETE FROM portfolio WHERE slug = $1 RETURNING *;",
    [slug]
  );
  return rows[0];
}

// Reset / Seed default studio catalog helper
export async function seedStudioCatalog(force = false) {
  const p = await getPool();
  if (!p) throw new Error("No database connection available");

  await initDatabase();

  if (force) {
    await p.query("DELETE FROM products;");
    await p.query("DELETE FROM portfolio;");
  }

  for (const prod of initialProductsData) {
    await p.query(
      `INSERT INTO products (slug, name, category, sku, price, description, finish, image, images, featured, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (slug) DO UPDATE SET
         name = EXCLUDED.name,
         category = EXCLUDED.category,
         price = EXCLUDED.price,
         description = EXCLUDED.description,
         finish = EXCLUDED.finish,
         image = EXCLUDED.image,
         images = EXCLUDED.images,
         featured = EXCLUDED.featured,
         status = EXCLUDED.status;`,
      [
        prod.slug,
        prod.name,
        prod.category,
        prod.sku,
        prod.price,
        prod.description,
        prod.finish,
        prod.image,
        JSON.stringify(prod.images),
        prod.featured,
        prod.status
      ]
    );
  }

  for (const item of initialPortfolioData) {
    await p.query(
      `INSERT INTO portfolio (slug, title, location, year, category, tags, summary, cover_image, images, featured, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (slug) DO UPDATE SET
         title = EXCLUDED.title,
         location = EXCLUDED.location,
         year = EXCLUDED.year,
         category = EXCLUDED.category,
         tags = EXCLUDED.tags,
         summary = EXCLUDED.summary,
         cover_image = EXCLUDED.cover_image,
         images = EXCLUDED.images,
         featured = EXCLUDED.featured,
         status = EXCLUDED.status;`,
      [
        item.slug,
        item.title,
        item.location,
        item.year,
        item.category,
        JSON.stringify(item.tags),
        item.summary,
        item.coverImage,
        JSON.stringify(item.images),
        item.featured,
        item.status
      ]
    );
  }

  return { success: true, seededProducts: initialProductsData.length, seededProjects: initialPortfolioData.length };
}

// Admin Aggregated Statistics
export async function getAdminStatsFromDb() {
  try {
    const p = await getPool();
    if (!p) {
      return {
        connected: false,
        totalProducts: 0,
        totalProjects: 0,
        inquiriesCount: 0,
        totalRevenue: 0,
      };
    }

    await initDatabase();
    const productCountRes = await p.query("SELECT COUNT(*) FROM products");
    const projectCountRes = await p.query("SELECT COUNT(*) FROM portfolio");
    const orderStatsRes = await p.query(
      "SELECT COUNT(*) as count, COALESCE(SUM(total), 0) as total FROM orders"
    );

    const totalProducts = parseInt(productCountRes.rows[0].count, 10);
    const totalProjects = parseInt(projectCountRes.rows[0].count, 10);
    const ordersCount = parseInt(orderStatsRes.rows[0].count, 10);
    const totalRevenue = parseFloat(orderStatsRes.rows[0].total) || 0;

    return {
      connected: true,
      totalProducts,
      totalProjects,
      inquiriesCount: ordersCount,
      totalRevenue,
    };
  } catch (err) {
    return {
      connected: false,
      error: err.message,
      totalProducts: 0,
      totalProjects: 0,
      inquiriesCount: 0,
      totalRevenue: 0,
    };
  }
}

// User CRUD
export async function findUserByEmail(email) {
  try {
    const p = await getPool();
    if (!p) return null;
    await initDatabase();

    const { rows } = await p.query(
      "SELECT id, name, email, phone, password, created_at FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1",
      [email.trim()]
    );
    return rows[0] || null;
  } catch (err) {
    console.warn("Error finding user in DB:", err.message);
    return null;
  }
}

export async function createUser({ name, email, phone = "", password }) {
  const p = await getPool();
  if (!p) throw new Error("No database connection configured");
  await initDatabase();

  const { rows } = await p.query(
    `INSERT INTO users (name, email, phone, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, phone, created_at;`,
    [name.trim(), email.trim().toLowerCase(), phone.trim(), password]
  );
  return rows[0];
}

export async function getUserById(id) {
  try {
    const p = await getPool();
    if (!p) return null;
    await initDatabase();

    const { rows } = await p.query(
      "SELECT id, name, email, phone, created_at FROM users WHERE id = $1 LIMIT 1",
      [id]
    );
    return rows[0] || null;
  } catch (err) {
    console.warn("Error getting user by ID:", err.message);
    return null;
  }
}
