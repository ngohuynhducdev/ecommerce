import { describe, it, expect } from "vitest";

import { validateCoupon } from "./coupons";

// NEXT_PUBLIC_USE_STRAPI is unset in tests, so validation uses the fallback list.

describe("validateCoupon", () => {
  it("accepts SAVE10 as 10% off", async () => {
    const result = await validateCoupon("SAVE10");
    expect(result).toEqual({
      code: "SAVE10",
      discount: 10,
      type: "percent",
      minOrder: 0,
    });
  });

  it("accepts FURNITURE20 as 20% off", async () => {
    const result = await validateCoupon("FURNITURE20");
    expect(result?.discount).toBe(20);
  });

  it("is case-insensitive and trims whitespace", async () => {
    const result = await validateCoupon("  save10  ");
    expect(result?.code).toBe("SAVE10");
  });

  it("rejects unknown codes", async () => {
    const result = await validateCoupon("BOGUS");
    expect(result).toBeNull();
  });
});
