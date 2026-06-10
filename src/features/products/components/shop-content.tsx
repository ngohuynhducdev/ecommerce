"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterSidebar, type CategoryWithCount } from "./filter-sidebar";
import { ShopProductGrid } from "./shop-product-grid";
import type { Product } from "@/features/products/types";

type GridCols = 1 | 2 | 3 | 4;

function IconGrid4() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="0" y="0" width="3.5" height="3.5" rx="0.5" />
      <rect x="4.2" y="0" width="3.5" height="3.5" rx="0.5" />
      <rect x="8.4" y="0" width="3.5" height="3.5" rx="0.5" />
      <rect x="12.5" y="0" width="3.5" height="3.5" rx="0.5" />
      <rect x="0" y="4.2" width="3.5" height="3.5" rx="0.5" />
      <rect x="4.2" y="4.2" width="3.5" height="3.5" rx="0.5" />
      <rect x="8.4" y="4.2" width="3.5" height="3.5" rx="0.5" />
      <rect x="12.5" y="4.2" width="3.5" height="3.5" rx="0.5" />
      <rect x="0" y="8.4" width="3.5" height="3.5" rx="0.5" />
      <rect x="4.2" y="8.4" width="3.5" height="3.5" rx="0.5" />
      <rect x="8.4" y="8.4" width="3.5" height="3.5" rx="0.5" />
      <rect x="12.5" y="8.4" width="3.5" height="3.5" rx="0.5" />
      <rect x="0" y="12.5" width="3.5" height="3.5" rx="0.5" />
      <rect x="4.2" y="12.5" width="3.5" height="3.5" rx="0.5" />
      <rect x="8.4" y="12.5" width="3.5" height="3.5" rx="0.5" />
      <rect x="12.5" y="12.5" width="3.5" height="3.5" rx="0.5" />
    </svg>
  );
}

function IconGrid3() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="0" y="0" width="4.5" height="4.5" rx="0.5" />
      <rect x="5.7" y="0" width="4.5" height="4.5" rx="0.5" />
      <rect x="11.5" y="0" width="4.5" height="4.5" rx="0.5" />
      <rect x="0" y="5.7" width="4.5" height="4.5" rx="0.5" />
      <rect x="5.7" y="5.7" width="4.5" height="4.5" rx="0.5" />
      <rect x="11.5" y="5.7" width="4.5" height="4.5" rx="0.5" />
      <rect x="0" y="11.5" width="4.5" height="4.5" rx="0.5" />
      <rect x="5.7" y="11.5" width="4.5" height="4.5" rx="0.5" />
      <rect x="11.5" y="11.5" width="4.5" height="4.5" rx="0.5" />
    </svg>
  );
}

function IconGrid2() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="0" y="0" width="6.5" height="6.5" rx="0.5" />
      <rect x="9.5" y="0" width="6.5" height="6.5" rx="0.5" />
      <rect x="0" y="9.5" width="6.5" height="6.5" rx="0.5" />
      <rect x="9.5" y="9.5" width="6.5" height="6.5" rx="0.5" />
    </svg>
  );
}

function IconList() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="0" y="1" width="16" height="2.5" rx="0.5" />
      <rect x="0" y="6.7" width="16" height="2.5" rx="0.5" />
      <rect x="0" y="12.5" width="16" height="2.5" rx="0.5" />
    </svg>
  );
}

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rating" },
];

interface ShopContentProps {
  products: Product[];
  categories: CategoryWithCount[];
  selectedCategoryName?: string;
  currentSort?: string;
  currentFilters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}

export function ShopContent({
  products,
  categories,
  selectedCategoryName,
  currentSort,
  currentFilters,
}: ShopContentProps) {
  const [gridCols, setGridCols] = useState<GridCols>(3);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "default") params.delete("sort");
    else params.set("sort", value);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  const displayCategory = selectedCategoryName ?? "All Products";

  const gridIconClass = (cols: GridCols) =>
    `p-1.5 rounded cursor-pointer transition-colors ${
      gridCols === cols ? "text-primary" : "text-[#C1C4C9] hover:text-primary"
    }`;

  return (
    <div>
      {/* Toolbar */}
      <div className="border-y border-border flex items-center gap-4 py-3.5 mb-8">
        {/* Filter button — opens sheet on mobile, decorative label on desktop */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors cursor-pointer">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto lg:hidden">
            <SheetHeader className="mb-6">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <FilterSidebar categories={categories} currentFilters={currentFilters} />
          </SheetContent>
        </Sheet>

        {/* Desktop: divider + selected category name */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="w-px h-5 bg-border" />
          <span className="text-sm font-medium text-primary">{displayCategory}</span>
        </div>

        <div className="flex-1" />

        {/* Sort */}
        <div className="flex items-center gap-1">
          <span className="text-sm text-primary hidden sm:inline">Sort by</span>
          <select
            value={currentSort ?? "default"}
            onChange={(e) => handleSort(e.target.value)}
            className="text-sm text-primary bg-transparent border-none outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop grid toggles */}
        <div className="hidden lg:flex items-center gap-0.5 border-l border-border pl-4">
          <button className={gridIconClass(4)} onClick={() => setGridCols(4)} aria-label="4 columns">
            <IconGrid4 />
          </button>
          <button className={gridIconClass(3)} onClick={() => setGridCols(3)} aria-label="3 columns">
            <IconGrid3 />
          </button>
          <button className={gridIconClass(2)} onClick={() => setGridCols(2)} aria-label="2 columns">
            <IconGrid2 />
          </button>
          <button className={gridIconClass(1)} onClick={() => setGridCols(1)} aria-label="List view">
            <IconList />
          </button>
        </div>

        {/* Mobile grid toggles (2-col / list) */}
        <div className="flex lg:hidden items-center gap-0.5">
          <button className={gridIconClass(2)} onClick={() => setGridCols(2)} aria-label="2 columns">
            <IconGrid2 />
          </button>
          <button className={gridIconClass(1)} onClick={() => setGridCols(1)} aria-label="List view">
            <IconList />
          </button>
        </div>
      </div>

      {/* Sidebar + Grid */}
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
        <div className="hidden lg:block">
          <FilterSidebar categories={categories} currentFilters={currentFilters} />
        </div>
        <ShopProductGrid products={products} gridCols={gridCols} />
      </div>
    </div>
  );
}
