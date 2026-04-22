import type { Category } from "@/features/products/types";
import { mockCategories } from "@/features/products/mock-data";

const USE_STRAPI = process.env.NEXT_PUBLIC_USE_STRAPI === "true";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getCategories(): Promise<Category[]> {
  if (USE_STRAPI) {
    const res = await fetch(`${STRAPI_URL}/api/categories?populate=*`);
    if (!res.ok) throw new Error("Failed to fetch categories from Strapi");
    const data = await res.json() as { data: unknown[] };
    void data;
    throw new Error("Strapi response mapping not implemented until Phase 17");
  }

  return mockCategories;
}
