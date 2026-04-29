"use client";

import Image from "next/image";
import Link from "next/link";
import { useAtom, useSetAtom } from "jotai";
import { cartItemsAtom, cartOpenAtom } from "@/features/cart/atoms";
import { wishlistAtom } from "@/features/wishlist/atoms";
import type { Product } from "@/features/products/types";
import { formatPrice } from "@/lib/utils";

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

function SlidersIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="21" y1="4" x2="14" y2="4" />
      <line x1="10" y1="4" x2="3" y2="4" />
      <line x1="21" y1="12" x2="12" y2="12" />
      <line x1="8" y1="12" x2="3" y2="12" />
      <line x1="21" y1="20" x2="16" y2="20" />
      <line x1="12" y1="20" x2="3" y2="20" />
      <line x1="14" y1="2" x2="14" y2="6" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="16" y1="18" x2="16" y2="22" />
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
  const setCartOpen = useSetAtom(cartOpenAtom);
  const [wishlist, setWishlist] = useAtom(wishlistAtom);

  const isWishlisted = wishlist.some((w) => w.product.id === product.id);

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
    setCartOpen(true);
  }

  function handleToggleWishlist() {
    setWishlist((prev) =>
      isWishlisted
        ? prev.filter((w) => w.product.id !== product.id)
        : [...prev, { product, addedAt: new Date().toISOString() }]
    );
  }

  return (
    <div className="relative group rounded-xl overflow-hidden bg-[#FAFAFA]">
      {/* Image */}
      <div className="aspect-square relative overflow-hidden">
        <Link href={`/shop/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        </Link>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
          <button
            onClick={handleAddToCart}
            className="bg-white text-[#1C1C1C] text-xs px-4 py-2 rounded-sm font-medium hover:bg-[#1C1C1C] hover:text-white transition-colors"
          >
            Add to Cart
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleToggleWishlist}
              className="bg-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Add to wishlist"
            >
              <HeartIcon filled={isWishlisted} />
            </button>
            <button
              className="bg-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Compare"
            >
              <SlidersIcon />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-0 left-0 flex flex-col gap-1 p-3 pointer-events-none">
          {product.comparePrice ? (
            <span className="bg-[#E97171] text-white text-xs px-2 py-0.5 rounded">
              Sale
            </span>
          ) : (
            <span className="bg-[#2EC1AC] text-white text-xs px-2 py-0.5 rounded">
              New
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-[#807D7E] mb-1 capitalize">
          {product.category.name}
        </p>
        <Link href={`/shop/${product.slug}`}>
          <p className="font-medium text-sm leading-snug line-clamp-2 hover:text-[#B88E2F] transition-colors">
            {product.name}
          </p>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-[#1C1C1C]">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-[#807D7E] line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
        <div className="flex gap-0.5 mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon key={star} filled={star <= Math.round(product.rating)} />
          ))}
        </div>
      </div>
    </div>
  );
}
