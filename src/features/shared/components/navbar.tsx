"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  ChevronRight,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cartCountAtom, cartOpenAtom } from "@/features/cart/atoms";
import { wishlistCountAtom } from "@/features/wishlist/atoms";
import { mobileMenuOpenAtom } from "../atoms";
import { MegaMenu } from "./mega-menu";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const mobileCategories = [
  { label: "Living Room", slug: "living-room" },
  { label: "Bedroom", slug: "bedroom" },
  { label: "Dining", slug: "dining" },
  { label: "Office", slug: "office" },
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
  const setCartOpen = useSetAtom(cartOpenAtom);
  const [mobileMenuOpen, setMobileMenuOpen] = useAtom(mobileMenuOpenAtom);

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
    <>
      {/* ── Desktop navbar (lg+) ─────────────────────────────────────── */}
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

            <Link
              href="/account/wishlist"
              className="relative"
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                className="text-[#1C1C1C] hover:text-[#807D7E] transition-colors"
              />
              {mounted && <CountBadge count={wishlistCount} />}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
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

        {megaOpen && (
          <MegaMenu onMouseEnter={openMega} onMouseLeave={closeMega} />
        )}
      </nav>

      {/* ── Mobile navbar bar (< lg) ──────────────────────────────────── */}
      <div className="lg:hidden h-16 flex items-center justify-between px-4 bg-white border-b border-[#E8ECEF]">
        <Link
          href="/"
          className="font-semibold text-xl tracking-tight text-[#1C1C1C] select-none"
        >
          3legant<span style={{ color: "#B88E2F" }}>°</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          className="text-[#1C1C1C]"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* ── Mobile menu Sheet ─────────────────────────────────────────── */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="left"
          className="w-4/5 max-w-xs p-0 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8ECEF]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-semibold text-xl tracking-tight text-[#1C1C1C]"
            >
              3legant<span style={{ color: "#B88E2F" }}>°</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="text-[#807D7E] hover:text-[#1C1C1C] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="px-5 py-4 border-b border-[#E8ECEF]">
            <Input placeholder="Search products…" className="h-9 text-sm" />
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="py-2">
              {navLinks.map(({ label, href }) => {
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                        isActive
                          ? "text-[#1C1C1C] font-medium"
                          : "text-[#807D7E] hover:text-[#1C1C1C]"
                      }`}
                    >
                      {label}
                      <ChevronRight size={16} className="text-[#807D7E]" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Categories accordion */}
            <div className="px-5 border-t border-[#E8ECEF]">
              <Accordion type="single" collapsible>
                <AccordionItem value="categories" className="border-none">
                  <AccordionTrigger className="text-sm text-[#807D7E] hover:text-[#1C1C1C] py-3 hover:no-underline">
                    Categories
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <ul className="space-y-1">
                      {mobileCategories.map(({ label, slug }) => (
                        <li key={slug}>
                          <Link
                            href={`/shop?category=${slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between py-2 text-sm text-[#807D7E] hover:text-[#1C1C1C] transition-colors"
                          >
                            {label}
                            <ChevronRight size={14} className="text-[#807D7E]" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </nav>

          {/* Bottom actions */}
          <div className="px-5 py-4 border-t border-[#E8ECEF] flex gap-3">
            <Link
              href="/auth/sign-in"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 h-10 flex items-center justify-center rounded-lg border border-[#1C1C1C] text-sm font-medium text-[#1C1C1C] hover:bg-[#F3F5F7] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/sign-up"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 h-10 flex items-center justify-center rounded-lg bg-[#1C1C1C] text-sm font-medium text-white hover:bg-[#2d2d2d] transition-colors"
            >
              Register
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
