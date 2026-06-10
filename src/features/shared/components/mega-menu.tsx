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
      className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-border z-50 p-10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-5 gap-8">
        {categories.map((cat) => (
          <div key={cat.slug}>
            <Link
              href={`/shop?category=${cat.slug}`}
              className="text-sm font-semibold text-primary mb-4 block hover:text-accent transition-colors"
            >
              {cat.title}
            </Link>
            <ul className="space-y-1">
              {cat.links.map((link) => (
                <li key={link}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="text-sm text-muted hover:text-primary py-1 block transition-colors"
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
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop&auto=format&q=80"
              alt="New Arrivals"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-primary mb-1">
            New Arrivals
          </span>
          <Link
            href="/shop"
            className="text-sm text-accent hover:text-accent-hover transition-colors"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
