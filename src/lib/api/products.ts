import type { Product, Variant } from "@/features/products/types";
import { mockProducts } from "@/features/products/mock-data";
import { type StrapiCategoryItem, mapStrapiCategory } from "./categories";
import { USE_STRAPI, resolveStrapiUrl, strapiGet } from "./strapi";

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price-asc" | "price-desc" | "rating" | "newest";
  color?: string;
  material?: string;
  minRating?: number;
  search?: string;
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
    images: (item.images ?? []).map((img: StrapiImage) => resolveStrapiUrl(img.url)),
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

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter((p) => {
      const haystack = `${p.name} ${p.description} ${p.tags.join(" ")} ${p.category.name}`.toLowerCase();
      return haystack.includes(q);
    });
  }
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
    const queryParts: string[] = [
      "populate[0]=images",
      "populate[1]=category",
    ];
    if (filters.sort) queryParts.push(`sort=${SORT_MAP[filters.sort]}`);
    if (filters.search)
      queryParts.push(`filters[name][$containsi]=${encodeURIComponent(filters.search)}`);
    if (filters.category)
      queryParts.push(`filters[category][slug][$eq]=${encodeURIComponent(filters.category)}`);
    if (filters.minPrice !== undefined)
      queryParts.push(`filters[price][$gte]=${filters.minPrice}`);
    if (filters.maxPrice !== undefined)
      queryParts.push(`filters[price][$lte]=${filters.maxPrice}`);

    const data = await strapiGet<StrapiProductItem>(
      `/api/products?${queryParts.join("&")}`,
    );
    if (data) return data.map(mapStrapiProduct);
  }

  return applyFilters(mockProducts, filters);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (USE_STRAPI) {
    const queryParts = [
      `filters[slug][$eq]=${encodeURIComponent(slug)}`,
      "populate[0]=images",
      "populate[1]=category",
      "populate[2]=category.image",
    ];

    const data = await strapiGet<StrapiProductItem>(
      `/api/products?${queryParts.join("&")}`,
    );
    if (data) return data[0] ? mapStrapiProduct(data[0]) : null;
  }

  return mockProducts.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (USE_STRAPI) {
    const data = await strapiGet<StrapiProductItem>(
      "/api/products?filters[isFeatured][$eq]=true&populate[0]=images&populate[1]=category&pagination[limit]=8",
    );
    if (data) return data.map(mapStrapiProduct);
  }

  return mockProducts.filter((p) => p.isFeatured);
}

export async function getBestsellers(): Promise<Product[]> {
  if (USE_STRAPI) {
    const data = await strapiGet<StrapiProductItem>(
      "/api/products?filters[isBestseller][$eq]=true&populate[0]=images&populate[1]=category&pagination[limit]=8",
    );
    if (data) return data.map(mapStrapiProduct);
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
    const data = await strapiGet<StrapiProductItem>(
      `/api/products?filters[id][$ne]=${encodeURIComponent(productId)}&populate[0]=images&populate[1]=category&pagination[limit]=4`,
    );
    if (data) return data.map(mapStrapiProduct);
  }

  return mockFallback();
}
