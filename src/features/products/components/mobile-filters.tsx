"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  FilterSidebar,
  type CategoryWithCount,
} from "@/features/products/components/filter-sidebar";

interface MobileFiltersProps {
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

export function MobileFilters({ categories, currentFilters }: MobileFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden flex items-center gap-2 border border-[#E8ECEF] px-4 py-2 rounded-sm text-sm text-[#1C1C1C] hover:border-[#1C1C1C] transition-colors cursor-pointer">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] sm:w-[380px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FilterSidebar categories={categories} currentFilters={currentFilters} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
