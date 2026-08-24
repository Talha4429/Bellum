export const collections = [
  {
    slug: "bedroom",
    title: "Bedroom",
    subtitle: "Sanctuaries of Rest & Tactile Calm",
    description:
      "Sculptural bed frames, floating nightstands, and linen-draped silhouettes crafted with monolithic timber and hand-finished joinery.",
    heroImage: "/images/portfolio/hampstead-2.jpg",
    craftsmanshipStory:
      "Our bedroom collection is anchored in acoustic and visual stillness. Every piece is constructed from sustainably harvested solid oak and walnut, using traditional mortise-and-tenon joinery that eliminates creaking and stands the test of generations. Headboards are upholstered with breathable Belgian linen and organic wool bouclé, providing an enveloping sensory warmth.",
    materials: [
      { name: "Solid White Oak & Walnut", detail: "FSC-certified timber cured for minimum seasonal movement." },
      { name: "Natural Bouclé & Linen", detail: "Unbleached, tactile upholstery with double-stitch edging." },
      { name: "Concealed Soft-Close Joinery", detail: "Hand-fitted drawer runners and acoustic damper stops." },
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
      "/images/portfolio/hampstead-2.jpg",
      "/images/portfolio/hampstead-5.jpg",
      "/images/portfolio/hampstead-3.jpg"
    ]
  },
  {
    slug: "dining",
    title: "Dining",
    subtitle: "Monolithic Gathering & Enduring Craft",
    description:
      "Generous communal dining tables, sculpted hardwood seating, and credenzas built to anchor shared rituals and conversations.",
    heroImage: "/images/portfolio/hampstead-cover.jpg",
    craftsmanshipStory:
      "Dining pieces at Bellum celebrate the weight and dignity of natural wood and stone. Tops are sculpted from continuous-grain matched slabs, supported by architectural trestles and monolithic stone bases. Each dining chair is ergonomically contoured with steam-bent backrests and hand-sanded compound curves for hours of effortless comfort.",
    materials: [
      { name: "Continuous Grain Timber", detail: "Hand-selected wide planks matched for harmonious grain flow." },
      { name: "Honed Travertine & Limestone", detail: "Hand-cut stone pedestals with sealed matte tactile finishes." },
      { name: "Steam-Bent Solid Ash", detail: "Organic ergonomic curvature formed without laminated veneers." },
      { name: "Burnished Brass Inlays", detail: "Subtle metallic joinery details that develop a rich patina with time." }
    ],
    pillars: [
      {
        title: "Monolithic Stability",
        description: "Structural cross-bracing and calculated weight distribution to support lively family gatherings."
      },
      {
        title: "Seamless Continuity",
        description: "Continuous wood-grain waterfall edges that flow uninterrupted across the tabletop perimeter."
      },
      {
        title: "Patina & Longevity",
        description: "Heat and moisture resistant natural oil coats that age gracefully with every celebration."
      }
    ],
    gallery: [
      "/images/portfolio/hampstead-cover.jpg",
      "/images/portfolio/hampstead-1.jpg",
      "/images/portfolio/hampstead-4.jpg"
    ]
  },
  {
    slug: "living",
    title: "Living",
    subtitle: "Architectural Proportion & Everyday Luxury",
    description:
      "Curved sculptural sofas, low-slung coffee tables, and bespoke lounge seating engineered for effortless daily comfort.",
    heroImage: "/images/misc/hero-architecture.jpg",
    craftsmanshipStory:
      "The living collection explores the tension between architectural rigidity and cloud-like softness. Our seating uses multi-density memory foams layered over natural latex and pocket-sprung bases, encased in tailored upholstery with invisible seams. Coffee tables showcase honest stone and timber intersections, grounding the living space.",
    materials: [
      { name: "Layered Natural Latex & Down", detail: "Responsive dual-core cushions that maintain shape over decades." },
      { name: "Brushed Travertine Bases", detail: "Architectural slab supports with subtle hand-chiseled margins." },
      { name: "Heavyweight Bouclé & Saddle Leather", detail: "Durable high-rub textile ratings suited for active homes." },
      { name: "Welded Steel Substructures", detail: "Internal structural rigidity paired with lightweight floating profiles." }
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
      "/images/misc/hero-architecture.jpg",
      "/images/portfolio/hampstead-1.jpg",
      "/images/portfolio/hampstead-3.jpg"
    ]
  },
  {
    slug: "gifting",
    title: "Gifting",
    subtitle: "Artisanal Objects of Enduring Craft",
    description:
      "Hand-turned wooden vessels, honed stone trays, bespoke brass incense burners, and curated tactile objects.",
    heroImage: "/images/misc/materials-board.jpg",
    craftsmanshipStory:
      "Our gifting collection comprises singular design objects turned and carved from workshop offcuts of prime timber and raw stone. Each object is individually serialized, hand-waxed, and packaged in reusable raw cotton presentation boxes. They represent the distilled essence of Bellum's material reverence in intimate scale.",
    materials: [
      { name: "End-Grain Hardwood Offcuts", detail: "Zero-waste artisanal repurposing of rare walnut and teak burl." },
      { name: "Solid Machined Brass", detail: "Uncoated natural brass crafted to oxidize with individual touch." },
      { name: "Hand-Carved Onyx & Marble", detail: "Singular mineral veining making every vessel strictly one-of-a-kind." },
      { name: "Letterpress Packaging", detail: "Hand-stamped custom cotton sleeves with artisan certificate of origin." }
    ],
    pillars: [
      {
        title: "Zero-Waste Philosophy",
        description: "Transforming exquisite workshop stone and timber offcuts into lifelong heirloom accessories."
      },
      {
        title: "Tactile Intimacy",
        description: "Weighted heft and smooth concave geometries that bring quiet luxury to desks and credenzas."
      },
      {
        title: "Bespoke Presentation",
        description: "Delivered ready-to-gift with personalized architectural certificates and craft provenance notes."
      }
    ],
    gallery: [
      "/images/misc/materials-board.jpg",
      "/images/misc/design-process.jpg",
      "/images/portfolio/hampstead-5.jpg"
    ]
  }
];

export function getCollectionBySlug(slug) {
  return collections.find((collection) => collection.slug === slug);
}

