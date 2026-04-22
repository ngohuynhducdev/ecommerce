import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { CartItem } from "@/features/products/types";

export const cartItemsAtom = atomWithStorage<CartItem[]>("cart", []);
export const cartOpenAtom = atom(false);

export const cartCountAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, i) => sum + i.quantity, 0)
);

export const cartSubtotalAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, i) => sum + i.product.price * i.quantity, 0)
);
