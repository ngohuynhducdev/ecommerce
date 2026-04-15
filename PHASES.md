# Home Interior Ecommerce — Feature List & Development Phases

> Tech Stack: Next.js 16.2.3 · TypeScript · Tailwind CSS v4 · Jotai v2 · shadcn/ui · Strapi (Backend/CMS)

---

## Feature List

| #   | Feature             | Description                                                                    |
| --- | ------------------- | ------------------------------------------------------------------------------ |
| 1   | **Homepage**        | Hero banner, featured categories, featured products, promo section, newsletter |
| 2   | **Navigation**      | Desktop navbar with mega-menu, mobile fly/drawer menu                          |
| 3   | **Footer**          | Links, social icons, contact info, newsletter                                  |
| 4   | **Product Listing** | Browse by category, filter (price, color, material), sort, pagination          |
| 5   | **Product Detail**  | Image gallery, variant selector, add to cart, add to wishlist, reviews         |
| 6   | **Search**          | Search bar with autocomplete, full-text results page                           |
| 7   | **Shopping Cart**   | Slide-over cart drawer, cart page, quantity update, remove item                |
| 8   | **Wishlist**        | Save products, persisted with Jotai atomWithStorage                            |
| 9   | **Authentication**  | Register, Login, Logout, JWT token via Strapi                                  |
| 10  | **User Account**    | Profile page, edit info, change password                                       |
| 11  | **Checkout**        | Address form, shipping method, order summary, payment placeholder              |
| 12  | **Orders**          | Order history list, order detail page                                          |
| 13  | **Strapi CMS**      | Products, categories, banners, reviews, orders managed via Strapi              |
| 14  | **SEO**             | Dynamic metadata per page, Open Graph, structured data                         |
| 15  | **Responsive UI**   | Mobile-first, all breakpoints from the reference designs                       |

---

## Development Phases

---

### Phase 0 — Project Foundation Setup

**English:**
Install all required dependencies, configure the folder structure, set up Tailwind v4 design tokens (colors, typography, spacing), add Jotai provider to the root layout, initialize shadcn/ui, and create the `.env.local` template. This phase produces zero visible UI but ensures every subsequent phase builds on a consistent base.

**Tiếng Việt:**
Cài đặt toàn bộ dependencies cần thiết, tạo cấu trúc thư mục, cấu hình design token Tailwind v4 (màu sắc, font, spacing), thêm Jotai provider vào root layout, khởi tạo shadcn/ui, và tạo file `.env.local` mẫu. Phase này chưa có UI nhưng đặt nền tảng đồng nhất cho toàn bộ project.

**Prompt:**

```
You are setting up the foundation for a Home Interior Ecommerce built with Next.js 16.2.3 (App Router), TypeScript strict mode, Tailwind CSS v4, Jotai v2, and shadcn/ui. The backend is Strapi.

Tasks:
1. Install dependencies: `yarn add jotai` and `yarn add -D @types/node`. Initialize shadcn/ui with `npx shadcn@latest init` (use "New York" style, CSS variables on).
2. Create the full folder structure as defined in AGENTS.md (app/(auth), app/(shop), components/layout, components/home, components/product, components/cart, components/auth, lib/api, lib/types, lib/utils, store, hooks, public/images).
3. In `app/globals.css`, extend `@theme` with the home interior brand palette: warm neutrals, accent earth tones, and clean typography using a serif for headings and sans-serif for body.
4. Create `app/layout.tsx` as the root layout: wrap children in a JotaiProvider (import from `jotai`). Set default metadata (site name, description).
5. Create `store/ui.ts` with `mobileMenuOpenAtom` and `cartDrawerOpenAtom` (plain Jotai atoms).
6. Create `store/cart.ts` with `cartAtom` using `atomWithStorage` from `jotai/utils`.
7. Create `store/wishlist.ts` with `wishlistAtom` using `atomWithStorage`.
8. Create `store/auth.ts` with `userAtom` and `tokenAtom` (plain atoms, initial value null).
9. Create `lib/utils/cn.ts` re-exporting `clsx` + `tailwind-merge` (shadcn standard).
10. Create `lib/utils/formatPrice.ts` — a `formatVND(amount: number): string` function using `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`.
11. Create `.env.local` with: NEXT_PUBLIC_STRAPI_URL, NEXT_PUBLIC_STRAPI_TOKEN, STRAPI_ADMIN_TOKEN (empty values as placeholders).
12. Update `next.config.ts` to add `remotePatterns` for `localhost:1337` (Strapi uploads).

Do NOT build any UI pages yet. Only foundation setup.
```

