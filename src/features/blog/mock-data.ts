import type { BlogPost } from "./types";

export const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "how-to-choose-the-perfect-sofa",
    title: "How to Choose the Perfect Sofa for Your Living Room",
    excerpt:
      "Finding the right sofa is one of the most important decisions you'll make for your living room. From size and shape to fabric and color, we break down everything you need to know.",
    category: "Furniture Guide",
    author: { name: "Emma Carter", avatar: "https://picsum.photos/seed/emma/100/100" },
    coverImage: "https://picsum.photos/seed/sofa-guide/1200/800",
    publishedAt: "2026-04-10",
    readTime: "5 min read",
    sections: [
      {
        type: "h2",
        id: "understanding-your-space",
        content: "Understanding Your Space",
      },
      {
        type: "p",
        content:
          "Before you even start browsing sofas, measure your living room carefully. Note the total floor area, doorway widths, and the space your sofa will occupy. A good rule of thumb is to leave at least 18 inches of walkway around the sofa so the room doesn't feel cramped. Think about traffic flow — the sofa should invite people in, not block the path.",
      },
      {
        type: "h2",
        id: "choosing-the-right-style",
        content: "Choosing the Right Style",
      },
      {
        type: "p",
        content:
          "Modern sofas favor clean lines and low profiles, while traditional styles lean on rolled arms and tufted cushions. Mid-century modern pieces strike a balance that works in almost any interior. Consider your existing furniture and architectural details. A sleek three-seater with tapered legs can make a room feel taller; a deep, sectional creates an intimate nook ideal for family rooms.",
      },
      {
        type: "img",
        content: "https://picsum.photos/seed/sofa-style/1200/600",
      },
      {
        type: "h2",
        id: "fabric-and-material",
        content: "Fabric and Material Options",
      },
      {
        type: "p",
        content:
          "Fabric choice affects both look and longevity. Leather ages beautifully but feels cold in winter. Velvet is luxurious but shows pet hair easily. Linen and cotton blends breathe well and feel casual; performance fabrics (like stain-resistant microfiber) are ideal for families. Always check the rub count — a Martindale rating above 20,000 is suitable for everyday use.",
      },
      {
        type: "h2",
        id: "color-and-pattern",
        content: "Color and Pattern",
      },
      {
        type: "p",
        content:
          "Neutral tones like warm greys, oatmeal, and soft caramel are safe long-term investments — they adapt as your décor evolves. If you want personality, choose a bold color and keep surrounding pieces muted. Patterns (stripes, geometric, or subtle texture) can add visual interest without overwhelming the room. Remember, large patterns scale better on larger sofas.",
      },
      {
        type: "h2",
        id: "care-and-maintenance",
        content: "Care and Maintenance",
      },
      {
        type: "p",
        content:
          "No matter which sofa you choose, regular maintenance extends its life significantly. Rotate and flip seat cushions every few weeks to prevent uneven wear. Vacuum fabric surfaces weekly and treat spills immediately by blotting — never rubbing. For leather, a conditioning cream applied every six months keeps it supple and crack-free. Keeping the sofa away from direct sunlight prevents fading.",
      },
    ],
  },
  {
    id: "2",
    slug: "minimalist-interior-design-principles",
    title: "Minimalist Interior Design Principles Every Homeowner Should Know",
    excerpt:
      "Minimalism is more than just an aesthetic — it's a lifestyle. Discover the core principles that will help you create a calm, clutter-free home without sacrificing style.",
    category: "Interior Design",
    author: { name: "James Lee", avatar: "https://picsum.photos/seed/james/100/100" },
    coverImage: "https://picsum.photos/seed/minimalist/1200/800",
    publishedAt: "2026-04-05",
    readTime: "7 min read",
    sections: [
      {
        type: "h2",
        id: "less-is-more",
        content: "The Core Principle: Less Is More",
      },
      {
        type: "p",
        content:
          "Minimalist design strips away the unnecessary, leaving only what is functional and beautiful. Every object in a minimalist space earns its place. This doesn't mean living without comfort — it means being intentional about what you bring into your home and why. The goal is a space that feels restful, not sparse.",
      },
      {
        type: "h2",
        id: "color-palette",
        content: "Color Palette Selection",
      },
      {
        type: "p",
        content:
          "Minimalist interiors rely on a tight, cohesive palette — typically two to three neutrals complemented by a single accent. Off-white walls paired with warm grey furniture and a natural wood accent read as calm and sophisticated. Introduce texture through materials (linen, stone, matte metal) rather than color to avoid visual noise.",
      },
      {
        type: "img",
        content: "https://picsum.photos/seed/minimalist-room/1200/600",
      },
      {
        type: "h2",
        id: "furniture-layout",
        content: "Furniture and Layout",
      },
      {
        type: "p",
        content:
          "Choose furniture with purpose and clean silhouettes. Multi-functional pieces — like an ottoman with storage or a bed with drawers — reduce the number of items in a room. Leave generous breathing space around each piece; negative space is an active design element in minimalism, not wasted floor area.",
      },
      {
        type: "h2",
        id: "decluttering",
        content: "Decluttering Your Space",
      },
      {
        type: "p",
        content:
          "Decluttering is an ongoing practice, not a one-time event. Every six months, audit each room: if you haven't used something in a year, consider letting it go. Use closed storage to hide everyday items and keep surfaces clear. A single curated vase or book on a shelf speaks louder than a shelf crowded with objects.",
      },
    ],
  },
  {
    id: "3",
    slug: "art-of-mixing-furniture-styles",
    title: "The Art of Mixing Furniture Styles",
    excerpt:
      "Who says your furniture has to match perfectly? Learn how to blend different styles, eras, and materials to create a space that feels uniquely yours.",
    category: "Style Tips",
    author: { name: "Sophia Martin", avatar: "https://picsum.photos/seed/sophia/100/100" },
    coverImage: "https://picsum.photos/seed/mixing-styles/1200/800",
    publishedAt: "2026-03-28",
    readTime: "6 min read",
    sections: [
      {
        type: "h2",
        id: "foundation",
        content: "Start With a Foundation",
      },
      {
        type: "p",
        content:
          "Begin with one anchor piece that defines the room's direction — a large sofa, a statement dining table, or an heirloom cabinet. This hero piece sets the tone and gives you a reference point for every other decision. From there, you can layer in different styles knowing you always have something to return to.",
      },
      {
        type: "h2",
        id: "mixing-eras",
        content: "Mixing Eras and Periods",
      },
      {
        type: "p",
        content:
          "A Victorian side table beside a modern sofa creates intriguing tension. The key is balance: don't let one era dominate so strongly that the mix feels accidental. Aim for roughly 60% of your furniture from one period and 40% from another. This ratio reads as curated rather than chaotic.",
      },
      {
        type: "img",
        content: "https://picsum.photos/seed/mixing-eras/1200/600",
      },
      {
        type: "h2",
        id: "visual-weight",
        content: "Balancing Visual Weight",
      },
      {
        type: "p",
        content:
          "Visual weight is how heavy a piece looks, regardless of its actual mass. A dark, ornate antique wardrobe carries significant visual weight; a Lucite chair carries almost none. Distribute visual weight evenly around the room so no single corner feels heavy. Pair substantial pieces with lighter ones to keep the eye moving comfortably.",
      },
      {
        type: "h2",
        id: "unifying-elements",
        content: "Unifying Elements",
      },
      {
        type: "p",
        content:
          "Even the most eclectic mix needs threads that tie it together. These unifiers can be a consistent metal finish (brushed brass on lamp, door handles, and picture frames), a repeated color that appears in three or more items, or a single material like leather or marble. These echoes make the room feel composed, not random.",
      },
    ],
  },
  {
    id: "4",
    slug: "creating-a-productive-home-office",
    title: "Creating a Productive Home Office",
    excerpt:
      "Your workspace should inspire focus and creativity. Here's how to set up a home office that boosts productivity without compromising on design.",
    category: "Home Office",
    author: { name: "Daniel Park", avatar: "https://picsum.photos/seed/daniel/100/100" },
    coverImage: "https://picsum.photos/seed/home-office/1200/800",
    publishedAt: "2026-03-20",
    readTime: "8 min read",
    sections: [
      {
        type: "h2",
        id: "right-location",
        content: "Choosing the Right Location",
      },
      {
        type: "p",
        content:
          "Ideally your home office should be in a dedicated room with a door you can close. If space is limited, carve out a corner that is visually distinct from your living area — a different rug, a change in wall color, or a bookshelf divider signals to your brain that this is a work zone. Proximity to a window is a significant productivity asset.",
      },
      {
        type: "h2",
        id: "ergonomic-furniture",
        content: "Ergonomic Furniture Selection",
      },
      {
        type: "p",
        content:
          "Your desk and chair are the most important investments in your home office. Choose a desk at elbow height when seated — typically 28 to 30 inches. An ergonomic chair with lumbar support, adjustable armrests, and seat depth adjustment prevents the back pain that plagues remote workers. If budget allows, a sit-stand desk is transformative for energy levels throughout the day.",
      },
      {
        type: "img",
        content: "https://picsum.photos/seed/office-setup/1200/600",
      },
      {
        type: "h2",
        id: "lighting-matters",
        content: "Lighting Matters",
      },
      {
        type: "p",
        content:
          "Natural light boosts mood and reduces eye strain, so position your desk to face or be perpendicular to a window. Avoid placing your monitor directly in front of a window — the backlight creates glare. Supplement with a quality desk lamp that has adjustable color temperature: warm in the morning, cooler during deep work sessions.",
      },
      {
        type: "h2",
        id: "organization-storage",
        content: "Organization and Storage",
      },
      {
        type: "p",
        content:
          "A clear desk supports a clear mind. Use vertical storage — floating shelves and wall-mounted organizers — to keep the desktop surface uncluttered. Cable management (cable trays, desk grommets, velcro ties) eliminates the visual chaos of wiring. A small pegboard beside the desk is a versatile, customizable storage solution that can grow with your needs.",
      },
    ],
  },
  {
    id: "5",
    slug: "sustainable-furniture-what-to-look-for",
    title: "Sustainable Furniture: What to Look For",
    excerpt:
      "As consumers become more eco-conscious, sustainable furniture has moved from niche to mainstream. Here's your guide to making greener choices for your home.",
    category: "Sustainability",
    author: { name: "Olivia Chen", avatar: "https://picsum.photos/seed/olivia/100/100" },
    coverImage: "https://picsum.photos/seed/sustainable/1200/800",
    publishedAt: "2026-03-14",
    readTime: "5 min read",
    sections: [
      {
        type: "h2",
        id: "why-sustainability",
        content: "Why Sustainability Matters",
      },
      {
        type: "p",
        content:
          "The furniture industry is one of the largest consumers of timber and textiles globally, and fast furniture contributes significantly to landfill waste. Choosing sustainable options means lower carbon footprints, healthier indoor air quality (fewer VOC-emitting adhesives and finishes), and pieces designed to last decades rather than years.",
      },
      {
        type: "h2",
        id: "materials-to-look-for",
        content: "Materials to Look For",
      },
      {
        type: "p",
        content:
          "Solid hardwood from responsibly managed forests, reclaimed timber, bamboo (which regenerates in three to five years), and recycled steel are all excellent sustainable choices. For upholstery, look for natural fibers like organic cotton, wool, or linen. Avoid particleboard with urea-formaldehyde binders — choose CARB Phase 2 compliant boards at minimum.",
      },
      {
        type: "img",
        content: "https://picsum.photos/seed/sustainable-wood/1200/600",
      },
      {
        type: "h2",
        id: "certifications",
        content: "Certifications and Standards",
      },
      {
        type: "p",
        content:
          "Look for third-party certifications that verify sustainability claims. FSC (Forest Stewardship Council) certification confirms wood comes from responsibly managed forests. GREENGUARD Gold indicates low chemical emissions. OEKO-TEX Standard 100 certifies that textiles are free from harmful substances. These labels cut through greenwashing and provide genuine assurance.",
      },
      {
        type: "h2",
        id: "extending-lifespan",
        content: "Extending Furniture Lifespan",
      },
      {
        type: "p",
        content:
          "The most sustainable piece of furniture is one you keep for thirty years. Buy quality over quantity — a well-made solid wood table repaired and refinished outlasts ten chipboard alternatives. Learn basic repair skills: tightening joints, touching up scratches, re-upholstering seats. Buying secondhand and vintage is also one of the most environmentally responsible furniture decisions you can make.",
      },
    ],
  },
  {
    id: "6",
    slug: "small-space-big-style",
    title: "Small Space, Big Style: Furniture Tips for Apartments",
    excerpt:
      "Limited square footage doesn't mean limited style. Discover smart furniture choices and layout tricks that make small apartments feel spacious and stylish.",
    category: "Style Tips",
    author: { name: "Emma Carter", avatar: "https://picsum.photos/seed/emma/100/100" },
    coverImage: "https://picsum.photos/seed/small-space/1200/800",
    publishedAt: "2026-03-07",
    readTime: "6 min read",
    sections: [
      {
        type: "h2",
        id: "multifunctional-pieces",
        content: "Choosing Multifunctional Pieces",
      },
      {
        type: "p",
        content:
          "In a small space, every piece of furniture should ideally serve two purposes. A sofa bed handles both lounging and guest sleeping. A dining table with drop leaves expands for dinner parties and collapses when not in use. A storage ottoman replaces a coffee table while hiding blankets or games. Investing in versatile pieces eliminates the need for additional items.",
      },
      {
        type: "h2",
        id: "smart-storage",
        content: "Smart Storage Solutions",
      },
      {
        type: "p",
        content:
          "Think vertically. Floor-to-ceiling shelving maximizes unused wall space and draws the eye upward, making ceilings feel higher. Choose bed frames with built-in drawers. Use the space above kitchen cabinets for rarely used items. Floating shelves keep floors clear, which is the single most effective trick for making a room feel larger.",
      },
      {
        type: "img",
        content: "https://picsum.photos/seed/small-apartment/1200/600",
      },
      {
        type: "h2",
        id: "power-of-mirrors",
        content: "The Power of Mirrors",
      },
      {
        type: "p",
        content:
          "Mirrors are a small-space essential. A large mirror on the main wall of a living room or bedroom doubles the perceived depth of the space. Position mirrors to reflect natural light sources — a mirror facing a window bounces light deep into the room. Mirrored furniture (nightstands, sideboards) does double duty as both functional storage and light amplifier.",
      },
      {
        type: "h2",
        id: "scale-proportion",
        content: "Scale and Proportion",
      },
      {
        type: "p",
        content:
          "Counterintuitively, one large statement piece reads better in a small space than many small pieces that create visual clutter. A single large area rug grounds the room better than several small ones. Choose furniture with exposed legs — pieces that show floor underneath feel lighter and less space-consuming. Keep the color palette cohesive to avoid the choppy feeling that comes from too many competing tones.",
      },
    ],
  },
];
