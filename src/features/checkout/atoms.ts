import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { ShippingAddress, Order } from "@/features/products/types";

export const checkoutStepAtom = atom<1 | 2 | 3>(1);
export const shippingDataAtom = atom<ShippingAddress | null>(null);
export const ordersAtom = atomWithStorage<Order[]>("orders", [], undefined, {
  getOnInit: true,
});
export interface Coupon {
  code: string;
  discount: number;
  type: "percent" | "fixed";
}

export const couponAtom = atom<Coupon | null>(null);

export type ShippingMethod = "standard" | "express" | "nextday";

export const SHIPPING_COSTS: Record<ShippingMethod, number> = {
  standard: 0,
  express: 15,
  nextday: 21,
};

export const SHIPPING_LABELS: Record<ShippingMethod, string> = {
  standard: "Free shipping",
  express: "Express shipping",
  nextday: "Pick Up",
};

export const shippingMethodAtom = atom<ShippingMethod>("standard");

export type PaymentType = "card" | "paypal" | "bank";

export interface PaymentData {
  type: PaymentType;
  lastFour?: string;
  cardholderName?: string;
}

export const paymentDataAtom = atom<PaymentData | null>(null);