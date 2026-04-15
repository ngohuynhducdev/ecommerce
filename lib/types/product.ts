import type { StrapiImage, StrapiItem } from "./strapi";
import type { CategoryItem } from "./category";

export interface ProductVariant {
  label: string;
  value: string;
  priceModifier?: number;
}

export interface ProductAttributes {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  images: {
    data: StrapiItem<{
      url: string;
      alternativeText: string;
      width: number;
      height: number;
    }>[];
  };
  variants: ProductVariant[];
  isFeatured: boolean;
  category: { data: CategoryItem };
  createdAt: string;
  updatedAt: string;
}

export type ProductItem = StrapiItem<ProductAttributes>;