---

### Phase 1 — Strapi API Integration Layer

**English:**
Build the complete typed API client for Strapi. Define TypeScript interfaces for all entities (Product, Category, Banner, User, Order). Create individual API modules for each resource. All data fetching should use native `fetch` with `cache` options appropriate for each use case (ISR for products/categories, no-cache for cart/orders).

**Tiếng Việt:**
Xây dựng API client hoàn chỉnh, có TypeScript type, cho Strapi. Định nghĩa interface cho tất cả entities (Product, Category, Banner, User, Order). Tạo module API riêng cho từng resource. Fetch dữ liệu dùng `fetch` native với `cache` phù hợp từng trường hợp (ISR cho products/categories, no-cache cho cart/orders).

**Prompt:**

```
Build the complete Strapi API integration layer for the Home Interior Ecommerce.

1. Create `lib/types/strapi.ts` — generic wrappers:
   - StrapiResponse<T> = { data: T; meta: { pagination?: StrapiPagination } }
   - StrapiItem<T> = { id: number; attributes: T; documentId: string }
   - StrapiPagination = { page: number; pageSize: number; pageCount: number; total: number }
   - StrapiImage = { data: StrapiItem<{ url: string; alternativeText: string; width: number; height: number }> }

2. Create `lib/types/product.ts`:
   - ProductAttributes: name, slug, description, price, compareAtPrice (optional), stock, images (StrapiImage[]), variants (JSON), isFeatured, category (relation)
   - ProductItem = StrapiItem<ProductAttributes>

3. Create `lib/types/category.ts`:
   - CategoryAttributes: name, slug, description, image (StrapiImage), products (relation)
   - CategoryItem = StrapiItem<CategoryAttributes>

4. Create `lib/types/user.ts`:
   - User: id, email, username, firstName, lastName, phone, address (optional)
   - AuthResponse: jwt, user

5. Create `lib/types/order.ts`:
   - OrderItem: productId, name, slug, price, quantity, image
   - OrderAttributes: status (enum), total, items (OrderItem[]), shippingAddress, user (relation), createdAt
   - OrderItem = StrapiItem<OrderAttributes>

6. Create `lib/types/cart.ts` (client-side, not Strapi):
   - CartItem: productId, name, slug, price, quantity, image, variant (optional)
   - Cart: items: CartItem[], total: number

7. Create `lib/api/strapi.ts` — base fetch client:
   - strapiUrl(path: string): string — builds full URL
   - strapiGet<T>(endpoint: string, params?: Record<string, string>, options?: RequestInit): Promise<T>
   - strapiPost<T>(endpoint: string, body: unknown, token?: string): Promise<T>
   - Headers: always include Authorization if NEXT_PUBLIC_STRAPI_TOKEN present

8. Create `lib/api/products.ts`:
   - getProducts(params?: { page?, pageSize?, category?, featured? }): fetches /api/products with populate=images,category, returns StrapiResponse<ProductItem[]>
   - getProductBySlug(slug: string): fetches /api/products?filters[slug][$eq]=slug&populate=*
   - getFeaturedProducts(): getProducts({ featured: true, pageSize: 8 })

9. Create `lib/api/categories.ts`:
   - getCategories(): fetches /api/categories?populate=image
   - getCategoryBySlug(slug: string)

10. Create `lib/api/banners.ts`:
    - getBanners(): fetches /api/banners?populate=image&filters[active][$eq]=true

11. Create `lib/api/auth.ts`:
    - loginUser(email: string, password: string): POST /api/auth/local
    - registerUser(data: {...}): POST /api/auth/local/register
    - getMe(token: string): GET /api/users/me

12. Create `lib/api/orders.ts`:
    - getOrders(token: string): GET /api/orders?populate=*&sort=createdAt:desc
    - getOrderById(id: string, token: string)
    - createOrder(data: {...}, token: string)

All functions must be fully typed. No `any`. Use `fetch` with `next: { revalidate: 60 }` for public data (products, categories) and `cache: 'no-store'` for private data (orders, me).
```

