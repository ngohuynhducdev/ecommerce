"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { formatVND } from "@/lib/utils/formatPrice";
import { Minus, Plus } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { items, total, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="text-xl font-semibold text-warm-800 mb-2">
          Giỏ hàng trống
        </h1>
        <p className="text-muted-foreground mb-6">
          Hãy thêm sản phẩm yêu thích vào giỏ hàng!
        </p>
        <Button asChild className="bg-warm-800 hover:bg-warm-900 text-white">
          <Link href="/products">Xem sản phẩm</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-warm-800 mb-8">
        Giỏ hàng ({items.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-1">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.variant}`}
              className="flex gap-4 py-5 border-b border-warm-100"
            >
              <Link href={`/products/${item.slug}`} className="flex-shrink-0">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-warm-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-warm-200" />
                  )}
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.slug}`}
                  className="font-medium text-warm-800 hover:text-earth-600 line-clamp-2"
                >
                  {item.name}
                </Link>
                {item.variant && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {item.variant}
                  </p>
                )}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-warm-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity - 1,
                          item.variant,
                        )
                      }
                      className="px-3 py-1.5 hover:bg-warm-100 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity + 1,
                          item.variant,
                        )
                      }
                      className="px-3 py-1.5 hover:bg-warm-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-warm-900">
                      {formatVND(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.productId, item.variant)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="bg-white rounded-2xl border border-warm-100 p-6 space-y-4">
            <h2 className="font-semibold text-warm-800">Tóm tắt đơn hàng</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>
                  Tạm tính ({items.reduce((s, i) => s + i.quantity, 0)} sản
                  phẩm)
                </span>
                <span>{formatVND(total)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Phí vận chuyển</span>
                <span className="text-sage-600 font-medium">
                  Miễn phí từ 2tr đ
                </span>
              </div>
              <div className="border-t border-warm-100 pt-2 flex justify-between font-bold text-warm-900">
                <span>Tổng tạm tính</span>
                <span>{formatVND(total)}</span>
              </div>
            </div>
            <Button
              className="w-full bg-warm-800 hover:bg-warm-900 text-white py-5"
              onClick={() => router.push("/checkout")}
            >
              Tiến hành thanh toán →
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/products">← Tiếp tục mua sắm</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
