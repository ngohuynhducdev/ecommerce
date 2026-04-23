"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAtom, useAtomValue } from "jotai";
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ShoppingCart,
  X,
} from "lucide-react";

import { cartItemsAtom, cartSubtotalAtom } from "@/features/cart/atoms";
import { couponAtom } from "@/features/checkout/atoms";
import type { CartItem } from "@/features/products/types";
import { formatPrice, cn } from "@/lib/utils";
import { Breadcrumb } from "@/features/shared/components/breadcrumb";

const COUPONS: Record<string, { discount: number; type: "percent" }> = {
  SAVE10: { discount: 10, type: "percent" },
  FURNITURE20: { discount: 20, type: "percent" },
};

function isSameItem(a: CartItem, b: CartItem) {
  return (
    a.product.id === b.product.id &&
    (a.variant?.id ?? "") === (b.variant?.id ?? "")
  );
}

function cartItemKey(item: CartItem) {
  return `${item.product.id}-${item.variant?.id ?? "default"}`;
}

export default function CartPage() {
  const [items, setItems] = useAtom(cartItemsAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const [coupon, setCoupon] = useAtom(couponAtom);

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

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

    const match = COUPONS[code];
    if (!match) {
      setCouponError("Invalid coupon code");
      return;
    }

    setCoupon({ code, discount: match.discount, type: match.type });
    setCouponSuccess(`${code} applied — ${match.discount}% off`);
    setCouponInput("");
  }

  function removeCoupon() {
    setCoupon(null);
    setCouponSuccess(null);
    setCouponError(null);
  }

  const discountAmount =
    coupon && coupon.type === "percent"
      ? (subtotal * coupon.discount) / 100
      : coupon?.discount ?? 0;
  const total = Math.max(0, subtotal - discountAmount);

  return (
    <div className="px-8 lg:px-20 py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />

      <h1 className="text-3xl font-semibold text-[#1C1C1C] mb-8">Cart</h1>

      {items.length === 0 ? (
        <div className="py-24 flex flex-col items-center text-center">
          <ShoppingCart size={64} className="text-[#E8ECEF] mb-4" />
          <p className="text-xl font-semibold text-[#1C1C1C]">
            Your cart is empty
          </p>
          <p className="text-sm text-[#807D7E] mt-2 max-w-xs">
            Looks like you haven&apos;t added anything yet. Start exploring our
            collection.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center h-12 px-8 mt-6 bg-[#1C1C1C] text-white text-sm font-medium rounded-sm hover:bg-[#333] transition-colors"
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
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#F3F5F7] text-xs uppercase tracking-wider text-[#807D7E]">
                    <th className="text-left px-4 py-3 font-medium">Product</th>
                    <th className="text-left px-4 py-3 font-medium">Price</th>
                    <th className="text-left px-4 py-3 font-medium">Quantity</th>
                    <th className="text-left px-4 py-3 font-medium">Subtotal</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={cartItemKey(item)}
                      className="border-b border-[#E8ECEF]"
                    >
                      <td className="px-4 py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-[88px] h-[88px] rounded-lg overflow-hidden bg-[#FAFAFA] shrink-0">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              sizes="88px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/shop/${item.product.slug}`}
                              className="font-medium text-[#1C1C1C] hover:text-[#B88E2F] transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            {item.variant && (
                              <p className="text-sm text-[#807D7E] mt-1">
                                {item.variant.name}: {item.variant.value}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-6 text-[#1C1C1C]">
                        {formatPrice(item.product.price)}
                      </td>
                      <td className="px-4 py-6">
                        <QuantityStepper
                          quantity={item.quantity}
                          onChange={(q) => updateQuantity(item, q)}
                        />
                      </td>
                      <td className="px-4 py-6 font-medium text-[#1C1C1C]">
                        {formatPrice(item.product.price * item.quantity)}
                      </td>
                      <td className="px-4 py-6">
                        <button
                          onClick={() => removeItem(item)}
                          aria-label="Remove item"
                          className="text-[#807D7E] hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile list */}
            <div className="lg:hidden">
              {items.map((item) => (
                <div
                  key={cartItemKey(item)}
                  className="flex gap-4 border-b border-[#E8ECEF] pb-5 mb-5"
                >
                  <div className="relative w-[72px] h-[72px] rounded-lg overflow-hidden bg-[#FAFAFA] shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="font-medium text-sm text-[#1C1C1C] truncate block hover:text-[#B88E2F] transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    {item.variant && (
                      <p className="text-xs text-[#807D7E] mt-0.5">
                        {item.variant.name}: {item.variant.value}
                      </p>
                    )}
                    <p className="font-semibold text-sm text-[#1C1C1C] mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <QuantityStepper
                        quantity={item.quantity}
                        onChange={(q) => updateQuantity(item, q)}
                      />
                      <button
                        onClick={() => removeItem(item)}
                        aria-label="Remove item"
                        className="text-[#807D7E] hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="mt-8">
              {coupon ? (
                <div className="inline-flex items-center gap-2 bg-[#F3F5F7] px-3 py-1.5 rounded-full text-sm">
                  <span className="text-[#1C1C1C]">
                    {coupon.code} applied ✓
                  </span>
                  <button
                    onClick={removeCoupon}
                    aria-label="Remove coupon"
                    className="text-[#807D7E] hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-3 max-w-sm">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") applyCoupon();
                      }}
                      placeholder="Coupon Code"
                      className="flex-1 h-11 border border-[#E8ECEF] rounded-sm px-3 text-sm outline-none focus:border-[#1C1C1C] transition-colors"
                    />
                    <button
                      onClick={applyCoupon}
                      className="h-11 px-6 border border-[#1C1C1C] text-[#1C1C1C] text-sm rounded-sm hover:bg-[#1C1C1C] hover:text-white transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponSuccess && (
                    <p className="text-sm text-[#2EC1AC] mt-2">
                      {couponSuccess}
                    </p>
                  )}
                  {couponError && (
                    <p className="text-sm text-red-500 mt-2">{couponError}</p>
                  )}
                </>
              )}
            </div>

            {/* Continue shopping */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-[#1C1C1C] hover:text-[#B88E2F] transition-colors mt-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* RIGHT — summary */}
          <aside className="bg-[#F3F5F7] rounded-2xl p-8 mt-10 lg:mt-0 h-fit">
            <h2 className="text-xl font-semibold text-[#1C1C1C] mb-6">
              Cart Totals
            </h2>

            <div className="flex justify-between items-center border-b border-[#E8ECEF] py-3">
              <span className="text-sm text-[#807D7E]">Subtotal</span>
              <span className="text-sm font-medium text-[#1C1C1C]">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-[#E8ECEF] py-3">
              <span className="text-sm text-[#807D7E]">Shipping</span>
              <span className="text-sm font-medium text-[#2EC1AC]">Free</span>
            </div>

            {coupon && (
              <div className="flex justify-between items-center border-b border-[#E8ECEF] py-3">
                <span className="text-sm text-[#807D7E]">
                  Discount ({coupon.code})
                </span>
                <span className="text-sm font-medium text-red-500">
                  -{coupon.discount}%
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 mt-2">
              <span className="font-bold text-xl text-[#1C1C1C]">Total</span>
              <span className="font-bold text-xl text-[#1C1C1C]">
                {formatPrice(total)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="w-full h-14 bg-[#1C1C1C] text-white mt-6 rounded-sm flex items-center justify-center text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Proceed to Checkout
            </Link>
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
    <div className="flex border border-[#E8ECEF] rounded-sm w-fit">
      <button
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className={cn(
          "w-9 h-9 flex items-center justify-center text-[#1C1C1C] hover:bg-[#F3F5F7] transition-colors cursor-pointer",
          quantity <= 1 && "opacity-40 cursor-not-allowed"
        )}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={quantity}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (Number.isFinite(next) && next >= 1) onChange(next);
        }}
        className="text-center w-12 text-sm outline-none bg-transparent"
      />
      <button
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
        className="w-9 h-9 flex items-center justify-center text-[#1C1C1C] hover:bg-[#F3F5F7] transition-colors cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
