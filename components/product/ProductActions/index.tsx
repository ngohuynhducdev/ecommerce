"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VariantSelector } from "@/components/product/VariantSelector";
import { useCart } from "@/hooks/useCart";
import { wishlistAtom } from "@/store/wishlist";
import { formatVND } from "@/lib/utils/formatPrice";
import type { ProductItem } from "@/lib/types/product";

interface ProductActionsProps {
  product: ProductItem;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { attributes: p } = product;
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    p.variants?.[0]?.value ?? "",
  );
  const [added, setAdded] = useState(false);

  const isWishlisted = wishlist.some((w) => w.id === product.id);

  const selectedVariantData = p.variants?.find(
    (v) => v.value === selectedVariant,
  );
  const finalPrice = p.price + (selectedVariantData?.priceModifier ?? 0);

  const imageUrl = p.images?.data?.[0]?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${p.images.data[0].attributes.url}`
    : "";

  function toggleWishlist() {
    setWishlist((prev) =>
      isWishlisted
        ? prev.filter((w) => w.id !== product.id)
        : [...prev, product],
    );
  }

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: p.name,
      slug: p.slug,
      price: finalPrice,
      quantity,
      image: imageUrl,
      variant: selectedVariant || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-5">
      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold text-warm-900">
          {formatVND(finalPrice)}
        </span>
        {p.compareAtPrice && p.compareAtPrice > finalPrice && (
          <span className="text-base text-muted-foreground line-through">
            {formatVND(p.compareAtPrice)}
          </span>
        )}
        {p.compareAtPrice && p.compareAtPrice > finalPrice && (
          <span className="text-sm font-medium text-earth-600 bg-earth-50 px-2 py-0.5 rounded">
            -{Math.round((1 - finalPrice / p.compareAtPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Variants */}
      {p.variants && p.variants.length > 0 && (
        <VariantSelector
          variants={p.variants}
          selected={selectedVariant}
          onChange={setSelectedVariant}
        />
      )}

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-warm-700">Số lượng:</span>
        <div className="flex items-center border border-warm-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 hover:bg-warm-100 transition-colors"
            aria-label="Giảm"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(p.stock || 99, q + 1))}
            className="px-3 py-2 hover:bg-warm-100 transition-colors"
            aria-label="Tăng"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {p.stock !== undefined && p.stock <= 10 && p.stock > 0 && (
          <span className="text-xs text-earth-600">
            Chỉ còn {p.stock} sản phẩm
          </span>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={p.stock === 0}
          className={`flex-1 gap-2 py-6 text-base transition-all ${
            added
              ? "bg-sage-600 hover:bg-sage-600"
              : "bg-warm-800 hover:bg-warm-900"
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          {p.stock === 0
            ? "Hết hàng"
            : added
              ? "Đã thêm ✓"
              : "Thêm vào giỏ hàng"}
        </Button>
        <Button
          variant="outline"
          onClick={toggleWishlist}
          className={`px-4 py-6 ${
            isWishlisted
              ? "text-earth-600 border-earth-300 hover:border-earth-400"
              : ""
          }`}
          aria-label={isWishlisted ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
        >
          <Heart
            className={`w-5 h-5 ${isWishlisted ? "fill-earth-500 text-earth-500" : ""}`}
          />
        </Button>
      </div>
    </div>
  );
}
