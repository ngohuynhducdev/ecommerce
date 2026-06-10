"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchFormProps {
  /** Called after a successful submit — e.g. to close the mobile menu or collapse the desktop box. */
  onSubmitted?: () => void;
  autoFocus?: boolean;
  className?: string;
}

export function SearchForm({ onSubmitted, autoFocus, className }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    onSubmitted?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`flex items-center gap-3 border border-border rounded-lg px-4 h-12 focus-within:border-primary transition-colors ${className ?? ""}`}
    >
      <Search size={18} strokeWidth={1.5} className="text-muted shrink-0" />
      <input
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus={autoFocus}
        placeholder="Search products"
        aria-label="Search products"
        className="flex-1 text-sm outline-none bg-transparent placeholder:text-muted"
      />
    </form>
  );
}