---

### Phase 2 — Core Layout & Navigation

**English:**
Build the site-wide layout: desktop header with logo, search bar, cart icon with item count, user icon, and navigation links. Build the mobile fly/drawer menu matching the reference design. Build the footer. Wire up the Jotai atoms for cart drawer and mobile menu open state. Create the `(shop)` route group layout that wraps all shop pages.

**Tiếng Việt:**
Xây dựng layout toàn site: desktop header với logo, thanh tìm kiếm, icon giỏ hàng hiển thị số lượng, icon user, và navigation links. Xây dựng mobile fly/drawer menu theo reference design. Xây dựng footer. Kết nối Jotai atoms cho trạng thái mở cart drawer và mobile menu. Tạo layout cho route group `(shop)`.

**Prompt:**

```
Build the core layout and navigation components for the Home Interior Ecommerce. Reference designs are in /reference/.

1. `components/layout/Header/index.tsx` (Client Component):
   - Logo (text or SVG) on the left
   - Navigation links in the center: Home, Products, Categories (with dropdown), About, Contact
   - Right side: Search icon (opens search bar), Wishlist icon, Cart icon (shows item count badge from cartAtom), User icon (shows avatar or login link)
   - Sticky on scroll, white background, subtle shadow
   - On mobile (< md): hide nav links, show hamburger icon that triggers mobileMenuOpenAtom

2. `components/layout/MobileMenu/index.tsx` (Client Component):
   - Uses shadcn Sheet component (slide from left)
   - Opens/closes via mobileMenuOpenAtom
   - Shows full navigation tree: Home, Products, Categories list, Account, Cart
   - Match the Fly menu reference design

3. `components/layout/Footer/index.tsx` (Server Component):
   - 4-column layout on desktop, stacked on mobile
   - Columns: About the brand, Shop links, Customer service links, Contact + social icons
   - Bottom bar: copyright, payment method icons

4. `components/cart/CartDrawer/index.tsx` (Client Component):
   - Uses shadcn Sheet component (slide from right)
   - Opens/closes via cartDrawerOpenAtom
   - Lists CartItems from cartAtom
   - Shows subtotal, "View Cart" button, "Checkout" button
   - Empty state when no items

5. `components/cart/CartItem/index.tsx`:
   - Product image, name, variant, price × quantity
   - Quantity increment/decrement buttons
   - Remove button
   - Uses useCart hook

6. Create `hooks/useCart.ts` (Client hook):
   - Uses cartAtom from Jotai
   - Returns: items, total, itemCount, addItem, removeItem, updateQuantity, clearCart
   - addItem should merge duplicates (same productId + variant) by incrementing quantity

7. `app/(shop)/layout.tsx` (Server Component):
   - Renders <Header />, {children}, <Footer />, <CartDrawer />

8. Run: `npx shadcn@latest add sheet badge button` before building components.

All components must be responsive. Use Tailwind v4 classes only (no tailwind.config.js).
```

---

### Phase 3 — Homepage

