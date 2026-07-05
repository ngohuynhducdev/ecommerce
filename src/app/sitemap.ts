import type { MetadataRoute } from "next";

import { getProducts } from "@/lib/api/products";
import { getPosts } from "@/lib/api/blog";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([getProducts(), getPosts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/shop",
    "/blog",
    "/contact",
    "/auth/sign-in",
    "/auth/sign-up",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" || path === "/shop" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/shop/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
