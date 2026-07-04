export const dynamicParams = true;
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/lib/api/products";
import { formatPrice } from "@/lib/utils";
import { Breadcrumb } from "@/features/shared/components/breadcrumb";
import { ImageGallery } from "@/features/products/components/image-gallery";
import { AddToCartSection } from "@/features/products/components/add-to-cart-section";
import { ProductTabs } from "@/features/products/components/product-tabs";
import { RelatedProducts } from "@/features/products/components/related-products";
import { NewsletterSection } from "@/features/shared/components/newsletter-section";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((p) => ({ slug: p.slug }));
  } catch (error) {
    // Nếu Strapi fail lúc build, trả về mảng rỗng
    // Next.js sẽ render dynamic thay vì static
    console.error("Failed to fetch products for static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found — 3legant" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.images[0]],
    },
  };
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#FFC700" : "#E8ECEF"}
      stroke={filled ? "#FFC700" : "#E8ECEF"}
      strokeWidth={1}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(
    product.id,
    product.category.slug,
  );

  const discountPercent = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : 0;

  return (
    <div>
      <div className="px-5 lg:px-20 py-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            {
              label: product.category.name,
              href: `/shop?category=${product.category.slug}`,
            },
            { label: product.name },
          ]}
        />

        <div className="lg:grid lg:grid-cols-2 gap-16 items-start mt-8">
          {/* Gallery */}
          <ImageGallery
            images={product.images}
            name={product.name}
            isNew={true}
            discountPercent={discountPercent}
          />

          {/* Info */}
          <div className="mt-10 lg:mt-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    filled={star <= Math.round(product.rating)}
                  />
                ))}
              </div>
              <a
                href="#reviews"
                className="text-sm text-[#807D7E] underline cursor-pointer hover:text-[#1C1C1C] transition-colors"
              >
                {product.reviewCount} Reviews
              </a>
            </div>

            <h1 className="text-3xl font-semibold text-[#1C1C1C] mt-2">
              {product.name}
            </h1>

            <p className="text-[#807D7E] leading-relaxed mt-4">
              {product.description}
            </p>

            <div className="flex items-center gap-3 mt-4 pb-6 border-b border-[#E8ECEF]">
              <span className="text-2xl font-semibold text-[#1C1C1C]">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-lg text-[#807D7E] line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>

            <AddToCartSection product={product} />
          </div>
        </div>

        <ProductTabs product={product} />

        <RelatedProducts products={relatedProducts} />
      </div>
      <NewsletterSection />
    </div>
  );
}
