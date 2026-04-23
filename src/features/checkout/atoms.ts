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

export type ShippingMethod = "standard" | "express" | "nextday";

export const SHIPPING_COSTS: Record<ShippingMethod, number> = {
  standard: 0,
  express: 15,
  nextday: 30,
};

export const SHIPPING_LABELS: Record<ShippingMethod, string> = {
  standard: "Standard",
  express: "Express",
  nextday: "Next Day",
};

export const shippingMethodAtom = atom<ShippingMethod>("standard");

export type PaymentType = "card" | "paypal" | "bank";

export interface PaymentData {
  type: PaymentType;
  lastFour?: string;
  cardholderName?: string;
}

export const paymentDataAtom = atom<PaymentData | null>(null);