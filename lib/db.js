// Database is the sole source of truth. No JSON fallback data.
import { Pool } from "pg";

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
      // Use individual PG variables (automatically picked up by pg if left undefined here, 
      // but explicitly setting them guarantees clarity)
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

// Auto-initialize schema & seed initial catalog
export async function initDatabase() {
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

    // Seed initial portfolio into DB if empty
    const portfolioCountRes = await p.query("SELECT COUNT(*) FROM portfolio");
    if (parseInt(portfolioCountRes.rows[0].count, 10) === 0) {
      const initialPortfolio = [
        {
          slug: "the-courtyard-residence",
          title: "The Courtyard Residence",
          location: "Lahore, Pakistan",
          year: 2023,
          category: "Residential",
          tags: ["RESIDENTIAL", "ARCHITECTURE"],
          summary: "A bespoke residential project emphasizing natural light and spatial fluidity. The design integrates interior spaces seamlessly with central courtyard elements, focusing on raw materiality and clean, structural lines.",
          coverImage: "/images/portfolio/hampstead-cover.jpg",
          images: [
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
          title: "Studio Alpha Workspace",
          location: "Dubai, UAE",
          year: 2024,
          category: "Commercial",
          tags: ["COMMERCIAL", "INTERIOR"],
          summary: "An adaptive reuse project transforming an industrial volume into a high-end creative studio. The aesthetic relies on structural honesty, employing a rigid grid system and a minimal material palette.",
          coverImage: "/images/portfolio/hampstead-1.jpg",
          images: [
            "/images/portfolio/hampstead-1.jpg",
            "/images/portfolio/hampstead-2.jpg",
            "/images/portfolio/hampstead-3.jpg"
          ],
          featured: true,
          status: "Published"
        },
        {
          slug: "the-hampstead-residence",
          title: "The Hampstead Residence",
          location: "London, UK",
          year: 2024,
          category: "Residential",
          tags: ["RESIDENTIAL", "INTERIOR"],
          summary: "A full interior renovation balancing warmth and restraint across five living spaces with custom bespoke millwork.",
          coverImage: "/images/portfolio/hampstead-cover.jpg",
          images: [
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
          slug: "villa-nova-concept",
          title: "Villa Nova Concept",
          location: "Islamabad, Pakistan",
          year: 2024,
          category: "Residential",
          tags: ["CONCEPT", "ARCHITECTURE"],
          summary: "A cliffside minimalist pavilion concept exploring monolithic limestone volumes and panoramic framing.",
          coverImage: "/images/portfolio/hampstead-3.jpg",
          images: [
            "/images/portfolio/hampstead-3.jpg",
            "/images/portfolio/hampstead-4.jpg"
          ],
          featured: false,
          status: "Draft"
        }
      ];

      for (const item of initialPortfolio) {
        await p.query(
          `INSERT INTO portfolio (slug, title, location, year, category, tags, summary, cover_image, images, featured, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           ON CONFLICT (slug) DO NOTHING;`,
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
    }

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

  const primaryImage = prod.image || imagesArray[0] || "/images/products/chair.jpg";
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
      prod.sku || `SKU-${Date.now().toString().slice(-4)}`,
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
      proj.coverImage || "/images/portfolio/hampstead-cover.jpg",
      JSON.stringify(proj.images || []),
      Boolean(proj.featured),
      proj.status || "Published",
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
