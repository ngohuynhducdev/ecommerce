import { strapiGet } from "./strapi";
import type { StrapiResponse } from "@/lib/types/strapi";
import type { ProductItem } from "@/lib/types/product";

interface GetProductsParams {
  page?: number;
  pageSize?: number;
  category?: string;
  featured?: boolean;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  material?: string;
  inStock?: boolean;
  query?: string;
}

export async function getProducts(
  params: GetProductsParams = {},
): Promise<StrapiResponse<ProductItem[]>> {
  const searchParams: Record<string, string> = {
    "populate[images][populate]": "*",
    "populate[category]": "*",
  };

  if (params.page) searchParams["pagination[page]"] = String(params.page);
  if (params.pageSize)
    searchParams["pagination[pageSize]"] = String(params.pageSize);
  if (params.category)
    searchParams["filters[category][slug][$eq]"] = params.category;
  if (params.featured) searchParams["filters[isFeatured][$eq]"] = "true";
  if (params.sort) searchParams["sort"] = params.sort;
  if (params.minPrice !== undefined)
    searchParams["filters[price][$gte]"] = String(params.minPrice);
  if (params.maxPrice !== undefined)
    searchParams["filters[price][$lte]"] = String(params.maxPrice);
  if (params.inStock) searchParams["filters[stock][$gt]"] = "0";
  if (params.query) searchParams["filters[name][$containsi]"] = params.query;

  return strapiGet<StrapiResponse<ProductItem[]>>(
    "/api/products",
    searchParams,
    {
      next: { revalidate: 60 },
    },
  );
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductItem | null> {
  const res = await strapiGet<StrapiResponse<ProductItem[]>>(
    "/api/products",
    {
      "filters[slug][$eq]": slug,
      "populate[images][populate]": "*",
      "populate[category]": "*",
      "populate[variants]": "*",
    },
    { next: { revalidate: 60 } },
  );

  return res.data[0] ?? null;
}

export async function getFeaturedProducts(): Promise<
  StrapiResponse<ProductItem[]>
> {
  return getProducts({ featured: true, pageSize: 8 });
}

export async function searchProducts(
  query: string,
  page = 1,
): Promise<StrapiResponse<ProductItem[]>> {
  return getProducts({ query, page, pageSize: 20 });
}
