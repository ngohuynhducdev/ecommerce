"use client";

import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
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
    <div className="relative rounded-xl overflow-hidden bg-surface">
      {/* Remove button */}
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 z-10 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
        aria-label={`Remove ${product.name} from wishlist`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>

      {/* Image */}
      <div className="aspect-square relative overflow-hidden">
        <Link href={`/shop/${product.slug}`}>
          <SafeImage
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
        <p className="text-xs text-muted mb-1 capitalize">
          {product.category.name}
        </p>
        <Link href={`/shop/${product.slug}`}>
          <p className="font-medium text-sm leading-snug line-clamp-2 hover:text-accent transition-colors">
            {product.name}
          </p>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-sm text-primary">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-xs text-muted line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
        <button
          onClick={handleMoveToCart}
          className="mt-3 w-full h-8 border border-primary rounded-lg text-xs font-medium text-primary hover:bg-primary hover:text-white transition-colors"
        >
          Move to Cart
        </button>
      </div>
    </div>
  );
}
