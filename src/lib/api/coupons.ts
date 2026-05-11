const USE_STRAPI = process.env.NEXT_PUBLIC_USE_STRAPI === "true";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

const strapiHeaders = {
  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  "Content-Type": "application/json",
};

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
    try {
      const url = `${STRAPI_URL}/api/coupons?filters[code][$eq]=${upper}`;
      const res = await fetch(url, { headers: strapiHeaders, cache: "no-store" });
      if (!res.ok) return FALLBACK_COUPONS[upper] ?? null;

      const json = (await res.json()) as { data: StrapiCouponItem[] };
      const item = json.data[0];
      if (!item) return null;

      if (item.expiresAt && new Date(item.expiresAt) < new Date()) return null;

      return {
        code: item.code.toUpperCase(),
        discount: item.value,
        type: item.discountType === "fixed" ? "fixed" : "percent",
        minOrder: item.minOrder ?? 0,
      };
    } catch {
      return FALLBACK_COUPONS[upper] ?? null;
    }
  }

  return FALLBACK_COUPONS[upper] ?? null;
}
