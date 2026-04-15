<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# Project: Home Interior Ecommerce

## Tech Stack

| Layer           | Technology                                                               |
| --------------- | ------------------------------------------------------------------------ |
| Framework       | Next.js 16.2.3 (App Router)                                              |
| Language        | TypeScript 5 (strict mode)                                               |
| Styling         | Tailwind CSS v4 — use `@import "tailwindcss"` NOT `@tailwind` directives |
| UI Components   | shadcn/ui (components go in `components/ui/`)                            |
| Global State    | Jotai v2 — atoms in `store/` folder                                      |
| Backend/CMS     | Strapi (headless CMS, REST API)                                          |
| Package Manager | Yarn                                                                     |

## Critical Rules

- **Tailwind v4**: `globals.css` uses `@import "tailwindcss"` and `@theme inline { }`. Do NOT use `tailwind.config.js` — theme tokens go inside `@theme` in CSS.
- **Server Components by default**: All `app/` files are Server Components unless `"use client"` is declared. Only add `"use client"` when you need state, effects, or event handlers.
- **Strapi API**: Base URL from `process.env.NEXT_PUBLIC_STRAPI_URL`. Never hardcode URLs. Use `lib/api/strapi.ts` as the single API client.
- **Jotai**: Wrap the app with `<JotaiProvider>` in `app/layout.tsx`. Define atoms in `store/` directory. Use `atomWithStorage` for cart/wishlist persistence.
- **Path alias**: `@/*` maps to project root. Always use `@/components/...`, `@/lib/...`, etc.
- **No `any` type**: TypeScript strict mode is enabled. All Strapi response types must be defined in `lib/types/`.
- **shadcn/ui install command**: `npx shadcn@latest add <component>` — never manually copy component code.

## Folder Structure

```
app/
  (auth)/              # Auth group — no shared layout with shop
    login/page.tsx
    register/page.tsx
  (shop)/              # Shop group — uses shop layout (header + footer)
    page.tsx           # Homepage
    products/
      page.tsx         # All products listing
      [slug]/page.tsx  # Product detail
    categories/
      [slug]/page.tsx  # Category listing
    cart/page.tsx
    checkout/page.tsx
    orders/
      page.tsx         # Order history
      [id]/page.tsx    # Order detail
    account/page.tsx   # User profile
    search/page.tsx
  api/                 # Next.js Route Handlers (if needed)
  globals.css
  layout.tsx           # Root layout — JotaiProvider here
  not-found.tsx

components/
  ui/                  # shadcn generated components (do not edit manually)
  layout/
    Header/
    Footer/
    MobileMenu/        # Fly/drawer menu for mobile
  home/
    HeroBanner/
    FeaturedCategories/
    FeaturedProducts/
    PromoBanner/
    Newsletter/
  product/
    ProductCard/
    ProductGallery/
    ProductFilters/
    VariantSelector/
  cart/
    CartDrawer/
    CartItem/
  auth/
    LoginForm/
    RegisterForm/

lib/
  api/
    strapi.ts          # Base fetch wrapper with auth headers
    products.ts        # Product-specific API calls
    categories.ts
    banners.ts
    auth.ts
    orders.ts
  types/
    product.ts
    category.ts
    cart.ts
    user.ts
    order.ts
    strapi.ts          # Generic Strapi response wrappers

store/
  cart.ts              # cartAtom (atomWithStorage)
  wishlist.ts          # wishlistAtom (atomWithStorage)
  auth.ts              # userAtom, tokenAtom
  ui.ts                # mobileMenuOpenAtom, cartDrawerOpenAtom

hooks/
  useCart.ts
  useWishlist.ts
  useAuth.ts

public/
  images/
```

## Environment Variables

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=<public read token>
STRAPI_ADMIN_TOKEN=<server-only admin token>
```

## Code Conventions

- Component files: PascalCase (`ProductCard.tsx`). If the component needs sub-files, use a folder: `ProductCard/index.tsx`.
- Utility functions: camelCase in `lib/utils/`.
- Strapi REST response shape: `{ data: T | T[], meta: { pagination: {...} } }`. Always unwrap via typed helpers in `lib/api/strapi.ts`.
- Price formatting: always use `Intl.NumberFormat` with VND locale — helper in `lib/utils/formatPrice.ts`.
- Images: always use `next/image`. Configure `remotePatterns` in `next.config.ts` for Strapi uploads domain.

## Reference Designs

| File                                 | Description                       |
| ------------------------------------ | --------------------------------- |
| `reference/Homepage 01.jpg`          | Desktop homepage layout           |
| `reference/Homepage 01 (mobile).jpg` | Mobile homepage layout            |
| `reference/Fly menu (mobile).jpg`    | Mobile drawer/fly navigation menu |
