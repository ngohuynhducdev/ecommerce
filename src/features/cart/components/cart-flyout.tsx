"use client";

import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { useAtom, useAtomValue } from "jotai";

import { cartItemsAtom, cartOpenAtom, cartSubtotalAtom } from "../atoms";
import {
  shippingMethodAtom,
  SHIPPING_COSTS,
} from "@/features/checkout/atoms";
import type { CartItem } from "@/features/products/types";
import { formatPrice } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

function cartItemKey(item: CartItem) {
  return `${item.product.id}-${item.variant?.id ?? "default"}`;
}

function isSameItem(a: CartItem, b: CartItem) {
  return (
    a.product.id === b.product.id &&
    (a.variant?.id ?? "") === (b.variant?.id ?? "")
  );
}

export function CartFlyout() {
  const [cartOpen, setCartOpen] = useAtom(cartOpenAtom);
  const [items, setItems] = useAtom(cartItemsAtom);
  const subtotal = useAtomValue(cartSubtotalAtom);
  const shippingMethod = useAtomValue(shippingMethodAtom);
  const shippingCost = SHIPPING_COSTS[shippingMethod];
  const total = subtotal + shippingCost;

  const increment = (item: CartItem) =>
    setItems((prev) =>
      prev.map((i) =>
        isSameItem(i, item) ? { ...i, quantity: i.quantity + 1 } : i
      )
    );

  const decrement = (item: CartItem) =>
    setItems((prev) =>
      prev.map((i) =>
        isSameItem(i, item)
          ? { ...i, quantity: Math.max(1, i.quantity - 1) }
          : i
      )
    );

  const remove = (item: CartItem) =>
    setItems((prev) => prev.filter((i) => !isSameItem(i, item)));

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full sm:w-105 p-0 flex flex-col">
        {/* Header */}
        <div className="px-6 pt-7 pb-4">
          <SheetTitle className="text-2xl font-bold text-[#1C1C1C]">Cart</SheetTitle>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="text-[#E8ECEF]">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p className="text-[#807D7E] text-sm">Your cart is empty</p>
            <SheetClose asChild>
              <Link
                href="/shop"
                className="h-10 px-6 flex items-center rounded-lg bg-[#1C1C1C] text-white text-sm font-medium hover:bg-[#B88E2F] transition-colors"
              >
                Shop Now
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            {/* Scrollable items */}
            <ul className="flex-1 overflow-y-auto divide-y divide-[#E8ECEF]">
              {items.map((item) => (
                <li key={cartItemKey(item)} className="flex gap-4 px-6 py-5">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#F3F5F7]">
                    <SafeImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    {/* Row 1: name + price */}
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="font-semibold text-sm text-[#1C1C1C] leading-snug hover:text-[#B88E2F] transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <span className="text-sm font-semibold text-[#1C1C1C] shrink-0">
                        {formatPrice(item.product.price)}
                      </span>
                    </div>

                    {/* Row 2: color + remove */}
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-[#807D7E]">
                        {item.variant ? `Color: ${item.variant.value}` : ""}
                      </span>
                      <button
                        onClick={() => remove(item)}
                        aria-label="Remove item"
                        className="text-[#807D7E] hover:text-[#1C1C1C] transition-colors cursor-pointer text-base leading-none"
                      >
                        ×
                      </button>
                    </div>

                    {/* Row 3: qty stepper */}
                    <div className="flex items-center border border-[#E8ECEF] rounded-lg w-fit mt-2.5">
                      <button
                        onClick={() => decrement(item)}
                        aria-label="Decrease quantity"
                        className="w-9 h-9 flex items-center justify-center text-[#1C1C1C] hover:bg-[#F3F5F7] rounded-l-lg transition-colors cursor-pointer"
                      >
                        −
                      </button>
                      <span className="w-9 text-center text-sm font-medium text-[#1C1C1C] select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increment(item)}
                        aria-label="Increase quantity"
                        className="w-9 h-9 flex items-center justify-center text-[#1C1C1C] hover:bg-[#F3F5F7] rounded-r-lg transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="px-6 pt-3 pb-6">
              {/* Subtotal row */}
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-[#1C1C1C]">Subtotal</span>
                <span className="text-sm font-medium text-[#1C1C1C]">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {/* Total row */}
              <div className="flex items-center justify-between py-3 border-t border-[#E8ECEF]">
                <span className="text-base font-bold text-[#1C1C1C]">Total</span>
                <span className="text-base font-bold text-[#1C1C1C]">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Checkout button */}
              <SheetClose asChild>
                <Link
                  href="/checkout"
                  className="w-full h-14 bg-[#1C1C1C] text-white flex items-center justify-center rounded-lg text-sm font-medium hover:bg-[#B88E2F] transition-colors mt-2"
                >
                  Checkout
                </Link>
              </SheetClose>

              {/* View Cart link */}
              <SheetClose asChild>
                <Link
                  href="/cart"
                  className="w-full flex items-center justify-center mt-3 text-sm font-medium text-[#1C1C1C] underline underline-offset-2 hover:text-[#B88E2F] transition-colors"
                >
                  View Cart
                </Link>
              </SheetClose>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
