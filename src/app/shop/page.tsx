import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProducts, type ProductFilters } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { ShopContent } from "@/features/products/components/shop-content";
import { ShopContentSkeleton } from "@/features/products/components/shop-skeleton";
import type { CategoryWithCount } from "@/features/products/components/filter-sidebar";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our full collection of modern, minimalist furniture.",
};

export const revalidate = 3600;

type SearchParams = Record<string, string | string[] | undefined>;

type SortValue = NonNullable<ProductFilters["sort"]>;

const VALID_SORTS: SortValue[] = ["price-asc", "price-desc", "rating", "newest"];

function firstParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function parseNumber(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

// The hero and page gutters own no data, so they render synchronously and the
// browser can start the hero image while the product fetch is still in flight.
export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <div>
      {/* Hero — contained within page gutters per design */}
      <div className="px-5 lg:px-20 pt-6">
        <section className="relative h-64 lg:h-80 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&h=640&fit=crop&auto=format&q=80"
            alt="Shop"
            fill
            sizes="(max-width: 1024px) 100vw, calc(100vw - 10rem)"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/45" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
            <nav className="flex items-center gap-2 text-sm text-subtle mb-4">
              <Link href="/" className="hover:text-ink transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-ink font-medium">Shop</span>
            </nav>
            <h1 className="text-4xl lg:text-5xl font-bold text-ink">Shop Page</h1>
            <p className="mt-3 text-subtle text-sm lg:text-base max-w-sm">
              Let&apos;s design the place you always imagined.
            </p>
          </div>
        </section>
      </div>

      {/* Content */}
      <div className="px-5 lg:px-20 py-10">
        <Suspense fallback={<ShopContentSkeleton />}>
          <ShopResults searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function ShopResults({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const rawSort = firstParam(sp.sort);
  const sort = VALID_SORTS.includes(rawSort as SortValue)
    ? (rawSort as SortValue)
    : undefined;

  const filters: ProductFilters = {
    category: firstParam(sp.category),
    minPrice: parseNumber(firstParam(sp.minPrice)),
    maxPrice: parseNumber(firstParam(sp.maxPrice)),
    search: firstParam(sp.search)?.trim() || undefined,
    sort,
  };

  const [products, allProducts, categories] = await Promise.all([
    getProducts(filters),
    getProducts(),
    getCategories(),
  ]);

  const categoriesWithCounts: CategoryWithCount[] = categories.map((cat) => ({
    ...cat,
    productCount: allProducts.filter((p) => p.category.slug === cat.slug).length,
  }));

  const selectedCategory = categories.find((c) => c.slug === filters.category);

  return (
    <ShopContent
      products={products}
      categories={categoriesWithCounts}
      selectedCategoryName={
        filters.search
          ? `Search: “${filters.search}”`
          : selectedCategory?.name
      }
      currentSort={sort}
      currentFilters={{
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      }}
    />
  );
}
