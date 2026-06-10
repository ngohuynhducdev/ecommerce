import { MOCK_POSTS } from "@/features/blog/mock-data";
import type { BlogPost, ArticleSection } from "@/features/blog/types";
import { USE_STRAPI, resolveStrapiUrl, strapiGet } from "./strapi";

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
      sections.push({ type: "img", content: resolveStrapiUrl(block.image.url) });
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
    coverImage: resolveStrapiUrl(item.cover?.url),
    publishedAt: item.publishedAt ?? new Date().toISOString(),
    readTime: "",
    sections: blocksToSections(item.content),
  };
}

// ── Public API ─────────────────────────────────────────────────────────────────

export async function getPosts(): Promise<BlogPost[]> {
  if (USE_STRAPI) {
    const data = await strapiGet<StrapiBlogPostItem>(
      "/api/blog-posts?populate[0]=cover&sort=publishedAt:desc",
      { next: { revalidate: 3600 } },
    );
    if (data) return data.map(mapStrapiBlogPost);
  }
  return MOCK_POSTS;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (USE_STRAPI) {
    const data = await strapiGet<StrapiBlogPostItem>(
      `/api/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[0]=cover`,
      { next: { revalidate: 3600 } },
    );
    if (data) return data[0] ? mapStrapiBlogPost(data[0]) : undefined;
  }
  return MOCK_POSTS.find((p) => p.slug === slug);
}
