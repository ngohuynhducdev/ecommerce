import { MOCK_POSTS } from "@/features/blog/mock-data";
import type { BlogPost, BlogAuthor, ArticleSection } from "@/features/blog/types";

const USE_STRAPI = process.env.NEXT_PUBLIC_USE_STRAPI === "true";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

const strapiHeaders = {
  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  "Content-Type": "application/json",
};

// Strapi v5 response shapes
interface StrapiMediaData {
  id: number;
  url: string;
}

interface StrapiAuthor {
  name: string;
  avatar?: StrapiMediaData | null;
}

interface StrapiBlogPostItem {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  author?: StrapiAuthor;
  coverImage?: StrapiMediaData | string | null;
  publishedAt?: string;
  readTime?: string;
  sections?: ArticleSection[];
}

function resolveMediaUrl(
  field: StrapiMediaData | string | null | undefined
): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (!field.url) return "";
  return field.url.startsWith("http") ? field.url : `${STRAPI_URL}${field.url}`;
}

function mapStrapiBlogPost(item: StrapiBlogPostItem): BlogPost {
  const author: BlogAuthor = {
    name: item.author?.name ?? "",
    avatar: resolveMediaUrl(item.author?.avatar),
  };

  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt ?? "",
    category: item.category ?? "",
    author,
    coverImage: resolveMediaUrl(item.coverImage),
    publishedAt: item.publishedAt ?? new Date().toISOString(),
    readTime: item.readTime ?? "",
    sections: item.sections ?? [],
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  console.log("[getPosts] USE_STRAPI =", USE_STRAPI);
  if (USE_STRAPI) {
    try {
      const url = `${STRAPI_URL}/api/blog-posts?populate[0]=coverImage&populate[1]=author&sort=publishedAt:desc`;
      console.log("[getPosts] Fetching:", url);
      const res = await fetch(url, { headers: strapiHeaders });
      console.log("[getPosts] Status:", res.status, res.statusText);
      if (!res.ok) {
        const text = await res.text();
        console.warn("[getPosts] Non-OK response body:", text);
        return MOCK_POSTS;
      }
      const json = (await res.json()) as { data: StrapiBlogPostItem[] };
      console.log("[getPosts] Received", json.data.length, "posts");
      return json.data.map(mapStrapiBlogPost);
    } catch (err) {
      console.error("[getPosts] Fetch error:", err);
      return MOCK_POSTS;
    }
  }
  return MOCK_POSTS;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (USE_STRAPI) {
    try {
      const queryParts = [
        `filters[slug][$eq]=${slug}`,
        "populate[0]=coverImage",
        "populate[1]=author",
        "populate[2]=sections",
      ];

      const res = await fetch(`${STRAPI_URL}/api/blog-posts?${queryParts.join("&")}`, {
        headers: strapiHeaders,
      });
      if (!res.ok) return MOCK_POSTS.find((p) => p.slug === slug);
      const json = (await res.json()) as { data: StrapiBlogPostItem[] };
      return json.data[0] ? mapStrapiBlogPost(json.data[0]) : undefined;
    } catch {
      return MOCK_POSTS.find((p) => p.slug === slug);
    }
  }
  return MOCK_POSTS.find((p) => p.slug === slug);
}
