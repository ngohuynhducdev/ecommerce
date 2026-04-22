import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { CartItem } from "@/features/products/types";

export const cartItemsAtom = atomWithStorage<CartItem[]>("cart-items", []);
export const cartOpenAtom = atom(false);
export const couponAtom = atomWithStorage<{
  code: string;
  discount: number;
  type: "percent" | "fixed";
} | null>("coupon", null);

export const cartCountAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, item) => sum + item.quantity, 0)
);

export const cartSubtotalAtom = atom((get) =>
  get(cartItemsAtom).reduce(
    (sum, item) =>
      sum +
      (item.product.price + (item.variant?.priceModifier ?? 0)) * item.quantity,
    0
  )
);
