"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAtomValue } from "jotai";
import { Search, Heart, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cartCountAtom } from "@/features/cart/atoms";
import { wishlistCountAtom } from "@/features/wishlist/atoms";
import { MegaMenu } from "./mega-menu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#1C1C1C] text-white text-[10px] rounded-full flex items-center justify-center leading-none">
      {count > 9 ? "9+" : count}
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const cartCount = useAtomValue(cartCountAtom);
  const wishlistCount = useAtomValue(wishlistCountAtom);

  // Avoid hydration mismatch for atomWithStorage-derived counts
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [megaOpen, setMegaOpen] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    hideTimeoutRef.current = setTimeout(() => setMegaOpen(false), 300);
  };

  return (
    <nav className="relative hidden lg:block h-20 bg-white border-b border-[#E8ECEF]">
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-semibold text-xl tracking-tight text-[#1C1C1C] select-none"
        >
          3legant<span style={{ color: "#B88E2F" }}>°</span>
        </Link>

        {/* Nav links */}
        <ul className="flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            const isShop = label === "Shop";

            return (
              <li
                key={href}
                onMouseEnter={isShop ? openMega : undefined}
                onMouseLeave={isShop ? closeMega : undefined}
              >
                <Link
                  href={href}
                  className={`text-sm transition-colors ${
                    isActive
                      ? "text-[#1C1C1C] font-medium"
                      : "text-[#807D7E] hover:text-[#1C1C1C]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="text-[#1C1C1C] hover:text-[#807D7E] transition-colors"
          >
            <Search size={20} />
          </button>

          <Link href="/account/wishlist" className="relative" aria-label="Wishlist">
            <Heart size={20} className="text-[#1C1C1C] hover:text-[#807D7E] transition-colors" />
            {mounted && <CountBadge count={wishlistCount} />}
          </Link>

          <button
            aria-label="Cart"
            className="relative text-[#1C1C1C] hover:text-[#807D7E] transition-colors"
          >
            <ShoppingCart size={20} />
            {mounted && <CountBadge count={cartCount} />}
          </button>

          <div className="h-5 w-px bg-[#E8ECEF]" />

          <Link
            href="/auth/sign-in"
            className="text-sm text-[#1C1C1C] hover:text-[#807D7E] transition-colors"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mega menu */}
      {megaOpen && (
        <MegaMenu onMouseEnter={openMega} onMouseLeave={closeMega} />
      )}
    </nav>
  );
}
