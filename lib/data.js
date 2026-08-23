import products from "@/data/products.json";
import portfolio from "@/data/portfolio.json";

export function getProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getPortfolio() {
  return portfolio;
}

export function getFeaturedProject() {
  return portfolio.find((p) => p.featured) || portfolio[0];
}

export function getProjectBySlug(slug) {
  return portfolio.find((p) => p.slug === slug);
}

