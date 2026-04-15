"use client";

import type { ProductVariant } from "@/lib/types/product";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selected: string;
  onChange: (value: string) => void;
}

export function VariantSelector({
  variants,
  selected,
  onChange,
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  // Detect if color-like (short values) or label-like
  const isColorVariant = variants.every(
    (v) => v.value.startsWith("#") || v.value.length <= 12,
  );

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-warm-700">
        Lựa chọn:{" "}
        <span className="text-warm-900">
          {variants.find((v) => v.value === selected)?.label ?? ""}
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.value === selected;
          if (isColorVariant && variant.value.startsWith("#")) {
            return (
              <button
                key={variant.value}
                onClick={() => onChange(variant.value)}
                title={variant.label}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  isSelected
                    ? "border-warm-800 scale-110 shadow-md"
                    : "border-transparent hover:border-warm-400"
                }`}
                style={{ backgroundColor: variant.value }}
                aria-label={variant.label}
                aria-pressed={isSelected}
              />
            );
          }

          return (
            <button
              key={variant.value}
              onClick={() => onChange(variant.value)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                isSelected
                  ? "border-warm-800 bg-warm-800 text-white"
                  : "border-warm-300 text-warm-700 hover:border-warm-500"
              }`}
              aria-pressed={isSelected}
            >
              {variant.label}
              {variant.priceModifier && variant.priceModifier > 0 && (
                <span className="ml-1 text-xs opacity-70">
                  +{(variant.priceModifier / 1000).toFixed(0)}k
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
