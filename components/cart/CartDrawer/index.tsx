"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useAtom } from "jotai";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cartDrawerOpenAtom } from "@/store/ui";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/components/cart/CartItem";
import { formatVND } from "@/lib/utils/formatPrice";

export function CartDrawer() {
  const [open, setOpen] = useAtom(cartDrawerOpenAtom);
  const { items, total, itemCount } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0"
      >
        <SheetHeader className="px-6 py-4 border-b border-warm-100">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="w-5 h-5" />
            Giỏ hàng
            {itemCount > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({itemCount} sản phẩm)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <ShoppingBag className="w-16 h-16 text-warm-300" />
            <p className="text-muted-foreground">Giỏ hàng của bạn đang trống</p>
            <Button variant="outline" onClick={() => setOpen(false)} asChild>
              <Link href="/products">Xem sản phẩm</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              {items.map((item) => (
                <CartItem
                  key={`${item.productId}-${item.variant}`}
                  item={item}
                />
              ))}
            </div>

            <div className="border-t border-warm-100 px-6 py-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tạm tính</span>
                <span className="font-semibold">{formatVND(total)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Phí vận chuyển và thuế sẽ được tính khi thanh toán
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  asChild
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/cart">Xem giỏ hàng</Link>
                </Button>
                <Button
                  asChild
                  className="bg-warm-800 hover:bg-warm-900 text-white"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/checkout">Thanh toán</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
