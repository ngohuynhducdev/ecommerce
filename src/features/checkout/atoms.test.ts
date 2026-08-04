import { describe, it, expect, beforeEach, vi } from "vitest";
import { createStore } from "jotai";

import { couponAtom, type Coupon } from "./atoms";

const SAVE10: Coupon = { code: "SAVE10", discount: 10, type: "percent" };

describe("couponAtom", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts empty", () => {
    expect(createStore().get(couponAtom)).toBeNull();
  });

  it("persists the coupon to localStorage", () => {
    const store = createStore();
    store.set(couponAtom, SAVE10);
    expect(JSON.parse(localStorage.getItem("coupon") ?? "null")).toEqual(SAVE10);
  });

  it("reads a coupon written by an earlier session", async () => {
    // getOnInit reads localStorage when the atom is created, so the module has
    // to be re-imported after seeding storage — this is the reload path.
    localStorage.setItem("coupon", JSON.stringify(SAVE10));
    vi.resetModules();
    const { couponAtom: reloaded } = await import("./atoms");
    expect(createStore().get(reloaded)).toEqual(SAVE10);
  });

  it("clears the stored coupon when removed", () => {
    const store = createStore();
    store.set(couponAtom, SAVE10);
    store.set(couponAtom, null);
    expect(store.get(couponAtom)).toBeNull();
    expect(JSON.parse(localStorage.getItem("coupon") ?? "null")).toBeNull();
  });
});
