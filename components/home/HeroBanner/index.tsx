import { getBanners } from "@/lib/api/banners";
import { HeroBannerClient } from "./HeroBannerClient";

export async function HeroBanner() {
  let banners = [] as Awaited<ReturnType<typeof getBanners>>["data"];
  try {
    const res = await getBanners();
    banners = res.data ?? [];
  } catch {
    // Fallback handled in client component
  }

  return <HeroBannerClient banners={banners} />;
}
