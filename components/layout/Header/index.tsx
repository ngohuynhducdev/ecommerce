"use client";

import Link from "next/link";
import { useState } from "react";
import { useAtom } from "jotai";
import { Menu, ShoppingCart, Heart, User, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mobileMenuOpenAtom, cartDrawerOpenAtom } from "@/store/ui";
import { useCart } from "@/hooks/useCart";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/auth";
import { SearchBar } from "@/components/layout/SearchBar";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/products" },
  { label: "Danh mục", href: "/categories" },
];

export function Header() {
  const [, setMobileMenuOpen] = useAtom(mobileMenuOpenAtom);
  const [, setCartDrawerOpen] = useAtom(cartDrawerOpenAtom);
  const { itemCount } = useCart();
  const user = useAtomValue(userAtom);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search overlay */}
        {searchOpen && (
          <div className="absolute inset-x-0 top-0 z-10 bg-white/95 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 shadow-sm">
            <SearchBar onClose={() => setSearchOpen(false)} />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-warm-500 hover:text-warm-800 transition-colors flex-shrink-0"
              aria-label="Đóng tìm kiếm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl font-serif font-bold text-warm-800 tracking-tight">
              Home Interior
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-warm-700 hover:text-warm-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="text-warm-700 hover:text-warm-900"
              onClick={() => setSearchOpen(true)}
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:flex text-warm-700 hover:text-warm-900"
            >
              <Link href="/wishlist" aria-label="Danh sách yêu thích">
                <Heart className="w-5 h-5" />
              </Link>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-warm-700 hover:text-warm-900"
              onClick={() => setCartDrawerOpen(true)}
              aria-label="Giỏ hàng"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 p-0 flex items-center justify-center text-xs bg-earth-500 hover:bg-earth-500">
                  {itemCount > 99 ? "99+" : itemCount}
                </Badge>
              )}
            </Button>

            {/* User */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:flex text-warm-700 hover:text-warm-900"
            >
              <Link href={user ? "/account" : "/login"} aria-label="Tài khoản">
                <User className="w-5 h-5" />
              </Link>
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-warm-700"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Mở menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
