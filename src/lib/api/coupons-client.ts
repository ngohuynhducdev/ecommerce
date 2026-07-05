import type { CouponResult } from "./coupons";

// Client-safe coupon validation — calls the internal API route so the
// Strapi token in coupons.ts never reaches the browser bundle.
export async function validateCouponClient(
  code: string,
): Promise<CouponResult | null> {
  const res = await fetch(
    `/api/coupons/validate?code=${encodeURIComponent(code)}`,
  );
  if (!res.ok) return null;
  return (await res.json()) as CouponResult;
}
