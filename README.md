# 3legant Furniture Store

[![CI](https://github.com/ngohuynhducdev/ecommerce/actions/workflows/ci.yml/badge.svg)](https://github.com/ngohuynhducdev/ecommerce/actions/workflows/ci.yml)

**🔗 Live demo: [ecommerce-dexr.vercel.app](https://ecommerce-dexr.vercel.app)**

A full-featured e-commerce storefront for a minimalist furniture brand, built with Next.js 16 App Router. Based on the [3legant Figma community design](https://www.figma.com/design/4wdIrC2NdJVK6VVFuWxtX7/).

> The live demo runs on mock data (`NEXT_PUBLIC_USE_STRAPI=false`) — sign in with any email + a 6+ character password; card payments are simulated.

![3legant storefront](docs/screenshots/home.png)

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
    ├── api/              # products.ts, categories.ts, blog.ts (Strapi-ready)
    └── utils.ts          # cn(), formatPrice(), generateOrderId()
```

## Features

- **Shop** — product grid with filter sidebar (category, price range, color, material, rating), URL-param filters, sort, load more
- **Product Detail** — image gallery with thumbnails, variant selector, quantity picker, Add to Cart, wishlist toggle, related products, tabbed reviews
- **Cart** — quantity controls, coupon codes (`SAVE10`, `FURNITURE20`), order summary, persistent via localStorage
- **Checkout** — 3-step flow: shipping → payment → review → animated order success page
- **Auth** — NextAuth v5 with mock credentials (any email + password ≥ 6 chars); protected `/account` routes via middleware
- **Account** — profile editor, order history with status filters, wishlist management
- **Blog** — featured post, article grid, full post with scroll-tracked table of contents, social share, related posts
- **Contact** — info cards, validated contact form, map placeholder
- **SEO** — `generateMetadata` on every page, `og:image` for product and blog pages, `generateStaticParams` for static generation
- **Performance** — `revalidate = 3600` on listing pages, skeleton loading states, fade-in page transitions
- **Error handling** — global 404 / error pages, product-specific not-found

## Coupon Codes

| Code | Discount |
|---|---|
| `SAVE10` | 10% off |
| `FURNITURE20` | 20% off |

## Testing

Unit tests run on [Vitest](https://vitest.dev) and cover the data layer
(`lib/api` filtering/sorting/fallbacks), Jotai atoms (cart totals,
localStorage persistence), and utilities.

```bash
yarn test        # run once
yarn test:watch  # watch mode
```

## Data layer (mock ⇄ CMS)

The UI never talks to a data source directly — every read goes through
`src/lib/api/`, which switches on `NEXT_PUBLIC_USE_STRAPI`:

- **`false` (default)** — resolves from typed mock data in the repo. No
  network, no backend, instant. Every fetch also falls back to mock if a
  Strapi request fails, so the app never hard-breaks.
- **`true`** — fetches from a Strapi v5 REST API at
  `NEXT_PUBLIC_STRAPI_URL`, mapping Strapi's response shapes to the same
  domain types.

Because both paths return identical types, **switching sources requires
zero UI changes** — the components don't know where data comes from.

**The CMS is optional by design.** The live demo runs on mock data for
speed and stability (no cold starts, nothing to keep alive). The Strapi
project — content types, controllers, seed content — lives in a separate
repo:
[`ecommerce-cms`](https://github.com/ngohuynhducdev/ecommerce-cms). Flip
`NEXT_PUBLIC_USE_STRAPI=true` and point `NEXT_PUBLIC_STRAPI_URL` at a
running instance to source content from the CMS instead.

## Screenshots

| Shop | Product detail |
|---|---|
| ![Shop](docs/screenshots/shop.png) | ![Product detail](docs/screenshots/product.png) |

<p align="center"><img src="docs/screenshots/mobile.png" width="300" alt="Mobile" /></p>

## Deploy

### Vercel (recommended)

Import the repo at [vercel.com](https://vercel.com) — Next.js is
detected automatically. Set these environment variables:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_USE_STRAPI` | `false` |
| `NEXT_PUBLIC_SITE_URL` | your Vercel URL (for `metadataBase` / sitemap) |
| `AUTH_SECRET` | `openssl rand -hex 32` |

`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` are only needed for Google
sign-in. See `.env.example` for the full list.

### Self-hosted

```bash
yarn build
yarn start
```
