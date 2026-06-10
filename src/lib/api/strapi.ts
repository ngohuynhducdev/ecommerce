// Shared Strapi client config + helpers.
// All lib/api modules use this so the env wiring lives in one place.

export const USE_STRAPI = process.env.NEXT_PUBLIC_USE_STRAPI === "true";
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

export const strapiHeaders = {
  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  "Content-Type": "application/json",
};

/** Resolve a possibly-relative Strapi media URL to an absolute URL. */
export function resolveStrapiUrl(url: string | null | undefined): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

/**
 * GET `${STRAPI_URL}${path}` and return the `data` array, or `null` on any
 * non-OK response or thrown error so callers can fall back to mock data.
 */
export async function strapiGet<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number } },
): Promise<T[] | null> {
  try {
    const res = await fetch(`${STRAPI_URL}${path}`, {
      headers: strapiHeaders,
      ...init,
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data: T[] };
    return json.data;
  } catch {
    return null;
  }
}
