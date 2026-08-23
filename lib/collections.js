export const collections = [
  {
    slug: "bedroom",
    title: "Bedroom",
    description: "Restful pieces for spaces made to slow down.",
    image: "/images/portfolio/hampstead-1.jpg",
  },
  {
    slug: "dining",
    title: "Dining",
    description: "Considered tables and seating for gathering well.",
    image: "/images/portfolio/hampstead-2.jpg",
  },
  {
    slug: "living",
    title: "Living",
    description: "Comfort, character, and enduring everyday ease.",
    image: "/images/portfolio/hampstead-3.jpg",
  },
  {
    slug: "gifting",
    title: "Gifting",
    description: "Thoughtful objects to mark meaningful moments.",
    image: "/images/misc/materials-board.jpg",
  },
  {
    slug: "offers",
    title: "Offers",
    description: "A considered selection from the Bellum collection.",
    image: "/images/products/aurelia-armchair.jpg",
  },
];

export function getCollectionBySlug(slug) {
  return collections.find((collection) => collection.slug === slug);
}
