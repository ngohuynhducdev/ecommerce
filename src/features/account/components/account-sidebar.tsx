"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { User, ShoppingBag, Heart, MapPin, LogOut } from "lucide-react";

interface Props {
  name: string | null | undefined;
  email: string | null | undefined;
}

const navItems = [
  { icon: User, label: "My Profile", href: "/account" },
  { icon: ShoppingBag, label: "My Orders", href: "/account/orders" },
  { icon: Heart, label: "Wishlist", href: "/account/wishlist" },
  { icon: MapPin, label: "Addresses", href: "/account/addresses" },
] as const;

function getInitials(name: string | null | undefined): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function AccountSidebar({ name, email }: Props) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-28">
      {/* User info */}
      <div className="flex flex-col items-center text-center pb-4">
        <div className="w-14 h-14 rounded-full bg-[#F3F5F7] flex items-center justify-center font-semibold text-lg text-[#1C1C1C] select-none">
          {getInitials(name)}
        </div>
        <p className="font-medium mt-2 text-[#1C1C1C]">{name ?? "User"}</p>
        <p className="text-sm text-[#807D7E]">{email ?? ""}</p>
      </div>

      <div className="h-px bg-[#E8ECEF] mt-4 mb-2" />

      <nav>
        <ul className="space-y-1">
          {navItems.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-colors text-sm ${
                    isActive
                      ? "bg-[#F3F5F7] font-medium text-[#1C1C1C]"
                      : "text-[#807D7E] hover:bg-[#F3F5F7] hover:text-[#1C1C1C]"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="h-px bg-[#E8ECEF] my-2" />

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 py-3 px-4 rounded-xl w-full text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </nav>
    </aside>
  );
}
