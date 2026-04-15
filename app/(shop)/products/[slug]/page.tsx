import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/api/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductCard } from "@/components/product/ProductCard";
import { buildProductJsonLd } from "@/lib/utils/jsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    if (!product) return {};
    const { attributes: p } = product;
    const imageUrl = p.images?.data?.[0]?.attributes?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${p.images.data[0].attributes.url}`
      : undefined;
    return {
      title: `${p.name} | Home Interior`,
      description: p.description?.slice(0, 160),
      openGraph: imageUrl ? { images: [imageUrl] } : undefined,
    };
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  try {
    const res = await getProducts({ pageSize: 100 });
    return (res.data ?? []).map((p) => ({ slug: p.attributes.slug }));
  } catch {
    return [];
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    notFound();
  }

  if (!product) notFound();

  const { attributes: p } = product;
  const categorySlug = p.category?.data?.attributes?.slug;
  const categoryName = p.category?.data?.attributes?.name;

  // Related products
  let relatedProducts: Awaited<ReturnType<typeof getProducts>>["data"] = [];
  if (categorySlug) {
    try {
      const res = await getProducts({ category: categorySlug, pageSize: 4 });
      relatedProducts = (res.data ?? [])
        .filter((r) => r.id !== product!.id)
        .slice(0, 4);
    } catch {
      // ignore
    }
  }

  const jsonLd = buildProductJsonLd(product, strapiUrl);
  const images = p.images?.data ?? [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/" className="hover:text-warm-700">
            Trang chủ
          </Link>
          <span>/</span>
          {categorySlug && (
            <>
              <Link
                href={`/categories/${categorySlug}`}
                className="hover:text-warm-700"
              >
                {categoryName}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-warm-800 font-medium truncate max-w-48">
            {p.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <ProductGallery images={images} strapiUrl={strapiUrl} />

          {/* Info */}
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-warm-800 leading-tight">
              {p.name}
            </h1>

            {/* Product Actions (Client) */}
            <ProductActions product={product} />

            {/* Description */}
            {p.description && (
              <div className="border-t border-warm-100 pt-6">
                <h3 className="font-semibold text-warm-800 mb-3">
                  Mô tả sản phẩm
                </h3>
                <div
                  className="text-sm text-warm-600 leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: p.description }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-warm-800 mb-6">
              Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
