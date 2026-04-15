"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { Label } from "@/components/ui/label";

const MATERIALS = [
  "Gỗ tự nhiên",
  "Gỗ MDF",
  "Kim loại",
  "Vải",
  "Da",
  "Nhựa",
  "Kính",
];

interface ProductFiltersProps {
  categories?: { name: string; slug: string }[];
}

function FiltersContent({ categories = [] }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice") ?? 0),
    Number(searchParams.get("maxPrice") ?? 50000000),
  ]);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      params.delete("page"); // reset page on filter change
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const selectedMaterials =
    searchParams.get("material")?.split(",").filter(Boolean) ?? [];
  const inStock = searchParams.get("inStock") === "true";
  const selectedCategory = searchParams.get("category");

  function toggleMaterial(mat: string) {
    const updated = selectedMaterials.includes(mat)
      ? selectedMaterials.filter((m) => m !== mat)
      : [...selectedMaterials, mat];
    updateParams({ material: updated.length > 0 ? updated.join(",") : null });
  }

  function applyPrice() {
    updateParams({
      minPrice: String(priceRange[0]),
      maxPrice: String(priceRange[1]),
    });
  }

  function clearAll() {
    router.push(pathname);
  }

  const hasFilters =
    selectedMaterials.length > 0 ||
    inStock ||
    selectedCategory ||
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice");

  return (
    <div className="space-y-6">
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="text-destructive hover:text-destructive w-full"
        >
          Xóa tất cả bộ lọc
        </Button>
      )}

      {/* Category */}
      {categories.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm text-warm-800 mb-3">Danh mục</h4>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.slug} className="flex items-center gap-2">
                <Checkbox
                  id={`cat-${cat.slug}`}
                  checked={selectedCategory === cat.slug}
                  onCheckedChange={() =>
                    updateParams({
                      category: selectedCategory === cat.slug ? null : cat.slug,
                    })
                  }
                />
                <Label
                  htmlFor={`cat-${cat.slug}`}
                  className="text-sm cursor-pointer"
                >
                  {cat.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-sm text-warm-800 mb-3">Khoảng giá</h4>
        <Slider
          min={0}
          max={50000000}
          step={500000}
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          onValueCommit={applyPrice}
          className="mb-3"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{(priceRange[0] / 1000000).toFixed(1)}tr đ</span>
          <span>{(priceRange[1] / 1000000).toFixed(1)}tr đ</span>
        </div>
      </div>

      {/* Material */}
      <div>
        <h4 className="font-semibold text-sm text-warm-800 mb-3">Chất liệu</h4>
        <div className="space-y-2">
          {MATERIALS.map((mat) => (
            <div key={mat} className="flex items-center gap-2">
              <Checkbox
                id={`mat-${mat}`}
                checked={selectedMaterials.includes(mat)}
                onCheckedChange={() => toggleMaterial(mat)}
              />
              <Label htmlFor={`mat-${mat}`} className="text-sm cursor-pointer">
                {mat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* In stock */}
      <div className="flex items-center justify-between">
        <Label
          htmlFor="inStock"
          className="text-sm font-semibold text-warm-800 cursor-pointer"
        >
          Chỉ còn hàng
        </Label>
        <Switch
          id="inStock"
          checked={inStock}
          onCheckedChange={(checked) =>
            updateParams({ inStock: checked ? "true" : null })
          }
        />
      </div>
    </div>
  );
}

export function ProductFilters({ categories = [] }: ProductFiltersProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 flex-shrink-0">
        <h3 className="font-bold text-warm-800 mb-5">Bộ lọc</h3>
        <FiltersContent categories={categories} />
      </aside>

      {/* Mobile sheet trigger */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Bộ lọc
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
            </SheetHeader>
            <FiltersContent categories={categories} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
