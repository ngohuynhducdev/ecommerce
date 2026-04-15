import type { ProductItem } from "@/lib/types/product";

export function buildProductJsonLd(product: ProductItem, strapiUrl: string) {
  const { attributes: p } = product;
  const imageUrl = p.images?.data?.[0]?.attributes?.url
    ? `${strapiUrl}${p.images.data[0].attributes.url}`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: imageUrl,
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "VND",
      availability:
        (p.stock ?? 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };
}
