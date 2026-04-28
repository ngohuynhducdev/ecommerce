import type { Metadata } from "next";
import { getProducts, type ProductFilters } from "@/lib/api/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our full collection of modern, minimalist furniture.",
};

export const revalidate = 3600;
import { getCategories } from "@/lib/api/categories";
import { Breadcrumb } from "@/features/shared/components/breadcrumb";
import { SortSelect } from "@/features/products/components/sort-select";
import {
  FilterChips,
  type FilterChip,
} from "@/features/products/components/filter-chips";
import {
  FilterSidebar,
  type CategoryWithCount,
} from "@/features/products/components/filter-sidebar";
import { ShopProductGrid } from "@/features/products/components/shop-product-grid";
import { MobileFilters } from "@/features/products/components/mobile-filters";

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

  const filters: ProductFilters = {
    category: firstParam(sp.category),
    minPrice: parseNumber(firstParam(sp.minPrice)),
    maxPrice: parseNumber(firstParam(sp.maxPrice)),
    color: firstParam(sp.color),
    material: firstParam(sp.material),
    minRating: parseNumber(firstParam(sp.minRating)),
    sort,
  };

  const size = firstParam(sp.size);

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

  const chips: FilterChip[] = [];
  if (selectedCategory) {
    chips.push({ keys: ["category"], label: selectedCategory.name });
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const min = filters.minPrice ?? 0;
    const max = filters.maxPrice ?? "∞";
    chips.push({
      keys: ["minPrice", "maxPrice"],
      label: `$${min} – $${max}`,
    });
  }
  if (filters.color) {
    chips.push({
      keys: ["color"],
      label: `Color: ${filters.color}`,
    });
  }
  if (size) {
    chips.push({ keys: ["size"], label: `Size: ${size}` });
  }
  if (filters.material) {
    chips.push({ keys: ["material"], label: `Material: ${filters.material}` });
  }
  if (filters.minRating !== undefined) {
    chips.push({
      keys: ["minRating"],
      label: `${filters.minRating}★ & above`,
    });
  }

  const currentFilters = {
    category: filters.category,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    color: filters.color,
    size,
    material: filters.material,
    minRating: filters.minRating,
  };

  const total = products.length;
  const resultLabel =
    total === 0
      ? "Showing 0 Results"
      : `Showing 1-${Math.min(9, total)} of ${total} Results`;

  return (
    <div className="px-8 lg:px-20 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-semibold text-[#1C1C1C]">Shop</h1>
        <div className="flex items-center gap-3">
          <MobileFilters
            categories={categoriesWithCounts}
            currentFilters={currentFilters}
          />
          <SortSelect current={sort} />
        </div>
      </div>

      <p className="text-sm text-[#807D7E] mb-6">{resultLabel}</p>

      <FilterChips chips={chips} />

      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-10">
        <div className="hidden lg:block">
          <FilterSidebar
            categories={categoriesWithCounts}
            currentFilters={currentFilters}
          />
        </div>
        <div>
          <ShopProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
