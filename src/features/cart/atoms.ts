import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { CartItem } from "@/features/products/types";

// getOnInit reads localStorage on the first client render so guards like the
// checkout "empty cart" redirect see the real cart instead of the empty default.
export const cartItemsAtom = atomWithStorage<CartItem[]>("cart", [], undefined, {
  getOnInit: true,
});
export const cartOpenAtom = atom(false);

export const cartCountAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, i) => sum + i.quantity, 0)
);

export const cartSubtotalAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, i) => sum + i.product.price * i.quantity, 0)
);
