"use client";

import Image from "next/image";
import Link from "next/link";
import { useAtom, useAtomValue } from "jotai";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";

import { cartItemsAtom, cartOpenAtom, cartSubtotalAtom } from "../atoms";
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
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] p-0 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8ECEF]">
          <div className="flex items-center gap-3">
            <SheetTitle className="text-base font-semibold text-[#1C1C1C]">
              Shopping Cart
            </SheetTitle>
            {items.length > 0 && (
              <span className="w-5 h-5 bg-[#1C1C1C] text-white text-[10px] rounded-full flex items-center justify-center leading-none">
                {items.length > 9 ? "9+" : items.length}
              </span>
            )}
          </div>
          {/* Use shadcn's built-in close button — it is already rendered inside SheetContent */}
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingCart size={48} className="text-[#E8ECEF]" />
            <p className="text-[#807D7E] text-sm">Your cart is empty</p>
            <SheetClose asChild>
              <Link
                href="/shop"
                className="h-10 px-6 flex items-center rounded-lg bg-[#1C1C1C] text-white text-sm font-medium hover:bg-[#2d2d2d] transition-colors"
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
                <li
                  key={cartItemKey(item)}
                  className="flex gap-4 px-6 py-4"
                >
                  {/* Thumbnail */}
                  <div className="relative w-[72px] h-[72px] rounded-lg overflow-hidden shrink-0 bg-[#F3F5F7]">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1C1C1C] truncate">
                      {item.product.name}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-[#807D7E] mt-0.5">
                        {item.variant.name}: {item.variant.value}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-[#1C1C1C] mt-1">
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Qty stepper + trash */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#E8ECEF] rounded-lg overflow-hidden">
                        <button
                          onClick={() => decrement(item)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#807D7E] hover:text-[#1C1C1C] hover:bg-[#F3F5F7] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-[#1C1C1C]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increment(item)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#807D7E] hover:text-[#1C1C1C] hover:bg-[#F3F5F7] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => remove(item)}
                        aria-label="Remove item"
                        className="text-[#807D7E] hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Sticky footer */}
            <div className="border-t border-[#E8ECEF] px-6 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#807D7E]">Subtotal</span>
                <span className="text-base font-semibold text-[#1C1C1C]">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex gap-3">
                <SheetClose asChild>
                  <Link
                    href="/cart"
                    className="flex-1 h-11 flex items-center justify-center rounded-lg border border-[#1C1C1C] text-sm font-medium text-[#1C1C1C] hover:bg-[#F3F5F7] transition-colors"
                  >
                    View Cart
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/checkout"
                    className="flex-1 h-11 flex items-center justify-center rounded-lg bg-[#1C1C1C] text-sm font-medium text-white hover:bg-[#2d2d2d] transition-colors"
                  >
                    Checkout
                  </Link>
                </SheetClose>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
