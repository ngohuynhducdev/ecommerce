import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Không tìm thấy trang | Home Interior",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-warm-50">
      <div className="text-center max-w-md">
        <p className="text-8xl font-serif font-bold text-warm-200 select-none">
          404
        </p>
        <h1 className="text-2xl font-serif font-bold text-warm-800 mt-2 mb-3">
          Trang không tồn tại
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Trang bạn đang tìm kiếm đã bị xóa, đổi tên hoặc chưa từng tồn tại.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/"
            className="px-6 py-3 bg-warm-800 hover:bg-warm-900 text-white font-medium rounded-xl text-sm transition-colors"
          >
            Về trang chủ
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 border border-warm-300 hover:border-warm-500 text-warm-700 font-medium rounded-xl text-sm transition-colors"
          >
            Xem sản phẩm
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mb-3">
          Hoặc tìm kiếm sản phẩm bạn cần:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {["Sofa", "Bàn ăn", "Kệ sách", "Đèn trang trí", "Thảm"].map((kw) => (
            <Link
              key={kw}
              href={`/search?q=${encodeURIComponent(kw)}`}
              className="text-xs px-3 py-1.5 bg-white border border-warm-200 hover:border-warm-400 rounded-full text-warm-700 transition-colors"
            >
              {kw}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
