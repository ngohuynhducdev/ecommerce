"use client";

import { useAtom } from "jotai";
import { cartAtom } from "@/store/cart";
import type { CartItem } from "@/lib/types/cart";

export function useCart() {
  const [cart, setCart] = useAtom(cartAtom);

  function addItem(item: CartItem) {
    setCart((prev) => {
      const existing = prev.items.find(
        (i) => i.productId === item.productId && i.variant === item.variant,
      );

      let newItems: CartItem[];
      if (existing) {
        newItems = prev.items.map((i) =>
          i.productId === item.productId && i.variant === item.variant
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      } else {
        newItems = [...prev.items, item];
      }

      const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { items: newItems, total };
    });
  }

  function removeItem(productId: number, variant?: string) {
    setCart((prev) => {
      const newItems = prev.items.filter(
        (i) => !(i.productId === productId && i.variant === variant),
      );
      const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { items: newItems, total };
    });
  }

  function updateQuantity(
    productId: number,
    quantity: number,
    variant?: string,
  ) {
    if (quantity <= 0) {
      removeItem(productId, variant);
      return;
    }

    setCart((prev) => {
      const newItems = prev.items.map((i) =>
        i.productId === productId && i.variant === variant
          ? { ...i, quantity }
          : i,
      );
      const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { items: newItems, total };
    });
  }

  function clearCart() {
    setCart({ items: [], total: 0 });
  }

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items: cart.items,
    total: cart.total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
