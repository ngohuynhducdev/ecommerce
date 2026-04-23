"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { X } from "lucide-react";

export interface FilterChip {
  keys: string[];
  label: string;
}

interface FilterChipsProps {
  chips: FilterChip[];
}

export function FilterChips({ chips }: FilterChipsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (chips.length === 0) return null;

  function removeChip(keys: string[]) {
    const params = new URLSearchParams(searchParams.toString());
    for (const k of keys) params.delete(k);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function clearAll() {
    const params = new URLSearchParams(searchParams.toString());
    const sort = params.get("sort");
    const next = new URLSearchParams();
    if (sort) next.set("sort", sort);
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {chips.map((chip) => (
        <button
          key={chip.keys.join(",")}
          onClick={() => removeChip(chip.keys)}
          className="flex items-center gap-1 bg-[#F3F5F7] px-3 py-1.5 rounded-full text-sm text-[#1C1C1C] hover:bg-[#E8ECEF] transition-colors cursor-pointer"
        >
          <span>{chip.label}</span>
          <X className="w-3.5 h-3.5 text-[#807D7E]" />
        </button>
      ))}
      <button
        onClick={clearAll}
        className="text-sm text-[#807D7E] hover:text-[#1C1C1C] underline ml-2 cursor-pointer"
      >
        Clear All
      </button>
    </div>
  );
}
