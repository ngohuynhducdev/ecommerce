import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getCategoryBySlug, getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/product/ProductFilters";
import { SortDropdown } from "@/components/product/SortDropdown";
import { ProductPagination } from "@/components/product/ProductPagination";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await getCategoryBySlug(slug);
    if (!category) return {};
    return {
      title: `${category.attributes.name} | Home Interior`,
      description: category.attributes.description,
    };
  } catch {
    return {};
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;

  const page = Number(sp.page ?? 1);
  const sort = sp.sort ?? "createdAt:desc";

  const [category, productsRes, categoriesRes] = await Promise.allSettled([
    getCategoryBySlug(slug),
    getProducts({
      page,
      pageSize: 12,
      category: slug,
      minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
      maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
      inStock: sp.inStock === "true",
      sort,
    }),
    getCategories(),
  ]);

  if (category.status === "rejected" || category.value === null) {
    notFound();
  }

  const cat = category.value!;
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

  const heroImageUrl = cat.attributes.image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${cat.attributes.image.data.attributes.url}`
    : null;

  return (
    <>
      {/* Category hero */}
      <div className="relative h-48 sm:h-64 overflow-hidden bg-warm-200">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt={cat.attributes.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-end pb-8 px-4 sm:px-8">
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            {cat.attributes.name}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          <ProductFilters categories={categories} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
              <p className="text-sm text-muted-foreground">
                {pagination?.total != null
                  ? `${pagination.total} sản phẩm`
                  : ""}
              </p>
              <SortDropdown />
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-muted-foreground">
                  Chưa có sản phẩm trong danh mục này
                </p>
              </div>
            )}

            {pagination && (
              <ProductPagination
                currentPage={page}
                pageCount={pagination.pageCount}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
