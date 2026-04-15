import type { Metadata } from "next";
import { searchProducts } from "@/lib/api/products";
import { ProductCard } from "@/components/product/ProductCard";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q
      ? `Kết quả tìm kiếm "${q}" | Home Interior`
      : "Tìm kiếm | Home Interior",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  let products: Awaited<ReturnType<typeof searchProducts>>["data"] = [];
  let total = 0;

  if (query) {
    try {
      const res = await searchProducts(query);
      products = res.data ?? [];
      total = res.meta?.pagination?.total ?? products.length;
    } catch {
      // Strapi not available
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {query ? (
        <>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-warm-800">
              Kết quả tìm kiếm
            </h1>
            <p className="mt-1 text-muted-foreground">
              {total > 0
                ? `Tìm thấy ${total} sản phẩm cho "${query}"`
                : `Không tìm thấy sản phẩm nào cho "${query}"`}
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <p className="text-5xl">🔍</p>
              <p className="text-lg font-medium text-warm-700">
                Không có kết quả
              </p>
              <p className="text-sm text-muted-foreground max-w-sm">
                Hãy thử tìm với từ khóa khác hoặc xem qua các danh mục của chúng
                tôi.
              </p>
              <div className="flex gap-3 mt-2">
                <a
                  href="/products"
                  className="px-5 py-2 text-sm font-medium bg-warm-800 text-white rounded-lg hover:bg-warm-900 transition-colors"
                >
                  Xem tất cả sản phẩm
                </a>
                <a
                  href="/categories"
                  className="px-5 py-2 text-sm font-medium border border-warm-300 text-warm-700 rounded-lg hover:bg-warm-50 transition-colors"
                >
                  Xem danh mục
                </a>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <p className="text-5xl">🔍</p>
          <p className="text-lg font-medium text-warm-700">
            Nhập từ khóa để tìm kiếm
          </p>
          <p className="text-sm text-muted-foreground">
            Tìm kiếm theo tên sản phẩm, danh mục, hoặc chất liệu
          </p>
        </div>
      )}
    </div>
  );
}
