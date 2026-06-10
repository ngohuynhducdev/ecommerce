import { USE_STRAPI, strapiGet } from "./strapi";

export type CouponType = "percent" | "fixed";

export interface CouponResult {
  code: string;
  discount: number;
  type: CouponType;
  minOrder: number;
}

interface StrapiCouponItem {
  id: number;
  code: string;
  discountType: string;
  value: number;
  minOrder?: number | null;
  expiresAt?: string | null;
}

const FALLBACK_COUPONS: Record<string, CouponResult> = {
  SAVE10: { code: "SAVE10", discount: 10, type: "percent", minOrder: 0 },
  FURNITURE20: { code: "FURNITURE20", discount: 20, type: "percent", minOrder: 0 },
};

export async function validateCoupon(code: string): Promise<CouponResult | null> {
  const upper = code.trim().toUpperCase();

  if (USE_STRAPI) {
    const data = await strapiGet<StrapiCouponItem>(
      `/api/coupons?filters[code][$eq]=${encodeURIComponent(upper)}`,
      { cache: "no-store" },
    );
    if (data) {
      const item = data[0];
      if (!item) return null;
      if (item.expiresAt && new Date(item.expiresAt) < new Date()) return null;

      return {
        code: item.code.toUpperCase(),
        discount: item.value,
        type: item.discountType === "fixed" ? "fixed" : "percent",
        minOrder: item.minOrder ?? 0,
      };
    }
  }

  return FALLBACK_COUPONS[upper] ?? null;
}
