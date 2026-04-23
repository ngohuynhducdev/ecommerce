"use client";

import Image from "next/image";
import { useAtomValue } from "jotai";

import { cartItemsAtom, cartSubtotalAtom } from "@/features/cart/atoms";
import {
  couponAtom,
  shippingMethodAtom,
  SHIPPING_COSTS,
  SHIPPING_LABELS,
} from "@/features/checkout/atoms";
import { formatPrice } from "@/lib/utils";

export function CheckoutSummary() {
  const items = useAtomValue(cartItemsAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const coupon = useAtomValue(couponAtom);
  const shippingMethod = useAtomValue(shippingMethodAtom);

  const shippingCost = SHIPPING_COSTS[shippingMethod];
  const discountAmount = coupon
    ? coupon.type === "percent"
      ? (subtotal * coupon.discount) / 100
      : coupon.discount
    : 0;
  const total = Math.max(0, subtotal + shippingCost - discountAmount);

  const visibleItems = items.slice(0, 3);
  const extraCount = Math.max(0, items.length - visibleItems.length);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <aside className="bg-[#F3F5F7] rounded-2xl p-6 sticky top-8 h-fit">
      <h2 className="text-lg font-semibold text-[#1C1C1C] mb-4">
        Order Summary
      </h2>

      {items.length > 0 && (
        <div className="flex items-center gap-3 mb-5">
          <div className="flex gap-2">
            {visibleItems.map((item) => (
              <div
                key={`${item.product.id}-${item.variant?.id ?? "default"}`}
                className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-[#E8ECEF]"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            ))}
            {extraCount > 0 && (
              <div className="w-12 h-12 rounded-lg bg-white border border-[#E8ECEF] flex items-center justify-center text-xs font-medium text-[#807D7E]">
                +{extraCount}
              </div>
            )}
          </div>
          <p className="text-xs text-[#807D7E]">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
      )}

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[#807D7E]">Subtotal</span>
          <span className="text-[#1C1C1C]">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#807D7E]">
            Shipping ({SHIPPING_LABELS[shippingMethod]})
          </span>
          <span className="text-[#1C1C1C]">
            {shippingCost === 0 ? (
              <span className="text-[#2EC1AC]">Free</span>
            ) : (
              formatPrice(shippingCost)
            )}
          </span>
        </div>
        {coupon && (
          <div className="flex justify-between">
            <span className="text-[#807D7E]">Discount ({coupon.code})</span>
            <span className="text-red-500">-{formatPrice(discountAmount)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4 mt-4 border-t border-[#E8ECEF]">
        <span className="font-bold text-[#1C1C1C]">Total</span>
        <span className="font-bold text-[#1C1C1C] text-lg">
          {formatPrice(total)}
        </span>
      </div>
    </aside>
  );
}