**English:**
Build the complete homepage by assembling all home section components. Each section fetches its own data as a Server Component. The Hero Banner supports multiple slides from Strapi. The Featured Categories section shows a grid of room categories (Living Room, Bedroom, Dining, etc.). Featured Products shows a horizontally scrollable or grid product row. A Promo Banner is a full-width CTA section.

**Tiếng Việt:**
Xây dựng homepage hoàn chỉnh bằng cách ghép các section components. Mỗi section tự fetch data dưới dạng Server Component. Hero Banner hỗ trợ nhiều slide từ Strapi. Featured Categories hiển thị grid các danh mục phòng. Featured Products hiển thị hàng sản phẩm dạng grid hoặc scroll ngang. Promo Banner là section full-width kêu gọi hành động.

**Prompt:**

```
Build the complete homepage for the Home Interior Ecommerce. Reference: /reference/Homepage 01.jpg (desktop) and /reference/Homepage 01 (mobile).jpg (mobile).

1. `components/home/HeroBanner/index.tsx` (Server Component):
   - Fetches banners via getBanners() from lib/api/banners.ts
   - Full-width, full-viewport-height banner
   - Shows headline, subheadline, and CTA button ("Shop Now") for each slide
   - Uses shadcn Carousel or a simple CSS slide (autoplay every 5s — make this a Client island)
   - Background: full-bleed image via next/image with fill + priority

2. `components/home/FeaturedCategories/index.tsx` (Server Component):
   - Fetches categories via getCategories()
   - Grid layout: 2 cols mobile, 3 cols tablet, 4 cols desktop
   - Each category card: image, category name overlay, link to /categories/[slug]
   - Rounded corners, hover zoom effect on image

3. `components/home/FeaturedProducts/index.tsx` (Server Component):
   - Fetches featured products via getFeaturedProducts()
   - Section title "Featured Products" with "View All" link
   - Grid: 2 cols mobile, 3 cols tablet, 4 cols desktop
   - Uses <ProductCard /> component (build it in Phase 4, stub it here)

4. `components/home/PromoBanner/index.tsx` (Server Component):
   - Full-width banner with a warm interior background image
   - Bold headline ("Transform Your Space"), subtext, and CTA button
   - Data can be hardcoded (no Strapi endpoint needed)

5. `components/home/Newsletter/index.tsx` (Client Component):
   - Email input + Subscribe button
   - Controlled form with basic email validation
   - Shows success/error state
   - POST to /api/newsletter (Next.js Route Handler — stub it, just return 200)

6. `app/(shop)/page.tsx` (Server Component):
   - Assemble: <HeroBanner />, <FeaturedCategories />, <FeaturedProducts />, <PromoBanner />, <Newsletter />
   - Set page metadata: title "Home Interior — Beautiful Furniture & Decor"

7. `components/product/ProductCard/index.tsx` (Client Component — needed by step 3):
   - Props: product: ProductItem
   - Shows: image (next/image), name, price (formatVND), compare price (strikethrough if exists)
   - Wishlist heart icon button (uses wishlistAtom)
   - Link wraps the card to /products/[slug]
   - Hover: slight shadow elevation

Ensure all sections are mobile-responsive and match the warm, editorial aesthetic of a home interior brand.
```

---

### Phase 4 — Product Listing Page

**English:**
Build the product listing pages: a general `/products` page and a category-specific `/categories/[slug]` page. Include a filter sidebar (price range, category, color/material, in-stock), a sort dropdown, and a responsive product grid. Implement URL-based filter state so filters persist on page refresh and are shareable.

**Tiếng Việt:**
Xây dựng các trang danh sách sản phẩm: trang `/products` tổng và trang `/categories/[slug]`. Bao gồm sidebar filter (khoảng giá, danh mục, màu/chất liệu, còn hàng), dropdown sắp xếp, và grid sản phẩm responsive. Dùng URL searchParams để lưu trạng thái filter — refresh trang vẫn giữ filter và có thể chia sẻ link.

**Prompt:**

