import defaultProducts from "@/data/products.json";
import defaultPortfolio from "@/data/portfolio.json";

let pool = null;
let dbInitialized = false;

// Dynamically create or retrieve pg Pool
async function getPool() {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }

  try {
    const pkgName = "pg";
    const pgModule = await import(/* webpackIgnore: true */ pkgName);
    const Pool = pgModule.Pool || pgModule.default?.Pool || pgModule.default;
    const isRemote =
      connectionString.includes(".neon.tech") ||
      connectionString.includes(".supabase.co") ||
      connectionString.includes(".railway.app") ||
      connectionString.includes("sslmode=require");

    pool = new Pool({
      connectionString,
      ssl: isRemote ? { rejectUnauthorized: false } : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    return pool;
  } catch (error) {
    console.warn("PostgreSQL pg driver or connection initialization error:", error.message);
    return null;
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
        featured BOOLEAN DEFAULT false,
        status VARCHAR(50) DEFAULT 'Active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
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

    // Seed products if empty
    const { rows: existingProducts } = await p.query("SELECT COUNT(*) FROM products");
    if (parseInt(existingProducts[0].count, 10) === 0) {
      for (const prod of defaultProducts) {
        await p.query(
          `INSERT INTO products (slug, name, category, sku, price, description, finish, image, featured, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
           ON CONFLICT (slug) DO NOTHING;`,
          [
            prod.slug,
            prod.name,
            prod.category,
            prod.sku || `SKU-${prod.slug.substring(0, 4).toUpperCase()}`,
            prod.price,
            prod.description,
            prod.finish || "Standard Finish",
            prod.image,
            Boolean(prod.featured),
            prod.status || "Active",
          ]
        );
      }
    }

    // Seed portfolio if empty
    const { rows: existingProjects } = await p.query("SELECT COUNT(*) FROM portfolio");
    if (parseInt(existingProjects[0].count, 10) === 0) {
      for (const proj of defaultPortfolio) {
        await p.query(
          `INSERT INTO portfolio (slug, title, location, year, category, tags, summary, cover_image, images, featured, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           ON CONFLICT (slug) DO NOTHING;`,
          [
            proj.slug,
            proj.title,
            proj.location,
            proj.year,
            proj.category,
            JSON.stringify(proj.tags || []),
            proj.summary,
            proj.coverImage,
            JSON.stringify(proj.images || []),
            Boolean(proj.featured),
            proj.status || "Published",
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
    if (!p) return defaultProducts;

    await initDatabase();
    const { rows } = await p.query("SELECT * FROM products ORDER BY id ASC");
    if (rows.length === 0) return defaultProducts;

    return rows.map((r) => ({
      slug: r.slug,
      name: r.name,
      category: r.category,
      sku: r.sku,
      price: Number(r.price),
      description: r.description,
      finish: r.finish,
      image: r.image,
      featured: r.featured,
      status: r.status,
    }));
  } catch (err) {
    console.warn("Falling back to local products:", err.message);
    return defaultProducts;
  }
}

export async function insertProductToDb(prod) {
  const p = await getPool();
  if (!p) throw new Error("No database connection available");

  await initDatabase();
  const slug =
    prod.slug ||
    prod.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const { rows } = await p.query(
    `INSERT INTO products (slug, name, category, sku, price, description, finish, image, featured, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *;`,
    [
      slug,
      prod.name,
      prod.category,
      prod.sku || `SKU-${Date.now().toString().slice(-4)}`,
      parseFloat(prod.price) || 0,
      prod.description || "",
      prod.finish || "",
      prod.image || "/images/products/chair.jpg",
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
         updated_at = CURRENT_TIMESTAMP
     WHERE slug = $9
     RETURNING *;`,
    [
      prod.name,
      prod.category,
      prod.price !== undefined ? parseFloat(prod.price) : null,
      prod.description,
      prod.finish,
      prod.featured,
      prod.status,
      prod.image,
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
    if (!p) return defaultPortfolio;

    await initDatabase();
    const { rows } = await p.query("SELECT * FROM portfolio ORDER BY year DESC, id ASC");
    if (rows.length === 0) return defaultPortfolio;

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
    console.warn("Falling back to local portfolio:", err.message);
    return defaultPortfolio;
  }
}

export async function insertProjectToDb(proj) {
  const p = await getPool();
  if (!p) throw new Error("No database connection available");

  await initDatabase();
  const slug =
    proj.slug ||
    proj.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

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
        totalProducts: defaultProducts.length,
        totalProjects: defaultPortfolio.length,
        inquiriesCount: 38,
        totalRevenue: 58400,
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
    const totalRevenue = parseFloat(orderStatsRes.rows[0].total) || 58400;

    return {
      connected: true,
      totalProducts,
      totalProjects,
      inquiriesCount: ordersCount > 0 ? ordersCount : 38,
      totalRevenue,
    };
  } catch (err) {
    return {
      connected: false,
      error: err.message,
      totalProducts: defaultProducts.length,
      totalProjects: defaultPortfolio.length,
      inquiriesCount: 38,
      totalRevenue: 58400,
    };
  }
}
