"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
      <p className="text-4xl mb-4">🪑</p>
      <h2 className="text-xl font-semibold text-warm-800 mb-2">
        Không tìm thấy sản phẩm
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        {error.message || "Sản phẩm này không còn tồn tại hoặc đã bị xóa."}
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => router.back()}
          className="px-6 py-3 border border-warm-300 hover:border-warm-500 text-warm-700 font-medium rounded-xl text-sm transition-colors"
        >
          ← Quay lại
        </button>
        <Link
          href="/products"
          className="px-6 py-3 bg-warm-800 hover:bg-warm-900 text-white font-medium rounded-xl text-sm transition-colors"
        >
          Xem tất cả sản phẩm
        </Link>
      </div>
    </div>
  );
}
