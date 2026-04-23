"use client";

import { useMemo, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { Minus, Plus, Truck, RotateCcw, Clock } from "lucide-react";
import { toast } from "sonner";

import { cartItemsAtom, cartOpenAtom } from "@/features/cart/atoms";
import { wishlistAtom } from "@/features/wishlist/atoms";
import type { Product, Variant } from "@/features/products/types";
import { cn } from "@/lib/utils";

interface AddToCartSectionProps {
  product: Product;
}

const COLOR_HEX_MAP: Record<string, string> = {
  beige: "#F5F0E8",
  charcoal: "#4A4A4A",
  sage: "#9CAF88",
  green: "#7D8F74",
  natural: "#D7B98A",
  walnut: "#5B3A1E",
  oak: "#C49A6C",
  pine: "#E8D5A5",
  ebony: "#1C1C1C",
  black: "#1C1C1C",
  white: "#FFFFFF",
  light: "#D7D2CB",
  grey: "#9CA3AF",
  gray: "#9CA3AF",
  cream: "#F6F0E4",
  navy: "#2F3E5B",
  rose: "#D6A4A4",
  oatmeal: "#E1D4BA",
  marble: "#EDEAE4",
  caramel: "#AF7A41",
  terracotta: "#C66B3D",
  gold: "#B88E2F",
  brass: "#B5893C",
  matte: "#1C1C1C",
  brown: "#8B4513",
  "light oak": "#D7B98A",
  "light grey": "#C8CCD0",
  "dusty rose": "#D6A4A4",
  "brushed gold": "#B88E2F",
  "pine natural": "#E8D5A5",
};

function resolveColor(value: string): { hex: string; hasBorder: boolean } {
  const lower = value.toLowerCase();
  if (COLOR_HEX_MAP[lower]) {
    return { hex: COLOR_HEX_MAP[lower], hasBorder: lower === "white" };
  }
  const tokens = lower.split(/[\s/]+/);
  for (const token of tokens) {
    if (COLOR_HEX_MAP[token]) {
      return { hex: COLOR_HEX_MAP[token], hasBorder: token === "white" };
    }
  }
  return { hex: "#D1D5DB", hasBorder: false };
}

export function AddToCartSection({ product }: AddToCartSectionProps) {
  const setCartItems = useSetAtom(cartItemsAtom);
  const setCartOpen = useSetAtom(cartOpenAtom);
  const [wishlist, setWishlist] = useAtom(wishlistAtom);

  const colorVariants = useMemo(
    () => product.variants.filter((v) => v.name.toLowerCase() === "color"),
    [product.variants]
  );
  const sizeVariants = useMemo(
    () => product.variants.filter((v) => v.name.toLowerCase() === "size"),
    [product.variants]
  );

  const [selectedColor, setSelectedColor] = useState<Variant | undefined>(
    () => colorVariants.find((v) => v.stock > 0) ?? colorVariants[0]
  );
  const [selectedSize, setSelectedSize] = useState<Variant | undefined>(
    () => sizeVariants.find((v) => v.stock > 0) ?? sizeVariants[0]
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = selectedSize ?? selectedColor;
  const availableStock = selectedVariant?.stock ?? product.stock;
  const isOutOfStock = availableStock === 0;
  const isWishlisted = wishlist.some((w) => w.product.id === product.id);

  function handleQtyChange(next: number) {
    if (next < 1) return;
    if (next > availableStock) return;
    setQuantity(next);
  }

  function handleAddToCart() {
    if (isOutOfStock) return;

    setCartItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.product.id === product.id &&
          (i.variant?.id ?? null) === (selectedVariant?.id ?? null)
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id &&
          (i.variant?.id ?? null) === (selectedVariant?.id ?? null)
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [
        ...prev,
        { product, variant: selectedVariant, quantity },
      ];
    });
    setCartOpen(true);
    toast.success("Added to cart!");
  }

  function handleToggleWishlist() {
    setWishlist((prev) =>
      isWishlisted
        ? prev.filter((w) => w.product.id !== product.id)
        : [...prev, { product, addedAt: new Date().toISOString() }]
    );
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  }

  const stockMessage = (() => {
    if (availableStock === 0) {
      return <span className="text-red-500 text-sm">Out of Stock</span>;
    }
    if (availableStock <= 5) {
      return (
        <span className="text-amber-500 text-sm">
          Only {availableStock} left
        </span>
      );
    }
    return <span className="text-[#2EC1AC] text-sm">In Stock ✓</span>;
  })();

  return (
    <div className="mt-6">
      {/* Color selector */}
      {colorVariants.length > 0 && (
        <div className="mb-6">
          <p className="font-medium text-sm mb-2 text-[#1C1C1C]">
            Color:{" "}
            {selectedColor && (
              <span className="text-[#807D7E] font-normal">
                {selectedColor.value}
              </span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {colorVariants.map((variant) => {
              const { hex, hasBorder } = resolveColor(variant.value);
              const isSelected = selectedColor?.id === variant.id;
              const isUnavailable = variant.stock === 0;
              return (
                <button
                  key={variant.id}
                  onClick={() => setSelectedColor(variant)}
                  disabled={isUnavailable}
                  aria-label={variant.value}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all cursor-pointer",
                    hasBorder ? "border-[#E8ECEF]" : "border-transparent",
                    isSelected && "ring-2 ring-offset-2 ring-[#1C1C1C]",
                    isUnavailable && "opacity-40 cursor-not-allowed"
                  )}
                  style={{ backgroundColor: hex }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Size selector */}
      {sizeVariants.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-sm text-[#1C1C1C]">Size:</p>
            <button className="text-xs text-[#807D7E] hover:text-[#1C1C1C] underline cursor-pointer">
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizeVariants.map((variant) => {
              const isSelected = selectedSize?.id === variant.id;
              const isUnavailable = variant.stock === 0;
              return (
                <button
                  key={variant.id}
                  onClick={() => setSelectedSize(variant)}
                  disabled={isUnavailable}
                  className={cn(
                    "px-4 py-2 border rounded-sm text-sm transition-colors cursor-pointer",
                    isSelected
                      ? "bg-[#1C1C1C] text-white border-[#1C1C1C]"
                      : "bg-white text-[#1C1C1C] border-[#E8ECEF] hover:border-[#1C1C1C]",
                    isUnavailable && "opacity-40 cursor-not-allowed hover:border-[#E8ECEF]"
                  )}
                >
                  {variant.value}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity + stock */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex border border-[#E8ECEF] rounded-sm w-fit">
          <button
            onClick={() => handleQtyChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center text-[#1C1C1C] hover:bg-[#F3F5F7] transition-colors disabled:opacity-40 cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="text"
            inputMode="numeric"
            value={quantity}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (Number.isFinite(next)) handleQtyChange(next);
            }}
            className="text-center w-12 text-sm outline-none bg-transparent"
          />
          <button
            onClick={() => handleQtyChange(quantity + 1)}
            disabled={quantity >= availableStock}
            className="w-10 h-10 flex items-center justify-center text-[#1C1C1C] hover:bg-[#F3F5F7] transition-colors disabled:opacity-40 cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {stockMessage}
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className="w-full h-14 bg-[#1C1C1C] text-white text-sm font-medium mt-4 rounded-sm hover:bg-[#333] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </button>

      {/* Add to Wishlist */}
      <button
        onClick={handleToggleWishlist}
        className="w-full h-12 border border-[#1C1C1C] mt-3 rounded-sm text-sm text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-colors cursor-pointer"
      >
        {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>

      {/* Delivery strip */}
      <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-[#E8ECEF]">
        <div className="flex items-center gap-3 text-sm text-[#1C1C1C]">
          <Truck className="w-4 h-4 shrink-0 text-[#807D7E]" />
          <span>Free delivery on orders over $50</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#1C1C1C]">
          <RotateCcw className="w-4 h-4 shrink-0 text-[#807D7E]" />
          <span>Free 90-day returns</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#1C1C1C]">
          <Clock className="w-4 h-4 shrink-0 text-[#807D7E]" />
          <span>Estimated delivery 3-5 business days</span>
        </div>
      </div>
    </div>
  );
}
