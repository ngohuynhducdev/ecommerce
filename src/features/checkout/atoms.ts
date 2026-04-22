import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { ShippingAddress, Order } from "@/features/products/types";

export const checkoutStepAtom = atom<1 | 2 | 3>(1);
export const shippingDataAtom = atom<ShippingAddress | null>(null);
export const ordersAtom = atomWithStorage<Order[]>("orders", []);
export const couponAtom = atom<{
  code: string;
  discount: number;
  type: "percent" | "fixed";
} | null>(null);