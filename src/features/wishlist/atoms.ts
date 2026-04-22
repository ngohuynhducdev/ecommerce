import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { WishlistItem } from "@/features/products/types";

export const wishlistAtom = atomWithStorage<WishlistItem[]>("wishlist", []);

export const wishlistCountAtom = atom((get) => get(wishlistAtom).length);
