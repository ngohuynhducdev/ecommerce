// Shared Strapi configuration + helpers for the data layer.
// Every lib/api module imports from here instead of redefining these.

export const USE_STRAPI = process.env.NEXT_PUBLIC_USE_STRAPI === "true";
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

// Content changes rarely — cache Strapi responses for 1h.
export const STRAPI_REVALIDATE = 3600;

export const strapiHeaders = {
  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  "Content-Type": "application/json",
};

// Resolve a Strapi media path to an absolute URL.
export function resolveStrapiImage(url: string | undefined | null): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}
