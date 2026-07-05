import type { Category } from "@/features/products/types";
import { mockCategories } from "@/features/products/mock-data";
import { USE_STRAPI, STRAPI_URL, strapiHeaders, resolveStrapiImage } from "./strapi";

export interface StrapiCategoryItem {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  description?: string;
  image?: { url: string } | null;
}

export function mapStrapiCategory(item: StrapiCategoryItem | null | undefined): Category {
  return {
    id: String(item?.id ?? ""),
    slug: item?.slug ?? "",
    name: item?.name ?? "",
    image: resolveStrapiImage(item?.image?.url),
    description: item?.description ?? "",
  };
}

export async function getCategories(): Promise<Category[]> {
  if (USE_STRAPI) {
    try {
      const res = await fetch(`${STRAPI_URL}/api/categories?populate[0]=image`, {
        headers: strapiHeaders,
        // Categories change rarely — cache for 1h (same as products/blog)
        next: { revalidate: 3600 },
      });
      if (!res.ok) return mockCategories;
      const json = (await res.json()) as { data: StrapiCategoryItem[] };
      return json.data.map(mapStrapiCategory);
    } catch {
      return mockCategories;
    }
  }

  return mockCategories;
}
