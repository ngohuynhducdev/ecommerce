"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useRef, useState, useSyncExternalStore } from "react";

import { cartCountAtom, cartOpenAtom } from "@/features/cart/atoms";
import { wishlistCountAtom } from "@/features/wishlist/atoms";
import { authModalOpenAtom, authModalViewAtom } from "@/features/auth/atoms";
import { mobileMenuOpenAtom } from "../atoms";
import { MegaMenu } from "./mega-menu";

import { Sheet, SheetContent } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

function BagIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function UserIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="9" r="3" />
      <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855" />
    </svg>
  );
}

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-ink text-white text-[10px] rounded-full flex items-center justify-center leading-none font-medium">
      {count > 9 ? "9+" : count}
    </span>
  );
}

function HeartIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <polygon points="10 9 15 12 10 15 10 9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const cartCount = useAtomValue(cartCountAtom);
  const wishlistCount = useAtomValue(wishlistCountAtom);
  const setCartOpen = useSetAtom(cartOpenAtom);
  const setAuthOpen = useSetAtom(authModalOpenAtom);
  const setAuthView = useSetAtom(authModalViewAtom);
  const [mobileMenuOpen, setMobileMenuOpen] = useAtom(mobileMenuOpenAtom);

  const openSignIn = () => {
    setAuthView("sign-in");
    setAuthOpen(true);
  };

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const submitSearch = (term: string) => {
    const q = term.trim();
    if (!q) return;
    setSearchOpen(false);
    setSearchTerm("");
    setMobileMenuOpen(false);
    router.push(`/shop?search=${encodeURIComponent(q)}`);
  };

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

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
      {/* ── Desktop navbar ── */}
      <nav className="relative hidden lg:block h-20 bg-white border-b border-line">
        <div className="px-8 lg:px-20 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-semibold text-xl tracking-tight text-ink select-none">
            3legant<span className="text-gold">.</span>
          </Link>

          {/* Nav links */}
          <ul className="flex items-center gap-8">
            {navLinks.map(({ label, href }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || (href !== "/shop" && pathname.startsWith(href));
              return (
                <li
                  key={label}
                  onMouseEnter={label === "Shop" ? openMega : undefined}
                  onMouseLeave={label === "Shop" ? closeMega : undefined}
                >
                  <Link
                    href={href}
                    className={`text-sm transition-colors ${
                      isActive
                        ? "text-ink font-semibold"
                        : "text-subtle hover:text-ink"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {searchOpen && (
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitSearch(searchTerm);
                  if (e.key === "Escape") setSearchOpen(false);
                }}
                placeholder="Search products…"
                className="w-56 h-9 border-b border-ink bg-transparent text-sm outline-none placeholder:text-subtle animate-fade-in"
              />
            )}
            <button
              aria-label="Search"
              onClick={() => {
                setSearchOpen((v) => !v);
                // focus after the input mounts
                setTimeout(() => searchInputRef.current?.focus(), 0);
              }}
              className="text-ink hover:text-subtle transition-colors cursor-pointer"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <button onClick={openSignIn} aria-label="Sign in" className="text-ink hover:text-subtle transition-colors cursor-pointer">
              <UserIcon size={20} />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
              className="relative text-ink hover:text-subtle transition-colors cursor-pointer"
            >
              <BagIcon size={20} />
              {mounted && <CountBadge count={cartCount} />}
            </button>
          </div>
        </div>

        {megaOpen && (
          <MegaMenu onMouseEnter={openMega} onMouseLeave={closeMega} />
        )}
      </nav>

      {/* ── Mobile navbar bar ── */}
      <div className="lg:hidden h-16 flex items-center justify-between px-5 bg-white border-b border-line">
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="text-ink cursor-pointer"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
          <Link href="/" className="font-semibold text-xl tracking-tight text-ink select-none">
            3legant<span className="text-gold">.</span>
          </Link>
        </div>

        {/* Right: cart bag + badge */}
        <button
          onClick={() => setCartOpen(true)}
          aria-label="Cart"
          className="relative text-ink cursor-pointer"
        >
          <BagIcon size={22} />
          {mounted && <CountBadge count={cartCount} />}
        </button>
      </div>

      {/* ── Mobile menu Sheet ── */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-4/5 max-w-sm p-0 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-semibold text-xl tracking-tight text-ink select-none"
            >
              3legant<span className="text-gold">.</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="text-subtle hover:text-ink transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-3 border border-line rounded-lg px-4 h-12">
              <Search size={18} strokeWidth={1.5} className="text-subtle shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitSearch(searchTerm);
                }}
                placeholder="Search"
                className="flex-1 text-sm outline-none bg-transparent placeholder:text-subtle"
              />
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto">
            {navLinks.map(({ label, href }) => {
              const hasDropdown = label === "Shop";
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-5 py-4 border-b border-line text-sm font-semibold text-ink hover:text-gold transition-colors"
                >
                  {label}
                  {hasDropdown && (
                    <ChevronDown size={18} className="text-subtle" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="px-5 pb-6">
            {/* Cart row */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCartOpen(true);
              }}
              className="w-full flex items-center justify-between py-4 border-b border-line cursor-pointer"
            >
              <span className="text-sm text-subtle">Cart</span>
              <div className="flex items-center gap-2">
                <BagIcon size={20} />
                {mounted && cartCount > 0 && (
                  <span className="w-6 h-6 bg-ink text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </div>
            </button>

            {/* Wishlist row */}
            <Link
              href="/account/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-4 border-b border-line"
            >
              <span className="text-sm text-subtle">Wishlist</span>
              <div className="flex items-center gap-2">
                <HeartIcon size={20} />
                {mounted && wishlistCount > 0 && (
                  <span className="w-6 h-6 bg-ink text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Sign In button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openSignIn();
              }}
              className="w-full h-14 bg-ink text-white flex items-center justify-center rounded-lg text-sm font-medium hover:bg-gold transition-colors mt-5 cursor-pointer"
            >
              Sign In
            </button>

            {/* Social icons */}
            <div className="flex items-center gap-5 mt-5">
              <a href="#" aria-label="Instagram" className="text-ink hover:text-subtle transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="Facebook" className="text-ink hover:text-subtle transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="YouTube" className="text-ink hover:text-subtle transition-colors">
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
