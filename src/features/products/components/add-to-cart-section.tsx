"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
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

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
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
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const targetRef = useRef<number | null>(null);

  useEffect(() => {
    // 2 days + 12 hours from now
    targetRef.current = Date.now() + (2 * 24 * 60 * 60 * 1000) + (12 * 60 * 60 * 1000);

    function tick() {
      if (targetRef.current === null) return;
      const diff = Math.max(0, targetRef.current - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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

  const timerUnits: Array<{ label: string; value: number }> = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="mt-6">
      {/* 1. Countdown timer */}
      <div>
        <p className="text-sm text-[#807D7E] mb-3">Offer expires in:</p>
        <div className="flex gap-3">
          {timerUnits.map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 bg-[#F3F5F7] rounded-lg flex items-center justify-center text-xl font-semibold tabular-nums text-[#1C1C1C]">
                {String(value).padStart(2, "0")}
              </div>
              <span className="text-xs text-[#807D7E] text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Divider */}
      <div className="h-px bg-[#E8ECEF] my-6" />

      {/* 3. Measurements */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#1C1C1C]">Measurements</span>
          <span className="text-sm text-[#807D7E]">/</span>
        </div>
        <p className="text-sm text-[#807D7E] mt-1">17 1/2×20 5/8&quot;</p>
      </div>

      {/* 4. Choose Color */}
      {colorVariants.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center">
            <span className="text-sm font-medium text-[#1C1C1C]">Choose Color</span>
            <span className="text-[#807D7E] ml-1">›</span>
          </div>
          {selectedColor && (
            <p className="text-sm text-[#807D7E] capitalize mt-0.5">{selectedColor.value}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
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
                    "rounded-full w-9 h-9 border-2 transition-all cursor-pointer",
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
        <div className="mt-6">
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

      {/* 5. Quantity + Wishlist row */}
      <div className="flex gap-3 mt-6">
        {/* Qty stepper */}
        <div className="flex items-center border border-[#1C1C1C] rounded-sm">
          <button
            onClick={() => handleQtyChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center text-[#1C1C1C] hover:bg-[#F3F5F7] transition-colors disabled:opacity-40 cursor-pointer"
            aria-label="Decrease quantity"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleToggleWishlist}
          className="flex-1 border border-[#1C1C1C] rounded-sm flex items-center justify-center gap-2 text-sm font-medium text-[#1C1C1C] hover:bg-[#F3F5F7] transition-colors cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isWishlisted ? "#1C1C1C" : "none"}
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Wishlist
        </button>
      </div>

      {/* 6. Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className="w-full h-14 bg-[#1C1C1C] text-white text-sm font-medium mt-3 rounded-sm hover:bg-[#B88E2F] transition-colors disabled:opacity-40 cursor-pointer"
      >
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </button>

      {/* 7. SKU + Category meta */}
      <div className="mt-6 pt-4 border-t border-[#E8ECEF] space-y-2">
        <div className="flex items-center gap-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#807D7E] w-20">SKU</span>
          <span className="text-xs text-[#1C1C1C]">{product.id.slice(0, 6)}</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#807D7E] w-20">Category</span>
          <span className="text-xs text-[#1C1C1C]">{product.category.name}</span>
        </div>
      </div>
    </div>
  );
}
