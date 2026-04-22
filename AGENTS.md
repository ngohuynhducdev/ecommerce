## Project Overview

E-commerce website for furniture store based on 3legant Figma design (Community).
Minimalist, elegant UI with full shopping flow: browse → product → cart → checkout → order.
Figma reference: https://www.figma.com/design/4wdIrC2NdJVK6VVFuWxtX7/3legant-E-Commerce-UI-Design-Template--Community---Copy-

## Repositories

- Frontend: github.com/<your-username>/ecommerce
- CMS: github.com/<your-username>/ecommerce-cms

## Tech Stack

- Next.js 16 (App Router + Turbopack)
- TypeScript (strict mode — NO "any" allowed)
- Tailwind CSS v4 + shadcn/ui
- Jotai + atomWithStorage (state management, persisted to localStorage)
- React Hook Form + Zod (all form validation)
- next-auth v5 (credentials + Google OAuth)
- Strapi v5 CMS (toggled via NEXT_PUBLIC_USE_STRAPI env var)

## Design System

Font : Poppins (Google Fonts) — weights 300/400/500/600/700
Primary : #1C1C1C (near black — buttons, headings)
Accent/Gold : #B88E2F (CTA hover, badges, Place Order button)
Background : #FFFFFF (main) / #F3F5F7 (secondary surfaces)
Surface : #FAFAFA (cards)
Border : #E8ECEF
Text muted : #807D7E
Radius : 8px (sm) · 12px (md) · 16px (lg)
All tokens : CSS variables in src/app/globals.css

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
9. Persist cart and wishlist with atomWithStorage (jotai/utils)
10. URL search params for shop filters — NOT Jotai (makes filters shareable)

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
NEXT_PUBLIC_USE_STRAPI=false → return filtered mock data (default)
NEXT_PUBLIC_USE_STRAPI=true → fetch from Strapi REST API
UI components NEVER know where data comes from.
This pattern means Strapi integration requires ZERO UI changes.

## Jotai Atoms Reference

Cart : cartItemsAtom (CartItem[], persisted) · cartOpenAtom (bool) · cartCountAtom (derived) · cartSubtotalAtom (derived)
Wishlist : wishlistAtom (WishlistItem[], persisted) · wishlistCountAtom (derived)
Coupon : couponAtom ({ code, discount, type } | null)
Checkout : checkoutStepAtom (1 | 2 | 3) · shippingDataAtom · ordersAtom (persisted)
UI : announcementVisibleAtom (bool)

## Key Components (update as built)

[ ] Navbar features/shared/components/navbar.tsx
[ ] Footer features/shared/components/footer.tsx
[ ] ProductCard features/products/components/product-card.tsx
[ ] CartFlyout features/cart/components/cart-flyout.tsx
[ ] ImageGallery features/products/components/image-gallery.tsx
[ ] FilterSidebar features/products/components/filter-sidebar.tsx
[ ] AddToCartSection features/products/components/add-to-cart-section.tsx

## Environment Variables

NEXT_PUBLIC_USE_STRAPI=false
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

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

⏳ Phase 00 — Project Init + Design System
(Update this after completing each phase)

## Phase Progress

[ ] Phase 00 — Project Init + Design System branch: feat/project-setup
[ ] Phase 01 — TypeScript Types + Mock Data branch: feat/data-layer
[ ] Phase 02 — Navbar Desktop + Mega Menu branch: feat/navbar-desktop
[ ] Phase 03 — Navbar Mobile + Cart Flyout branch: feat/navbar-mobile-cart
[ ] Phase 04 — Footer branch: feat/footer
[ ] Phase 05 — Homepage Hero + Features + Categories branch: feat/home-hero
[ ] Phase 06 — Homepage Products + Blog + Newsletter branch: feat/home-sections
[ ] Phase 07 — Shop Page + Filter branch: feat/shop-filter
[ ] Phase 08 — Product Detail Page branch: feat/product-detail
[ ] Phase 09 — Cart Page branch: feat/cart
[ ] Phase 10 — Checkout Multi Step branch: feat/checkout
[ ] Phase 11 — Order Success + Auth branch: feat/auth-order-success
[ ] Phase 12 — My Account branch: feat/account
[ ] Phase 13 — Blog + Contact branch: feat/blog-contact
[ ] Phase 14 — Skeleton + Error + SEO branch: feat/polish
[ ] Phase 15 — Final Cleanup branch: feat/cleanup
[ ] Phase 16 — Strapi CMS Setup branch: feat/strapi-setup
[ ] Phase 17 — Strapi Integration branch: feat/strapi-integration

## Notes

- Images: use picsum.photos/seed/{slug}/800/800 for mock product images
- Coupon codes for testing: SAVE10 (10% off), FURNITURE20 (20% off)
- Mock auth: any email + password >= 6 characters = login success
- Place Order button uses accent gold #B88E2F (NOT primary black)
- Shop filter uses URL params: /shop?category=living-room&maxPrice=500
