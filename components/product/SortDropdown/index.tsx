"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Mới nhất" },
  { value: "price:asc", label: "Giá: Thấp đến cao" },
  { value: "price:desc", label: "Giá: Cao đến thấp" },
  { value: "name:asc", label: "Tên A-Z" },
];

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "createdAt:desc";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select value={currentSort} onValueChange={handleChange}>
      <SelectTrigger className="w-44 text-sm">
        <SelectValue placeholder="Sắp xếp" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
