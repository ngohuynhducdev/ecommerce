"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import {
  X,
  ShoppingCart,
  Heart,
  User,
  Home,
  Grid3X3,
  Package,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { mobileMenuOpenAtom } from "@/store/ui";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/auth";

const menuItems = [
  { icon: Home, label: "Trang chủ", href: "/" },
  { icon: Package, label: "Sản phẩm", href: "/products" },
  { icon: Grid3X3, label: "Danh mục", href: "/categories" },
  { icon: Heart, label: "Yêu thích", href: "/wishlist" },
  { icon: ShoppingCart, label: "Giỏ hàng", href: "/cart" },
];

export function MobileMenu() {
  const [open, setOpen] = useAtom(mobileMenuOpenAtom);
  const user = useAtomValue(userAtom);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-72 p-0 flex flex-col">
        <SheetHeader className="px-6 py-5 border-b border-warm-100">
          <div className="flex items-center justify-between">
            <span className="text-lg font-serif font-bold text-warm-800">
              Home Interior
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-warm-600 hover:text-warm-900"
              aria-label="Đóng menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </SheetHeader>

        <nav className="flex-1 py-4">
          {menuItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-6 py-3 text-warm-700 hover:text-warm-900 hover:bg-warm-50 transition-colors"
            >
              <Icon className="w-5 h-5 flex-shrink-0 text-warm-500" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-warm-100 px-6 py-4">
          <Link
            href={user ? "/account" : "/login"}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 text-warm-700 hover:text-warm-900"
          >
            <User className="w-5 h-5 text-warm-500" />
            <span className="font-medium">
              {user ? `${user.firstName ?? user.username}` : "Đăng nhập"}
            </span>
          </Link>
          {!user && (
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="block mt-2 text-sm text-earth-600 hover:text-earth-700 font-medium"
            >
              Tạo tài khoản mới →
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
