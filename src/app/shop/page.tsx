import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProducts, type ProductFilters } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { ShopContent } from "@/features/products/components/shop-content";
import type { CategoryWithCount } from "@/features/products/components/filter-sidebar";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our full collection of modern, minimalist furniture.",
};

export const revalidate = 3600;

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

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  const rawSort = firstParam(sp.sort);
  const sort = VALID_SORTS.includes(rawSort as SortValue)
    ? (rawSort as SortValue)
    : undefined;

  const search = firstParam(sp.q)?.trim() || undefined;

  const filters: ProductFilters = {
    search,
    category: firstParam(sp.category),
    minPrice: parseNumber(firstParam(sp.minPrice)),
    maxPrice: parseNumber(firstParam(sp.maxPrice)),
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
    <div>
      {/* Hero */}
      <section className="relative h-64 lg:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&h=640&fit=crop&auto=format&q=80"
          alt="Shop"
          fill
          sizes="100vw"
          className="object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-white/55" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
          <nav className="flex items-center gap-2 text-sm text-muted mb-4">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-primary font-medium">Shop</span>
          </nav>
          <h1 className="text-4xl lg:text-5xl font-bold text-primary">Shop Page</h1>
          <p className="mt-3 text-muted text-sm lg:text-base max-w-sm">
            Let&apos;s design the place you always imagined.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="px-8 lg:px-20 py-10">
        {search && (
          <p className="mb-6 text-sm text-muted">
            {products.length} result{products.length === 1 ? "" : "s"} for{" "}
            <span className="font-medium text-primary">&ldquo;{search}&rdquo;</span>
          </p>
        )}
        <ShopContent
          products={products}
          categories={categoriesWithCounts}
          selectedCategoryName={selectedCategory?.name}
          currentSort={sort}
          currentFilters={{
            category: filters.category,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
          }}
        />
      </div>
    </div>
  );
}
