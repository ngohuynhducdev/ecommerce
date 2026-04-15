import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/api/orders";
import { formatVND } from "@/lib/utils/formatPrice";
import type { OrderStatus } from "@/lib/types/order";

const STEPS: { status: OrderStatus; label: string }[] = [
  { status: "pending", label: "Đặt hàng" },
  { status: "processing", label: "Đang xử lý" },
  { status: "shipped", label: "Đang giao" },
  { status: "delivered", label: "Đã giao" },
];

const STATUS_ORDER: Record<OrderStatus, number> = {
  pending: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
  cancelled: -1,
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) notFound();

  let order: Awaited<ReturnType<typeof getOrderById>>["data"] | null = null;
  try {
    const res = await getOrderById(id, token);
    order = res.data;
  } catch {
    notFound();
  }

  if (!order) notFound();

  const { attributes: o } = order;
  const currentStep = STATUS_ORDER[o.status] ?? 0;
  const isCancelled = o.status === "cancelled";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/orders"
          className="text-sm text-muted-foreground hover:text-warm-700 transition-colors"
        >
          ← Lịch sử đơn hàng
        </Link>
      </div>

      <div className="flex items-start justify-between gap-3 flex-wrap mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-warm-800">
            Đơn hàng #{order.id}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Đặt ngày{" "}
            {new Date(o.createdAt).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
        {isCancelled ? (
          <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-red-100 text-red-700">
            Đã hủy
          </span>
        ) : null}
      </div>

      {/* Timeline */}
      {!isCancelled && (
        <div className="bg-white border border-warm-100 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-warm-800 mb-5">
            Trạng thái đơn hàng
          </h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <div
                key={s.status}
                className="flex items-center gap-2 flex-shrink-0"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      i <= currentStep
                        ? "bg-warm-800 text-white"
                        : "bg-warm-100 text-warm-400"
                    }`}
                  >
                    {i < currentStep ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-xs text-center ${i <= currentStep ? "text-warm-800 font-medium" : "text-muted-foreground"}`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-12 mb-4 ${i < currentStep ? "bg-warm-800" : "bg-warm-200"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Items */}
      <div className="bg-white border border-warm-100 rounded-2xl p-6 mb-6">
        <h2 className="font-semibold text-warm-800 mb-4">Sản phẩm đã đặt</h2>
        <div className="space-y-4">
          {(o.items ?? []).map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-warm-100 flex-shrink-0">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.slug}`}
                  className="font-medium text-sm text-warm-800 hover:text-earth-600 line-clamp-2"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatVND(item.price)} × {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-sm text-warm-900 flex-shrink-0">
                {formatVND(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-warm-100 mt-5 pt-4 space-y-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Tạm tính</span>
            <span>{formatVND(o.total)}</span>
          </div>
          <div className="flex justify-between font-bold text-warm-900">
            <span>Tổng cộng</span>
            <span>{formatVND(o.total)}</span>
          </div>
        </div>
      </div>

      {/* Shipping info */}
      {o.shippingAddress && (
        <div className="bg-white border border-warm-100 rounded-2xl p-6">
          <h2 className="font-semibold text-warm-800 mb-3">
            Thông tin giao hàng
          </h2>
          <p className="text-sm text-warm-700">
            <strong>{o.shippingAddress.fullName}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            {o.shippingAddress.phone}
          </p>
          <p className="text-sm text-muted-foreground">
            {o.shippingAddress.address}, {o.shippingAddress.district},{" "}
            {o.shippingAddress.city}
          </p>
          {o.paymentMethod && (
            <p className="text-sm text-muted-foreground mt-2">
              Thanh toán:{" "}
              {o.paymentMethod === "cod"
                ? "Tiền mặt khi nhận hàng (COD)"
                : "Chuyển khoản ngân hàng"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
