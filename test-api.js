const { testDbConnection, insertProductToDb } = require('./lib/db.js'); // Cannot do this easily because it's ES module or uses next/env

async function test() {
  const url = "http://localhost:3000/api/admin/products"; // wait, user's curl is to 3001
  try {
    const res = await fetch("http://localhost:3001/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "test",
            category: "Seating",
            price: "2500",
            sku: "test1",
            featured: true,
            status: "Active",
            description: "test product",
            finish: "test",
            image: "/images/uploads/1787572136277-Bellum_Logo.png"
        })
    });
    console.log(res.status);
    console.log(await res.text());
  } catch(e) {
    console.error(e);
  }
}
test();
