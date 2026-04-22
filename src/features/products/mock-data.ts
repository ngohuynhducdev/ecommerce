import type { Category, Product } from "./types";

export const mockCategories: Category[] = [
  {
    id: "cat-1",
    slug: "living-room",
    name: "Living Room",
    image: "https://picsum.photos/seed/living-room/800/800",
    description: "Comfortable and stylish furniture for your living space.",
  },
  {
    id: "cat-2",
    slug: "bedroom",
    name: "Bedroom",
    image: "https://picsum.photos/seed/bedroom/800/800",
    description: "Create your perfect sanctuary with our bedroom collection.",
  },
  {
    id: "cat-3",
    slug: "dining",
    name: "Dining",
    image: "https://picsum.photos/seed/dining/800/800",
    description: "Elegant dining sets for memorable meals together.",
  },
  {
    id: "cat-4",
    slug: "office",
    name: "Office",
    image: "https://picsum.photos/seed/office/800/800",
    description: "Productive and refined furniture for your home office.",
  },
];

const [livingRoom, bedroom, dining, office] = mockCategories;

export const mockProducts: Product[] = [
  // ─── Living Room ───────────────────────────────────────────────────────────
  {
    id: "prod-1",
    slug: "aria-sofa",
    name: "Aria Sofa",
    description:
      "A timeless three-seater sofa upholstered in premium fabric. Deep cushions and solid oak legs make the Aria the perfect centrepiece for any modern living room.",
    price: 1299,
    images: [
      "https://picsum.photos/seed/aria-sofa/800/800",
      "https://picsum.photos/seed/aria-sofa-2/800/800",
      "https://picsum.photos/seed/aria-sofa-3/800/800",
    ],
    category: livingRoom,
    tags: ["sofa", "fabric", "three-seater"],
    variants: [
      { id: "v1-1", name: "Color", value: "Beige", stock: 8 },
      { id: "v1-2", name: "Color", value: "Charcoal", stock: 5 },
      { id: "v1-3", name: "Color", value: "Sage Green", stock: 3 },
    ],
    stock: 16,
    isFeatured: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "prod-2",
    slug: "nordic-coffee-table",
    name: "Nordic Coffee Table",
    description:
      "Solid walnut coffee table with a minimalist Scandinavian silhouette. The slatted lower shelf provides convenient storage while keeping the look light and airy.",
    price: 349,
    images: [
      "https://picsum.photos/seed/nordic-coffee-table/800/800",
      "https://picsum.photos/seed/nordic-coffee-table-2/800/800",
    ],
    category: livingRoom,
    tags: ["coffee-table", "walnut", "scandinavian"],
    variants: [
      { id: "v2-1", name: "Color", value: "Natural Walnut", stock: 12 },
      { id: "v2-2", name: "Color", value: "Black Oak", stock: 7 },
    ],
    stock: 19,
    isFeatured: false,
    isBestseller: true,
    rating: 4.6,
    reviewCount: 87,
  },
  {
    id: "prod-3",
    slug: "lounge-armchair",
    name: "Lounge Armchair",
    description:
      "Sink into luxury with this generously padded armchair. Curved back, tapered wooden legs, and a choice of premium fabrics make it an inviting reading companion.",
    price: 499,
    comparePrice: 649,
    images: [
      "https://picsum.photos/seed/lounge-armchair/800/800",
      "https://picsum.photos/seed/lounge-armchair-2/800/800",
      "https://picsum.photos/seed/lounge-armchair-3/800/800",
    ],
    category: livingRoom,
    tags: ["armchair", "accent", "reading"],
    variants: [
      { id: "v3-1", name: "Color", value: "Dusty Rose", stock: 6 },
      { id: "v3-2", name: "Color", value: "Oatmeal", stock: 9 },
    ],
    stock: 15,
    isFeatured: true,
    isBestseller: false,
    rating: 4.7,
    reviewCount: 56,
  },

  // ─── Bedroom ───────────────────────────────────────────────────────────────
  {
    id: "prod-4",
    slug: "haven-bed-frame",
    name: "Haven Bed Frame",
    description:
      "A statement king-size bed frame with an upholstered headboard and solid ash wood base. The Haven combines hotel-grade comfort with understated elegance.",
    price: 899,
    images: [
      "https://picsum.photos/seed/haven-bed-frame/800/800",
      "https://picsum.photos/seed/haven-bed-frame-2/800/800",
      "https://picsum.photos/seed/haven-bed-frame-3/800/800",
    ],
    category: bedroom,
    tags: ["bed", "king", "upholstered"],
    variants: [
      { id: "v4-1", name: "Color", value: "Light Grey", stock: 5 },
      { id: "v4-2", name: "Color", value: "Navy", stock: 4 },
      { id: "v4-3", name: "Color", value: "Cream", stock: 6 },
    ],
    stock: 15,
    isFeatured: true,
    isBestseller: false,
    rating: 4.9,
    reviewCount: 201,
  },
  {
    id: "prod-5",
    slug: "drift-nightstand",
    name: "Drift Nightstand",
    description:
      "A compact nightstand with one drawer and an open shelf, crafted from sustainably sourced oak. Its clean lines complement both contemporary and classic bedroom styles.",
    price: 249,
    images: [
      "https://picsum.photos/seed/drift-nightstand/800/800",
      "https://picsum.photos/seed/drift-nightstand-2/800/800",
    ],
    category: bedroom,
    tags: ["nightstand", "oak", "storage"],
    variants: [
      { id: "v5-1", name: "Color", value: "Light Oak", stock: 18 },
      { id: "v5-2", name: "Color", value: "Walnut", stock: 10 },
    ],
    stock: 28,
    isFeatured: false,
    isBestseller: true,
    rating: 4.5,
    reviewCount: 143,
  },
  {
    id: "prod-6",
    slug: "linen-dresser",
    name: "Linen Six-Drawer Dresser",
    description:
      "Spacious six-drawer dresser with dovetail joinery and antique brass pulls. Plenty of room to organise your wardrobe without sacrificing style.",
    price: 599,
    comparePrice: 749,
    images: [
      "https://picsum.photos/seed/linen-dresser/800/800",
      "https://picsum.photos/seed/linen-dresser-2/800/800",
    ],
    category: bedroom,
    tags: ["dresser", "storage", "drawers"],
    variants: [
      { id: "v6-1", name: "Color", value: "White", stock: 7 },
      { id: "v6-2", name: "Color", value: "Natural", stock: 5 },
      { id: "v6-3", name: "Color", value: "Ebony", stock: 3 },
    ],
    stock: 15,
    isFeatured: false,
    isBestseller: false,
    rating: 4.4,
    reviewCount: 68,
  },

  // ─── Dining ────────────────────────────────────────────────────────────────
  {
    id: "prod-7",
    slug: "ensemble-dining-table",
    name: "Ensemble Dining Table",
    description:
      "Solid marble-top dining table on a geometric brushed-steel base. Seats six comfortably and becomes the natural focal point of any dining room.",
    price: 1499,
    images: [
      "https://picsum.photos/seed/ensemble-dining-table/800/800",
      "https://picsum.photos/seed/ensemble-dining-table-2/800/800",
      "https://picsum.photos/seed/ensemble-dining-table-3/800/800",
    ],
    category: dining,
    tags: ["dining-table", "marble", "six-seater"],
    variants: [
      { id: "v7-1", name: "Color", value: "White Marble", stock: 4 },
      { id: "v7-2", name: "Color", value: "Grey Marble", stock: 3 },
    ],
    stock: 7,
    isFeatured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "prod-8",
    slug: "contour-dining-chair",
    name: "Contour Dining Chair",
    description:
      "Ergonomically shaped dining chair with a moulded back and padded seat. Sold individually; mix and match colours to personalise your dining set.",
    price: 189,
    comparePrice: 229,
    images: [
      "https://picsum.photos/seed/contour-dining-chair/800/800",
      "https://picsum.photos/seed/contour-dining-chair-2/800/800",
    ],
    category: dining,
    tags: ["chair", "dining", "ergonomic"],
    variants: [
      { id: "v8-1", name: "Color", value: "Caramel", stock: 20 },
      { id: "v8-2", name: "Color", value: "Black", stock: 15 },
      { id: "v8-3", name: "Color", value: "Terracotta", stock: 8 },
    ],
    stock: 43,
    isFeatured: false,
    isBestseller: true,
    rating: 4.6,
    reviewCount: 189,
  },
  {
    id: "prod-9",
    slug: "mason-bar-stool",
    name: "Mason Bar Stool",
    description:
      "Adjustable-height bar stool with a 360° swivel seat and a sturdy steel footrest. Ideal for kitchen islands and home bars alike.",
    price: 179,
    comparePrice: 219,
    images: [
      "https://picsum.photos/seed/mason-bar-stool/800/800",
      "https://picsum.photos/seed/mason-bar-stool-2/800/800",
    ],
    category: dining,
    tags: ["stool", "bar", "adjustable"],
    variants: [
      { id: "v9-1", name: "Color", value: "Matte Black", stock: 14 },
      { id: "v9-2", name: "Color", value: "Brushed Gold", stock: 9, priceModifier: 20 },
    ],
    stock: 23,
    isFeatured: false,
    isBestseller: false,
    rating: 4.3,
    reviewCount: 74,
  },

  // ─── Office ────────────────────────────────────────────────────────────────
  {
    id: "prod-10",
    slug: "focus-desk",
    name: "Focus Desk",
    description:
      "Wide-surface writing desk with a hidden cable management channel and a built-in shallow drawer. The powder-coated steel frame keeps it sturdy yet sleek.",
    price: 799,
    images: [
      "https://picsum.photos/seed/focus-desk/800/800",
      "https://picsum.photos/seed/focus-desk-2/800/800",
      "https://picsum.photos/seed/focus-desk-3/800/800",
    ],
    category: office,
    tags: ["desk", "home-office", "cable-management"],
    variants: [
      { id: "v10-1", name: "Color", value: "Oak / Black", stock: 10 },
      { id: "v10-2", name: "Color", value: "Walnut / Black", stock: 7 },
    ],
    stock: 17,
    isFeatured: false,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 98,
  },
  {
    id: "prod-11",
    slug: "ergo-office-chair",
    name: "Ergo Office Chair",
    description:
      "Full-mesh ergonomic office chair with lumbar support, adjustable armrests, and a recline lock. Designed for long working sessions without compromising comfort.",
    price: 549,
    comparePrice: 699,
    images: [
      "https://picsum.photos/seed/ergo-office-chair/800/800",
      "https://picsum.photos/seed/ergo-office-chair-2/800/800",
    ],
    category: office,
    tags: ["chair", "ergonomic", "mesh"],
    variants: [
      { id: "v11-1", name: "Color", value: "Black", stock: 12 },
      { id: "v11-2", name: "Color", value: "Grey", stock: 8 },
    ],
    stock: 20,
    isFeatured: false,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 231,
  },
  {
    id: "prod-12",
    slug: "stackable-shelf",
    name: "Modular Stackable Shelf",
    description:
      "Versatile open shelving unit that can be stacked and configured to your space. Each module is crafted from FSC-certified pine with a white lacquer finish.",
    price: 299,
    images: [
      "https://picsum.photos/seed/stackable-shelf/800/800",
      "https://picsum.photos/seed/stackable-shelf-2/800/800",
    ],
    category: office,
    tags: ["shelf", "modular", "storage"],
    variants: [
      { id: "v12-1", name: "Color", value: "White", stock: 15 },
      { id: "v12-2", name: "Color", value: "Pine Natural", stock: 10 },
      { id: "v12-3", name: "Color", value: "Black", stock: 6 },
    ],
    stock: 31,
    isFeatured: false,
    isBestseller: false,
    rating: 4.5,
    reviewCount: 55,
  },
];