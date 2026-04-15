import { cookies } from "next/headers";
import Link from "next/link";
import { getOrders } from "@/lib/api/orders";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils/formatPrice";
import type { OrderStatus } from "@/lib/types/order";

const STATUS_MAP: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: "Chờ xác nhận", color: "bg-amber-100 text-amber-700" },
  processing: { label: "Đang xử lý", color: "bg-blue-100 text-blue-700" },
  shipped: { label: "Đang giao", color: "bg-indigo-100 text-indigo-700" },
  delivered: { label: "Đã giao", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
};

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  let orders: Awaited<ReturnType<typeof getOrders>>["data"] = [];
  if (token) {
    try {
      const res = await getOrders(token);
      orders = res.data ?? [];
    } catch {
      // Strapi not available
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-warm-800 mb-8">
        Lịch sử đơn hàng
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-lg font-medium text-warm-700 mb-2">
            Chưa có đơn hàng nào
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Hãy mua sắm và đặt hàng nhé!
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-warm-800 hover:bg-warm-900 text-white font-medium rounded-xl transition-colors text-sm"
          >
            Xem sản phẩm
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const status =
              STATUS_MAP[order.attributes.status] ?? STATUS_MAP.pending;
            return (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block bg-white border border-warm-100 rounded-2xl p-5 hover:border-warm-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="font-semibold text-warm-800">
                      Đơn hàng #{order.id}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {new Date(order.attributes.createdAt).toLocaleDateString(
                        "vi-VN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        },
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.attributes.items?.length ?? 0} sản phẩm
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${status.color}`}
                    >
                      {status.label}
                    </span>
                    <p className="font-bold text-warm-900 mt-2">
                      {formatVND(order.attributes.total)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
