import Link from "next/link";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <polygon points="10,9 15,12 10,15" fill="currentColor" stroke="none" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Product", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  { icon: <InstagramIcon />, href: "#", label: "Instagram" },
  { icon: <FacebookIcon />, href: "#", label: "Facebook" },
  { icon: <YouTubeIcon />, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-[#1C1C1C]">
      {/* Main row */}
      <div className="px-8 lg:px-20 pt-10 pb-8">
        {/* Desktop: single row — Logo | divider | tagline | nav links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="flex items-baseline gap-0.5 shrink-0">
            <span className="text-xl font-semibold tracking-tight text-white">3legant</span>
            <span className="text-[#B88E2F] text-xl font-semibold">.</span>
          </Link>
          <div className="w-px h-6 bg-[#6C7275] shrink-0" />
          <span className="text-sm text-[#6C7275] shrink-0">Gift &amp; Decoration Store</span>
          <nav className="flex items-center gap-8 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white hover:text-[#B88E2F] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile: stacked, centered */}
        <div className="lg:hidden flex flex-col items-center text-center gap-6">
          <Link href="/" className="flex items-baseline gap-0.5">
            <span className="text-2xl font-semibold tracking-tight text-white">3legant</span>
            <span className="text-[#B88E2F] text-2xl font-semibold">.</span>
          </Link>
          <div className="w-8 h-px bg-[#6C7275]" />
          <span className="text-sm text-[#6C7275]">Gift &amp; Decoration Store</span>
          <nav className="flex flex-col items-center gap-5 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base text-white hover:text-[#B88E2F] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#6C7275]/30 px-8 lg:px-20 py-5">
        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between">
          <p className="text-sm text-[#6C7275]">
            Copyright © 2023 3legant. All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm font-semibold text-white hover:text-[#B88E2F] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm font-semibold text-white hover:text-[#B88E2F] transition-colors">
              Terms of Use
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-white hover:text-[#B88E2F] transition-colors"
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex flex-col items-center gap-5">
          <div className="w-full h-px bg-[#6C7275]/30" />
          <div className="flex items-center gap-6">
            {socialLinks.map(({ icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-white hover:text-[#B88E2F] transition-colors"
              >
                {icon}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm font-semibold text-white hover:text-[#B88E2F] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm font-semibold text-white hover:text-[#B88E2F] transition-colors">
              Terms of Use
            </Link>
          </div>
          <p className="text-sm text-[#6C7275]">
            Copyright © 2023 3legant. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
