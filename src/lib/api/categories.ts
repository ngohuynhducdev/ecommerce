import type { Category } from "@/features/products/types";
import { mockCategories } from "@/features/products/mock-data";

const USE_STRAPI = process.env.NEXT_PUBLIC_USE_STRAPI === "true";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

const strapiHeaders = {
  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  "Content-Type": "application/json",
};

export interface StrapiCategoryItem {
  id: number;
  attributes: {
    slug: string;
    name: string;
    description?: string;
    image?: { data?: { attributes: { url: string } } | null };
  };
}

export function mapStrapiCategory(item: StrapiCategoryItem | null | undefined): Category {
  const a = item?.attributes;
  return {
    id: String(item?.id ?? ""),
    slug: a?.slug ?? "",
    name: a?.name ?? "",
    image: a?.image?.data?.attributes?.url
      ? `${STRAPI_URL}${a.image.data.attributes.url}`
      : "",
    description: a?.description ?? "",
  };
}

export async function getCategories(): Promise<Category[]> {
  if (USE_STRAPI) {
    try {
      const res = await fetch(`${STRAPI_URL}/api/categories?populate=image`, {
        headers: strapiHeaders,
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
