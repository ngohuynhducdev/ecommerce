import type { StrapiImage, StrapiItem } from "./strapi";

export interface CategoryAttributes {
  name: string;
  slug: string;
  description?: string;
  image: StrapiImage;
  createdAt: string;
  updatedAt: string;
}

export type CategoryItem = StrapiItem<CategoryAttributes>;
