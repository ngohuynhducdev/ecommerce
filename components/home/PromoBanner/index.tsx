import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-warm-800 to-warm-600 min-h-64">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-warm-500/30 rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-earth-500/20 rounded-full -translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 flex flex-col items-center text-center justify-center py-16 px-6">
            <p className="text-earth-300 text-sm font-medium uppercase tracking-widest mb-3">
              Ưu đãi đặc biệt
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight max-w-2xl">
              Biến đổi không gian sống của bạn
            </h2>
            <p className="mt-4 text-warm-200 text-base sm:text-lg max-w-xl">
              Miễn phí vận chuyển cho đơn hàng trên 2.000.000đ. Ưu đãi có hạn —
              đặt hàng ngay hôm nay!
            </p>
            <Link
              href="/products"
              className="mt-8 inline-block px-10 py-3.5 bg-earth-500 hover:bg-earth-400 text-white font-semibold rounded-xl transition-colors text-sm sm:text-base shadow-lg"
            >
              Mua sắm ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
