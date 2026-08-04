import type { Coupon } from "./atoms";

/** Money the coupon takes off the subtotal. Never more than the subtotal. */
export function calculateDiscount(subtotal: number, coupon: Coupon | null): number {
  if (!coupon) return 0;
  const raw =
    coupon.type === "percent"
      ? (subtotal * coupon.discount) / 100
      : coupon.discount;
  return Math.min(Math.max(0, raw), subtotal);
}

/** Order total: subtotal, less the coupon, plus shipping. Never negative. */
export function calculateTotal(
  subtotal: number,
  shippingCost: number,
  coupon: Coupon | null
): number {
  return Math.max(0, subtotal - calculateDiscount(subtotal, coupon) + shippingCost);
}
