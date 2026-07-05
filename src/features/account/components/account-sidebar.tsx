"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface Props {
  name: string | null | undefined;
}

const AVATAR =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format&q=80";

const navItems = [
  { label: "Account", href: "/account" },
  { label: "Address", href: "/account/addresses" },
  { label: "Orders", href: "/account/orders" },
  { label: "Wishlist", href: "/account/wishlist" },
] as const;

export function AccountSidebar({ name }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function handleMobileNav(value: string) {
    if (value === "logout") {
      signOut({ callbackUrl: "/" });
      return;
    }
    router.push(value);
  }

  return (
    <aside className="lg:sticky lg:top-28 mb-10 lg:mb-0">
      {/* Avatar card */}
      <div className="bg-mist rounded-2xl p-6 flex flex-col items-center text-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          <Image
            src={AVATAR}
            alt={name ?? "User"}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <p className="font-semibold mt-3 text-ink">{name ?? "Sofia Havertz"}</p>

        {/* Mobile section selector */}
        <select
          value={navItems.some((n) => n.href === pathname) ? pathname : "/account"}
          onChange={(e) => handleMobileNav(e.target.value)}
          className="lg:hidden mt-4 w-full h-11 border border-line rounded-lg px-3 text-sm bg-white cursor-pointer outline-none"
        >
          {navItems.map((n) => (
            <option key={n.href} value={n.href}>
              {n.label}
            </option>
          ))}
          <option value="logout">Log Out</option>
        </select>
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:block mt-8">
        <ul className="space-y-5">
          {navItems.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm transition-colors ${
                    isActive
                      ? "font-semibold text-ink underline underline-offset-8 decoration-2"
                      : "text-subtle hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-subtle hover:text-ink transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
