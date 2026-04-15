"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useAtom } from "jotai";
import { wishlistAtom } from "@/store/wishlist";
import { useCart } from "@/hooks/useCart";
import { formatVND } from "@/lib/utils/formatPrice";
import type { ProductItem } from "@/lib/types/product";

interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const { attributes: p } = product;
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const { addItem } = useCart();

  const imageUrl = p.images?.data?.[0]?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${p.images.data[0].attributes.url}`
    : null;
  const imageAlt = p.images?.data?.[0]?.attributes?.alternativeText ?? p.name;

  const isWishlisted = wishlist.some((w) => w.id === product.id);

  function toggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    setWishlist((prev) =>
      isWishlisted
        ? prev.filter((w) => w.id !== product.id)
        : [...prev, product],
    );
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      quantity: 1,
      image: imageUrl ?? "",
    });
  }

  return (
    <Link
      href={`/products/${p.slug}`}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="relative aspect-square bg-warm-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-warm-200" />
        )}

        {/* Wishlist button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-warm-600 hover:text-earth-600 transition-colors shadow-sm"
          aria-label={isWishlisted ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? "fill-earth-500 text-earth-500" : ""}`}
          />
        </button>

        {/* Add to Cart overlay (desktop hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 md:block hidden">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-warm-800 hover:bg-warm-900 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Thêm vào giỏ
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1">
        <h3 className="font-medium text-sm text-warm-800 line-clamp-2 leading-snug">
          {p.name}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-semibold text-warm-900">
            {formatVND(p.price)}
          </span>
          {p.compareAtPrice && p.compareAtPrice > p.price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatVND(p.compareAtPrice)}
            </span>
          )}
        </div>
        {/* Mobile Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="md:hidden mt-2 w-full flex items-center justify-center gap-2 py-2 px-4 bg-warm-100 hover:bg-warm-200 text-warm-800 text-xs font-medium rounded-lg transition-colors"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Thêm vào giỏ
        </button>
      </div>
    </Link>
  );
}
