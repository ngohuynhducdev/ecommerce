"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

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
          className="flex items-center gap-1 bg-mist px-3 py-1.5 rounded-full text-sm text-ink hover:bg-line transition-colors cursor-pointer"
        >
          <span>{chip.label}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-subtle"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      ))}
      <button
        onClick={clearAll}
        className="text-sm text-subtle hover:text-ink underline ml-2 cursor-pointer"
      >
        Clear All
      </button>
    </div>
  );
}
