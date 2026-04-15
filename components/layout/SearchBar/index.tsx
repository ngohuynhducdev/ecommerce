"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { searchProducts } from "@/lib/api/products";
import { formatVND } from "@/lib/utils/formatPrice";
import type { ProductItem } from "@/lib/types/product";

interface SearchBarProps {
  onClose?: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const debouncedQuery = useDebounce(query, 300);
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    searchProducts(debouncedQuery, 1)
      .then((res) => {
        setResults((res.data ?? []).slice(0, 5));
        setShowDropdown(true);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
    if (e.key === "Escape") {
      onClose?.();
    }
  }

  function handleResultClick() {
    setShowDropdown(false);
    onClose?.();
  }

  function handleSearchAll() {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      {/* Input */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border border-warm-300 rounded-xl shadow-lg focus-within:border-warm-500 focus-within:ring-2 focus-within:ring-warm-200 transition-all">
        {loading ? (
          <Loader2 className="w-4 h-4 text-warm-400 animate-spin flex-shrink-0" />
        ) : (
          <Search className="w-4 h-4 text-warm-400 flex-shrink-0" />
        )}
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tìm kiếm sản phẩm..."
          className="flex-1 text-sm bg-transparent outline-none text-warm-800 placeholder:text-warm-400"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setShowDropdown(false);
            }}
            className="text-warm-400 hover:text-warm-700 transition-colors"
            aria-label="Xóa"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-warm-200 rounded-xl shadow-xl overflow-hidden z-50">
          {results.length > 0 ? (
            <>
              <ul>
                {results.map((product) => {
                  const imageUrl = product.attributes.images?.data?.[0]
                    ?.attributes?.url
                    ? `${strapiUrl}${product.attributes.images.data[0].attributes.url}`
                    : null;
                  return (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.attributes.slug}`}
                        onClick={handleResultClick}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-warm-50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-warm-100 flex-shrink-0">
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={product.attributes.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-warm-800 truncate">
                            {product.attributes.name}
                          </p>
                          <p className="text-xs text-earth-600 font-semibold">
                            {formatVND(product.attributes.price)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={handleSearchAll}
                className="w-full px-4 py-3 text-sm text-center text-earth-600 hover:bg-warm-50 border-t border-warm-100 font-medium transition-colors"
              >
                Xem tất cả kết quả cho &quot;{query}&quot; →
              </button>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              Không tìm thấy sản phẩm phù hợp
            </div>
          )}
        </div>
      )}
    </div>
  );
}