```
Build the product listing pages for the Home Interior Ecommerce.

1. `components/product/ProductFilters/index.tsx` (Client Component):
   - Filter groups: Price Range (slider), Category (checkboxes), Material (checkboxes), In Stock (toggle)
   - Reads/writes filters to URL searchParams using useRouter + useSearchParams
   - On mobile: hidden by default, shown in a Sheet modal triggered by "Filters" button
   - Uses shadcn Slider, Checkbox, Switch, Sheet

2. `components/product/ProductCard/index.tsx` (finalize from Phase 3 stub):
   - Complete implementation as described in Phase 3
   - Add "Add to Cart" button that appears on hover (desktop) or always visible (mobile)
   - Button calls addItem from useCart hook

3. `app/(shop)/products/page.tsx` (Server Component):
   - Accepts searchParams: page, category, minPrice, maxPrice, material, inStock, sort
   - Calls getProducts() with those params
   - Renders: page title, <ProductFilters />, product grid, <Pagination />
   - Sort dropdown (Client Component island): "Price: Low to High", "Price: High to Low", "Newest", "Most Popular"
   - Pagination: uses shadcn Pagination, writes `page` to URL

4. `app/(shop)/categories/[slug]/page.tsx` (Server Component):
   - Calls getCategoryBySlug(slug) for category info
   - Calls getProducts({ category: slug, ...searchParams })
   - Shows category hero image + name at top
   - Same filter/grid/pagination as products page
   - generateMetadata: dynamic title from category name

5. `app/(shop)/products/[slug]/page.tsx` (stub — full build in Phase 5):
   - Just render a placeholder page with the slug displayed
   - generateStaticParams: call getProducts() and return all slugs (for static generation)

Install before building: `npx shadcn@latest add slider checkbox switch pagination select`
```

---

### Phase 5 — Product Detail Page

**English:**
Build the full product detail page. The image gallery shows all product images with a main viewer and thumbnail strip. A variant selector (color/material) updates the displayed price if variants have different pricing. "Add to Cart" integrates with the Jotai cart. A review section displays read-only ratings from Strapi. A "Related Products" section shows products from the same category.

**Tiếng Việt:**
Xây dựng trang chi tiết sản phẩm đầy đủ. Gallery hiển thị tất cả ảnh với khung xem chính và thanh thumbnail. Bộ chọn variant (màu/chất liệu) cập nhật giá nếu variant có giá khác nhau. "Add to Cart" tích hợp với Jotai cart. Phần reviews hiển thị đánh giá read-only từ Strapi. Phần "Sản phẩm liên quan" hiển thị sản phẩm cùng danh mục.

**Prompt:**

```
Build the complete Product Detail page for the Home Interior Ecommerce.

1. `components/product/ProductGallery/index.tsx` (Client Component):
   - Props: images: StrapiImage[]
   - Main large image viewer (next/image, fill mode in a fixed-height container)
   - Thumbnail strip below (horizontal scroll on mobile)
   - Click thumbnail to change main image
   - Optional: lightbox zoom on click (use shadcn Dialog)

2. `components/product/VariantSelector/index.tsx` (Client Component):
   - Props: variants: ProductVariant[], selected: string, onChange: (v: string) => void
   - Renders color swatches or labeled buttons depending on variant type
   - Selected state highlighted with brand accent color

3. `app/(shop)/products/[slug]/page.tsx` (Server Component — full implementation):
   - Calls getProductBySlug(slug)
   - Left column: <ProductGallery images={product.images} />
   - Right column:
     - Breadcrumb: Home > Category > Product Name
     - Product name (h1), ratings summary (stars + count)
     - Price display: sale price + original price strikethrough (if compareAtPrice exists) formatted with formatVND
     - <VariantSelector /> (Client island — use client wrapper)
     - Quantity selector (+ / - buttons, min 1)
     - "Add to Cart" button (Client island) — calls addItem from useCart
     - "Add to Wishlist" button — calls wishlist atom
     - Product description (rich text from Strapi — render as HTML safely with DOMPurify or dangerouslySetInnerHTML after sanitization check)
     - Dimensions, material, care instructions (from product attributes)
   - Below fold: Related Products (getProducts({ category: product.category.slug, pageSize: 4 }))
   - generateMetadata: title = product name, description, openGraph image

4. Update `lib/types/product.ts`:
   - Add ProductVariant type: { label: string; value: string; priceModifier?: number }
   - Update ProductAttributes to include variants: ProductVariant[]

5. Add `next/image` `sizes` prop to all product images for proper responsive behavior.

Run: `npx shadcn@latest add dialog` if not already installed.
```

