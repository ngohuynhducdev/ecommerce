"use client";

import Image from "next/image";
import Link from "next/link";

interface MegaMenuProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const categories = [
  {
    title: "Living Room",
    slug: "living-room",
    links: ["Sofas", "Armchairs", "Coffee Tables", "TV Units"],
  },
  {
    title: "Bedroom",
    slug: "bedroom",
    links: ["Beds & Frames", "Nightstands", "Wardrobes", "Dressers"],
  },
  {
    title: "Dining",
    slug: "dining",
    links: ["Dining Tables", "Dining Chairs", "Bar Stools", "Sideboards"],
  },
  {
    title: "Office",
    slug: "office",
    links: ["Desks", "Office Chairs", "Bookshelves", "Filing Cabinets"],
  },
];

export function MegaMenu({ onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-[#E8ECEF] z-50 p-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-5 gap-8">
        {categories.map((cat) => (
          <div key={cat.slug}>
            <Link
              href={`/shop?category=${cat.slug}`}
              className="text-sm font-semibold text-[#1C1C1C] mb-4 block hover:text-[#B88E2F] transition-colors"
            >
              {cat.title}
            </Link>
            <ul className="space-y-1">
              {cat.links.map((link) => (
                <li key={link}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="text-sm text-[#807D7E] hover:text-[#1C1C1C] py-1 block transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Featured image column */}
        <div className="flex flex-col">
          <div className="relative h-52 w-full rounded-lg overflow-hidden mb-3">
            <Image
              src="https://picsum.photos/seed/furniture-new/300/400"
              alt="New Arrivals"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-[#1C1C1C] mb-1">
            New Arrivals
          </span>
          <Link
            href="/shop"
            className="text-sm text-[#B88E2F] hover:text-[#C9A84C] transition-colors"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
