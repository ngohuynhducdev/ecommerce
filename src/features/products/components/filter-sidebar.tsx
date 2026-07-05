"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Category } from "@/features/products/types";

export interface CategoryWithCount extends Category {
  productCount: number;
}

interface FilterSidebarProps {
  categories: CategoryWithCount[];
  currentFilters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}

const PRICE_RANGES = [
  { label: "All Price", min: undefined as number | undefined, max: undefined as number | undefined },
  { label: "$0.00 - 99.99", min: 0, max: 99 },
  { label: "$100.00 - 199.99", min: 100, max: 199 },
  { label: "$200.00 - 299.99", min: 200, max: 299 },
  { label: "$300.00 - 399.99", min: 300, max: 399 },
  { label: "$400.00+", min: 400, max: undefined as number | undefined },
];

function isRangeActive(
  min: number | undefined,
  max: number | undefined,
  currentMin: number | undefined,
  currentMax: number | undefined
): boolean {
  if (min === undefined && max === undefined) {
    return currentMin === undefined && currentMax === undefined;
  }
  return currentMin === min && currentMax === max;
}

export function FilterSidebar({ categories, currentFilters }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const push = useCallback(
    (updater: (p: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      updater(params);
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname, searchParams]
  );

  function selectCategory(slug: string | undefined) {
    push((params) => {
      if (slug) params.set("category", slug);
      else params.delete("category");
    });
  }

  function selectPriceRange(min: number | undefined, max: number | undefined) {
    push((params) => {
      if (min === undefined && max === undefined) {
        params.delete("minPrice");
        params.delete("maxPrice");
      } else {
        if (min !== undefined) params.set("minPrice", String(min));
        else params.delete("minPrice");
        if (max !== undefined) params.set("maxPrice", String(max));
        else params.delete("maxPrice");
      }
    });
  }

  return (
    <aside className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-ink mb-4">
          Categories
        </h3>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => selectCategory(undefined)}
              className={`text-sm transition-colors cursor-pointer ${
                !currentFilters.category
                  ? "font-semibold text-ink"
                  : "text-subtle hover:text-ink"
              }`}
            >
              All Rooms
            </button>
          </li>
          {categories.map((cat) => {
            const active = currentFilters.category === cat.slug;
            return (
              <li key={cat.id}>
                <button
                  onClick={() => selectCategory(cat.slug)}
                  className={`text-sm transition-colors cursor-pointer ${
                    active
                      ? "font-semibold text-ink underline underline-offset-2"
                      : "text-subtle hover:text-ink"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-ink mb-4">
          Price
        </h3>
        <ul className="space-y-3">
          {PRICE_RANGES.map(({ label, min, max }) => {
            const active = isRangeActive(min, max, currentFilters.minPrice, currentFilters.maxPrice);
            const isAllPrice = min === undefined && max === undefined;

            if (isAllPrice) {
              return (
                <li key={label}>
                  <button
                    onClick={() => selectPriceRange(undefined, undefined)}
                    className={`text-sm transition-colors cursor-pointer ${
                      active
                        ? "font-semibold text-ink"
                        : "text-subtle hover:text-ink"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              );
            }

            return (
              <li key={label}>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span
                    className={`text-sm transition-colors ${
                      active
                        ? "font-medium text-ink"
                        : "text-subtle group-hover:text-ink"
                    }`}
                  >
                    {label}
                  </span>
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => selectPriceRange(active ? undefined : min, active ? undefined : max)}
                    className="w-4 h-4 accent-ink cursor-pointer"
                  />
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
