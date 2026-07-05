import { describe, it, expect, beforeEach, vi } from "vitest";
import { createStore } from "jotai";

import { cartItemsAtom, cartCountAtom, cartSubtotalAtom } from "./atoms";
import { mockProducts } from "@/features/products/mock-data";
import type { CartItem } from "@/features/products/types";

const [productA, productB] = mockProducts;

function item(product: (typeof mockProducts)[number], quantity: number): CartItem {
  return { product, quantity };
}

describe("cart atoms", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts empty", () => {
    const store = createStore();
    expect(store.get(cartItemsAtom)).toEqual([]);
    expect(store.get(cartCountAtom)).toBe(0);
    expect(store.get(cartSubtotalAtom)).toBe(0);
  });

  it("counts total quantity across items", () => {
    const store = createStore();
    store.set(cartItemsAtom, [item(productA, 2), item(productB, 3)]);
    expect(store.get(cartCountAtom)).toBe(5);
  });

  it("computes the subtotal from price × quantity", () => {
    const store = createStore();
    store.set(cartItemsAtom, [item(productA, 2), item(productB, 1)]);
    expect(store.get(cartSubtotalAtom)).toBe(
      productA.price * 2 + productB.price * 1,
    );
  });

  it("persists the cart to localStorage", () => {
    const store = createStore();
    store.set(cartItemsAtom, [item(productA, 1)]);
    const stored = JSON.parse(localStorage.getItem("cart") ?? "[]") as CartItem[];
    expect(stored).toHaveLength(1);
    expect(stored[0].product.id).toBe(productA.id);
  });

  it("hydrates from localStorage on init (getOnInit)", async () => {
    localStorage.setItem("cart", JSON.stringify([item(productA, 4)]));
    // getOnInit reads storage when the atom module is created, so re-import
    // the module to simulate a fresh page load (e.g. landing on /checkout).
    vi.resetModules();
    const fresh = await import("./atoms");
    const store = createStore();
    expect(store.get(fresh.cartCountAtom)).toBe(4);
  });
});