---

### Phase 6 — Search

**English:**
Implement site-wide search. The header search icon opens an inline search bar with a live-search dropdown showing up to 5 product suggestions as the user types (debounced, 300ms). Pressing Enter or clicking "See all results" navigates to the `/search` results page, which fetches from Strapi and shows a full product grid.

**Tiếng Việt:**
Thêm tính năng tìm kiếm toàn site. Icon search trên header mở thanh tìm kiếm inline với dropdown gợi ý live hiển thị tối đa 5 sản phẩm khi người dùng gõ (debounced 300ms). Nhấn Enter hoặc "Xem tất cả kết quả" chuyển đến trang `/search` hiển thị grid sản phẩm đầy đủ từ Strapi.

**Prompt:**

```
Implement search functionality for the Home Interior Ecommerce.

1. Update `lib/api/products.ts`:
   - Add searchProducts(query: string, page?: number): fetches /api/products?filters[name][$containsi]=query&populate=images,category&pagination[pageSize]=20

2. `components/layout/SearchBar/index.tsx` (Client Component):
   - Triggered by search icon in Header (local open/close state)
   - Input with debounced onChange (300ms) using a custom `useDebounce` hook
   - While typing: shows dropdown list of up to 5 results (product image, name, price)
   - Clicking a result navigates to /products/[slug]
   - Press Enter: navigate to /search?q=query
   - Press Escape or click outside: close
   - Loading spinner during fetch

3. `hooks/useDebounce.ts`:
   - Generic `useDebounce<T>(value: T, delay: number): T`

4. `app/(shop)/search/page.tsx` (Server Component):
   - Reads searchParams.q
   - Calls searchProducts(q)
   - Shows: "Results for '{query}'" heading, product count, product grid
   - Empty state when no results: illustration + suggestion links

5. Update `components/layout/Header/index.tsx`:
   - Integrate <SearchBar /> in the header right section

Do NOT use any external search library. Use Strapi's `$containsi` filter only.
```

---

### Phase 7 — Authentication

**English:**
Implement full authentication flow using Strapi's built-in auth endpoints. JWT token is stored in a Jotai atom with `atomWithStorage` (persisted to localStorage). Login and Register pages are in the `(auth)` route group without the shop header/footer. A Next.js middleware protects routes like `/account`, `/orders`, and `/checkout` by checking for a valid token cookie.

**Tiếng Việt:**
Xây dựng luồng xác thực đầy đủ dùng Strapi auth endpoints. JWT token lưu trong Jotai atom với `atomWithStorage` (localStorage). Trang Login và Register nằm trong route group `(auth)` — không có header/footer của shop. Next.js middleware bảo vệ các route như `/account`, `/orders`, `/checkout` bằng cách kiểm tra token cookie.

**Prompt:**

