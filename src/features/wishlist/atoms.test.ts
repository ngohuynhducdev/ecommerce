import { describe, it, expect, beforeEach } from "vitest";
import { createStore } from "jotai";

import { wishlistAtom, wishlistCountAtom } from "./atoms";
import { mockProducts } from "@/features/products/mock-data";

describe("wishlist atoms", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts empty", () => {
    const store = createStore();
    expect(store.get(wishlistCountAtom)).toBe(0);
  });

  it("counts wishlist entries", () => {
    const store = createStore();
    store.set(wishlistAtom, [
      { product: mockProducts[0], addedAt: "2026-01-01" },
      { product: mockProducts[1], addedAt: "2026-01-02" },
    ]);
    expect(store.get(wishlistCountAtom)).toBe(2);
  });
});
