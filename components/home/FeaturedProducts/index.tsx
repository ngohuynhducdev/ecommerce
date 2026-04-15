import Link from "next/link";
import { getFeaturedProducts } from "@/lib/api/products";
import { ProductCard } from "@/components/product/ProductCard";

export async function FeaturedProducts() {
  let products: Awaited<ReturnType<typeof getFeaturedProducts>>["data"] = [];
  try {
    const res = await getFeaturedProducts();
    products = res.data ?? [];
  } catch {
    // Strapi not available
  }

  return (
    <section className="py-16 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-warm-800">
              Sản phẩm nổi bật
            </h2>
            <p className="mt-1 text-muted-foreground text-sm">
              Được yêu thích nhất trong bộ sưu tập
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:block text-sm font-medium text-earth-600 hover:text-earth-700 transition-colors"
          >
            Xem tất cả →
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                <div className="aspect-square bg-warm-200 animate-pulse" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-warm-200 rounded animate-pulse" />
                  <div className="h-4 bg-warm-200 rounded w-2/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className="text-sm font-medium text-earth-600 hover:text-earth-700 transition-colors"
          >
            Xem tất cả sản phẩm →
          </Link>
        </div>
      </div>
    </section>
  );
}
