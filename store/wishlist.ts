import { atomWithStorage } from "jotai/utils";
import type { ProductItem } from "@/lib/types/product";

export const wishlistAtom = atomWithStorage<ProductItem[]>("wishlist", []);
