import type { StrapiItem, StrapiResponse } from "@/lib/types/strapi";

export interface BannerAttributes {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  active: boolean;
  image: {
    data: StrapiItem<{
      url: string;
      alternativeText: string;
      width: number;
      height: number;
    }>;
  };
}

export type BannerItem = StrapiItem<BannerAttributes>;

import { strapiGet } from "./strapi";

export async function getBanners(): Promise<StrapiResponse<BannerItem[]>> {
  return strapiGet<StrapiResponse<BannerItem[]>>(
    "/api/banners",
    {
      "populate[image]": "*",
      "filters[active][$eq]": "true",
    },
    { next: { revalidate: 300 } },
  );
}
