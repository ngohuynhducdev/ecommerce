"use client";

import { useRouter } from "next/navigation";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
      <p className="text-4xl mb-4">😕</p>
      <h2 className="text-xl font-semibold text-warm-800 mb-2">
        Không thể tải sản phẩm
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        {error.message || "Đã có lỗi xảy ra, vui lòng thử lại."}
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-warm-800 hover:bg-warm-900 text-white font-medium rounded-xl text-sm transition-colors"
      >
        Thử lại
      </button>
    </div>
  );
}