```
Implement full authentication for the Home Interior Ecommerce using Strapi's auth API.

1. Update `store/auth.ts`:
   - tokenAtom: atomWithStorage<string | null>('auth_token', null)
   - userAtom: atomWithStorage<User | null>('auth_user', null)

2. `hooks/useAuth.ts` (Client hook):
   - Returns: user, token, isAuthenticated, login(email, password), register(data), logout
   - login: calls loginUser from lib/api/auth.ts, sets tokenAtom + userAtom on success, returns { success, error }
   - logout: clears both atoms, redirects to /login
   - register: calls registerUser, auto-logs in on success

3. `components/auth/LoginForm/index.tsx` (Client Component):
   - Email + Password fields using shadcn Input, Label, Button
   - Client-side validation (non-empty, valid email format)
   - On submit: calls useAuth().login, shows loading state on button
   - On success: redirect to previous page or /account
   - On error: show error message below form
   - Link to /register

4. `components/auth/RegisterForm/index.tsx` (Client Component):
   - Fields: First Name, Last Name, Email, Password, Confirm Password
   - Validation: all required, email format, passwords match, password min 8 chars
   - On success: redirect to /account

5. `app/(auth)/login/page.tsx`:
   - Centered card layout (no shop header/footer)
   - Renders <LoginForm />
   - Metadata: title "Login"

6. `app/(auth)/register/page.tsx`:
   - Renders <RegisterForm />
   - Metadata: title "Create Account"

7. `app/(auth)/layout.tsx`:
   - Minimal layout: centered container, brand logo at top, no Header/Footer

8. `middleware.ts` (root of project):
   - Protect: /account, /orders/:path*, /checkout
   - Read token from cookie named 'auth_token'
   - If no token: redirect to /login?redirect=<current path>
   - If token present: allow through

9. `app/(shop)/account/page.tsx` (Client Component — needs token):
   - Shows user info from userAtom (name, email)
   - Edit form for firstName, lastName, phone
   - "Change Password" button (stub modal)
   - "Logout" button

10. Update Header: show user's first name or "Account" link when authenticated.

Run: `npx shadcn@latest add input label form` if not already installed.
```

---

### Phase 8 — Checkout & Orders

**English:**
Build the checkout flow (address → shipping → review → confirm) and the order management pages. The checkout page reads from the cart Jotai atom. On successful order creation via Strapi API, the cart is cleared and the user is redirected to an order confirmation page. The Orders section shows full order history with individual order detail pages.

**Tiếng Việt:**
Xây dựng luồng thanh toán (địa chỉ → vận chuyển → xem lại → xác nhận) và các trang quản lý đơn hàng. Trang checkout đọc từ cart Jotai atom. Khi tạo đơn hàng thành công qua Strapi API, cart được xoá và user chuyển đến trang xác nhận. Phần Orders hiển thị lịch sử đơn hàng và trang chi tiết từng đơn.

**Prompt:**

```
Build the Checkout and Order pages for the Home Interior Ecommerce.

1. `app/(shop)/checkout/page.tsx` (Client Component):
   - Read cart items from cartAtom via useCart
   - If cart is empty: redirect to /cart
   - Two-column layout (desktop): left = form steps, right = order summary (sticky)
   - Order Summary: list items with image/name/qty/price, subtotal, shipping, total (all in VND)
   - Form Step 1 — Shipping Address:
     - Fields: fullName, phone, address, district, city (use shadcn Input + Select for city)
     - Validate all required
   - Form Step 2 — Shipping Method:
     - Radio options: Standard (free, 5-7 days), Express (30,000đ, 1-2 days)
     - Uses shadcn RadioGroup
   - Form Step 3 — Payment:
     - Options: Cash on Delivery (COD), Bank Transfer (stub)
     - "Place Order" button: calls createOrder from lib/api/orders.ts with token from tokenAtom
     - On success: clearCart(), redirect to /orders/[id]

2. `app/(shop)/cart/page.tsx` (Client Component):
   - Full cart page (not just drawer)
   - Lists all CartItems
   - Shows subtotal
   - "Continue Shopping" link and "Proceed to Checkout" button
   - Empty state: illustration + link to /products

3. `app/(shop)/orders/page.tsx` (Server Component):
   - Fetches orders with user's token (from cookie in server context)
   - Table/list: order ID, date, status badge, total, "View Details" link
   - Empty state if no orders

4. `app/(shop)/orders/[id]/page.tsx` (Server Component):
   - Fetches single order
   - Shows: order status timeline (Placed → Processing → Shipped → Delivered)
   - Order items list with images
   - Shipping address, payment method
   - Total breakdown

5. Add order status badge colors in `globals.css @theme`:
   - pending: amber, processing: blue, shipped: indigo, delivered: green, cancelled: red

Run: `npx shadcn@latest add radio-group` if not already installed.
```

