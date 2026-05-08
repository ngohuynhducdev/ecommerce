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
  attributes: { url: string };
}

interface StrapiAuthorAttributes {
  name: string;
  avatar?: { data?: StrapiMediaData | null } | string;
}

interface StrapiBlogPostItem {
  id: number;
  attributes: {
    slug: string;
    title: string;
    excerpt?: string;
    category?: string;
    author?: StrapiAuthorAttributes;
    coverImage?: { data?: StrapiMediaData | null } | string;
    publishedAt?: string;
    readTime?: string;
    sections?: ArticleSection[];
  };
}

function resolveMediaUrl(
  field: { data?: StrapiMediaData | null } | string | undefined
): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field.data?.attributes?.url ? `${STRAPI_URL}${field.data.attributes.url}` : "";
}

function mapStrapiBlogPost(item: StrapiBlogPostItem): BlogPost {
  const a = item.attributes;

  const author: BlogAuthor = {
    name: a.author?.name ?? "",
    avatar: resolveMediaUrl(a.author?.avatar),
  };

  return {
    id: String(item.id),
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt ?? "",
    category: a.category ?? "",
    author,
    coverImage: resolveMediaUrl(a.coverImage),
    publishedAt: a.publishedAt ?? new Date().toISOString(),
    readTime: a.readTime ?? "",
    sections: a.sections ?? [],
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  if (USE_STRAPI) {
    try {
      const res = await fetch(
        `${STRAPI_URL}/api/blog-posts?populate=coverImage,author.avatar&sort=publishedAt:desc`,
        { headers: strapiHeaders }
      );
      if (!res.ok) return MOCK_POSTS;
      const json = (await res.json()) as { data: StrapiBlogPostItem[] };
      return json.data.map(mapStrapiBlogPost);
    } catch {
      return MOCK_POSTS;
    }
  }
  return MOCK_POSTS;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (USE_STRAPI) {
    try {
      const params = new URLSearchParams();
      params.set("filters[slug][$eq]", slug);
      params.set("populate", "*");

      const res = await fetch(`${STRAPI_URL}/api/blog-posts?${params}`, {
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
