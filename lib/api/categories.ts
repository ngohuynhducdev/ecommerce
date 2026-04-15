import { strapiGet } from "./strapi";
import type { StrapiResponse } from "@/lib/types/strapi";
import type { CategoryItem } from "@/lib/types/category";

export async function getCategories(): Promise<StrapiResponse<CategoryItem[]>> {
  return strapiGet<StrapiResponse<CategoryItem[]>>(
    "/api/categories",
    { "populate[image]": "*" },
    { next: { revalidate: 60 } },
  );
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategoryItem | null> {
  const res = await strapiGet<StrapiResponse<CategoryItem[]>>(
    "/api/categories",
    {
      "filters[slug][$eq]": slug,
      "populate[image]": "*",
    },
    { next: { revalidate: 60 } },
  );

  return res.data[0] ?? null;
}
