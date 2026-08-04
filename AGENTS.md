## Project Overview

E-commerce website for furniture store based on 3legant Figma design (Community).
Minimalist, elegant UI with full shopping flow: browse → product → cart → checkout → order.
Figma reference: https://www.figma.com/design/4wdIrC2NdJVK6VVFuWxtX7/3legant-E-Commerce-UI-Design-Template--Community---Copy-

## Repositories

- Frontend: github.com/ngohuynhducdev/ecommerce — live at https://ecommerce-dexr.vercel.app (Vercel)
- CMS: github.com/ngohuynhducdev/ecommerce-cms — live at https://ecommerce-cms-7kba.onrender.com (Render + Neon Postgres + Cloudinary)

## Tech Stack

- Next.js 16 (App Router + Turbopack)
- TypeScript (strict mode — NO "any" allowed)
- Tailwind CSS v4 + shadcn/ui
- Jotai + atomWithStorage (state management, persisted to localStorage)
- React Hook Form + Zod (all form validation)
- next-auth v5 (credentials + Google OAuth)
- Strapi v5 CMS (toggled via NEXT_PUBLIC_USE_STRAPI env var)
- Vitest + happy-dom (unit) · Playwright (e2e purchase flow)
- GitHub Actions CI (lint/test/build + e2e jobs) · Dependabot security-only · MIT license

## Design System

Font : Poppins (Google Fonts) — weights 300/400/500/600/700
Primary : #1C1C1C (near black — buttons, headings)
Accent/Gold : #B88E2F (CTA hover, badges, Place Order button)
Background : #FFFFFF (main) / #F3F5F7 (secondary surfaces)
Surface : #FAFAFA (cards)
Border : #E8ECEF
Text muted : #6F6C6D (darkened from Figma's #807D7E for WCAG AA contrast)
Radius : 8px (sm) · 12px (md) · 16px (lg)
All tokens : CSS variables in src/app/globals.css
A11y bar : Lighthouse accessibility 100 on home + product — keep contrast ≥ 4.5:1, touch targets ≥ 24px, labels on form controls

## Coding Rules

1. NO TypeScript "any" — use proper types or "unknown"
2. Server Components by default — add "use client" only when truly needed
   Needs "use client": Jotai reads, event handlers, browser APIs, hooks
3. Data fetching ONLY in lib/api/ — never fetch directly inside components
4. All images MUST use next/image with proper width, height, alt, sizes props
5. Conventional Commits: feat / fix / chore / refactor / style
6. One feature per branch → one PR per branch → merge to main
7. No hardcoded colors — always use CSS variables or Tailwind with design tokens
8. Forms always use React Hook Form + Zod schema validation
9. Persist cart, wishlist and coupon with atomWithStorage (jotai/utils)
10. URL search params for shop filters — NOT Jotai (makes filters shareable)
11. Keep the Playwright purchase-flow suite green (e2e/shopping-flow.spec.ts) — it runs in CI on every PR
12. New remote image hosts must be whitelisted in next.config.ts (currently: unsplash, picsum, res.cloudinary.com, localhost:1337)

## Project Structure

src/
├── app/ Next.js App Router pages
│ ├── page.tsx Homepage
│ ├── shop/ Shop listing + product detail
│ ├── cart/ Cart page
│ ├── checkout/ Multi-step checkout
│ ├── order-success/ Order confirmation
│ ├── account/ My Account (profile, orders, wishlist)
│ ├── auth/ Sign In / Sign Up
│ ├── blog/ Blog listing + post
│ └── contact/ Contact page
├── features/
│ ├── products/
│ │ ├── components/ ProductCard, CategoryCard, ImageGallery, FilterSidebar...
│ │ ├── types.ts Product, Category, Variant, CartItem, WishlistItem, Order
│ │ └── mock-data.ts 12 mock products across 4 categories
│ ├── cart/
│ │ ├── components/ CartFlyout, CartItem...
│ │ └── atoms.ts cartItemsAtom, cartOpenAtom, cartCountAtom, cartSubtotalAtom, couponAtom
│ ├── wishlist/
│ │ └── atoms.ts wishlistAtom, wishlistCountAtom
│ ├── auth/
│ │ └── components/ SignInForm, SignUpForm
│ └── shared/
│ └── components/ Navbar, Footer, AnnouncementBar, Breadcrumb
└── lib/
├── api/
│ ├── products.ts getProducts, getProductBySlug, getFeaturedProducts, getBestsellers, getRelatedProducts
│ └── categories.ts getCategories
└── utils.ts cn(), formatPrice(), generateOrderId()...

## Data Layer Pattern

All data functions in lib/api/ check USE_STRAPI env var:
NEXT_PUBLIC_USE_STRAPI=false → return filtered mock data (local default)
NEXT_PUBLIC_USE_STRAPI=true → fetch from Strapi REST API (production since Jul 2026)
UI components NEVER know where data comes from.
Every Strapi fetch falls back to mock on error — the app never hard-breaks.
Strapi calls are server-side only (token stays out of the browser); coupons
are validated through the internal route /api/coupons/validate.
ISR revalidate 3600 masks Render free-tier cold starts (~50s).

## Jotai Atoms Reference

