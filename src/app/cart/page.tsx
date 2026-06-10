"use client";

import { useState, useTransition } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { useAtom, useAtomValue } from "jotai";

import { cartItemsAtom, cartSubtotalAtom } from "@/features/cart/atoms";
import {
  couponAtom,
  shippingMethodAtom,
  SHIPPING_COSTS,
  type ShippingMethod,
} from "@/features/checkout/atoms";
import { StepIndicator } from "@/features/checkout/components/step-indicator";
import type { CartItem } from "@/features/products/types";
import { formatPrice, cn } from "@/lib/utils";


const SHIPPING_OPTIONS: Array<{
  value: ShippingMethod;
  label: string;
  displayCost: string;
}> = [
  { value: "standard", label: "Free shipping", displayCost: "$0.00" },
  { value: "express", label: "Express shipping", displayCost: "+$15.00" },
  { value: "nextday", label: "Pick Up", displayCost: "$21.00" },
];

function isSameItem(a: CartItem, b: CartItem) {
  return (
    a.product.id === b.product.id &&
    (a.variant?.id ?? "") === (b.variant?.id ?? "")
  );
}

function cartItemKey(item: CartItem) {
  return `${item.product.id}-${item.variant?.id ?? "default"}`;
}

function CouponIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 5H3a2 2 0 0 0-2 2v3a2 2 0 0 1 0 4v3a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-3a2 2 0 0 1 0-4V7a2 2 0 0 0-2-2z" />
    </svg>
  );
}

function EmptyCartIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="text-border">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function CartPage() {
  const [items, setItems] = useAtom(cartItemsAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const [coupon, setCoupon] = useAtom(couponAtom);
  const [shippingMethod, setShippingMethod] = useAtom(shippingMethodAtom);

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateQuantity(item: CartItem, nextQty: number) {
    if (nextQty < 1) return;
    setItems((prev) =>
      prev.map((i) => (isSameItem(i, item) ? { ...i, quantity: nextQty } : i))
    );
  }

  function removeItem(item: CartItem) {
    setItems((prev) => prev.filter((i) => !isSameItem(i, item)));
  }

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    setCouponError(null);
    setCouponSuccess(null);
    if (!code) return;

    startTransition(async () => {
      const res = await fetch(`/api/coupons/validate?code=${encodeURIComponent(code)}`);
      if (!res.ok) {
        setCouponError("Invalid coupon code");
        return;
      }
      const data = (await res.json()) as { code: string; discount: number; type: "percent" | "fixed"; minOrder: number };
      setCoupon({ code: data.code, discount: data.discount, type: data.type });
      setCouponSuccess(`${data.code} applied — ${data.discount}${data.type === "percent" ? "%" : "$"} off`);
      setCouponInput("");
    });
  }

  const shippingCost = SHIPPING_COSTS[shippingMethod];
  const total = subtotal + shippingCost;

  return (
    <div className="px-8 lg:px-20 py-12">
      <h1 className="text-4xl font-bold text-primary text-center mb-8">Cart</h1>
      <StepIndicator step={1} />

      {items.length === 0 ? (
        <div className="py-24 flex flex-col items-center text-center">
          <EmptyCartIcon />
          <p className="text-xl font-semibold text-primary mt-4">Your cart is empty</p>
          <p className="text-sm text-muted mt-2 max-w-xs">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center h-12 px-8 mt-6 bg-primary text-white text-sm font-medium rounded-lg hover:bg-accent transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* LEFT — items */}
          <div>
            {/* Desktop table */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-border pb-3 mb-2">
                <span className="text-sm font-medium text-primary">Product</span>
                <span className="text-sm font-medium text-primary w-32 text-center">Quantity</span>
                <span className="text-sm font-medium text-primary w-20 text-right">Price</span>
                <span className="text-sm font-medium text-primary w-20 text-right">Subtotal</span>
              </div>
              {items.map((item) => (
                <div
                  key={cartItemKey(item)}
                  className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center border-b border-border py-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-subtle shrink-0">
                      <SafeImage
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="font-semibold text-sm text-primary hover:text-accent transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      {item.variant && (
                        <p className="text-xs text-muted mt-0.5">
                          Color: {item.variant.value}
                        </p>
                      )}
                      <button
                        onClick={() => removeItem(item)}
                        className="flex items-center gap-1 text-xs text-muted hover:text-primary transition-colors mt-2 cursor-pointer"
                      >
                        <span>×</span>
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="w-32 flex justify-center">
                    <QuantityStepper
                      quantity={item.quantity}
                      onChange={(q) => updateQuantity(item, q)}
                    />
                  </div>
                  <div className="w-20 text-right text-sm text-primary">
                    {formatPrice(item.product.price)}
                  </div>
                  <div className="w-20 text-right text-sm font-semibold text-primary">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile list */}
            <div className="lg:hidden divide-y divide-border">
              {items.map((item) => (
                <div key={cartItemKey(item)} className="py-4 flex gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-subtle shrink-0">
                    <SafeImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="font-semibold text-sm text-primary leading-snug"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-sm font-semibold text-primary">
                          {formatPrice(item.product.price)}
                        </span>
                        <button
                          onClick={() => removeItem(item)}
                          aria-label="Remove"
                          className="text-muted hover:text-primary transition-colors cursor-pointer text-lg leading-none"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    {item.variant && (
                      <p className="text-xs text-muted mt-0.5">
                        Color: {item.variant.value}
                      </p>
                    )}
                    <div className="mt-2">
                      <QuantityStepper
                        quantity={item.quantity}
                        onChange={(q) => updateQuantity(item, q)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon section */}
            <div className="mt-12">
              <h3 className="text-base font-semibold text-primary">Have a coupon?</h3>
              <p className="text-sm text-muted mt-1 mb-4">
                Add your code for an instant cart discount
              </p>
              {coupon ? (
                <div className="inline-flex items-center gap-2 bg-subtle px-4 py-2.5 rounded-lg text-sm">
                  <CouponIcon />
                  <span className="text-primary">{coupon.code} applied ✓</span>
                  <button
                    onClick={() => { setCoupon(null); setCouponSuccess(null); }}
                    className="text-muted hover:text-red-500 transition-colors cursor-pointer ml-1"
                    aria-label="Remove coupon"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center border border-border rounded-lg max-w-sm overflow-hidden">
                    <div className="px-3 text-muted">
                      <CouponIcon />
                    </div>
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") applyCoupon(); }}
                      placeholder="Coupon Code"
                      className="flex-1 py-3 text-sm outline-none bg-transparent placeholder:text-muted"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={isPending}
                      className="px-5 py-3 text-sm font-medium text-primary hover:text-accent transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isPending ? "…" : "Apply"}
                    </button>
                  </div>
                  {couponSuccess && (
                    <p className="text-sm text-sale mt-2">{couponSuccess}</p>
                  )}
                  {couponError && (
                    <p className="text-sm text-red-500 mt-2">{couponError}</p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* RIGHT — Cart summary */}
          <aside className="mt-10 lg:mt-0 h-fit">
            <div className="border border-border rounded-2xl p-6">
              <h2 className="text-base font-semibold text-primary mb-5">Cart summary</h2>

              {/* Shipping options */}
              <div className="space-y-3 mb-6">
                {SHIPPING_OPTIONS.map((option) => {
                  const selected = shippingMethod === option.value;
                  return (
                    <label
                      key={option.value}
                      className={cn(
                        "flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-colors",
                        selected ? "border-primary bg-subtle" : "border-border hover:border-muted"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.value}
                          checked={selected}
                          onChange={() => setShippingMethod(option.value)}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-sm text-primary">{option.label}</span>
                      </div>
                      <span className="text-sm text-primary">{option.displayCost}</span>
                    </label>
                  );
                })}
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-primary font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-bold text-primary">Total</span>
                  <span className="font-bold text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full h-14 bg-primary text-white mt-5 rounded-lg flex items-center justify-center text-sm font-medium hover:bg-accent transition-colors"
              >
                Checkout
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function QuantityStepper({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-border rounded-lg">
      <button
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className={cn(
          "w-9 h-9 flex items-center justify-center text-primary hover:bg-subtle rounded-l-lg transition-colors cursor-pointer text-lg",
          quantity <= 1 && "opacity-40 cursor-not-allowed"
        )}
      >
        −
      </button>
      <span className="w-9 text-center text-sm text-primary select-none">
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
        className="w-9 h-9 flex items-center justify-center text-primary hover:bg-subtle rounded-r-lg transition-colors cursor-pointer text-lg"
      >
        +
      </button>
    </div>
  );
}
