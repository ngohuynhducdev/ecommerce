"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatVND } from "@/lib/utils/formatPrice";
import type { CartItem as CartItemType } from "@/lib/types/cart";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="flex gap-3 py-4 border-b border-warm-100">
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-warm-100">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-warm-200" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.slug}`}
          className="font-medium text-sm text-foreground hover:text-earth-600 line-clamp-2"
        >
          {item.name}
        </Link>
        {item.variant && (
          <p className="text-xs text-muted-foreground mt-0.5">{item.variant}</p>
        )}
        <p className="text-sm font-semibold text-earth-600 mt-1">
          {formatVND(item.price)}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() =>
              updateQuantity(item.productId, item.quantity - 1, item.variant)
            }
            className="w-6 h-6 flex items-center justify-center rounded border border-warm-300 hover:bg-warm-100 transition-colors"
            aria-label="Giảm số lượng"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm w-6 text-center">{item.quantity}</span>
          <button
            onClick={() =>
              updateQuantity(item.productId, item.quantity + 1, item.variant)
            }
            className="w-6 h-6 flex items-center justify-center rounded border border-warm-300 hover:bg-warm-100 transition-colors"
            aria-label="Tăng số lượng"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      <button
        onClick={() => removeItem(item.productId, item.variant)}
        className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors p-1"
        aria-label="Xóa sản phẩm"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
