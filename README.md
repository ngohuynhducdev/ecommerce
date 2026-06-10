# 3legant — Furniture E-Commerce

A full-featured e-commerce storefront for a minimalist furniture brand, built with **Next.js 16 (App Router)**. Pixel-matched to the [3legant Figma community design](https://www.figma.com/design/4wdIrC2NdJVK6VVFuWxtX7/).

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Strapi](https://img.shields.io/badge/Strapi-v5-4945FF?logo=strapi&logoColor=white)

🔗 **Live demo:** _add your Vercel URL here_

> A portfolio project demonstrating a production-grade storefront: type-safe data layer with a swappable CMS, persisted client state, URL-driven filters, validated forms, and full SEO. Cart, orders, and reviews are simulated client-side (no payment backend) by design.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| State | Jotai + `atomWithStorage` (persisted to localStorage) |
| Forms | React Hook Form + Zod |
| Auth | NextAuth v5 (Credentials + Google OAuth ready) |
| CMS | Strapi v5 (toggled via `NEXT_PUBLIC_USE_STRAPI`) |
| Font | Poppins (Google Fonts) |

## Getting Started

```bash
# Install dependencies
yarn install

# Start the development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Auth (required)
AUTH_SECRET=your-secret-here

# Site URL (used for metadata, sitemap, robots, OG image)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Strapi CMS (optional — defaults to mock data)
NEXT_PUBLIC_USE_STRAPI=false
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Generate `AUTH_SECRET` with:

```bash
openssl rand -hex 32
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Homepage
│   ├── shop/             # Shop listing + product detail
│   ├── cart/             # Cart page
│   ├── checkout/         # Multi-step checkout (3 steps)
│   ├── order-success/    # Order confirmation
│   ├── account/          # Profile, orders, wishlist (protected)
│   ├── auth/             # Sign in / Sign up
│   ├── blog/             # Blog listing + post detail
│   └── contact/          # Contact page
├── features/
│   ├── products/         # ProductCard, ImageGallery, FilterSidebar, types, mock data
│   ├── cart/             # CartFlyout, atoms
│   ├── wishlist/         # atoms
│   ├── checkout/         # multi-step form, atoms
│   ├── blog/             # BlogCard, TableOfContents, ShareButtons, mock data
│   ├── contact/          # ContactForm
│   ├── account/          # AccountSidebar, WishlistCard
│   └── shared/           # Navbar, Footer, Breadcrumb, AnnouncementBar
└── lib/
    ├── api/              # products, categories, blog, coupons + strapi.ts (shared client)
    ├── site.ts          # canonical URL + metadata constants
    └── utils.ts          # cn(), formatPrice(), generateOrderId()
```

## Features

- **Search** — live product search from the navbar (desktop dropdown + mobile menu) routing to `/shop?q=`, matched against name, description, tags and category
- **Shop** — product grid with filter sidebar (category, price range, color, material, rating), URL-param filters, sort, load more
- **Product Detail** — image gallery with thumbnails, variant selector, quantity picker, Add to Cart, wishlist toggle, related products
- **Reviews** — write a review (star rating + comment) with React Hook Form + Zod validation, persisted to localStorage and rendered above seed reviews
- **Cart** — quantity controls, coupon codes (`SAVE10`, `FURNITURE20`), order summary, persistent via localStorage
- **Checkout** — 3-step flow: shipping → payment → review → animated order success page
- **Auth** — NextAuth v5 with mock credentials (any email + password ≥ 6 chars); protected `/account` routes via middleware
- **Account** — profile editor, order history with status filters, wishlist management
- **Blog** — featured post, article grid, full post with scroll-tracked table of contents, social share, related posts
- **Contact** — info cards, validated contact form, map placeholder
- **SEO** — per-page `generateMetadata`, dynamic OG image (`next/og`), `sitemap.xml`, `robots.txt`, SVG favicon, `generateStaticParams` for static generation
- **Performance** — `revalidate = 3600` on listing pages, skeleton loading states, fade-in page transitions
- **Error handling** — global 404 / error pages, product-specific not-found

## Coupon Codes

| Code | Discount |
|---|---|
| `SAVE10` | 10% off |
| `FURNITURE20` | 20% off |

## Strapi CMS Integration

All data functions in `src/lib/api/` check `NEXT_PUBLIC_USE_STRAPI`:

- `false` (default) — returns mock data, no network calls
- `true` — fetches from Strapi REST API at `NEXT_PUBLIC_STRAPI_URL`

Switching to Strapi requires zero UI changes.

## Architecture Highlights

A few decisions worth calling out:

- **Swappable data source** — every UI component imports from `lib/api/`; it never knows whether data comes from mock fixtures or Strapi. A single `NEXT_PUBLIC_USE_STRAPI` flag flips the whole app, and a shared `strapiGet()` helper handles fetch + graceful fallback to mock data.
- **Design tokens, no hardcoded colors** — the palette lives in `@theme` in `globals.css`, so Tailwind generates `bg-primary` / `text-muted` / `border-border` utilities. Rebrand by editing one file.
- **Server Components by default** — `"use client"` is added only where it's truly needed (Jotai reads, event handlers, browser APIs), keeping bundles lean.
- **URL-driven filters** — shop filters, sort, and search live in the URL (`/shop?category=...&q=...`), so any result set is shareable and bookmarkable — not trapped in component state.
- **Persisted client state** — cart, wishlist, orders, and reviews use Jotai `atomWithStorage`, surviving reloads without a backend.
- **Type-safe throughout** — TypeScript strict mode, zero `any`, all forms validated with Zod schemas.

## Screenshots

| Home | Shop | Product |
|---|---|---|
| _add image_ | _add image_ | _add image_ |

| Cart | Checkout | Order Success |
|---|---|---|
| _add image_ | _add image_ | _add image_ |

## Deploy

### Vercel (recommended)

Push to GitHub and import the repository at [vercel.com](https://vercel.com). Add the environment variables from `.env.local` in the Vercel project settings.

### Self-hosted

```bash
yarn build
yarn start
```
