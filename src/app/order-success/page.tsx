"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { SafeImage } from "@/components/ui/safe-image";

import { ordersAtom } from "@/features/checkout/atoms";
import { StepIndicator } from "@/features/checkout/components/step-indicator";
import { formatPrice } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") ?? "";
  const orders = useAtomValue(ordersAtom);
  const order = orders.find((o) => o.id === orderId);

  return (
    <div className="px-8 lg:px-20 py-12">
      <h1 className="text-4xl font-bold text-primary text-center mb-8">Complete!</h1>
      <StepIndicator step={3} />

      <div className="flex justify-center">
        <div className="w-full max-w-lg border border-border rounded-2xl p-8 text-center">
          <p className="text-sm text-muted">Thank you! 🎉</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mt-2 mb-8 leading-snug">
            Your order has been received
          </h2>

          {/* Product images */}
          {order && order.items.length > 0 && (
            <div className="flex justify-center gap-3 mb-8">
              {order.items.slice(0, 3).map((item) => (
                <div
                  key={`${item.product.id}-${item.variant?.id ?? "default"}`}
                  className="relative"
                >
                  <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-subtle border border-border">
                    <SafeImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  {item.quantity > 1 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-xs rounded-full flex items-center justify-center font-semibold">
                      {item.quantity}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Order details */}
          {order ? (
            <div className="text-left space-y-0 divide-y divide-border">
              <DetailRow label="Order code:" value={`#${order.orderNumber}`} />
              <DetailRow label="Date:" value={formatDate(order.createdAt)} />
              <DetailRow label="Total:" value={formatPrice(order.total)} />
              <DetailRow label="Payment method:" value={order.paymentMethod ?? "Credit Card"} />
            </div>
          ) : (
            <div className="text-sm text-muted">Order #{orderId}</div>
          )}

          <Link
            href="/account/orders"
            className="inline-flex items-center justify-center h-14 px-10 mt-8 bg-primary text-white text-sm font-medium rounded-full hover:bg-accent transition-colors"
          >
            Purchase history
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-4 flex lg:flex-row flex-col lg:items-center lg:justify-between gap-1">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-semibold text-primary">{value}</span>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-subtle" />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
