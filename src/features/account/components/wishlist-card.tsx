"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useSetAtom } from "jotai";
import { cartItemsAtom, cartOpenAtom } from "@/features/cart/atoms";
import { wishlistAtom } from "@/features/wishlist/atoms";
import type { WishlistItem } from "@/features/products/types";
import { formatPrice } from "@/lib/utils";

interface Props {
  item: WishlistItem;
}

export function WishlistCard({ item }: Props) {
  const { product } = item;
  const setWishlist = useSetAtom(wishlistAtom);
  const setCartItems = useSetAtom(cartItemsAtom);
  const setCartOpen = useSetAtom(cartOpenAtom);

  function handleRemove() {
    setWishlist((prev) => prev.filter((w) => w.product.id !== product.id));
  }

  function handleMoveToCart() {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && !i.variant,
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && !i.variant
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setWishlist((prev) => prev.filter((w) => w.product.id !== product.id));
    setCartOpen(true);
  }

  return (
    <div className="relative rounded-xl overflow-hidden bg-[#FAFAFA]">
      {/* Remove button */}
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 z-10 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
        aria-label={`Remove ${product.name} from wishlist`}
      >
        <X size={13} />
      </button>

      {/* Image */}
      <div className="aspect-square relative overflow-hidden">
        <Link href={`/shop/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
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
          <span className="font-semibold text-sm text-[#1C1C1C]">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-xs text-[#807D7E] line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
        <button
          onClick={handleMoveToCart}
          className="mt-3 w-full h-8 border border-[#1C1C1C] rounded-sm text-xs font-medium text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-colors"
        >
          Move to Cart
        </button>
      </div>
    </div>
  );
}
