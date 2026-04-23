import type { Product } from "@/features/products/types";
import { mockProducts } from "@/features/products/mock-data";

const USE_STRAPI = process.env.NEXT_PUBLIC_USE_STRAPI === "true";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price-asc" | "price-desc" | "rating" | "newest";
  color?: string;
  material?: string;
  minRating?: number;
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
      p.variants.some((v) => v.value.toLowerCase().includes(color))
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
      // Mock data has no date; preserve insertion order as "newest"
      break;
  }

  return result;
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  if (USE_STRAPI) {
    // Phase 17: Strapi integration
    const res = await fetch(`${STRAPI_URL}/api/products?populate=*`);
    if (!res.ok) throw new Error("Failed to fetch products from Strapi");
    const data = await res.json() as { data: unknown[] };
    void data;
    throw new Error("Strapi response mapping not implemented until Phase 17");
  }

  return applyFilters(mockProducts, filters);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_STRAPI) {
    const res = await fetch(
      `${STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`
    );
    if (!res.ok) throw new Error("Failed to fetch product from Strapi");
    const data = await res.json() as { data: unknown[] };
    void data;
    throw new Error("Strapi response mapping not implemented until Phase 17");
  }

  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (USE_STRAPI) {
    const res = await fetch(
      `${STRAPI_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`
    );
    if (!res.ok) throw new Error("Failed to fetch featured products from Strapi");
    const data = await res.json() as { data: unknown[] };
    void data;
    throw new Error("Strapi response mapping not implemented until Phase 17");
  }

  return mockProducts.filter((p) => p.isFeatured);
}

export async function getBestsellers(): Promise<Product[]> {
  if (USE_STRAPI) {
    const res = await fetch(
      `${STRAPI_URL}/api/products?filters[isBestseller][$eq]=true&populate=*`
    );
    if (!res.ok) throw new Error("Failed to fetch bestsellers from Strapi");
    const data = await res.json() as { data: unknown[] };
    void data;
    throw new Error("Strapi response mapping not implemented until Phase 17");
  }

  return mockProducts.filter((p) => p.isBestseller);
}

export async function getRelatedProducts(productId: string): Promise<Product[]> {
  if (USE_STRAPI) {
    const res = await fetch(
      `${STRAPI_URL}/api/products?filters[id][$ne]=${productId}&populate=*`
    );
    if (!res.ok) throw new Error("Failed to fetch related products from Strapi");
    const data = await res.json() as { data: unknown[] };
    void data;
    throw new Error("Strapi response mapping not implemented until Phase 17");
  }

  const source = mockProducts.find((p) => p.id === productId);
  if (!source) return [];

  return mockProducts
    .filter((p) => p.id !== productId && p.category.slug === source.category.slug)
    .slice(0, 4);
}
