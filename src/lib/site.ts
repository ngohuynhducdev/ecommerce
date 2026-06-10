/**
 * Canonical site URL, used for metadata, OG images, sitemap and robots.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://3legant.vercel.app).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const SITE_NAME = "3legant";
export const SITE_DESCRIPTION =
  "Simply Unique / Simply Better. Discover modern, minimalist furniture.";
