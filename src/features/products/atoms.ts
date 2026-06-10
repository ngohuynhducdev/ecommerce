import { atomWithStorage } from "jotai/utils";
import type { Review } from "./types";

/**
 * User-submitted reviews, persisted to localStorage and keyed by product id.
 * Mock/seed reviews live in the product detail UI; these are layered on top.
 */
export const reviewsAtom = atomWithStorage<Record<string, Review[]>>(
  "reviews",
  {},
);
