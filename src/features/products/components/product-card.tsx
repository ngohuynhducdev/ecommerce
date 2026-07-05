"use client";

import { useState, useRef } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { useAtom, useSetAtom } from "jotai";
import { cartItemsAtom } from "@/features/cart/atoms";
import { wishlistAtom } from "@/features/wishlist/atoms";
import type { Product } from "@/features/products/types";
import { formatPrice } from "@/lib/utils";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#E97171" : "none"}
      stroke={filled ? "#E97171" : "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const setCartItems = useSetAtom(cartItemsAtom);
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const [justAdded, setJustAdded] = useState(false);
  const addedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isWishlisted = wishlist.some((w) => w.product.id === product.id);

  const discountPct = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  function handleAddToCart() {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && !i.variant
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && !i.variant
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setJustAdded(true);
    if (addedTimeout.current) clearTimeout(addedTimeout.current);
    addedTimeout.current = setTimeout(() => setJustAdded(false), 2000);
  }

  function handleToggleWishlist() {
    setWishlist((prev) =>
      isWishlisted
        ? prev.filter((w) => w.product.id !== product.id)
        : [...prev, { product, addedAt: new Date().toISOString() }]
    );
  }

  return (
    <div className="flex flex-col">
      {/* Image card */}
      <div className="group relative aspect-square rounded-xl bg-mist overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          <span className="bg-white text-ink text-xs font-bold uppercase px-2.5 py-1 rounded">
            NEW
          </span>
          {discountPct && (
            <span className="bg-mint text-white text-xs font-semibold px-2.5 py-1 rounded">
              -{discountPct}%
            </span>
          )}
        </div>

        {/* Heart — hover-reveal on desktop, always on touch; stays shown once wishlisted */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-opacity ${
            isWishlisted
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto max-lg:opacity-100 max-lg:pointer-events-auto"
          }`}
          aria-label="Add to wishlist"
        >
          <HeartIcon filled={isWishlisted} />
        </button>

        {/* Product image */}
        <Link href={`/shop/${product.slug}`} className="block h-full">
          <div className="relative h-full">
            <SafeImage
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain p-4"
            />
          </div>
        </Link>

        {/* Add to cart — hover-reveal on desktop, always visible on touch; shows Added feedback */}
        <button
          onClick={handleAddToCart}
          className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-center gap-2 rounded-lg bg-ink text-white text-sm font-medium py-3 transition-all duration-200 hover:bg-gold opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto max-lg:opacity-100 max-lg:translate-y-0 max-lg:pointer-events-auto"
        >
          {justAdded ? (
            <>
              <CheckIcon />
              Added
            </>
          ) : (
            "Add to cart"
          )}
        </button>
      </div>

      {/* Info */}
      <div className="pt-4">
        <div className="flex gap-0.5 mb-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon key={star} filled={star <= Math.round(product.rating)} />
          ))}
        </div>
        <Link href={`/shop/${product.slug}`}>
          <p className="font-semibold text-sm text-ink leading-snug line-clamp-2 hover:text-gold transition-colors">
            {product.name}
          </p>
        </Link>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-semibold text-ink">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-subtle line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
