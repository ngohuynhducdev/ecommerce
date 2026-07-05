"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { useAtom, useSetAtom } from "jotai";
import { toast } from "sonner";

import { wishlistAtom } from "@/features/wishlist/atoms";
import { cartItemsAtom } from "@/features/cart/atoms";
import { mockProducts } from "@/features/products/mock-data";
import type { Product } from "@/features/products/types";
import { formatPrice } from "@/lib/utils";

// Shown until the visitor saves real items (demo parity with design).
const SAMPLE = mockProducts.slice(0, 4).map((product) => ({ product, addedAt: "" }));

export default function WishlistPage() {
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const setCartItems = useSetAtom(cartItemsAtom);
  const items = wishlist.length > 0 ? wishlist : SAMPLE;

  function removeItem(productId: string) {
    setWishlist((prev) => prev.filter((w) => w.product.id !== productId));
  }

  function addToCart(product: Product) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && !i.variant);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && !i.variant
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success("Added to cart");
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink mb-6">Your Wishlist</h2>

      {/* Column headers — desktop */}
      <div className="hidden md:grid grid-cols-[1fr_auto_160px] gap-4 border-b border-line pb-3 text-sm font-medium text-ink">
        <span>Product</span>
        <span className="text-right w-24">Price</span>
        <span className="text-right">Action</span>
      </div>

      <div className="divide-y divide-line">
        {items.map(({ product }) => (
          <div
            key={product.id}
            className="py-5 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_160px] gap-4 items-center"
          >
            {/* Product cell */}
            <div className="flex items-center gap-3 md:gap-4 col-span-2 md:col-span-1 min-w-0">
              <button
                onClick={() => removeItem(product.id)}
                aria-label="Remove"
                className="text-subtle hover:text-ink transition-colors cursor-pointer text-lg leading-none shrink-0"
              >
                ×
              </button>
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-mist shrink-0">
                <SafeImage
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <Link
                  href={`/shop/${product.slug}`}
                  className="font-semibold text-sm text-ink hover:text-gold transition-colors line-clamp-1"
                >
                  {product.name}
                </Link>
                <p className="text-xs text-subtle mt-0.5">{product.category.name}</p>
              </div>
            </div>

            {/* Price */}
            <div className="text-sm font-semibold text-ink text-right md:w-24 md:justify-self-end">
              {formatPrice(product.price)}
            </div>

            {/* Action */}
            <button
              onClick={() => addToCart(product)}
              className="col-span-3 md:col-span-1 h-11 px-6 bg-ink text-white text-sm font-medium rounded-lg hover:bg-gold transition-colors cursor-pointer"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
