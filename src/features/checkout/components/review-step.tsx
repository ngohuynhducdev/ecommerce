"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  checkoutStepAtom,
  shippingDataAtom,
  shippingMethodAtom,
  paymentDataAtom,
  couponAtom,
  ordersAtom,
  SHIPPING_COSTS,
  SHIPPING_LABELS,
} from "@/features/checkout/atoms";
import { cartItemsAtom, cartSubtotalAtom } from "@/features/cart/atoms";
import { formatPrice, generateOrderId } from "@/lib/utils";
import type { Order } from "@/features/products/types";

export function ReviewStep() {
  const router = useRouter();
  const setStep = useSetAtom(checkoutStepAtom);

  const [items, setItems] = useAtom(cartItemsAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const [coupon, setCoupon] = useAtom(couponAtom);
  const shipping = useAtomValue(shippingDataAtom);
  const shippingMethod = useAtomValue(shippingMethodAtom);
  const payment = useAtomValue(paymentDataAtom);
  const setOrders = useSetAtom(ordersAtom);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = SHIPPING_COSTS[shippingMethod];
  const discountAmount = coupon
    ? coupon.type === "percent"
      ? (subtotal * coupon.discount) / 100
      : coupon.discount
    : 0;
  const total = Math.max(0, subtotal + shippingCost - discountAmount);

  function handlePlaceOrder() {
    if (!termsAccepted || !shipping || isProcessing) return;

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = generateOrderId();
      const order: Order = {
        id: orderId,
        orderNumber: orderId,
        status: "pending",
        items,
        total,
        createdAt: new Date().toISOString(),
        shippingAddress: shipping,
      };

      setOrders((prev) => [order, ...prev]);
      setItems([]);
      setCoupon(null);
      setStep(1);

      toast.success("Order placed successfully!");
      router.push(`/order-success?id=${orderId}`);
    }, 2000);
  }

  const paymentSummary = (() => {
    if (!payment) return "Not selected";
    if (payment.type === "card") {
      return `Credit Card ending in •••• ${payment.lastFour ?? "----"}`;
    }
    if (payment.type === "paypal") return "PayPal";
    return "Bank Transfer";
  })();

  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#1C1C1C] mb-6">
        Review Your Order
      </h2>

      {/* Shipping address card */}
      <div className="border border-[#E8ECEF] rounded-xl p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-[#1C1C1C]">
            Shipping Address
          </h3>
          <button
            onClick={() => setStep(1)}
            className="text-xs text-[#807D7E] underline hover:text-[#1C1C1C] cursor-pointer"
          >
            Edit
          </button>
        </div>
        {shipping ? (
          <div className="text-sm text-[#1C1C1C] space-y-0.5">
            <p className="font-medium">
              {shipping.firstName} {shipping.lastName}
            </p>
            <p className="text-[#807D7E]">{shipping.address}</p>
            <p className="text-[#807D7E]">
              {shipping.city}, {shipping.state} {shipping.zipCode}
            </p>
            <p className="text-[#807D7E]">{shipping.country}</p>
            <p className="text-[#807D7E] mt-2">
              {shipping.email} · {shipping.phone}
            </p>
            <p className="text-xs text-[#807D7E] mt-2">
              Shipping: {SHIPPING_LABELS[shippingMethod]} ·{" "}
              {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
            </p>
          </div>
        ) : (
          <p className="text-sm text-[#807D7E]">No shipping address set.</p>
        )}
      </div>

      {/* Payment summary */}
      <div className="border border-[#E8ECEF] rounded-xl p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-[#1C1C1C]">
            Payment
          </h3>
          <button
            onClick={() => setStep(2)}
            className="text-xs text-[#807D7E] underline hover:text-[#1C1C1C] cursor-pointer"
          >
            Edit
          </button>
        </div>
        <p className="text-sm text-[#1C1C1C]">{paymentSummary}</p>
        {payment?.type === "card" && payment.cardholderName && (
          <p className="text-xs text-[#807D7E] mt-1">
            {payment.cardholderName}
          </p>
        )}
      </div>

      {/* Items list */}
      <div className="border border-[#E8ECEF] rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-sm uppercase tracking-wider text-[#1C1C1C] mb-4">
          Items ({items.length})
        </h3>
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={`${item.product.id}-${item.variant?.id ?? "default"}`}
              className="flex gap-4"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#FAFAFA] shrink-0">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1C1C1C]">
                  {item.product.name}
                </p>
                {item.variant && (
                  <p className="text-xs text-[#807D7E]">
                    {item.variant.name}: {item.variant.value}
                  </p>
                )}
                <p className="text-xs text-[#807D7E] mt-1">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium text-[#1C1C1C]">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Price breakdown */}
      <div className="border border-[#E8ECEF] rounded-xl p-5 mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#807D7E]">Subtotal</span>
          <span className="text-[#1C1C1C]">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#807D7E]">Shipping</span>
          <span className="text-[#1C1C1C]">
            {shippingCost === 0 ? (
              <span className="text-[#2EC1AC]">Free</span>
            ) : (
              formatPrice(shippingCost)
            )}
          </span>
        </div>
        {coupon && (
          <div className="flex justify-between text-sm">
            <span className="text-[#807D7E]">Discount ({coupon.code})</span>
            <span className="text-red-500">
              -{formatPrice(discountAmount)}
            </span>
          </div>
        )}
        <div className="flex justify-between pt-3 mt-2 border-t border-[#E8ECEF]">
          <span className="font-bold text-[#1C1C1C]">Total</span>
          <span className="font-bold text-[#1C1C1C]">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2 cursor-pointer text-sm text-[#1C1C1C] mb-6">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="w-4 h-4 accent-[#1C1C1C] mt-0.5"
        />
        <span>
          I agree to the{" "}
          <a href="#" className="underline hover:text-[#B88E2F]">
            terms and conditions
          </a>{" "}
          and acknowledge the{" "}
          <a href="#" className="underline hover:text-[#B88E2F]">
            privacy policy
          </a>
          .
        </span>
      </label>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setStep(2)}
          disabled={isProcessing}
          className="flex items-center gap-2 px-6 h-12 border border-[#E8ECEF] rounded-sm text-sm text-[#1C1C1C] hover:border-[#1C1C1C] transition-colors cursor-pointer disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={!termsAccepted || isProcessing}
          className="flex-1 h-14 bg-[#B88E2F] text-white text-sm font-medium rounded-sm hover:bg-[#A07A26] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
          {isProcessing ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