Cart : cartItemsAtom (CartItem[], persisted) · cartOpenAtom (bool) · cartCountAtom (derived) · cartSubtotalAtom (derived)
Wishlist : wishlistAtom (WishlistItem[], persisted) · wishlistCountAtom (derived)
Coupon : couponAtom ({ code, discount, type } | null, persisted)
Checkout : checkoutStepAtom (1 | 2 | 3) · shippingDataAtom · ordersAtom (persisted)
UI : announcementVisibleAtom (bool)

## Key Components (update as built)

[x] Navbar features/shared/components/navbar.tsx
[x] Footer features/shared/components/footer.tsx
[x] ProductCard features/products/components/product-card.tsx
[x] CartFlyout features/cart/components/cart-flyout.tsx
[x] ImageGallery features/products/components/image-gallery.tsx
[x] FilterSidebar features/products/components/filter-sidebar.tsx
[x] AddToCartSection features/products/components/add-to-cart-section.tsx

## Environment Variables

NEXT_PUBLIC_USE_STRAPI=false
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_SITE_URL=          # canonical URL for metadataBase / sitemap / robots

## Sitemap

/ Homepage
/shop Product listing with filters
/shop/[slug] Product detail
/cart Shopping cart
/checkout Multi-step checkout (3 steps)
/order-success Order confirmation
/account Profile (protected)
/account/orders Order history (protected)
/account/wishlist Wishlist (protected)
/auth/sign-in Sign in
/auth/sign-up Sign up
/blog Blog listing
/blog/[slug] Blog post
/contact Contact page

## Current Phase

✅ All phases (00–17) complete + post-launch hardening (Jul 2026) done.
Maintenance mode: keep CI green; upgrade dependencies deliberately rather
than on a weekly bot cadence.
Project is a portfolio piece — prefer small reviewed PRs over bulk changes.

Dependency policy (since Jul 2026): scheduled version-update PRs are OFF —
.github/dependabot.yml was removed on purpose, not forgotten. Dependabot
security updates stay ON (a repo setting, independent of that file), so
CVE fixes still arrive as PRs. Routine bumps are done by hand, which means
pinned GitHub Actions versions in .github/workflows/ci.yml no longer get
bumped for you — check them when touching CI.

## Phase Progress

[x] Phase 00 — Project Init + Design System branch: feat/project-setup
[x] Phase 01 — TypeScript Types + Mock Data branch: feat/data-layer
[x] Phase 02 — Navbar Desktop + Mega Menu branch: feat/navbar-desktop
[x] Phase 03 — Navbar Mobile + Cart Flyout branch: feat/navbar-mobile-cart
[x] Phase 04 — Footer branch: feat/footer
[x] Phase 05 — Homepage Hero + Features + Categories branch: feat/home-hero
[x] Phase 06 — Homepage Products + Blog + Newsletter branch: feat/home-sections
[x] Phase 07 — Shop Page + Filter branch: feat/shop-filter
[x] Phase 08 — Product Detail Page branch: feat/product-detail
[x] Phase 09 — Cart Page branch: feat/cart
[x] Phase 10 — Checkout Multi Step branch: feat/checkout
[x] Phase 11 — Order Success + Auth branch: feat/auth-order-success
[x] Phase 12 — My Account branch: feat/account
[x] Phase 13 — Blog + Contact branch: feat/blog-contact
[x] Phase 14 — Skeleton + Error + SEO branch: feat/polish
[x] Phase 15 — Final Cleanup branch: feat/cleanup
[x] Phase 16 — Strapi CMS Setup branch: feat/strapi-setup
[x] Phase 17 — Strapi Integration branch: feat/strapi-integration

Post-launch hardening (Jul 2026):
[x] Dependency update (vulns 7→1) branch: chore/deps-update
[x] Dependabot (npm + github-actions) branch: chore/dependabot
    (version updates later switched off — see Dependency policy above)
[x] Playwright e2e + CI job branch: feat/e2e-tests
[x] Lighthouse fixes — a11y 100 branch: fix/lighthouse
[x] MIT LICENSE + engines branch: chore/license-engines
[x] Blog image alt text branch: fix/blog-alt-text
[x] Architecture diagram + workflow docs branch: docs/*
[x] Cloudinary image host whitelist branch: fix/cloudinary-image-domain
[x] Production switched to live Strapi (Vercel env, no code change)
CMS side: Strapi 5.43→5.50.1 (vulns 100→17), coupon token lockdown,
CORS whitelist, CI build check, seed-media backfill to Cloudinary.

## Notes

- Images: mock data uses images.unsplash.com; Strapi media lives on Cloudinary
  (auto-seeded by the CMS's seedMedia bootstrap — see ecommerce-cms src/index.ts)
- Coupon codes for testing: SAVE10 (10% off), FURNITURE20 (20% off)
  (coupons need the API token in Strapi mode — public read is revoked)
- Mock auth: any email + password >= 6 characters = login success
- Place Order button uses accent gold #B88E2F (NOT primary black)
- Shop filter uses URL params: /shop?category=living-room&maxPrice=500
- Vercel project is named "ecommerce" but keeps the ecommerce-dexr.vercel.app domain
- Production env (Vercel): NEXT_PUBLIC_USE_STRAPI=true + Render URL + read-only token
