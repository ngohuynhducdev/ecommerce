"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAtomValue, useSetAtom } from "jotai";
import { House, Grid2X2, Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

import { cartCountAtom, cartOpenAtom } from "@/features/cart/atoms";
import { wishlistCountAtom } from "@/features/wishlist/atoms";

interface NavTab {
  label: string;
  href?: string;
  action?: () => void;
  icon: (active: boolean) => React.ReactNode;
  badgeAtom?: "cart" | "wishlist";
}

export function BottomNav() {
  const pathname = usePathname();
  const cartCount = useAtomValue(cartCountAtom);
  const wishlistCount = useAtomValue(wishlistCountAtom);
  const setCartOpen = useSetAtom(cartOpenAtom);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const tabs: NavTab[] = [
    {
      label: "Home",
      href: "/",
      icon: (active) => (
        <House
          size={22}
          fill={active ? "currentColor" : "none"}
          strokeWidth={active ? 1.5 : 2}
        />
      ),
    },
    {
      label: "Shop",
      href: "/shop",
      icon: (active) => (
        <Grid2X2
          size={22}
          fill={active ? "currentColor" : "none"}
          strokeWidth={active ? 1.5 : 2}
        />
      ),
    },
    {
      label: "Wishlist",
      href: "/account/wishlist",
      badgeAtom: "wishlist",
      icon: (active) => (
        <Heart
          size={22}
          fill={active ? "currentColor" : "none"}
          strokeWidth={active ? 1.5 : 2}
        />
      ),
    },
    {
      label: "Cart",
      action: () => setCartOpen(true),
      badgeAtom: "cart",
      icon: (active) => (
        <ShoppingCart
          size={22}
          fill={active ? "currentColor" : "none"}
          strokeWidth={active ? 1.5 : 2}
        />
      ),
    },
  ];

  const getBadgeCount = (key: NavTab["badgeAtom"]) => {
    if (!mounted) return 0;
    if (key === "cart") return cartCount;
    if (key === "wishlist") return wishlistCount;
    return 0;
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-[#E8ECEF] grid grid-cols-4">
      {tabs.map(({ label, href, action, icon, badgeAtom: badgeKey }) => {
        const isActive = href
          ? href === "/"
            ? pathname === "/"
            : pathname.startsWith(href)
          : false;

        const badgeCount = getBadgeCount(badgeKey);
        const content = (
          <>
            <div className="relative inline-flex">
              {icon(isActive)}
              {badgeCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#1C1C1C] text-white text-[10px] rounded-full flex items-center justify-center leading-none">
                  {badgeCount > 9 ? "9+" : badgeCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1">{label}</span>
          </>
        );

        const cls = `flex flex-col items-center justify-center gap-0 transition-colors ${
          isActive ? "text-[#1C1C1C] font-medium" : "text-[#807D7E]"
        }`;

        if (action) {
          return (
            <button key={label} onClick={action} className={cls}>
              {content}
            </button>
          );
        }

        return (
          <Link key={label} href={href!} className={cls}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
