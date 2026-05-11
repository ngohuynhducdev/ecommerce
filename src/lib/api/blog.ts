import { MOCK_POSTS } from "@/features/blog/mock-data";
import type { BlogPost, ArticleSection } from "@/features/blog/types";

const USE_STRAPI = process.env.NEXT_PUBLIC_USE_STRAPI === "true";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

const strapiHeaders = {
  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
  "Content-Type": "application/json",
};

// ── Strapi v5 Blocks (Rich Text) types ────────────────────────────────────────

interface StrapiBlockChild {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface StrapiBlockImage {
  url: string;
  alternativeText?: string;
}

interface StrapiBlock {
  type: "heading" | "paragraph" | "image" | "list" | "quote" | "code" | string;
  level?: number;
  children?: StrapiBlockChild[];
  image?: StrapiBlockImage;
  format?: string;
}

// ── Strapi v5 BlogPost response shape ─────────────────────────────────────────

interface StrapiBlogPostItem {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  excerpt?: string;
  author?: string;           // Simple Text field
  cover?: { url: string } | null;  // Media field
  publishedAt?: string;
  tags?: string[] | null;
  content?: StrapiBlock[] | null;  // Rich Text (Blocks)
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveUrl(url: string | undefined): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function blocksToSections(blocks: StrapiBlock[] | null | undefined): ArticleSection[] {
  if (!blocks?.length) return [];
  const sections: ArticleSection[] = [];

  for (const block of blocks) {
    const text = (block.children ?? [])
      .map((c) => c.text ?? "")
      .join("")
      .trim();

    if (block.type === "heading" && block.level === 2 && text) {
      sections.push({ type: "h2", content: text });
    } else if (block.type === "paragraph" && text) {
      sections.push({ type: "p", content: text });
    } else if (block.type === "image" && block.image?.url) {
      sections.push({ type: "img", content: resolveUrl(block.image.url) });
    } else if ((block.type === "list" || block.type === "quote") && text) {
      sections.push({ type: "p", content: text });
    }
  }

  return sections;
}

function mapStrapiBlogPost(item: StrapiBlogPostItem): BlogPost {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt ?? "",
    category: item.tags?.[0] ?? "",
    author: {
      name: item.author ?? "",
      avatar: "",
    },
    coverImage: resolveUrl(item.cover?.url),
    publishedAt: item.publishedAt ?? new Date().toISOString(),
    readTime: "",
    sections: blocksToSections(item.content),
  };
}

// ── Public API ─────────────────────────────────────────────────────────────────

export async function getPosts(): Promise<BlogPost[]> {
  if (USE_STRAPI) {
    try {
      const url = `${STRAPI_URL}/api/blog-posts?populate[0]=cover&sort=publishedAt:desc`;
      const res = await fetch(url, { headers: strapiHeaders, next: { revalidate: 3600 } });
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
      const queryParts = [
        `filters[slug][$eq]=${slug}`,
        "populate[0]=cover",
      ];
      const res = await fetch(
        `${STRAPI_URL}/api/blog-posts?${queryParts.join("&")}`,
        { headers: strapiHeaders, next: { revalidate: 3600 } },
      );
      if (!res.ok) return MOCK_POSTS.find((p) => p.slug === slug);
      const json = (await res.json()) as { data: StrapiBlogPostItem[] };
      return json.data[0] ? mapStrapiBlogPost(json.data[0]) : undefined;
    } catch {
      return MOCK_POSTS.find((p) => p.slug === slug);
    }
  }
  return MOCK_POSTS.find((p) => p.slug === slug);
}
