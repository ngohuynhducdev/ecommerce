console.log("=== API CONFIG ===");
console.log("USE_STRAPI:", process.env.NEXT_PUBLIC_USE_STRAPI);
console.log("STRAPI_URL:", process.env.NEXT_PUBLIC_STRAPI_URL);
console.log("==================");

import type { Product, Variant } from "@/features/products/types";
import { mockProducts } from "@/features/products/mock-data";
import { type StrapiCategoryItem, mapStrapiCategory } from "./categories";

const USE_STRAPI = process.env.NEXT_PUBLIC_USE_STRAPI === "true";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

const strapiHeaders = {
  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  "Content-Type": "application/json",
};

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
  attributes: { url: string };
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
  attributes: {
    slug: string;
    name: string;
    description?: string;
    price: number;
    comparePrice?: number;
    images?: { data?: StrapiImage[] | null };
    category?: { data?: StrapiCategoryItem | null };
    tags?: string[];
    variants?: StrapiVariant[];
    stock?: number;
    isFeatured?: boolean;
    isBestseller?: boolean;
    rating?: number;
    reviewCount?: number;
  };
}

const SORT_MAP: Record<NonNullable<ProductFilters["sort"]>, string> = {
  "price-asc": "price:asc",
  "price-desc": "price:desc",
  rating: "rating:desc",
  newest: "createdAt:desc",
};

function mapStrapiProduct(item: StrapiProductItem): Product {
  const a = item.attributes;
  return {
    id: String(item.id),
    slug: a.slug,
    name: a.name,
    description: a.description ?? "",
    price: a.price,
    comparePrice: a.comparePrice,
    images:
      a.images?.data?.map((img) => `${STRAPI_URL}${img.attributes.url}`) ?? [],
    category: mapStrapiCategory(a.category?.data),
    tags: a.tags ?? [],
    variants: (a.variants ?? []).map(
      (v): Variant => ({
        id: v.id,
        name: v.name,
        value: v.value,
        stock: v.stock,
        priceModifier: v.priceModifier,
      }),
    ),
    stock: a.stock ?? 0,
    isFeatured: a.isFeatured ?? false,
    isBestseller: a.isBestseller ?? false,
    rating: a.rating ?? 0,
    reviewCount: a.reviewCount ?? 0,
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
      const params = new URLSearchParams();
      params.set("populate", "images,category");
      if (filters.sort) params.set("sort", SORT_MAP[filters.sort]);
      if (filters.category)
        params.set("filters[category][slug][$eq]", filters.category);
      if (filters.minPrice !== undefined)
        params.set("filters[price][$gte]", String(filters.minPrice));
      if (filters.maxPrice !== undefined)
        params.set("filters[price][$lte]", String(filters.maxPrice));

      const res = await fetch(`${STRAPI_URL}/api/products?${params}`, {
        headers: strapiHeaders,
      });
      if (!res.ok) return applyFilters(mockProducts, filters);
      const json = (await res.json()) as { data: StrapiProductItem[] };
      return json.data.map(mapStrapiProduct);
    } catch {
      return applyFilters(mockProducts, filters);
    }
  }

  return applyFilters(mockProducts, filters);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_STRAPI) {
    try {
      const params = new URLSearchParams();
      params.set("filters[slug][$eq]", slug);
      params.set("populate", "*");

      const res = await fetch(`${STRAPI_URL}/api/products?${params}`, {
        headers: strapiHeaders,
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
      const params = new URLSearchParams();
      params.set("filters[isFeatured][$eq]", "true");
      params.set("populate", "images,category");
      params.set("pagination[limit]", "8");

      const res = await fetch(`${STRAPI_URL}/api/products?${params}`, {
        headers: strapiHeaders,
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
      const params = new URLSearchParams();
      params.set("filters[isBestseller][$eq]", "true");
      params.set("populate", "images,category");
      params.set("pagination[limit]", "8");

      const res = await fetch(`${STRAPI_URL}/api/products?${params}`, {
        headers: strapiHeaders,
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
      const params = new URLSearchParams();
      params.set("filters[id][$ne]", productId);
      params.set("populate", "images,category");
      params.set("pagination[limit]", "4");

      const res = await fetch(`${STRAPI_URL}/api/products?${params}`, {
        headers: strapiHeaders,
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
