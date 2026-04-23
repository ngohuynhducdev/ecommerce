"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import { cartItemsAtom } from "@/features/cart/atoms";
import { checkoutStepAtom } from "@/features/checkout/atoms";
import { Breadcrumb } from "@/features/shared/components/breadcrumb";
import { StepIndicator } from "@/features/checkout/components/step-indicator";
import { ShippingStep } from "@/features/checkout/components/shipping-step";
import { PaymentStep } from "@/features/checkout/components/payment-step";
import { ReviewStep } from "@/features/checkout/components/review-step";
import { CheckoutSummary } from "@/features/checkout/components/checkout-summary";

export default function CheckoutPage() {
  const router = useRouter();
  const step = useAtomValue(checkoutStepAtom);
  const items = useAtomValue(cartItemsAtom);

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) return null;

  return (
    <div className="px-8 lg:px-20 py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <h1 className="text-3xl font-semibold text-[#1C1C1C] mb-8">Checkout</h1>

      <StepIndicator />

      <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-12">
        <div>
          {step === 1 && <ShippingStep />}
          {step === 2 && <PaymentStep />}
          {step === 3 && <ReviewStep />}
        </div>
        <div className="mt-10 lg:mt-0">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
