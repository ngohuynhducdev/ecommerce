import type { Metadata } from "next";
import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/product/ProductFilters";
import { SortDropdown } from "@/components/product/SortDropdown";
import { ProductPagination } from "@/components/product/ProductPagination";

export const metadata: Metadata = {
  title: "Tất cả sản phẩm | Home Interior",
  description:
    "Khám phá toàn bộ bộ sưu tập nội thất và trang trí cao cấp của Home Interior.",
};

interface SearchParams {
  page?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  material?: string;
  inStock?: string;
  sort?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const sort = params.sort ?? "createdAt:desc";

  const [productsRes, categoriesRes] = await Promise.allSettled([
    getProducts({
      page,
      pageSize: 12,
      category: params.category,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      inStock: params.inStock === "true",
      sort,
    }),
    getCategories(),
  ]);

  const products =
    productsRes.status === "fulfilled" ? (productsRes.value.data ?? []) : [];
  const pagination =
    productsRes.status === "fulfilled"
      ? productsRes.value.meta?.pagination
      : undefined;
  const categories =
    categoriesRes.status === "fulfilled"
      ? (categoriesRes.value.data ?? []).map((c) => ({
          name: c.attributes.name,
          slug: c.attributes.slug,
        }))
      : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-warm-800 mb-8">
        Tất cả sản phẩm
      </h1>

      <div className="flex gap-8">
        <ProductFilters categories={categories} />

        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <p className="text-sm text-muted-foreground">
              {pagination?.total != null
                ? `${pagination.total} sản phẩm`
                : "Đang tải..."}
            </p>
            <SortDropdown />
          </div>

          {/* Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-muted-foreground text-lg">
                Không tìm thấy sản phẩm nào
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          )}

          {/* Pagination */}
          {pagination && (
            <ProductPagination
              currentPage={page}
              pageCount={pagination.pageCount}
            />
          )}
        </div>
      </div>
    </div>
  );
}
