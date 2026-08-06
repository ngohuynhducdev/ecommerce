import { describe, it, expect, beforeEach, vi } from "vitest";
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

  it("persists the wishlist to localStorage", () => {
    const store = createStore();
    const items = [{ product: mockProducts[0], addedAt: "2026-01-01" }];
    store.set(wishlistAtom, items);
    expect(JSON.parse(localStorage.getItem("wishlist") ?? "null")).toEqual(items);
  });

  it("reads a wishlist written by an earlier session", async () => {
    // getOnInit reads localStorage when the atom is created, so the module has
    // to be re-imported after seeding storage — this is the reload path that
    // used to render an empty wishlist before hydration caught up.
    const items = [{ product: mockProducts[0], addedAt: "2026-01-01" }];
    localStorage.setItem("wishlist", JSON.stringify(items));
    vi.resetModules();
    const { wishlistAtom: reloaded, wishlistCountAtom: reloadedCount } =
      await import("./atoms");
    const store = createStore();
    expect(store.get(reloaded)).toEqual(items);
    expect(store.get(reloadedCount)).toBe(1);
  });
});
