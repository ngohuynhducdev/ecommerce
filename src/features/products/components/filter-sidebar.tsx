"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
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
    color?: string;
    size?: string;
    material?: string;
    minRating?: number;
  };
}

const COLORS = [
  { value: "black", hex: "#1C1C1C" },
  { value: "white", hex: "#FFFFFF", border: true },
  { value: "beige", hex: "#F5F0E8" },
  { value: "brown", hex: "#8B4513" },
  { value: "gray", hex: "#9CA3AF" },
  { value: "gold", hex: "#B88E2F" },
];

const SIZES = ["Small", "Medium", "Large", "XL"];
const MATERIALS = ["Wood", "Metal", "Fabric", "Leather", "Glass"];
const RATINGS = [4, 3, 2, 1];

const PRICE_MIN = 0;
const PRICE_MAX = 2000;

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill={filled ? "#FFC700" : "#E8ECEF"}
      stroke={filled ? "#FFC700" : "#E8ECEF"}
      strokeWidth={1}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function FilterSidebar({ categories, currentFilters }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(
    currentFilters.minPrice?.toString() ?? ""
  );
  const [maxPrice, setMaxPrice] = useState(
    currentFilters.maxPrice?.toString() ?? ""
  );
  const [prevMinPrice, setPrevMinPrice] = useState<number | undefined>(
    currentFilters.minPrice
  );
  const [prevMaxPrice, setPrevMaxPrice] = useState<number | undefined>(
    currentFilters.maxPrice
  );

  if (prevMinPrice !== currentFilters.minPrice) {
    setPrevMinPrice(currentFilters.minPrice);
    setMinPrice(currentFilters.minPrice?.toString() ?? "");
  }
  if (prevMaxPrice !== currentFilters.maxPrice) {
    setPrevMaxPrice(currentFilters.maxPrice);
    setMaxPrice(currentFilters.maxPrice?.toString() ?? "");
  }

  const pushParams = useCallback(
    (updater: (p: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      updater(params);
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    const handle = setTimeout(() => {
      const currentMin = currentFilters.minPrice?.toString() ?? "";
      const currentMax = currentFilters.maxPrice?.toString() ?? "";
      if (minPrice === currentMin && maxPrice === currentMax) return;

      pushParams((params) => {
        if (minPrice) params.set("minPrice", minPrice);
        else params.delete("minPrice");
        if (maxPrice) params.set("maxPrice", maxPrice);
        else params.delete("maxPrice");
      });
    }, 500);

    return () => clearTimeout(handle);
  }, [minPrice, maxPrice, currentFilters.minPrice, currentFilters.maxPrice, pushParams]);

  function toggleSingle(key: string, value: string) {
    pushParams((params) => {
      if (params.get(key) === value) params.delete(key);
      else params.set(key, value);
    });
  }

  function clearAllFilters() {
    const sort = searchParams.get("sort");
    const next = new URLSearchParams();
    if (sort) next.set("sort", sort);
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  const minDisplay = minPrice || PRICE_MIN;
  const maxDisplay = maxPrice || PRICE_MAX;

  return (
    <aside>
      <Accordion type="multiple" defaultValue={["categories", "price"]}>
        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {categories.map((cat) => {
                const checked = currentFilters.category === cat.slug;
                return (
                  <label
                    key={cat.id}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSingle("category", cat.slug)}
                        className="w-4 h-4 accent-[#1C1C1C]"
                      />
                      <span className="text-sm text-[#1C1C1C] group-hover:text-[#B88E2F] transition-colors">
                        {cat.name}
                      </span>
                    </span>
                    <span className="text-xs text-[#807D7E]">
                      ({cat.productCount})
                    </span>
                  </label>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 space-y-4">
              <p className="text-sm text-[#1C1C1C]">
                ${minDisplay} – ${maxDisplay}
              </p>
              <div className="space-y-2">
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={50}
                  value={minPrice || PRICE_MIN}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full accent-[#1C1C1C]"
                />
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={50}
                  value={maxPrice || PRICE_MAX}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full accent-[#1C1C1C]"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full h-9 border border-[#E8ECEF] rounded-sm px-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full h-9 border border-[#E8ECEF] rounded-sm px-2 text-sm"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color */}
        <AccordionItem value="color">
          <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
            Color
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2">
              {COLORS.map((color) => {
                const selected = currentFilters.color === color.value;
                return (
                  <button
                    key={color.value}
                    onClick={() => toggleSingle("color", color.value)}
                    aria-label={color.value}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all cursor-pointer",
                      color.border ? "border-[#E8ECEF]" : "border-transparent",
                      selected && "ring-2 ring-offset-2 ring-[#1C1C1C]"
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size */}
        <AccordionItem value="size">
          <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
            Size
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2">
              {SIZES.map((size) => {
                const value = size.toLowerCase();
                const selected = currentFilters.size === value;
                return (
                  <button
                    key={size}
                    onClick={() => toggleSingle("size", value)}
                    className={cn(
                      "px-4 py-1.5 rounded-full border text-xs transition-colors cursor-pointer",
                      selected
                        ? "bg-[#1C1C1C] text-white border-[#1C1C1C]"
                        : "bg-white text-[#1C1C1C] border-[#E8ECEF] hover:border-[#1C1C1C]"
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Material */}
        <AccordionItem value="material">
          <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
            Material
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {MATERIALS.map((m) => {
                const value = m.toLowerCase();
                const checked = currentFilters.material === value;
                return (
                  <label
                    key={m}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleSingle("material", value)}
                      className="w-4 h-4 accent-[#1C1C1C]"
                    />
                    <span className="text-sm text-[#1C1C1C] group-hover:text-[#B88E2F] transition-colors">
                      {m}
                    </span>
                  </label>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating */}
        <AccordionItem value="rating">
          <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider">
            Rating
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {RATINGS.map((r) => {
                const selected = currentFilters.minRating === r;
                return (
                  <button
                    key={r}
                    onClick={() => toggleSingle("minRating", String(r))}
                    className={cn(
                      "flex items-center gap-2 w-full text-left cursor-pointer transition-colors",
                      selected ? "text-[#1C1C1C]" : "text-[#807D7E] hover:text-[#1C1C1C]"
                    )}
                  >
                    <span className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon key={star} filled={star <= r} />
                      ))}
                    </span>
                    <span className="text-sm">&amp; above</span>
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <button
        onClick={clearAllFilters}
        className="w-full mt-6 border border-[#1C1C1C] text-[#1C1C1C] py-3 rounded-sm text-sm hover:bg-[#1C1C1C] hover:text-white transition-colors cursor-pointer"
      >
        Clear All Filters
      </button>
    </aside>
  );
}
