import { atomWithStorage } from "jotai/utils";
import type { Cart } from "@/lib/types/cart";

export const cartAtom = atomWithStorage<Cart>("cart", {
  items: [],
  total: 0,
});