---

### Phase 9 — Polish, SEO & Performance

**English:**
Final polish phase: add loading skeleton UIs for all data-heavy pages, add error boundaries, implement proper SEO metadata for every page, add structured data (JSON-LD) for products, optimize images, and ensure Core Web Vitals pass. Also verify mobile UX on all screens.

**Tiếng Việt:**
Phase hoàn thiện cuối cùng: thêm skeleton loading UI cho tất cả trang có data, thêm error boundary, bổ sung SEO metadata cho từng trang, thêm structured data (JSON-LD) cho sản phẩm, tối ưu ảnh, đảm bảo Core Web Vitals đạt ngưỡng. Kiểm tra UX mobile trên toàn bộ màn hình.

**Prompt:**

```
Add polish, SEO, and performance optimizations to the Home Interior Ecommerce.

1. Loading skeletons — create `loading.tsx` files:
   - `app/(shop)/loading.tsx`: homepage skeleton (banner placeholder, category grid shimmer)
   - `app/(shop)/products/loading.tsx`: product grid skeleton (8 card placeholders)
   - `app/(shop)/products/[slug]/loading.tsx`: product detail skeleton (gallery + text placeholders)
   - Use `animate-pulse` Tailwind class with gray bg blocks. Keep exact same layout proportions.

2. Error boundaries — create `error.tsx` files (must be Client Components):
   - `app/(shop)/products/error.tsx`: "Failed to load products" with retry button
   - `app/(shop)/products/[slug]/error.tsx`: "Product not found" with back button

3. `app/not-found.tsx`:
   - Friendly 404 page with illustration, "Go Home" button, search suggestions

4. SEO metadata:
   - `app/(shop)/products/page.tsx`: title "All Products | Home Interior", description
   - `app/(shop)/categories/[slug]/page.tsx`: generateMetadata from category name/description
   - `app/(shop)/products/[slug]/page.tsx`: generateMetadata — title from product name, description from product description (first 160 chars), openGraph image from first product image

5. JSON-LD structured data for Product pages:
   - In `app/(shop)/products/[slug]/page.tsx`, add <script type="application/ld+json"> with Product schema:
     name, description, image, offers (price, priceCurrency: "VND", availability)
   - Use a helper `lib/utils/jsonLd.ts` that builds the Product schema object

6. Image optimization:
   - All `next/image` uses must have proper `sizes` prop
   - Hero banner: sizes="100vw"
   - ProductCard: sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
   - Verify `remotePatterns` in next.config.ts covers Strapi production domain

7. Verify and fix any TypeScript errors across the entire codebase. Run `yarn build` and fix all errors before considering this phase complete.
```

---

## Quick Reference: Run Order

| Phase | Key Commands                                                     |
| ----- | ---------------------------------------------------------------- |
| 0     | `yarn add jotai` · `npx shadcn@latest init`                      |
| 1     | No new installs — pure TypeScript                                |
| 2     | `npx shadcn@latest add sheet badge button`                       |
| 3     | `npx shadcn@latest add carousel`                                 |
| 4     | `npx shadcn@latest add slider checkbox switch pagination select` |
| 5     | `npx shadcn@latest add dialog`                                   |
| 6     | No new installs                                                  |
| 7     | `npx shadcn@latest add input label form`                         |
| 8     | `npx shadcn@latest add radio-group`                              |
| 9     | `yarn build` — fix all errors                                    |
