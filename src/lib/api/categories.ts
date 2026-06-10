import type { Category } from "@/features/products/types";
import { mockCategories } from "@/features/products/mock-data";
import { USE_STRAPI, resolveStrapiUrl, strapiGet } from "./strapi";

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
    image: resolveStrapiUrl(item?.image?.url),
    description: item?.description ?? "",
  };
}

export async function getCategories(): Promise<Category[]> {
  if (USE_STRAPI) {
    const data = await strapiGet<StrapiCategoryItem>(
      "/api/categories?populate[0]=image",
    );
    if (data) return data.map(mapStrapiCategory);
  }

  return mockCategories;
}
