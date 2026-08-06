import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { WishlistItem } from "@/features/products/types";

// getOnInit reads localStorage on the first client render, like the cart and
// the coupon. Without it the wishlist starts empty and only fills in after
// hydration, so the header badge flashes 0 and /account/wishlist paints its
// empty state over a wishlist that is not actually empty.
export const wishlistAtom = atomWithStorage<WishlistItem[]>(
  "wishlist",
  [],
  undefined,
  { getOnInit: true },
);

export const wishlistCountAtom = atom((get) => get(wishlistAtom).length);
