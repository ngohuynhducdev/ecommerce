import type { Product, Variant } from "@/features/products/types";
import { mockProducts } from "@/features/products/mock-data";
import { type StrapiCategoryItem, mapStrapiCategory } from "./categories";

const USE_STRAPI = process.env.NEXT_PUBLIC_USE_STRAPI === "true";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

const strapiHeaders = {
  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  "Content-Type": "application/json",
};

// Product data changes rarely — cache Strapi responses for 1h (same as blog)
const REVALIDATE = 3600;

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price-asc" | "price-desc" | "rating" | "newest";
  color?: string;
  material?: string;
  minRating?: number;
}

// Strapi v5 response shapes
interface StrapiImage {
  id: number;
  url: string;
}

interface StrapiVariant {
  id: string;
  name: string;
  value: string;
  stock: number;
  priceModifier?: number;
}

interface StrapiProductItem {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  description?: string;
  price: number;
  comparePrice?: number;
  images?: StrapiImage[] | null;
  category?: StrapiCategoryItem | null;
  tags?: string[];
  variants?: StrapiVariant[];
  stock?: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  rating?: number;
  reviewCount?: number;
}

function resolveImageUrl(url: string | undefined): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

const SORT_MAP: Record<NonNullable<ProductFilters["sort"]>, string> = {
  "price-asc": "price:asc",
  "price-desc": "price:desc",
  rating: "rating:desc",
  newest: "createdAt:desc",
};

function mapStrapiProduct(item: StrapiProductItem): Product {
  return {
    id: String(item.id),
    slug: item.slug,
    name: item.name,
    description: item.description ?? "",
    price: item.price,
    comparePrice: item.comparePrice,
    images: (item.images ?? []).map((img: StrapiImage) => resolveImageUrl(img.url)),
    category: mapStrapiCategory(item.category),
    tags: item.tags ?? [],
    variants: (item.variants ?? []).map(
      (v: StrapiVariant): Variant => ({
        id: v.id,
        name: v.name,
        value: v.value,
        stock: v.stock,
        priceModifier: v.priceModifier,
      }),
    ),
    stock: item.stock ?? 0,
    isFeatured: item.isFeatured ?? false,
    isBestseller: item.isBestseller ?? false,
    rating: item.rating ?? 0,
    reviewCount: item.reviewCount ?? 0,
  };
}

function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  let result = [...products];

  if (filters.category) {
    result = result.filter((p) => p.category.slug === filters.category);
  }
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.color) {
    const color = filters.color.toLowerCase();
    result = result.filter((p) =>
      p.variants.some((v) => v.value.toLowerCase().includes(color)),
    );
  }
  if (filters.material) {
    const m = filters.material.toLowerCase();
    result = result.filter((p) => {
      const haystack = `${p.tags.join(" ")} ${p.description}`.toLowerCase();
      return haystack.includes(m);
    });
  }
  if (filters.minRating !== undefined) {
    result = result.filter((p) => p.rating >= filters.minRating!);
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      break;
  }

  return result;
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<Product[]> {
  if (USE_STRAPI) {
    try {
      const queryParts: string[] = [
        "populate[0]=images",
        "populate[1]=category",
      ];
      if (filters.sort) queryParts.push(`sort=${SORT_MAP[filters.sort]}`);
      if (filters.category) queryParts.push(`filters[category][slug][$eq]=${encodeURIComponent(filters.category)}`);
      if (filters.minPrice !== undefined) queryParts.push(`filters[price][$gte]=${filters.minPrice}`);
      if (filters.maxPrice !== undefined) queryParts.push(`filters[price][$lte]=${filters.maxPrice}`);

      const url = `${STRAPI_URL}/api/products?${queryParts.join("&")}`;
      const res = await fetch(url, {
        headers: strapiHeaders,
        next: { revalidate: REVALIDATE },
      });
      if (!res.ok) return applyFilters(mockProducts, filters);

      const json = (await res.json()) as { data: StrapiProductItem[] };
      return json.data.map(mapStrapiProduct);
    } catch (err) {
      console.error("[getProducts] Strapi fetch failed, falling back to mock data:", err);
      return applyFilters(mockProducts, filters);
    }
  }

  return applyFilters(mockProducts, filters);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_STRAPI) {
    try {
      const queryParts = [
        `filters[slug][$eq]=${encodeURIComponent(slug)}`,
        "populate[0]=images",
        "populate[1]=category",
        "populate[2]=category.image",
      ];

      const res = await fetch(`${STRAPI_URL}/api/products?${queryParts.join("&")}`, {
        headers: strapiHeaders,
        next: { revalidate: REVALIDATE },
      });
      if (!res.ok) return mockProducts.find((p) => p.slug === slug) ?? null;
      const json = (await res.json()) as { data: StrapiProductItem[] };
      return json.data[0] ? mapStrapiProduct(json.data[0]) : null;
    } catch {
      return mockProducts.find((p) => p.slug === slug) ?? null;
    }
  }

  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (USE_STRAPI) {
    try {
      const queryParts = [
        "filters[isFeatured][$eq]=true",
        "populate[0]=images",
        "populate[1]=category",
        "pagination[limit]=8",
      ];

      const res = await fetch(`${STRAPI_URL}/api/products?${queryParts.join("&")}`, {
        headers: strapiHeaders,
        next: { revalidate: REVALIDATE },
      });
      if (!res.ok) return mockProducts.filter((p) => p.isFeatured);
      const json = (await res.json()) as { data: StrapiProductItem[] };
      return json.data.map(mapStrapiProduct);
    } catch {
      return mockProducts.filter((p) => p.isFeatured);
    }
  }

  return mockProducts.filter((p) => p.isFeatured);
}

export async function getBestsellers(): Promise<Product[]> {
  if (USE_STRAPI) {
    try {
      const queryParts = [
        "filters[isBestseller][$eq]=true",
        "populate[0]=images",
        "populate[1]=category",
        "pagination[limit]=8",
      ];

      const res = await fetch(`${STRAPI_URL}/api/products?${queryParts.join("&")}`, {
        headers: strapiHeaders,
        next: { revalidate: REVALIDATE },
      });
      if (!res.ok) return mockProducts.filter((p) => p.isBestseller);
      const json = (await res.json()) as { data: StrapiProductItem[] };
      return json.data.map(mapStrapiProduct);
    } catch {
      return mockProducts.filter((p) => p.isBestseller);
    }
  }

  return mockProducts.filter((p) => p.isBestseller);
}

export async function getRelatedProducts(
  productId: string,
  categorySlug?: string,
): Promise<Product[]> {
  const mockFallback = () => {
    const source = mockProducts.find((p) => p.id === productId);
    if (!source) return [];
    return mockProducts
      .filter(
        (p) => p.id !== productId && p.category.slug === source.category.slug,
      )
      .slice(0, 4);
  };

  if (USE_STRAPI) {
    try {
      const queryParts = [
        `filters[id][$ne]=${encodeURIComponent(productId)}`,
        "populate[0]=images",
        "populate[1]=category",
        "pagination[limit]=4",
      ];
      if (categorySlug) {
        queryParts.push(`filters[category][slug][$eq]=${encodeURIComponent(categorySlug)}`);
      }

      const res = await fetch(`${STRAPI_URL}/api/products?${queryParts.join("&")}`, {
        headers: strapiHeaders,
        next: { revalidate: REVALIDATE },
      });
      if (!res.ok) return mockFallback();
      const json = (await res.json()) as { data: StrapiProductItem[] };
      return json.data.map(mapStrapiProduct);
    } catch {
      return mockFallback();
    }
  }

  return mockFallback();
}
