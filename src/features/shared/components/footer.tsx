"use client";

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
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

const needHelpLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Track Order", href: "/account/orders" },
  { label: "Returns & Refunds", href: "/contact" },
  { label: "FAQs", href: "/contact" },
  { label: "Career", href: "/contact" },
];

const companyLinks = [
  { label: "About Us", href: "/contact" },
  { label: "Press", href: "/blog" },
  { label: "Affiliates", href: "/contact" },
  { label: "Partners", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const paymentMethods = ["Visa", "Mastercard", "PayPal", "Apple Pay"];

export function Footer() {
  return (
    <footer className="bg-[#F3F5F7] border-t border-[#E8ECEF] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 — Brand */}
          <div>
            <Link href="/" className="inline-flex items-baseline gap-0.5">
              <span className="text-xl font-semibold tracking-tight text-[#1C1C1C]">3legant</span>
              <span className="text-[#B88E2F] text-xl font-semibold">°</span>
            </Link>
            <p className="text-sm text-[#807D7E] mt-2">Simply Unique / Simply Better.</p>
            <p className="text-sm text-[#807D7E] mt-3 max-w-xs">
              3legant is a gift &amp; decorations store based in HCMC, Vietnam. Est since 2019.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <button className="text-[#807D7E] hover:text-[#1C1C1C] transition-colors cursor-pointer" aria-label="Instagram">
                <InstagramIcon />
              </button>
              <button className="text-[#807D7E] hover:text-[#1C1C1C] transition-colors cursor-pointer" aria-label="Facebook">
                <FacebookIcon />
              </button>
              <button className="text-[#807D7E] hover:text-[#1C1C1C] transition-colors cursor-pointer" aria-label="Twitter">
                <TwitterIcon />
              </button>
              <button className="text-[#807D7E] hover:text-[#1C1C1C] transition-colors cursor-pointer" aria-label="Pinterest">
                <PinterestIcon />
              </button>
            </div>
          </div>

          {/* Column 2 — Need Help */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#1C1C1C]">
              Need Help
            </h3>
            <nav>
              {needHelpLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-[#807D7E] hover:text-[#1C1C1C] py-1.5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#1C1C1C]">
              Company
            </h3>
            <nav>
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-[#807D7E] hover:text-[#1C1C1C] py-1.5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4 — Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-[#1C1C1C] mb-2">Join Our Newsletter</h3>
            <p className="text-sm text-[#807D7E] mb-4">
              Sign up for deals, new products and promotions.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full h-11 border border-[#E8ECEF] rounded-sm px-3 text-sm bg-white outline-none focus:border-[#1C1C1C] transition-colors"
              />
              <button
                type="submit"
                className="w-full h-11 bg-[#1C1C1C] text-white text-sm mt-3 rounded-sm hover:bg-[#333] transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-[#807D7E] mt-2">
              By subscribing you agree to our Privacy Policy.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E8ECEF] mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#807D7E]">
            © 2024 3legant. All Rights Reserved.
          </p>
          <div className="flex gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="text-xs border border-[#E8ECEF] rounded px-2 py-1 text-[#807D7E]"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
