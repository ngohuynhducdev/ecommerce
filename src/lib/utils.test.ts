import { describe, it, expect } from "vitest";

import { cn, formatPrice, generateOrderId } from "./utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values", () => {
    expect(cn("a", false && "b", undefined, null)).toBe("a");
  });

  it("resolves conflicting tailwind classes to the last one", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
});

describe("formatPrice", () => {
  it("formats whole dollars as USD", () => {
    expect(formatPrice(1299)).toBe("$1,299.00");
  });

  it("formats cents", () => {
    expect(formatPrice(19.19)).toBe("$19.19");
  });

  it("formats zero", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });
});

describe("generateOrderId", () => {
  it("uses the ORD- prefix and uppercase base36", () => {
    const id = generateOrderId();
    expect(id).toMatch(/^ORD-[0-9A-Z]+$/);
  });
});
