import type { Metadata } from "next";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PromoBanner } from "@/components/home/PromoBanner";
import { Newsletter } from "@/components/home/Newsletter";

export const metadata: Metadata = {
  title: "Home Interior — Beautiful Furniture & Decor",
  description:
    "Khám phá bộ sưu tập nội thất và trang trí nhà cửa đẹp, tinh tế. Mang phong cách sống cao cấp vào không gian sống của bạn.",
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromoBanner />
      <Newsletter />
    </>
  );
}
