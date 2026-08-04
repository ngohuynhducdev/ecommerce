import { describe, it, expect } from "vitest";

import { calculateDiscount, calculateTotal } from "./totals";

describe("calculateDiscount", () => {
  it("is zero without a coupon", () => {
    expect(calculateDiscount(1648, null)).toBe(0);
  });

  it("takes a percentage off the subtotal", () => {
    expect(calculateDiscount(1648, { code: "SAVE10", discount: 10, type: "percent" })).toBe(164.8);
  });

  it("takes a fixed amount off the subtotal", () => {
    expect(calculateDiscount(1648, { code: "FLAT50", discount: 50, type: "fixed" })).toBe(50);
  });

  it("never discounts more than the subtotal", () => {
    expect(calculateDiscount(30, { code: "FLAT50", discount: 50, type: "fixed" })).toBe(30);
  });
});

describe("calculateTotal", () => {
  it("adds shipping when there is no coupon", () => {
    expect(calculateTotal(1648, 15, null)).toBe(1663);
  });

  it("subtracts the discount before adding shipping", () => {
    expect(
      calculateTotal(1648, 15, { code: "SAVE10", discount: 10, type: "percent" })
    ).toBe(1498.2);
  });

  it("leaves shipping payable when the coupon covers the whole subtotal", () => {
    expect(
      calculateTotal(30, 15, { code: "FLAT50", discount: 50, type: "fixed" })
    ).toBe(15);
  });

  it("never goes negative", () => {
    expect(
      calculateTotal(0, 0, { code: "FLAT50", discount: 50, type: "fixed" })
    ).toBe(0);
  });
});
