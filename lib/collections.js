export const collections = [
  {
    slug: "living",
    title: "Living",
    subtitle: "Architectural Proportion & Everyday Luxury",
    description:
      "Curved sculptural sofas, low-slung coffee tables, and bespoke lounge seating engineered for effortless daily comfort.",
    heroImage: "/images/products/curved-velvet-bergere-chairs.jpg",
    craftsmanshipStory:
      "The living collection explores the tension between architectural rigidity and cloud-like softness. Our seating uses multi-density memory foams layered over natural latex and pocket-sprung bases, encased in tailored upholstery with invisible seams. Coffee tables showcase honest stone and timber intersections, grounding the living space.",
    materials: [
      { name: "Layered Natural Latex & Down", detail: "Responsive dual-core cushions that maintain shape over decades." },
      { name: "Brushed Travertine & Marble", detail: "Architectural slab supports with subtle hand-chiseled margins." },
      { name: "Heavyweight Bouclé & Saddle Leather", detail: "Durable high-rub textile ratings suited for active homes." },
      { name: "Welded Steel & Brass", detail: "Internal structural rigidity paired with lightweight floating profiles." }
    ],
    pillars: [
      {
        title: "Sculptural Ergonomics",
        description: "Sweeping organic curves tailored to cradle the human form from every seated angle."
      },
      {
        title: "Spatial Fluidity",
        description: "360-degree finished designs meant to stand freely in open-plan architectural volumes."
      },
      {
        title: "Master Upholstery",
        description: "Hand-tensioned webbing and blind welt seams executed by master craftsmen in Lahore."
      }
    ],
    gallery: [
      "/images/products/tailored-linen-sofa.jpg",
      "/images/products/circular-lacquer-coffee-table.jpg",
      "/images/products/curved-velvet-bergere-chairs.jpg"
    ]
  },
  {
    slug: "dining",
    title: "Dining",
    subtitle: "Monolithic Gathering & Enduring Craft",
    description:
      "Generous communal dining tables, sculpted hardwood seating, and credenzas built to anchor shared rituals and conversations.",
    heroImage: "/images/Dining/Dining Hero.png",
    craftsmanshipStory:
      "Dining pieces at Bellum celebrate the weight and dignity of natural wood, piano lacquer, and stone. Tops are sculpted from continuous-grain matched slabs and mirror-finish lacquers, supported by architectural plinths and brass crescent inlays. Each seat is ergonomically contoured for hours of effortless comfort.",
    materials: [
      { name: "Continuous Grain Timber", detail: "Hand-selected wide planks matched for harmonious grain flow." },
      { name: "Honed Travertine & Carrara Marble", detail: "Hand-cut stone pedestals with sealed matte tactile finishes." },
      { name: "High-Gloss Piano Lacquer", detail: "Multi-coat obsidian and chocolate lacquer buffed to mirror clarity." },
      { name: "Burnished Brass Inlays", detail: "Subtle metallic joinery details that develop a rich patina with time." }
    ],
    pillars: [
      {
        title: "Monolithic Stability",
        description: "Structural cross-bracing and calculated weight distribution to support lively family gatherings."
      },
      {
        title: "Seamless Continuity",
        description: "Continuous wood-grain and lacquer waterfall edges that flow uninterrupted across the tabletop perimeter."
      },
      {
        title: "Patina & Longevity",
        description: "Heat and moisture resistant protective coats that age gracefully with every celebration."
      }
    ],
    gallery: [
      "/images/Dining/Dining Card 1.png",
      "/images/Dining/Dining Card 2.png",
      "/images/Dining/Dining Card 3.png"
    ]
  },
  {
    slug: "bedroom",
    title: "Bedroom",
    subtitle: "Sanctuaries of Rest & Tactile Calm",
    description:
      "Sculptural daybeds, tactile cane seating, and linen-draped silhouettes crafted with monolithic timber and hand-finished joinery.",
    heroImage: "/images/Bedroom/Bedroom Hero.png",
    craftsmanshipStory:
      "Our bedroom collection is anchored in acoustic and visual stillness. Every piece is constructed from sustainably harvested solid teak, oak, and walnut, using traditional mortise-and-tenon joinery and breathable natural linens paired with saddle leather trims.",
    materials: [
      { name: "Solid Teak & White Oak", detail: "Cured timber for minimum seasonal movement in South Asian climates." },
      { name: "Hand-Woven Natural Cane", detail: "Hexagonal open-weave cane panels offering natural airflow." },
      { name: "Full-Grain Saddle Leather", detail: "Rich aniline-dyed leather straps and bolster accents." },
      { name: "Organic Matte Wax", detail: "Zero-VOC plant-based oil finish preserving natural grain texture." }
    ],
    pillars: [
      {
        title: "Acoustic Silence",
        description: "Solid hardwood internal frames engineered to absorb ambient resonance and eliminate joint friction."
      },
      {
        title: "Proportional Restraint",
        description: "Low-profile plinths and grounded geometry designed to foster open air flow and visual tranquility."
      },
      {
        title: "Tactile Immersion",
        description: "Softened beveled radiuses along all edges, creating an intuitive touch experience in low light."
      }
    ],
    gallery: [
      "/images/Bedroom/Bedroom Card 1.png",
      "/images/Bedroom/Bedroom Card 2.png",
      "/images/Bedroom/Bedroom Card 3.png"
    ]
  },
  {
    slug: "gifting",
    title: "Gifting & Accents",
    subtitle: "Artisanal Objects & Sculptural Lighting",
    description:
      "Hand-turned lamps, monolithic fluted marble vessels, and bespoke brass accents designed to bring quiet luxury to any surface.",
    heroImage: "/images/products/brass-leather-table-lamp.jpg",
    craftsmanshipStory:
      "Our gifting and lighting collection comprises singular design objects turned and carved from workshop offcuts of Carrara marble, solid brass, and fine leather. Each object represents the distilled essence of Bellum's architectural materiality in an intimate scale.",
    materials: [
      { name: "Solid Spun Brass & Bronze", detail: "Uncoated natural metals crafted to oxidize with individual touch." },
      { name: "Hand-Stitched Leather", detail: "Vegetable-tanned leather wrapped stems with French saddle stitching." },
      { name: "Honed Carrara Marble", detail: "Singular mineral veining making every vessel strictly one-of-a-kind." },
      { name: "Belgian Linen Cone Shades", detail: "Handmade shades casting warm architectural ambient light." }
    ],
    pillars: [
      {
        title: "Material Weight",
        description: "Solid machined metals and natural stone with satisfying gravitas."
      },
      {
        title: "Tactile Intimacy",
        description: "Smooth concave geometries and leather grips that bring luxury to everyday interaction."
      },
      {
        title: "Bespoke Presentation",
        description: "Delivered ready-to-gift with personalized certificates and craft provenance notes."
      }
    ],
    gallery: [
      "/images/products/brass-leather-table-lamp.jpg",
      "/images/products/ceramic-shade-lamp.jpg",
      "/images/products/fluted-marble-bench-table.jpg"
    ]
  }
];

export function getCollectionBySlug(slug) {
  return collections.find((collection) => collection.slug === slug);
}
