import Link from "next/link";
import { getFeaturedProducts } from "@/lib/api/products";
import { ProductCard } from "@/components/product/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mock/data";

export async function FeaturedProducts() {
  let products: Awaited<ReturnType<typeof getFeaturedProducts>>["data"] = [];
  try {
    const res = await getFeaturedProducts();
    products = res.data ?? [];
  } catch {
    // Strapi not available — use mock data
  }

  const displayProducts =
    products.length > 0
      ? products
      : MOCK_PRODUCTS.filter((p) => p.attributes.isFeatured);

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

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}

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
